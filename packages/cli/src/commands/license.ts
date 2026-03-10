import { Command } from 'commander';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import chalk from 'chalk';
import ora from 'ora';
import { loadLicense, validateLicense, loadAuthSession } from '../lib/license.js';
import { getInstalledDir } from '../lib/config.js';
import { parseManifest } from '../lib/manifest.js';

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerLicense(program: Command): void {
  const licenseCmd = program
    .command('license')
    .description('Manage workflow licenses');

  // cw license <name> — view license status
  licenseCmd
    .command('status <name>')
    .description('View license status for a workflow')
    .action(async (name: string) => {
      try {
        const token = await loadLicense(name);

        if (!token) {
          console.log(chalk.yellow(`No license found for "${name}"`));
          console.log(chalk.dim('Licenses are stored at ~/.claude-workflows/licenses/'));
          return;
        }

        // Try to read installed manifest for version info
        const installDir = join(getInstalledDir(), name);
        let version: string | undefined;
        if (await fileExists(join(installDir, 'workflow.json'))) {
          try {
            const manifest = await parseManifest(installDir);
            version = manifest.version;
          } catch {
            // Can't parse manifest — proceed without version
          }
        }

        const result = validateLicense(token, name, version);

        if (result.valid) {
          console.log(chalk.green(`License for "${name}": valid`));
          if (result.claims) {
            console.log(`  User: ${result.claims.sub}`);
            console.log(`  Tier: ${result.claims.tier ?? 'standard'}`);
            if (result.claims.versionRange) {
              console.log(`  Versions: ${result.claims.versionRange}`);
            }
            if (result.claims.exp) {
              const expDate = new Date(result.claims.exp * 1000);
              const daysLeft = Math.ceil((expDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              console.log(`  Expires: ${expDate.toLocaleDateString()} (${daysLeft} days remaining)`);
            }
          }
        } else {
          console.log(chalk.red(`License for "${name}": invalid`));
          console.log(chalk.red(`  ${result.error}`));
        }
      } catch (err) {
        console.error(chalk.red(`Failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });

  // cw license refresh <name> — re-fetch license from server
  licenseCmd
    .command('refresh <name>')
    .description('Refresh a license token from the server')
    .action(async (name: string) => {
      try {
        const auth = await loadAuthSession();
        if (!auth) {
          console.error(chalk.red('Not logged in. Run `claudeflows login` first.'));
          process.exit(1);
        }

        const spinner = ora('Fetching license from server...').start();

        const response = await fetch(`https://claudeflows.dev/api/licenses?workflow=${name}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            spinner.fail('Session expired. Run `claudeflows login` to re-authenticate.');
          } else if (response.status === 403) {
            spinner.fail(`No license found for "${name}". Purchase at https://claudeflows.dev/workflows/${name}`);
          } else {
            spinner.fail(`Server error: ${response.status}`);
          }
          process.exit(1);
        }

        const data = (await response.json()) as { token: string };

        // Save license
        const licensesDir = join(homedir(), '.claude-workflows', 'licenses');
        await mkdir(licensesDir, { recursive: true });
        await writeFile(join(licensesDir, `${name}.jwt`), data.token + '\n', 'utf-8');

        spinner.succeed(`License refreshed for "${name}"`);

        // Show updated status
        const result = validateLicense(data.token, name);
        if (result.valid && result.claims) {
          console.log(`  Tier: ${result.claims.tier ?? 'standard'}`);
          if (result.claims.exp) {
            const expDate = new Date(result.claims.exp * 1000);
            console.log(`  Expires: ${expDate.toLocaleDateString()}`);
          }
        }
      } catch (err) {
        console.error(chalk.red(`Failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });

  // cw license list — list all local licenses
  licenseCmd
    .command('list')
    .alias('ls')
    .description('List all local license tokens')
    .action(async () => {
      try {
        const licensesDir = join(homedir(), '.claude-workflows', 'licenses');
        const { readdir } = await import('node:fs/promises');

        let files: string[];
        try {
          files = (await readdir(licensesDir)).filter((f) => f.endsWith('.jwt'));
        } catch {
          console.log(chalk.yellow('No licenses found.'));
          return;
        }

        if (files.length === 0) {
          console.log(chalk.yellow('No licenses found.'));
          return;
        }

        console.log(chalk.bold(`${files.length} license(s):\n`));

        for (const file of files) {
          const name = file.replace('.jwt', '');
          const token = await loadLicense(name);
          if (!token) continue;

          const result = validateLicense(token, name);
          if (result.valid) {
            const expInfo = result.claims?.exp
              ? ` (expires ${new Date(result.claims.exp * 1000).toLocaleDateString()})`
              : '';
            console.log(chalk.green(`  ${name}: valid${expInfo}`));
          } else {
            console.log(chalk.red(`  ${name}: ${result.error}`));
          }
        }
      } catch (err) {
        console.error(chalk.red(`Failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
