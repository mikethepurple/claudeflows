import { Command } from 'commander';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import { getInstalledDir, ensureDirs } from '../lib/config.js';
import { parseManifest } from '../lib/manifest.js';
import { runDoctor } from '../lib/doctor.js';
import type { HealthCheck } from '../lib/doctor.js';

function formatCheck(check: HealthCheck): string {
  if (check.status === 'ok') {
    return `  ${chalk.green('\u2713')} ${chalk.green(check.name)}: ${check.message}`;
  }
  if (check.status === 'warn') {
    return `  ${chalk.yellow('\u26A0')} ${chalk.yellow(check.name)}: ${check.message}`;
  }
  return `  ${chalk.red('\u2717')} ${chalk.red(check.name)}: ${check.message}`;
}

async function doctorForWorkflow(name: string, installDir: string): Promise<boolean> {
  console.log(chalk.bold(`\nDiagnosing: ${name}`));
  console.log(chalk.dim('\u2500'.repeat(40)));

  let manifest;
  try {
    manifest = await parseManifest(installDir);
  } catch (err) {
    console.log(chalk.red(`  \u2717 Could not parse workflow.json: ${(err as Error).message}`));
    return false;
  }

  const checks = await runDoctor(manifest, installDir);

  if (checks.length === 0) {
    console.log(chalk.dim('  No checks to run (no runtime, MCP, env, or dependency requirements).'));
    return true;
  }

  for (const check of checks) {
    console.log(formatCheck(check));
  }

  const errors = checks.filter((c) => c.status === 'error').length;
  const warnings = checks.filter((c) => c.status === 'warn').length;
  const ok = checks.filter((c) => c.status === 'ok').length;

  console.log('');
  console.log(
    `  ${chalk.green(`${ok} passed`)}  ${chalk.yellow(`${warnings} warnings`)}  ${chalk.red(`${errors} errors`)}`
  );

  return errors === 0;
}

export function registerDoctor(program: Command): void {
  program
    .command('doctor [name]')
    .description('Run health checks on installed workflows')
    .action(async (name?: string) => {
      try {
        await ensureDirs();
        const installedDir = getInstalledDir();

        if (name) {
          // Check specific workflow
          const installDir = join(installedDir, name);
          try {
            await stat(installDir);
          } catch {
            console.error(chalk.red(`Workflow "${name}" is not installed.`));
            process.exit(1);
          }

          const ok = await doctorForWorkflow(name, installDir);
          if (!ok) {
            process.exit(1);
          }
        } else {
          // Check all installed workflows
          let entries: string[];
          try {
            entries = await readdir(installedDir);
          } catch {
            entries = [];
          }

          if (entries.length === 0) {
            console.log(chalk.dim('No workflows installed.'));
            return;
          }

          let allOk = true;
          for (const entry of entries) {
            const dir = join(installedDir, entry);
            try {
              const s = await stat(dir);
              if (!s.isDirectory()) continue;
              // Check if workflow.json exists
              await stat(join(dir, 'workflow.json'));
            } catch {
              continue;
            }

            const ok = await doctorForWorkflow(entry, dir);
            if (!ok) allOk = false;
          }

          console.log('');
          if (allOk) {
            console.log(chalk.green('All workflows are healthy!'));
          } else {
            console.log(chalk.red('Some workflows have issues. See above for details.'));
            process.exit(1);
          }
        }
      } catch (err) {
        console.error(chalk.red(`Doctor failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
