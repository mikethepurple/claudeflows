import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';

export interface CwConfig {
  registryUrl: string;
  cacheTtlMinutes: number;
}

const DEFAULT_CONFIG: CwConfig = {
  registryUrl: 'https://raw.githubusercontent.com/mikethepurple/claudeflows/main/registry/registry.json',
  cacheTtlMinutes: 60,
};

export function getWorkflowsDir(): string {
  return join(homedir(), '.claude-workflows');
}

export function getInstalledDir(): string {
  return join(getWorkflowsDir(), 'installed');
}

function getConfigPath(): string {
  return join(getWorkflowsDir(), 'config.json');
}

export async function getConfig(): Promise<CwConfig> {
  try {
    const raw = await readFile(getConfigPath(), 'utf-8');
    const parsed = JSON.parse(raw) as Partial<CwConfig>;
    return { ...DEFAULT_CONFIG, ...parsed };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export async function setConfig(updates: Partial<CwConfig>): Promise<void> {
  const current = await getConfig();
  const merged = { ...current, ...updates };
  const dir = getWorkflowsDir();
  await mkdir(dir, { recursive: true });
  await writeFile(getConfigPath(), JSON.stringify(merged, null, 2) + '\n', 'utf-8');
}

export async function ensureDirs(): Promise<void> {
  await mkdir(getInstalledDir(), { recursive: true });
}
