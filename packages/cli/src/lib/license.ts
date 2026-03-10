import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { verify as cryptoVerify } from 'node:crypto';
import semver from 'semver';
import { REGISTRY_PUBLIC_KEY } from './integrity.js';

export interface LicenseClaims {
  /** Subject (user ID or email) */
  sub: string;
  /** Workflow name this license is for */
  workflow: string;
  /** Semver range of versions this license covers */
  versionRange?: string;
  /** License tier (e.g. "pro", "team", "enterprise") */
  tier?: string;
  /** Issued at (Unix timestamp) */
  iat: number;
  /** Expiry (Unix timestamp) */
  exp: number;
  /** Issuer */
  iss?: string;
}

export interface LicenseValidation {
  valid: boolean;
  claims?: LicenseClaims;
  error?: string;
}

function getLicensesDir(): string {
  return join(homedir(), '.claude-workflows', 'licenses');
}

/**
 * Base64url decode (JWT uses base64url, not standard base64)
 */
function base64urlDecode(str: string): string {
  const padded = str + '='.repeat((4 - (str.length % 4)) % 4);
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64').toString('utf-8');
}

/**
 * Base64url to Buffer (for signature verification)
 */
function base64urlToBuffer(str: string): Buffer {
  const padded = str + '='.repeat((4 - (str.length % 4)) % 4);
  const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(base64, 'base64');
}

/**
 * Decode and validate a JWT license token.
 * Uses Ed25519 signature verification with the registry public key.
 */
export function validateLicense(
  token: string,
  workflowName: string,
  workflowVersion?: string,
  publicKey: string = REGISTRY_PUBLIC_KEY
): LicenseValidation {
  try {
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
      return { valid: false, error: 'Invalid JWT format' };
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    // Verify header
    const header = JSON.parse(base64urlDecode(headerB64)) as { alg: string; typ?: string };
    if (header.alg !== 'EdDSA') {
      return { valid: false, error: `Unsupported algorithm: ${header.alg}` };
    }

    // Verify signature
    const signedContent = `${headerB64}.${payloadB64}`;
    const signature = base64urlToBuffer(signatureB64);
    const isValidSig = cryptoVerify(null, Buffer.from(signedContent), publicKey, signature);
    if (!isValidSig) {
      return { valid: false, error: 'Invalid signature' };
    }

    // Parse claims
    const claims = JSON.parse(base64urlDecode(payloadB64)) as LicenseClaims;

    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    if (claims.exp && claims.exp < now) {
      return { valid: false, claims, error: `License expired on ${new Date(claims.exp * 1000).toISOString()}` };
    }

    // Check workflow name
    if (claims.workflow !== workflowName) {
      return { valid: false, claims, error: `License is for "${claims.workflow}", not "${workflowName}"` };
    }

    // Check version range (if specified in claims and a version is provided)
    if (claims.versionRange && workflowVersion) {
      if (!semver.satisfies(workflowVersion, claims.versionRange)) {
        return {
          valid: false,
          claims,
          error: `License covers versions ${claims.versionRange}, but installing ${workflowVersion}`,
        };
      }
    }

    return { valid: true, claims };
  } catch (err) {
    return { valid: false, error: `Failed to decode license: ${(err as Error).message}` };
  }
}

/**
 * Load a license token from the local filesystem.
 * Licenses are stored at ~/.claude-workflows/licenses/{name}.jwt
 */
export async function loadLicense(workflowName: string): Promise<string | null> {
  const licensePath = join(getLicensesDir(), `${workflowName}.jwt`);
  try {
    await stat(licensePath);
    const token = await readFile(licensePath, 'utf-8');
    return token.trim();
  } catch {
    return null;
  }
}

/**
 * Get the auth session token (from claudeflows login).
 */
export async function loadAuthSession(): Promise<{ token: string; user: string } | null> {
  const authPath = join(homedir(), '.claude-workflows', 'auth.json');
  try {
    const raw = await readFile(authPath, 'utf-8');
    const data = JSON.parse(raw) as { token?: string; user?: string };
    if (data.token && data.user) {
      return { token: data.token, user: data.user };
    }
    return null;
  } catch {
    return null;
  }
}
