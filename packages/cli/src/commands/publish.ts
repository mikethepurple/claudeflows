import { Command } from 'commander';
import { stat, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import { parseManifest, validateManifest } from '../lib/manifest.js';
import { buildIntegrityBlock } from '../lib/integrity.js';

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerPublish(program: Command): void {
  program
    .command('publish')
    .description('Validate and prepare a workflow for publishing to the registry')
    .action(async () => {
      try {
        const cwd = process.cwd();
        const manifestPath = join(cwd, 'workflow.json');

        // Check workflow.json exists
        if (!(await fileExists(manifestPath))) {
          console.error(chalk.red('No workflow.json found in current directory.'));
          console.error(chalk.dim('Run `claudeflows init` to create a new workflow.'));
          process.exit(1);
        }

        // Validate
        const spinner = ora('Validating workflow.json...').start();

        const raw = await readFile(manifestPath, 'utf-8');
        let data: unknown;
        try {
          data = JSON.parse(raw);
        } catch {
          spinner.fail('workflow.json contains invalid JSON');
          process.exit(1);
        }

        const result = await validateManifest(data);
        if (!result.valid) {
          spinner.fail('Validation failed');
          console.error('');
          for (const error of result.errors) {
            console.error(chalk.red(`  \u2717 ${error}`));
          }
          process.exit(1);
        }

        const manifest = await parseManifest(cwd);
        spinner.succeed('Validation passed');

        // Check for recommended files
        console.log(chalk.bold('\nChecklist:'));

        const hasReadme = await fileExists(join(cwd, 'CLAUDE.md'));
        console.log(
          hasReadme
            ? chalk.green('  \u2713 CLAUDE.md found')
            : chalk.yellow('  \u26A0 CLAUDE.md not found (recommended)')
        );

        const hasLicense = await fileExists(join(cwd, 'LICENSE'));
        console.log(
          hasLicense
            ? chalk.green('  \u2713 LICENSE found')
            : chalk.yellow('  \u26A0 LICENSE not found (recommended)')
        );

        if (manifest.repository) {
          console.log(chalk.green(`  \u2713 Repository: ${manifest.repository}`));
        } else {
          console.log(chalk.yellow('  \u26A0 No repository URL in workflow.json (recommended)'));
        }

        // Check that all skill files exist
        let allSkillsExist = true;
        for (const skill of manifest.skills) {
          const skillPath = join(cwd, skill.path);
          if (await fileExists(skillPath)) {
            console.log(chalk.green(`  \u2713 Skill "${skill.name}": ${skill.path}`));
          } else {
            console.log(chalk.red(`  \u2717 Skill "${skill.name}": ${skill.path} NOT FOUND`));
            allSkillsExist = false;
          }
        }

        if (!allSkillsExist) {
          console.error(chalk.red('\nSome skill files are missing. Fix them before publishing.'));
          process.exit(1);
        }

        // Compute and inject integrity block
        const integritySpinner = ora('Computing file integrity hashes...').start();
        const integrityBlock = await buildIntegrityBlock(cwd);
        const fileCount = Object.keys(integrityBlock.files).length;

        // Read raw workflow.json and inject integrity
        const rawJson = await readFile(manifestPath, 'utf-8');
        const manifestData = JSON.parse(rawJson) as Record<string, unknown>;
        manifestData.integrity = integrityBlock;
        await writeFile(manifestPath, JSON.stringify(manifestData, null, 2) + '\n', 'utf-8');
        integritySpinner.succeed(`Computed integrity hashes for ${fileCount} files (root: ${integrityBlock.root.slice(0, 12)}...)`);

        // Print publish instructions
        console.log(chalk.bold('\nReady to publish!\n'));
        console.log('To submit your workflow to the Claude Flows registry:\n');
        console.log(chalk.dim('  1. Push your workflow to a public GitHub repository'));
        console.log(chalk.dim('  2. Fork https://github.com/claudeflows/registry'));
        console.log(chalk.dim('  3. Add your workflow to registry.json:'));
        console.log('');
        console.log(
          chalk.cyan(
            JSON.stringify(
              {
                name: manifest.name,
                displayName: manifest.displayName,
                description: manifest.description,
                repository: manifest.repository ?? 'https://github.com/your-username/your-repo',
                version: manifest.version,
                author: manifest.author.name,
                category: manifest.category ?? 'other',
                tags: manifest.tags ?? [],
              },
              null,
              4
            )
          )
        );
        console.log('');
        console.log(chalk.dim('  4. Open a pull request to the registry repository'));
        console.log('');
      } catch (err) {
        console.error(chalk.red(`Publish failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
