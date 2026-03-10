import { Command } from 'commander';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import { getInstalledDir, ensureDirs } from '../lib/config.js';
import { runDoctor } from '../lib/doctor.js';
import type { WorkflowManifest } from '../lib/manifest.js';

interface WorkflowInfo {
  name: string;
  displayName: string;
  version: string;
  skillsCount: number;
  status: 'ok' | 'warn' | 'error';
  dir: string;
}

export function registerList(program: Command): void {
  program
    .command('list')
    .alias('ls')
    .description('List installed workflows')
    .action(async () => {
      try {
        await ensureDirs();
        const installedDir = getInstalledDir();

        let entries: string[];
        try {
          entries = await readdir(installedDir);
        } catch {
          entries = [];
        }

        // Filter to only directories with workflow.json
        const workflows: WorkflowInfo[] = [];
        for (const entry of entries) {
          const dir = join(installedDir, entry);
          const manifestPath = join(dir, 'workflow.json');

          try {
            const s = await stat(dir);
            if (!s.isDirectory()) continue;

            const raw = await readFile(manifestPath, 'utf-8');
            const manifest = JSON.parse(raw) as WorkflowManifest;

            // Quick health check
            const checks = await runDoctor(manifest, dir);
            const hasErrors = checks.some((c) => c.status === 'error');
            const hasWarns = checks.some((c) => c.status === 'warn');
            const status: 'ok' | 'warn' | 'error' = hasErrors
              ? 'error'
              : hasWarns
                ? 'warn'
                : 'ok';

            workflows.push({
              name: manifest.name,
              displayName: manifest.displayName,
              version: manifest.version,
              skillsCount: manifest.skills.length,
              status,
              dir,
            });
          } catch {
            // Skip entries that aren't valid workflows
            workflows.push({
              name: entry,
              displayName: entry,
              version: '?',
              skillsCount: 0,
              status: 'error',
              dir,
            });
          }
        }

        if (workflows.length === 0) {
          console.log(chalk.dim('No workflows installed.'));
          console.log(chalk.dim(`Install one with: ${chalk.bold('claudeflows install <name>')}`));
          return;
        }

        // Calculate column widths
        const nameWidth = Math.max(
          4, // "NAME"
          ...workflows.map((w) => w.displayName.length)
        );
        const versionWidth = Math.max(
          7, // "VERSION"
          ...workflows.map((w) => w.version.length)
        );
        const skillsWidth = 6; // "SKILLS"

        // Header
        console.log('');
        console.log(
          chalk.bold(
            `  ${'NAME'.padEnd(nameWidth)}  ${'VERSION'.padEnd(versionWidth)}  ${'SKILLS'.padEnd(skillsWidth)}  STATUS`
          )
        );
        console.log(
          chalk.dim(
            `  ${'\u2500'.repeat(nameWidth)}  ${'\u2500'.repeat(versionWidth)}  ${'\u2500'.repeat(skillsWidth)}  ${ '\u2500'.repeat(6)}`
          )
        );

        // Rows
        for (const w of workflows) {
          const statusIcon =
            w.status === 'ok'
              ? chalk.green('\u2713 ok')
              : w.status === 'warn'
                ? chalk.yellow('\u26A0 warn')
                : chalk.red('\u2717 err');

          console.log(
            `  ${w.displayName.padEnd(nameWidth)}  ${w.version.padEnd(versionWidth)}  ${String(w.skillsCount).padEnd(skillsWidth)}  ${statusIcon}`
          );
        }

        console.log('');
        console.log(chalk.dim(`${workflows.length} workflow(s) installed`));
        console.log('');
      } catch (err) {
        console.error(chalk.red(`Error listing workflows: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
