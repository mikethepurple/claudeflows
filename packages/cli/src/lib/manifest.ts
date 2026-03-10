import { readFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv, { type ErrorObject } from 'ajv';

export interface ManifestAuthor {
  name: string;
  github?: string;
  email?: string;
}

export interface ManifestSkill {
  name: string;
  path: string;
  description?: string;
}

export interface McpEnvVar {
  description?: string;
  url?: string;
  required?: boolean;
}

export interface McpServer {
  package: string;
  required?: boolean;
  env?: Record<string, McpEnvVar>;
  args?: string[];
}

export interface EnvVar {
  description?: string;
  required?: boolean;
  url?: string;
}

export interface Dependency {
  version?: string;
  required?: boolean;
}

export interface PostInstall {
  createDirs?: string[];
  message?: string;
}

export interface IntegrityBlock {
  algorithm: 'sha256';
  files: Record<string, string>;
  root: string;
  signature?: string;
}

export interface PricingConfig {
  model?: 'free' | 'paid' | 'freemium';
  tier?: string;
}

export interface WorkflowManifest {
  name: string;
  version: string;
  displayName: string;
  description: string;
  author: ManifestAuthor;
  repository?: string;
  license?: string;
  tags?: string[];
  category?: string;
  runtime?: Record<string, string>;
  mcp?: Record<string, McpServer>;
  env?: Record<string, EnvVar>;
  dependencies?: Record<string, Dependency>;
  skills: ManifestSkill[];
  files?: { include?: string[]; exclude?: string[] };
  postInstall?: PostInstall;
  integrity?: IntegrityBlock;
  pricing?: PricingConfig;
}

let cachedSchema: object | null = null;

async function loadSchema(): Promise<object> {
  if (cachedSchema) return cachedSchema;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // Try bundled schema first (dist/lib/ -> ../schema/), then monorepo fallback
  const bundledPath = resolve(__dirname, '..', 'schema', 'workflow.schema.json');
  const monorepoPath = resolve(__dirname, '..', '..', '..', 'schema', 'workflow.schema.json');

  let raw: string;
  try {
    raw = await readFile(bundledPath, 'utf-8');
  } catch {
    raw = await readFile(monorepoPath, 'utf-8');
  }
  cachedSchema = JSON.parse(raw) as object;
  return cachedSchema;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export async function validateManifest(data: unknown): Promise<ValidationResult> {
  const schema = await loadSchema();
  const ajv = new (Ajv as unknown as typeof Ajv.default)({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (valid) {
    return { valid: true, errors: [] };
  }

  const errors = (validate.errors ?? []).map((e: ErrorObject) => {
    const path = e.instancePath || '/';
    return `${path}: ${e.message}`;
  });

  return { valid: false, errors };
}

export async function parseManifest(dir: string): Promise<WorkflowManifest> {
  const manifestPath = join(dir, 'workflow.json');
  const raw = await readFile(manifestPath, 'utf-8');
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`Invalid JSON in ${manifestPath}`);
  }

  const result = await validateManifest(data);
  if (!result.valid) {
    throw new Error(
      `Invalid workflow.json:\n${result.errors.map((e) => `  - ${e}`).join('\n')}`
    );
  }

  return data as WorkflowManifest;
}
