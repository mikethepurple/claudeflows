import { Command } from 'commander';
import { readdir, readFile, stat, rm, mkdir, cp } from 'node:fs/promises';
import { join } from 'node:path';
import chalk from 'chalk';
import ora from 'ora';
import semver from 'semver';
import { confirm } from '@inquirer/prompts';
import { getInstalledDir, ensureDirs } from '../lib/config.js';
import { resolveWorkflow } from '../lib/registry.js';
import { downloadFromGithub } from '../lib/installer.js';
import { parseManifest } from '../lib/manifest.js';
import { linkSkills, unlinkSkills } from '../lib/skill-linker.js';
import { runDoctor } from '../lib/doctor.js';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function updateSingleWorkflow(name: string): Promise<boolean> {
  const installedDir = getInstalledDir();
  const installDir = join(installedDir, name);

  if (!(await fileExists(join(installDir, 'workflow.json')))) {
    console.error(chalk.red(`Workflow "${name}" is not installed.`));
    return false;
  }

  // Read current manifest
  const currentRaw = await readFile(join(installDir, 'workflow.json'), 'utf-8');
  const currentManifest = JSON.parse(currentRaw) as { version: string; name: string; displayName: string };

  // Check registry for latest version
  const spinner = ora(`Checking for updates to ${name}...`).start();
  const registryEntry = await resolveWorkflow(name);

  if (!registryEntry) {
    spinner.warn(`${name} not found in registry (may be a local/URL install)`);
    return false;
  }

  const currentVersion = currentManifest.version;
  const latestVersion = registryEntry.version;

  if (semver.gte(currentVersion, latestVersion)) {
    spinner.succeed(`${chalk.bold(name)} is already up to date (v${currentVersion})`);
    return true;
  }

  spinner.info(
    `Update available: ${chalk.bold(name)} v${currentVersion} -> v${latestVersion}`
  );

  const shouldUpdate = await confirm({
    message: `Update ${name} from v${currentVersion} to v${latestVersion}?`,
    default: true,
  });

  if (!shouldUpdate) {
    console.log(chalk.yellow('Update skipped.'));
    return true;
  }

  // Identify user data directories to preserve
  let dirsToPreserve: string[] = [];
  try {
    const manifest = await parseManifest(installDir);
    dirsToPreserve = manifest.postInstall?.createDirs ?? [];
  } catch {
    // Can't parse manifest — proceed without preservation
  }

  // Download to temp
  const downloadSpinner = ora('Downloading update...').start();
  const tempDir = await mkdtemp(join(tmpdir(), 'cw-update-'));

  try {
    const tempInstallDir = join(tempDir, name);
    await mkdir(tempInstallDir, { recursive: true });
    await downloadFromGithub(registryEntry.repository, tempInstallDir);

    // Validate new version
    const newManifest = await parseManifest(tempInstallDir);
    downloadSpinner.succeed(`Downloaded v${newManifest.version}`);

    // Preserve user data directories
    for (const dir of dirsToPreserve) {
      const srcDir = join(installDir, dir);
      const destDir = join(tempInstallDir, dir);
      if (await fileExists(srcDir)) {
        await mkdir(join(destDir, '..'), { recursive: true });
        await cp(srcDir, destDir, { recursive: true });
      }
    }

    // Remove old skill links
    const unlinkSpinner = ora('Updating skill links...').start();
    await unlinkSkills(name, installDir);

    // Replace installation
    await rm(installDir, { recursive: true, force: true });
    await cp(tempInstallDir, installDir, { recursive: true });

    // Re-link skills
    await linkSkills(name, newManifest.skills, installDir);
    unlinkSpinner.succeed('Skills re-linked');

    // Recreate any postInstall dirs that weren't preserved
    if (newManifest.postInstall?.createDirs) {
      for (const dir of newManifest.postInstall.createDirs) {
        await mkdir(join(installDir, dir), { recursive: true });
      }
    }

    // Run doctor
    console.log(chalk.bold('\nHealth check:'));
    const checks = await runDoctor(newManifest, installDir);
    for (const check of checks) {
      const icon =
        check.status === 'ok'
          ? chalk.green('\u2713')
          : check.status === 'warn'
            ? chalk.yellow('\u26A0')
            : chalk.red('\u2717');
      console.log(`  ${icon} ${check.message}`);
    }

    console.log(
      chalk.green(
        `\n\u2713 Successfully updated ${chalk.bold(name)} to v${newManifest.version}`
      )
    );

    if (newManifest.postInstall?.message) {
      console.log(chalk.cyan(`\n${newManifest.postInstall.message}`));
    }

    return true;
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

export function registerUpdate(program: Command): void {
  program
    .command('update [name]')
    .description('Update installed workflows to their latest versions')
    .action(async (name?: string) => {
      try {
        await ensureDirs();

        if (name) {
          await updateSingleWorkflow(name);
        } else {
          // Update all installed workflows
          const installedDir = getInstalledDir();
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

          console.log(chalk.bold('Checking all workflows for updates...\n'));

          for (const entry of entries) {
            const dir = join(installedDir, entry);
            try {
              const s = await stat(dir);
              if (!s.isDirectory()) continue;
              await stat(join(dir, 'workflow.json'));
            } catch {
              continue;
            }

            await updateSingleWorkflow(entry);
            console.log('');
          }
        }
      } catch (err) {
        console.error(chalk.red(`Update failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
