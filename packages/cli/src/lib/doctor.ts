import { execSync } from 'node:child_process';
import { readFile, stat, readlink } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import semver from 'semver';
import type { WorkflowManifest } from './manifest.js';
import { getInstalledDir } from './config.js';
import { verifyIntegrity } from './integrity.js';

export interface HealthCheck {
  name: string;
  status: 'ok' | 'warn' | 'error';
  message: string;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function getVersion(command: string): string | null {
  try {
    const output = execSync(command, { stdio: 'pipe', encoding: 'utf-8' }).trim();
    // Extract version number from output like "v20.11.0" or "Python 3.12.0"
    const match = output.match(/(\d+\.\d+\.\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function checkRuntime(manifest: WorkflowManifest): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];

  if (!manifest.runtime) {
    return checks;
  }

  for (const [name, requiredRange] of Object.entries(manifest.runtime)) {
    let versionCmd: string;
    switch (name) {
      case 'node':
        versionCmd = 'node --version';
        break;
      case 'python':
        versionCmd = 'python3 --version';
        break;
      case 'claude_code':
        versionCmd = 'claude --version';
        break;
      default:
        versionCmd = `${name} --version`;
    }

    const installed = getVersion(versionCmd);

    if (!installed) {
      checks.push({
        name: `Runtime: ${name}`,
        status: 'error',
        message: `${name} is not installed (requires ${requiredRange})`,
      });
      continue;
    }

    if (semver.satisfies(installed, requiredRange)) {
      checks.push({
        name: `Runtime: ${name}`,
        status: 'ok',
        message: `${name} ${installed} satisfies ${requiredRange}`,
      });
    } else {
      checks.push({
        name: `Runtime: ${name}`,
        status: 'error',
        message: `${name} ${installed} does not satisfy ${requiredRange}`,
      });
    }
  }

  return checks;
}

export async function checkMcp(manifest: WorkflowManifest): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];

  if (!manifest.mcp) {
    return checks;
  }

  let mcpJson: { mcpServers: Record<string, unknown> } = { mcpServers: {} };
  try {
    const mcpPath = join(homedir(), '.claude', '.mcp.json');
    const raw = await readFile(mcpPath, 'utf-8');
    mcpJson = JSON.parse(raw);
  } catch {
    // No MCP config found
  }

  for (const [name, config] of Object.entries(manifest.mcp)) {
    const isConfigured = name in (mcpJson.mcpServers ?? {});
    const isRequired = config.required !== false;

    if (isConfigured) {
      checks.push({
        name: `MCP: ${name}`,
        status: 'ok',
        message: `${name} is configured`,
      });

      // Check env vars for this MCP server
      if (config.env) {
        for (const [envName, envConfig] of Object.entries(config.env)) {
          const isSet = !!process.env[envName];
          const envRequired = envConfig.required !== false;

          if (isSet) {
            checks.push({
              name: `MCP env: ${envName}`,
              status: 'ok',
              message: `${envName} is set`,
            });
          } else if (envRequired) {
            checks.push({
              name: `MCP env: ${envName}`,
              status: 'error',
              message: `${envName} is not set (required by ${name})`,
            });
          } else {
            checks.push({
              name: `MCP env: ${envName}`,
              status: 'warn',
              message: `${envName} is not set (optional for ${name})`,
            });
          }
        }
      }
    } else if (isRequired) {
      checks.push({
        name: `MCP: ${name}`,
        status: 'error',
        message: `${name} is not configured (required)`,
      });
    } else {
      checks.push({
        name: `MCP: ${name}`,
        status: 'warn',
        message: `${name} is not configured (optional)`,
      });
    }
  }

  return checks;
}

export async function checkEnv(manifest: WorkflowManifest): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];

  if (!manifest.env) {
    return checks;
  }

  for (const [name, config] of Object.entries(manifest.env)) {
    const isSet = !!process.env[name];
    const isRequired = config.required !== false;

    if (isSet) {
      checks.push({
        name: `Env: ${name}`,
        status: 'ok',
        message: `${name} is set`,
      });
    } else if (isRequired) {
      checks.push({
        name: `Env: ${name}`,
        status: 'error',
        message: `${name} is not set${config.description ? ` (${config.description})` : ''}`,
      });
    } else {
      checks.push({
        name: `Env: ${name}`,
        status: 'warn',
        message: `${name} is not set (optional)${config.description ? ` — ${config.description}` : ''}`,
      });
    }
  }

  return checks;
}

