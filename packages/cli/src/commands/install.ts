import { Command } from 'commander';
import { mkdir, writeFile, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { execSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import { confirm } from '@inquirer/prompts';
import { ensureDirs, getInstalledDir } from '../lib/config.js';
import { parseManifest } from '../lib/manifest.js';
import { resolveWorkflow, getVersionIntegrity } from '../lib/registry.js';
import { downloadFromGithub } from '../lib/installer.js';
import { setupMcpServers } from '../lib/mcp-setup.js';
import { setupEnvVars } from '../lib/env-manager.js';
import { runDoctor } from '../lib/doctor.js';
import type { HealthCheck } from '../lib/doctor.js';
import { verifyIntegrity, verifySignature, computeFileHashes, computeRootHash } from '../lib/integrity.js';
import { loadLicense, validateLicense } from '../lib/license.js';

function isGithubUrl(source: string): boolean {
  return (
    source.startsWith('https://github.com/') ||
    source.startsWith('http://github.com/') ||
    source.startsWith('github.com/') ||
    source.startsWith('git@github.com:')
  );
}

function extractNameFromUrl(url: string): string {
  // Extract repo name from GitHub URL
  const cleaned = url.replace(/\.git$/, '').replace(/\/$/, '');
  const parts = cleaned.split('/');
  return parts[parts.length - 1] ?? 'unknown';
}

function formatHealthCheck(check: HealthCheck): string {
  const icon =
    check.status === 'ok'
      ? chalk.green('\u2713')
      : check.status === 'warn'
        ? chalk.yellow('\u26A0')
        : chalk.red('\u2717');
  const color =
    check.status === 'ok'
      ? chalk.green
      : check.status === 'warn'
        ? chalk.yellow
        : chalk.red;
  return `  ${icon} ${color(check.message)}`;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerInstall(program: Command): void {
  program
    .command('install <source>')
    .description('Install a workflow from the registry or a GitHub URL')
    .option('-f, --force', 'Overwrite existing installation', false)
    .option('-y, --yes', 'Skip interactive prompts (auto-skip MCP/env setup)', false)
    .action(async (source: string, options: { force: boolean; yes: boolean }) => {
      try {
        // Step 0: Pre-install prerequisite checks
        const claudeDir = join(homedir(), '.claude');
        try {
          await stat(claudeDir);
        } catch {
          console.error(chalk.red('Claude Code is not set up.'));
          console.error(chalk.dim(`Expected directory: ${claudeDir}`));
          console.error('');
          console.error('Please install and run Claude Code first:');
          console.error(chalk.cyan('  npm install -g @anthropic-ai/claude-code'));
          console.error(chalk.cyan('  claude'));
          process.exit(1);
        }

        try {
          execSync('claude --version', { stdio: 'pipe', encoding: 'utf-8' });
        } catch {
          console.error(chalk.red('Claude Code CLI is not accessible.'));
          console.error('');
          console.error('Ensure `claude` is in your PATH:');
          console.error(chalk.cyan('  npm install -g @anthropic-ai/claude-code'));
          process.exit(1);
        }

        await ensureDirs();

        // Step 1: Resolve source
        let repoUrl: string;
        let workflowName: string;

        const spinner = ora('Resolving workflow source...').start();

        if (isGithubUrl(source)) {
          repoUrl = source.startsWith('http') || source.startsWith('git@')
            ? source
            : `https://${source}`;
          workflowName = extractNameFromUrl(source);
          spinner.succeed(`Resolved GitHub URL: ${chalk.cyan(repoUrl)}`);
        } else {
          // Look up in registry
          const entry = await resolveWorkflow(source);
          if (!entry) {
            spinner.fail(`Workflow "${source}" not found in registry`);
            process.exit(1);
          }
          repoUrl = entry.repository;
          workflowName = entry.name;
          spinner.succeed(`Found "${chalk.bold(entry.displayName)}" v${entry.version} in registry`);
        }

        // Check if already installed
        const installDir = join(getInstalledDir(), workflowName);
        if (await fileExists(installDir)) {
          if (!options.force) {
            const overwrite = await confirm({
              message: `Workflow "${workflowName}" is already installed. Overwrite?`,
              default: false,
            });
            if (!overwrite) {
              console.log(chalk.yellow('Installation cancelled.'));
              return;
            }
          }
          await rm(installDir, { recursive: true, force: true });
        }

        // Step 2: Download
        const downloadSpinner = ora('Downloading workflow...').start();
        await mkdir(installDir, { recursive: true });
        await downloadFromGithub(repoUrl, installDir);
        downloadSpinner.succeed('Downloaded workflow');

        // Step 3: Validate
        const validateSpinner = ora('Validating workflow.json...').start();
        let manifest;
        try {
          manifest = await parseManifest(installDir);
          validateSpinner.succeed(
            `Validated: ${chalk.bold(manifest.displayName)} v${manifest.version}`
          );
        } catch (err) {
          validateSpinner.fail('Validation failed');
          console.error(chalk.red((err as Error).message));
          await rm(installDir, { recursive: true, force: true });
          process.exit(1);
        }

        // Step 3b: Verify integrity (if integrity block exists)
        if (manifest.integrity) {
          const integritySpinner = ora('Verifying file integrity...').start();
          const integrityResult = await verifyIntegrity(installDir, manifest.integrity);

          if (integrityResult.valid) {
            integritySpinner.succeed('File integrity verified');
          } else {
            integritySpinner.warn('Integrity check found differences');
            if (integrityResult.mismatches.length > 0) {
              console.log(chalk.yellow('  Modified files:'));
              for (const f of integrityResult.mismatches) {
                console.log(chalk.yellow(`    - ${f}`));
              }
            }
            if (integrityResult.missing.length > 0) {
              console.log(chalk.yellow('  Missing files:'));
              for (const f of integrityResult.missing) {
                console.log(chalk.yellow(`    - ${f}`));
              }
            }

            const continueInstall = await confirm({
              message: 'Continue installation despite integrity differences?',
              default: false,
            });
            if (!continueInstall) {
              await rm(installDir, { recursive: true, force: true });
              console.log(chalk.yellow('Installation cancelled.'));
              return;
            }
          }
        }

        // Step 3c: Verify registry signature
        if (!isGithubUrl(source)) {
          const registryIntegrity = await getVersionIntegrity(workflowName, manifest.version);
          if (registryIntegrity && manifest.integrity) {
            const sigValid = verifySignature(manifest.integrity.root, registryIntegrity.signature);
            if (sigValid) {
              console.log(chalk.green('  Signature: verified'));
            } else {
              console.log(chalk.red('  WARNING: Registry signature mismatch — this workflow may have been tampered with'));
              const continueInstall = await confirm({
                message: 'Continue installation despite signature mismatch?',
                default: false,
              });
              if (!continueInstall) {
                await rm(installDir, { recursive: true, force: true });
                console.log(chalk.yellow('Installation cancelled.'));
                return;
              }
            }
          }
        }

        // Step 3d: License validation for paid workflows
        if (manifest.pricing?.model === 'paid') {
          const licenseToken = await loadLicense(workflowName);
          if (!licenseToken) {
            console.error(chalk.red(`\nThis workflow requires a license.`));
            console.error(chalk.dim('To purchase and activate:'));
            console.error(chalk.cyan('  1. Log in: claudeflows login'));
            console.error(chalk.cyan('  2. Purchase at https://claudeflows.dev/workflows/' + workflowName));
            console.error(chalk.cyan('  3. Retry: claudeflows install ' + source));
            await rm(installDir, { recursive: true, force: true });
            process.exit(1);
          }

          const licenseResult = validateLicense(licenseToken, workflowName, manifest.version);
          if (!licenseResult.valid) {
            console.error(chalk.red(`\nLicense validation failed: ${licenseResult.error}`));
            if (licenseResult.error?.includes('expired')) {
              console.error(chalk.dim('Refresh your license: claudeflows license refresh ' + workflowName));
            }
            await rm(installDir, { recursive: true, force: true });
            process.exit(1);
          }

          console.log(chalk.green(`  License: valid (${licenseResult.claims?.tier ?? 'standard'})`));
          if (licenseResult.claims?.exp) {
            const expDate = new Date(licenseResult.claims.exp * 1000).toLocaleDateString();
            console.log(chalk.dim(`  Expires: ${expDate}`));
          }
        } else if (manifest.pricing?.model === 'freemium') {
          const licenseToken = await loadLicense(workflowName);
          if (licenseToken) {
            const licenseResult = validateLicense(licenseToken, workflowName, manifest.version);
            if (licenseResult.valid) {
              console.log(chalk.green(`  License: ${licenseResult.claims?.tier ?? 'free'} tier`));
            }
          }
        }

        // Update workflowName to match manifest
        if (manifest.name !== workflowName) {
          const correctDir = join(getInstalledDir(), manifest.name);
          if (correctDir !== installDir) {
            const { rename } = await import('node:fs/promises');
            await rename(installDir, correctDir);
            workflowName = manifest.name;
          }
        }
        const finalInstallDir = join(getInstalledDir(), workflowName);

        // Step 4: Dependencies
        if (manifest.dependencies && Object.keys(manifest.dependencies).length > 0) {
          console.log(chalk.bold('\nDependencies:'));
          for (const [depName, depConfig] of Object.entries(manifest.dependencies)) {
            const depDir = join(getInstalledDir(), depName);
            const isInstalled = await fileExists(join(depDir, 'workflow.json'));
            const isRequired = depConfig.required !== false;

            if (isInstalled) {
              console.log(chalk.green(`  \u2713 ${depName} is installed`));
            } else if (isRequired) {
              console.log(chalk.red(`  \u2717 ${depName} is required but not installed`));
              const shouldInstall = await confirm({
                message: `Install required dependency "${depName}"?`,
                default: true,
              });
              if (shouldInstall) {
                console.log(
                  chalk.yellow(`  Run: ${chalk.bold(`claudeflows install ${depName}`)}`)
                );
              }
            } else {
              const shouldInstall = await confirm({
                message: `Install optional dependency "${depName}"?`,
                default: false,
              });
              if (shouldInstall) {
                console.log(
                  chalk.yellow(`  Run: ${chalk.bold(`claudeflows install ${depName}`)}`)
                );
              }
            }
          }
        }

        // Write .deps.json
        if (manifest.dependencies) {
          const depsMap: Record<string, string> = {};
          for (const depName of Object.keys(manifest.dependencies)) {
            depsMap[depName] = join(getInstalledDir(), depName);
          }
          await writeFile(
            join(finalInstallDir, '.deps.json'),
            JSON.stringify(depsMap, null, 2) + '\n',
            'utf-8'
          );
        }

        // Step 5: MCP setup
        if (manifest.mcp && Object.keys(manifest.mcp).length > 0) {
          if (options.yes) {
            console.log(chalk.bold('\nMCP Servers (skipped — use claudeflows doctor to check):'));
            for (const name of Object.keys(manifest.mcp)) {
              console.log(chalk.dim(`  - ${name}`));
            }
          } else {
            try {
              console.log(chalk.bold('\nMCP Server Setup:'));
              const { configured, skipped } = await setupMcpServers(manifest.mcp);
              for (const name of configured) {
                console.log(chalk.green(`  \u2713 ${name} configured`));
              }
              for (const name of skipped) {
                console.log(chalk.yellow(`  \u26A0 ${name} skipped`));
              }
            } catch {
              console.log(chalk.yellow('  \u26A0 MCP setup skipped (non-interactive)'));
            }
          }
        }

        // Step 5b: Standalone env vars
        if (manifest.env && Object.keys(manifest.env).length > 0) {
          if (options.yes) {
            console.log(chalk.bold('\nEnvironment Variables (skipped):'));
            for (const name of Object.keys(manifest.env)) {
              console.log(chalk.dim(`  - ${name}`));
            }
          } else {
            console.log(chalk.bold('\nEnvironment Variables:'));
            const { set, missing, suggestions } = await setupEnvVars(manifest.env);
            for (const name of set) {
              console.log(chalk.green(`  \u2713 ${name} set`));
            }
            for (const name of missing) {
              console.log(chalk.yellow(`  \u26A0 ${name} not set`));
            }
            if (suggestions.length > 0) {
              console.log('');
              for (const s of suggestions) {
                console.log(s);
              }
            }
          }
        }

        // Step 6: Create dirs
        if (manifest.postInstall?.createDirs) {
          const dirsSpinner = ora('Creating directories...').start();
          for (const dir of manifest.postInstall.createDirs) {
            const dirPath = join(finalInstallDir, dir);
            await mkdir(dirPath, { recursive: true });
          }
          dirsSpinner.succeed(`Created ${manifest.postInstall.createDirs.length} directories`);
        }

        // Step 7: Show available skills
        if (manifest.skills.length > 0) {
          console.log(chalk.bold('\nAvailable skills:'));
          for (const skill of manifest.skills) {
            console.log(chalk.green(`  \u2713 /${skill.name}`) + chalk.dim(skill.description ? ` — ${skill.description}` : ''));
          }
        }

        // Step 9: Run doctor
        console.log(chalk.bold('\nHealth check:'));
        const healthResults = await runDoctor(manifest, finalInstallDir);
        for (const check of healthResults) {
          console.log(formatHealthCheck(check));
        }

        const errors = healthResults.filter((c) => c.status === 'error');
        const warnings = healthResults.filter((c) => c.status === 'warn');

        if (errors.length > 0) {
          console.log(
            chalk.red(`\n${errors.length} error(s) found. Run ${chalk.bold(`claudeflows doctor ${workflowName}`)} for details.`)
          );
        } else if (warnings.length > 0) {
          console.log(
            chalk.yellow(`\n${warnings.length} warning(s). Run ${chalk.bold(`claudeflows doctor ${workflowName}`)} for details.`)
          );
        } else {
          console.log(chalk.green('\nAll checks passed!'));
        }

        // Step 10: Post-install message
        console.log(
          chalk.green(
            `\n\u2713 Successfully installed ${chalk.bold(manifest.displayName)} v${manifest.version}`
          )
        );

        console.log(chalk.dim(`\nTo activate in a project: ${chalk.bold(`cd your-project && claudeflows use ${workflowName}`)}`));

        if (manifest.postInstall?.message) {
          console.log(chalk.cyan(`\n${manifest.postInstall.message}`));
        }
      } catch (err) {
        console.error(chalk.red(`Install failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
