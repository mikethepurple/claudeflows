import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { input, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import type { EnvVar } from './manifest.js';

export function checkEnvVar(name: string): string | undefined {
  return process.env[name];
}

export async function promptEnvVar(
  name: string,
  config: EnvVar
): Promise<string | null> {
  const existing = checkEnvVar(name);
  if (existing) {
    return existing;
  }

  let message = `Environment variable ${chalk.bold(name)} is not set.`;
  if (config.description) {
    message += `\n  ${config.description}`;
  }
  if (config.url) {
    message += `\n  Get it at: ${chalk.cyan(config.url)}`;
  }

  const shouldSet = await confirm({
    message: `${message}\n  Would you like to set it now?`,
    default: config.required !== false,
  });

  if (!shouldSet) {
    return null;
  }

  const value = await input({
    message: `Enter value for ${name}:`,
  });

  return value || null;
}

export function suggestShellExport(name: string, value: string): string {
  const shellRc = detectShellRc();
  return `To persist this variable, add the following to ${chalk.bold(shellRc)}:\n\n  ${chalk.green(`export ${name}="${value}"`)}\n`;
}

function detectShellRc(): string {
  const shell = process.env.SHELL ?? '';
  if (shell.includes('zsh')) {
    return '~/.zshrc';
  }
  if (shell.includes('bash')) {
    return '~/.bashrc';
  }
  return '~/.profile';
}

export async function setupEnvVars(
  envConfig: Record<string, EnvVar>
): Promise<{ set: string[]; missing: string[]; suggestions: string[] }> {
  const set: string[] = [];
  const missing: string[] = [];
  const suggestions: string[] = [];

  for (const [name, config] of Object.entries(envConfig)) {
    const value = await promptEnvVar(name, config);
    if (value) {
      set.push(name);
      suggestions.push(suggestShellExport(name, value));
    } else {
      missing.push(name);
    }
  }

  return { set, missing, suggestions };
}
