import { Command } from 'commander';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import { input, select } from '@inquirer/prompts';
import type { WorkflowManifest } from '../lib/manifest.js';

const CATEGORIES = [
  'business',
  'development',
  'data',
  'research',
  'marketing',
  'design',
  'devops',
  'productivity',
  'finance',
  'other',
] as const;

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerInit(program: Command): void {
  program
    .command('init')
    .description('Scaffold a new workflow project')
    .action(async () => {
      try {
        const cwd = process.cwd();

        // Check if workflow.json already exists
        if (await fileExists(join(cwd, 'workflow.json'))) {
          console.error(chalk.red('workflow.json already exists in this directory.'));
          process.exit(1);
        }

        console.log(chalk.bold('Create a new Claude Flows workflow\n'));

        const name = await input({
          message: 'Workflow name (lowercase, hyphens only):',
          validate: (val) => {
            if (!/^[a-z0-9-]+$/.test(val)) {
              return 'Must be lowercase letters, numbers, and hyphens only';
            }
            if (val.length < 1 || val.length > 64) {
              return 'Must be between 1 and 64 characters';
            }
            return true;
          },
        });

        const displayName = await input({
          message: 'Display name:',
          validate: (val) => (val.length > 0 ? true : 'Required'),
        });

        const description = await input({
          message: 'Description:',
          validate: (val) => (val.length > 0 ? true : 'Required'),
        });

        const authorName = await input({
          message: 'Author name:',
          validate: (val) => (val.length > 0 ? true : 'Required'),
        });

        const authorGithub = await input({
          message: 'Author GitHub username (optional):',
        });

        const category = await select({
          message: 'Category:',
          choices: CATEGORIES.map((c) => ({ value: c, name: c })),
        });

        // Build the manifest
        const manifest: WorkflowManifest = {
          name,
          version: '0.1.0',
          displayName,
          description,
          author: {
            name: authorName,
            ...(authorGithub ? { github: authorGithub } : {}),
          },
          category,
          tags: [],
          skills: [
            {
              name: 'start',
              path: '.claude/skills/start/SKILL.md',
              description: 'Main entry point',
            },
          ],
          postInstall: {
            createDirs: [],
            message: `${displayName} installed successfully!`,
          },
        };

        // Create directory structure
        const skillDir = join(cwd, '.claude', 'skills', 'start');
        await mkdir(skillDir, { recursive: true });

        // Write workflow.json
        await writeFile(
          join(cwd, 'workflow.json'),
          JSON.stringify(manifest, null, 2) + '\n',
          'utf-8'
        );

        // Write CLAUDE.md template
        const claudeMd = `# ${displayName}

${description}

## Overview

This workflow provides the following skills:

- **start** — Main entry point

## Usage

After installing with \`claudeflows install\`, use the skill in Claude Code:

\`\`\`
/start
\`\`\`

## Configuration

No additional configuration required.
`;
        await writeFile(join(cwd, 'CLAUDE.md'), claudeMd, 'utf-8');

        // Write SKILL.md template
        const skillMd = `# ${displayName} — Start

## Description
${description}

## Instructions

[Add your skill instructions here. These are the instructions Claude will follow when this skill is invoked.]

## Steps

1. [Step 1]
2. [Step 2]
3. [Step 3]
`;
        await writeFile(join(skillDir, 'SKILL.md'), skillMd, 'utf-8');

        // Write .gitignore
        const gitignore = `# Dependencies
node_modules/

# Build
dist/

# OS
.DS_Store

# Environment
.env
.env.local
`;
        await writeFile(join(cwd, '.gitignore'), gitignore, 'utf-8');

        console.log(chalk.green('\nWorkflow scaffolded successfully!\n'));
        console.log('Created:');
        console.log(chalk.dim('  workflow.json'));
        console.log(chalk.dim('  CLAUDE.md'));
        console.log(chalk.dim('  .claude/skills/start/SKILL.md'));
        console.log(chalk.dim('  .gitignore'));
        console.log('');
        console.log(`Next steps:`);
        console.log(`  1. Edit ${chalk.bold('.claude/skills/start/SKILL.md')} with your skill instructions`);
        console.log(`  2. Update ${chalk.bold('CLAUDE.md')} with workflow documentation`);
        console.log(`  3. Test locally, then publish with ${chalk.bold('claudeflows publish')}`);
        console.log('');
      } catch (err) {
        console.error(chalk.red(`Init failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
