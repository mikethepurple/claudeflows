import { createHash, verify as cryptoVerify } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, posix } from 'node:path';

/**
 * Registry Ed25519 public key for verifying workflow signatures.
 * The corresponding private key is stored as a GitHub Actions secret (CW_SIGNING_KEY).
 * This key can also be fetched from: https://claudeflows.dev/.well-known/signing-key.pub
 */
export const REGISTRY_PUBLIC_KEY =
  '-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAcynktEtcJ38faZLHJkb4cpEIRyIMcDogyzCsL9YJn3w=\n-----END PUBLIC KEY-----';

/** Patterns to exclude from integrity hashing */
const EXCLUDE_PATTERNS = [
  '.git',
  'node_modules',
  '.deps.json',
  '.skill-links.json',
];

export interface IntegrityBlock {
  algorithm: 'sha256';
  files: Record<string, string>;
  root: string;
  signature?: string;
}

export interface IntegrityResult {
  valid: boolean;
  mismatches: string[];
  missing: string[];
  extra: string[];
}

/**
 * Recursively collect all file paths in a directory, excluding specified patterns.
 */
async function collectFiles(
  dir: string,
  baseDir: string,
  excludePatterns: string[]
): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = relative(baseDir, fullPath);

    // Check if any exclude pattern matches
    const shouldExclude = excludePatterns.some(
      (pattern) =>
        entry.name === pattern ||
        relativePath === pattern ||
        relativePath.startsWith(pattern + '/')
    );

    if (shouldExclude) continue;

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath, baseDir, excludePatterns)));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }

  return files;
}

/**
 * Compute SHA-256 hashes for all files in a directory.
 * Returns a map of relative POSIX paths to hex-encoded SHA-256 hashes.
 */
export async function computeFileHashes(
  dir: string,
  excludePatterns: string[] = EXCLUDE_PATTERNS
): Promise<Record<string, string>> {
  const files = await collectFiles(dir, dir, excludePatterns);
  const hashes: Record<string, string> = {};

  for (const filePath of files) {
    const fullPath = join(dir, filePath);
    const content = await readFile(fullPath);
    const hash = createHash('sha256').update(content).digest('hex');
    // Normalize to POSIX paths for cross-platform consistency
    const posixPath = filePath.split('/').join(posix.sep);
    hashes[posixPath] = hash;
  }

  return hashes;
}

/**
 * Compute a root hash from a file hash map.
 * Sorts keys alphabetically, concatenates "path:hash" pairs, then SHA-256s the result.
 */
export function computeRootHash(files: Record<string, string>): string {
  const sorted = Object.keys(files).sort();
  const concatenated = sorted.map((key) => `${key}:${files[key]}`).join('\n');
  return createHash('sha256').update(concatenated).digest('hex');
}

/**
 * Verify file integrity by recomputing hashes and comparing against expected values.
 */
export async function verifyIntegrity(
  dir: string,
  expected: IntegrityBlock
): Promise<IntegrityResult> {
  const actual = await computeFileHashes(dir);
  const actualRoot = computeRootHash(actual);

  const mismatches: string[] = [];
  const missing: string[] = [];
  const extra: string[] = [];

  // Check for files in expected but not in actual, or with different hashes
  for (const [filePath, expectedHash] of Object.entries(expected.files)) {
    if (!(filePath in actual)) {
      missing.push(filePath);
    } else if (actual[filePath] !== expectedHash) {
      mismatches.push(filePath);
    }
  }

  // Check for files in actual but not in expected
  for (const filePath of Object.keys(actual)) {
    if (!(filePath in expected.files)) {
      extra.push(filePath);
    }
  }

  const valid =
    mismatches.length === 0 &&
    missing.length === 0 &&
    extra.length === 0 &&
    actualRoot === expected.root;

  return { valid, mismatches, missing, extra };
}

/**
 * Verify an Ed25519 signature against a root hash using the registry public key.
 */
export function verifySignature(
  rootHash: string,
  signature: string,
  publicKey: string = REGISTRY_PUBLIC_KEY
): boolean {
  try {
    const signatureBuffer = Buffer.from(signature, 'base64');
    const dataBuffer = Buffer.from(rootHash, 'utf-8');
    return cryptoVerify(null, dataBuffer, publicKey, signatureBuffer);
  } catch {
    return false;
  }
}

/**
 * Build an integrity block for a workflow directory.
 * Used during `claudeflows publish` to embed integrity data into workflow.json.
 */
export async function buildIntegrityBlock(dir: string): Promise<IntegrityBlock> {
  const files = await computeFileHashes(dir);
  const root = computeRootHash(files);
  return { algorithm: 'sha256', files, root };
}