export async function checkDeps(manifest: WorkflowManifest): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];

  if (!manifest.dependencies) {
    return checks;
  }

  const installedDir = getInstalledDir();

  for (const [depName, depConfig] of Object.entries(manifest.dependencies)) {
    const depDir = join(installedDir, depName);
    const depExists = await fileExists(join(depDir, 'workflow.json'));
    const isRequired = depConfig.required !== false;

    if (depExists) {
      if (depConfig.version) {
        try {
          const raw = await readFile(join(depDir, 'workflow.json'), 'utf-8');
          const depManifest = JSON.parse(raw) as { version?: string };
          if (depManifest.version && semver.satisfies(depManifest.version, depConfig.version)) {
            checks.push({
              name: `Dep: ${depName}`,
              status: 'ok',
              message: `${depName} ${depManifest.version} satisfies ${depConfig.version}`,
            });
          } else {
            checks.push({
              name: `Dep: ${depName}`,
              status: 'warn',
              message: `${depName} ${depManifest.version ?? 'unknown'} may not satisfy ${depConfig.version}`,
            });
          }
        } catch {
          checks.push({
            name: `Dep: ${depName}`,
            status: 'warn',
            message: `${depName} is installed but version could not be verified`,
          });
        }
      } else {
        checks.push({
          name: `Dep: ${depName}`,
          status: 'ok',
          message: `${depName} is installed`,
        });
      }
    } else if (isRequired) {
      checks.push({
        name: `Dep: ${depName}`,
        status: 'error',
        message: `${depName} is not installed (required)`,
      });
    } else {
      checks.push({
        name: `Dep: ${depName}`,
        status: 'warn',
        message: `${depName} is not installed (optional)`,
      });
    }
  }

  return checks;
}

export async function checkSkills(
  manifest: WorkflowManifest,
  installDir: string
): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];
  const skillsDir = join(homedir(), '.claude', 'skills');

  for (const skill of manifest.skills) {
    const linkedName = `${manifest.name}-${skill.name}`;
    const linkPath = join(skillsDir, linkedName);
    const targetPath = resolve(installDir, skill.path);

    // Check that the source file exists
    if (!(await fileExists(targetPath))) {
      checks.push({
        name: `Skill: ${skill.name}`,
        status: 'error',
        message: `Source file not found: ${skill.path}`,
      });
      continue;
    }

    // Check that the symlink exists and points to the right place
    try {
      const actualTarget = await readlink(linkPath);
      if (resolve(actualTarget) === resolve(targetPath)) {
        checks.push({
          name: `Skill: ${skill.name}`,
          status: 'ok',
          message: `${linkedName} linked correctly`,
        });
      } else {
        checks.push({
          name: `Skill: ${skill.name}`,
          status: 'warn',
          message: `${linkedName} exists but points to ${actualTarget} instead of ${targetPath}`,
        });
      }
    } catch {
      checks.push({
        name: `Skill: ${skill.name}`,
        status: 'error',
        message: `${linkedName} is not linked in ${skillsDir}`,
      });
    }
  }

  return checks;
}

export async function checkIntegrity(
  manifest: WorkflowManifest,
  installDir: string
): Promise<HealthCheck[]> {
  const checks: HealthCheck[] = [];

  if (!manifest.integrity) {
    checks.push({
      name: 'Integrity',
      status: 'warn',
      message: 'No integrity block in workflow.json — file verification not available',
    });
    return checks;
  }

  try {
    const result = await verifyIntegrity(installDir, manifest.integrity);

    if (result.valid) {
      checks.push({
        name: 'Integrity',
        status: 'ok',
        message: `All ${Object.keys(manifest.integrity.files).length} file hashes verified`,
      });
    } else {
      if (result.mismatches.length > 0) {
        checks.push({
          name: 'Integrity',
          status: 'error',
          message: `${result.mismatches.length} file(s) modified: ${result.mismatches.join(', ')}`,
        });
      }
      if (result.missing.length > 0) {
        checks.push({
          name: 'Integrity',
          status: 'error',
          message: `${result.missing.length} file(s) missing: ${result.missing.join(', ')}`,
        });
      }
      if (result.extra.length > 0) {
        checks.push({
          name: 'Integrity',
          status: 'warn',
          message: `${result.extra.length} extra file(s) not in manifest: ${result.extra.join(', ')}`,
        });
      }
    }
  } catch (err) {
    checks.push({
      name: 'Integrity',
      status: 'error',
      message: `Integrity check failed: ${(err as Error).message}`,
    });
  }

  return checks;
}

export async function runDoctor(
  manifest: WorkflowManifest,
  installDir: string
): Promise<HealthCheck[]> {
  const results: HealthCheck[] = [];

  results.push(...(await checkRuntime(manifest)));
  results.push(...(await checkMcp(manifest)));
  results.push(...(await checkEnv(manifest)));
  results.push(...(await checkDeps(manifest)));
  results.push(...(await checkSkills(manifest, installDir)));
  results.push(...(await checkIntegrity(manifest, installDir)));

  return results;
}
