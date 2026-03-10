import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { getConfig, getWorkflowsDir } from './config.js';

export interface RegistryVersionIntegrity {
  root: string;
  signature: string;
}

export interface RegistryVersionEntry {
  tag: string;
  published: string;
  integrity?: RegistryVersionIntegrity;
}

export interface RegistryEntry {
  name: string;
  displayName: string;
  description: string;
  repository: string;
  version: string;
  author: string;
  category: string;
  tags: string[];
  versions?: Record<string, RegistryVersionEntry>;
}

interface RegistryCache {
  fetchedAt: number;
  entries: RegistryEntry[];
}

function getCachePath(): string {
  return join(getWorkflowsDir(), 'registry-cache.json');
}

interface RawRegistryWorkflow {
  repository: string;
  latest: string;
  versions: Record<string, RegistryVersionEntry>;
  displayName: string;
  description: string;
  category: string;
  tags?: string[];
  author: { name: string; github?: string };
}

interface RawRegistry {
  version: number;
  updated: string;
  workflows: Record<string, RawRegistryWorkflow>;
}

async function fetchRegistry(): Promise<RegistryEntry[]> {
  const config = await getConfig();
  const response = await fetch(config.registryUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch registry: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as RawRegistry;
  if (!data.workflows) return [];

  return Object.entries(data.workflows).map(([name, wf]) => ({
    name,
    displayName: wf.displayName,
    description: wf.description,
    repository: `https://github.com/${wf.repository}`,
    version: wf.latest,
    author: wf.author.name,
    category: wf.category,
    tags: wf.tags ?? [],
    versions: wf.versions,
  }));
}

async function getCachedOrFetch(): Promise<RegistryEntry[]> {
  const config = await getConfig();
  const cachePath = getCachePath();

  try {
    const raw = await readFile(cachePath, 'utf-8');
    const cache = JSON.parse(raw) as RegistryCache;
    const ageMs = Date.now() - cache.fetchedAt;
    const ttlMs = config.cacheTtlMinutes * 60 * 1000;
    if (ageMs < ttlMs) {
      return cache.entries;
    }
  } catch {
    // Cache miss or corrupt — fetch fresh
  }

  const entries = await fetchRegistry();

  const cacheDir = getWorkflowsDir();
  await mkdir(cacheDir, { recursive: true });
  const cache: RegistryCache = { fetchedAt: Date.now(), entries };
  await writeFile(cachePath, JSON.stringify(cache, null, 2) + '\n', 'utf-8');

  return entries;
}

export async function searchWorkflows(query: string): Promise<RegistryEntry[]> {
  const entries = await getCachedOrFetch();
  const lower = query.toLowerCase();
  return entries.filter(
    (e) =>
      e.name.toLowerCase().includes(lower) ||
      e.displayName.toLowerCase().includes(lower) ||
      e.description.toLowerCase().includes(lower) ||
      e.tags.some((t) => t.toLowerCase().includes(lower))
  );
}

export async function resolveWorkflow(name: string): Promise<RegistryEntry | null> {
  const entries = await getCachedOrFetch();
  return entries.find((e) => e.name === name) ?? null;
}

export async function getLatestVersion(name: string): Promise<string | null> {
  const entry = await resolveWorkflow(name);
  return entry?.version ?? null;
}

/**
 * Get the integrity data (root hash + signature) for a specific workflow version.
 */
export async function getVersionIntegrity(
  name: string,
  version?: string
): Promise<RegistryVersionIntegrity | null> {
  const entry = await resolveWorkflow(name);
  if (!entry?.versions) return null;

  const ver = version ?? entry.version;
  const versionEntry = entry.versions[ver];
  return versionEntry?.integrity ?? null;
}
