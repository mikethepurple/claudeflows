import { Command } from 'commander';
import { readFile, mkdir, symlink, unlink, stat, readlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { getInstalledDir } from '../lib/config.js';
import type { WorkflowManifest } from '../lib/manifest.js';

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerUse(program: Command): void {
  program
    .command('use <name>')
    .description('Activate a workflow\'s skills in the current project directory')
    .option('-f, --force', 'Overwrite existing skill files', false)
    .action(async (name: string, options: { force: boolean }) => {
      try {
        const installDir = join(getInstalledDir(), name);
        const manifestPath = join(installDir, 'workflow.json');

        if (!(await fileExists(manifestPath))) {
          console.error(chalk.red(`Workflow "${name}" is not installed.`));
          console.error(chalk.dim(`Install it first: ${chalk.bold(`claudeflows install ${name}`)}`));
          process.exit(1);
        }

        const raw = await readFile(manifestPath, 'utf-8');
        const manifest = JSON.parse(raw) as WorkflowManifest;

        const projectDir = process.cwd();
        const skillsDir = join(projectDir, '.claude', 'skills');

        const spinner = ora(`Activating ${manifest.displayName} skills...`).start();
        await mkdir(skillsDir, { recursive: true });

        const linked: string[] = [];
        const skipped: string[] = [];

        for (const skill of manifest.skills) {
          const sourcePath = resolve(installDir, skill.path);
          // Use skill name as folder, with SKILL.md inside (matches Claude Code convention)
          const skillDir = join(skillsDir, skill.name);
          const linkPath = join(skillDir, 'SKILL.md');

          if (!(await fileExists(sourcePath))) {
            skipped.push(`${skill.name} (source not found)`);
            continue;
          }

          if (await fileExists(linkPath)) {
            if (!options.force) {
              skipped.push(`${skill.name} (already exists, use --force to overwrite)`);
              continue;
            }
            try { await unlink(linkPath); } catch { /* ignore */ }
          }

          await mkdir(skillDir, { recursive: true });
          await symlink(sourcePath, linkPath);
          linked.push(skill.name);
        }

        spinner.succeed(`Activated ${manifest.displayName} in ${chalk.dim(projectDir)}`);

        if (linked.length > 0) {
          console.log(chalk.bold('\nLinked skills:'));
          for (const name of linked) {
            console.log(chalk.green(`  \u2713 /${name}`));
          }
        }

        if (skipped.length > 0) {
          console.log(chalk.bold('\nSkipped:'));
          for (const name of skipped) {
            console.log(chalk.yellow(`  \u26A0 ${name}`));
          }
        }

        // Track which workflow is active in this project
        const trackingPath = join(projectDir, '.claude', '.claudeflows.json');
        const tracking = { workflow: manifest.name, version: manifest.version, installedFrom: installDir };
        const { writeFile } = await import('node:fs/promises');
        await writeFile(trackingPath, JSON.stringify(tracking, null, 2) + '\n', 'utf-8');

        console.log(chalk.dim(`\nRun ${chalk.bold('claude')} in this directory to use the workflow skills.`));
      } catch (err) {
        console.error(chalk.red(`Failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
