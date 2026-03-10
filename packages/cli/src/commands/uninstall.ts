import { Command } from 'commander';
import { rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { confirm } from '@inquirer/prompts';
import { getInstalledDir, ensureDirs } from '../lib/config.js';
import { unlinkSkills } from '../lib/skill-linker.js';

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerUninstall(program: Command): void {
  program
    .command('uninstall <name>')
    .alias('rm')
    .description('Uninstall a workflow')
    .option('-f, --force', 'Skip confirmation prompt', false)
    .action(async (name: string, options: { force: boolean }) => {
      try {
        await ensureDirs();
        const installedDir = getInstalledDir();
        const installDir = join(installedDir, name);

        if (!(await fileExists(installDir))) {
          console.error(chalk.red(`Workflow "${name}" is not installed.`));
          process.exit(1);
        }

        if (!options.force) {
          const shouldRemove = await confirm({
            message: `Are you sure you want to uninstall "${name}"? This will remove all skill links and the installed files.`,
            default: false,
          });

          if (!shouldRemove) {
            console.log(chalk.yellow('Uninstall cancelled.'));
            return;
          }
        }

        // Step 1: Remove skill symlinks
        const unlinkSpinner = ora('Removing skill links...').start();
        const removed = await unlinkSkills(name, installDir);
        if (removed.length > 0) {
          unlinkSpinner.succeed(`Removed ${removed.length} skill link(s)`);
          for (const r of removed) {
            console.log(chalk.dim(`  - ${r}`));
          }
        } else {
          unlinkSpinner.succeed('No skill links to remove');
        }

        // Step 2: Remove installed directory
        const removeSpinner = ora('Removing workflow files...').start();
        await rm(installDir, { recursive: true, force: true });
        removeSpinner.succeed('Workflow files removed');

        console.log(chalk.green(`\n\u2713 Successfully uninstalled "${name}"`));
      } catch (err) {
        console.error(chalk.red(`Uninstall failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
