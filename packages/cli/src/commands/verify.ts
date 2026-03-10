import { Command } from 'commander';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { getInstalledDir } from '../lib/config.js';
import { parseManifest } from '../lib/manifest.js';
import { verifyIntegrity, verifySignature } from '../lib/integrity.js';
import { getVersionIntegrity } from '../lib/registry.js';

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerVerify(program: Command): void {
  program
    .command('verify [name]')
    .description('Verify file integrity and signatures for installed workflows')
    .option('-v, --verbose', 'Show per-file hash details', false)
    .action(async (name: string | undefined, options: { verbose: boolean }) => {
      try {
        const installedDir = getInstalledDir();

        // If no name given, verify all installed workflows
        let workflows: string[];
        if (name) {
          workflows = [name];
        } else {
          try {
            const entries = await readdir(installedDir, { withFileTypes: true });
            workflows = entries
              .filter((e) => e.isDirectory())
              .map((e) => e.name);
          } catch {
            console.log(chalk.yellow('No workflows installed.'));
            return;
          }
        }

        if (workflows.length === 0) {
          console.log(chalk.yellow('No workflows to verify.'));
          return;
        }

        let allValid = true;

        for (const wfName of workflows) {
          const installDir = join(installedDir, wfName);

          if (!(await fileExists(join(installDir, 'workflow.json')))) {
            console.log(chalk.red(`\n${wfName}: not found`));
            allValid = false;
            continue;
          }

          console.log(chalk.bold(`\n${wfName}:`));

          const manifest = await parseManifest(installDir);

          // Check local integrity block
          if (!manifest.integrity) {
            console.log(chalk.yellow('  No integrity block in workflow.json — skipping hash verification'));
            console.log(chalk.dim('  Publish with `claudeflows publish` to generate integrity data'));
          } else {
            const spinner = ora('  Verifying file hashes...').start();
            const result = await verifyIntegrity(installDir, manifest.integrity);

            if (result.valid) {
              spinner.succeed(chalk.green('  All file hashes match'));
            } else {
              spinner.fail(chalk.red('  Integrity check failed'));
              allValid = false;

              if (result.mismatches.length > 0) {
                console.log(chalk.red('  Modified files:'));
                for (const f of result.mismatches) {
                  console.log(chalk.red(`    - ${f}`));
                }
              }
              if (result.missing.length > 0) {
                console.log(chalk.red('  Missing files:'));
                for (const f of result.missing) {
                  console.log(chalk.red(`    - ${f}`));
                }
              }
              if (result.extra.length > 0) {
                console.log(chalk.yellow('  Extra files (not in manifest):'));
                for (const f of result.extra) {
                  console.log(chalk.yellow(`    - ${f}`));
                }
              }
            }

            if (options.verbose) {
              console.log(chalk.dim(`  Root hash: ${manifest.integrity.root}`));
              console.log(chalk.dim(`  Files hashed: ${Object.keys(manifest.integrity.files).length}`));
            }
          }

          // Check registry signature
          const registryIntegrity = await getVersionIntegrity(wfName, manifest.version);
          if (registryIntegrity) {
            if (manifest.integrity) {
              const sigValid = verifySignature(manifest.integrity.root, registryIntegrity.signature);
              if (sigValid) {
                console.log(chalk.green('  Signature: verified'));
              } else {
                console.log(chalk.red('  Signature: MISMATCH — this workflow may have been tampered with'));
                allValid = false;
              }
            }
          } else {
            console.log(chalk.dim('  No registry signature available for this version'));
          }
        }

        // Summary
        console.log('');
        if (allValid) {
          console.log(chalk.green('All verifications passed.'));
        } else {
          console.log(chalk.red('Some verifications failed. See details above.'));
          process.exit(1);
        }
      } catch (err) {
        console.error(chalk.red(`Verify failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
