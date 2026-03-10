#!/usr/bin/env node

/**
 * Clone Detection Script for Claude Flows Registry
 *
 * Runs during PR validation to detect near-duplicate workflow submissions.
 * Uses SimHash fingerprinting to compare SKILL.md content similarity.
 *
 * Usage: node detect-clones.js <workflow-dir> [--threshold 85]
 *
 * Exit codes:
 *   0 — no clones detected
 *   1 — clone detected (similarity > block threshold, default 95%)
 *   2 — potential clone flagged (similarity > warn threshold, default 85%)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- Configuration ---
const WARN_THRESHOLD = 85;
const BLOCK_THRESHOLD = 95;
const FINGERPRINT_FILE = path.join(__dirname, '..', 'fingerprints.json');
const SHINGLE_SIZE = 3; // 3-word shingles for SimHash

// --- SimHash Implementation ---

/**
 * Generate shingles (n-grams of words) from text.
 */
function getShingles(text, n = SHINGLE_SIZE) {
  // Normalize: lowercase, collapse whitespace, remove punctuation
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const words = normalized.split(' ');
  if (words.length < n) return [normalized];

  const shingles = [];
  for (let i = 0; i <= words.length - n; i++) {
    shingles.push(words.slice(i, i + n).join(' '));
  }
  return shingles;
}

/**
 * Compute a 64-bit SimHash from text.
 * Returns a hex string representing the fingerprint.
 */
function simhash(text) {
  const shingles = getShingles(text);
  const bits = 64;
  const vector = new Array(bits).fill(0);

  for (const shingle of shingles) {
    // Hash each shingle to get a bit pattern
    const hash = crypto.createHash('md5').update(shingle).digest();

    for (let i = 0; i < bits; i++) {
      const byteIndex = Math.floor(i / 8);
      const bitIndex = i % 8;
      const bit = (hash[byteIndex] >> bitIndex) & 1;
      vector[i] += bit ? 1 : -1;
    }
  }

  // Convert vector to binary fingerprint
  let fingerprint = BigInt(0);
  for (let i = 0; i < bits; i++) {
    if (vector[i] > 0) {
      fingerprint |= BigInt(1) << BigInt(i);
    }
  }

  return fingerprint.toString(16).padStart(16, '0');
}

/**
 * Compute Hamming distance between two hex SimHash fingerprints.
 * Returns a similarity percentage (0-100).
 */
function similarity(hash1, hash2) {
  const a = BigInt('0x' + hash1);
  const b = BigInt('0x' + hash2);
  const xor = a ^ b;

  // Count set bits (Hamming distance)
  let distance = 0;
  let val = xor;
  while (val > 0n) {
    distance += Number(val & 1n);
    val >>= 1n;
  }

  // Convert to similarity percentage (64 bits total)
  return ((64 - distance) / 64) * 100;
}

/**
 * Extract structural skeleton from a SKILL.md file.
 * Strips formatting but preserves the semantic structure.
 */
function extractSkeleton(content) {
  return content
    // Remove markdown formatting characters but keep text
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/`{1,3}[^`]*`{1,3}/g, 'CODE')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// --- Main ---

function loadFingerprints() {
  try {
    const raw = fs.readFileSync(FINGERPRINT_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { version: 1, workflows: {} };
  }
}

function saveFingerprints(data) {
  fs.writeFileSync(FINGERPRINT_FILE, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function findSkillFiles(dir) {
  const results = [];

  function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        walk(full);
      } else if (entry.isFile() && entry.name.toUpperCase() === 'SKILL.MD') {
        results.push(full);
      }
    }
  }

  walk(dir);
  return results;
}

function main() {
  const args = process.argv.slice(2);
  const workflowDir = args[0];
  const thresholdArg = args.indexOf('--threshold');
  const warnThreshold = thresholdArg >= 0 ? parseInt(args[thresholdArg + 1], 10) : WARN_THRESHOLD;

  if (!workflowDir) {
    console.error('Usage: node detect-clones.js <workflow-dir> [--threshold N]');
    process.exit(1);
  }

  // Read the new workflow's skill files
  let workflowName;
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(workflowDir, 'workflow.json'), 'utf8'));
    workflowName = manifest.name;
  } catch {
    console.error('Could not read workflow.json in', workflowDir);
    process.exit(1);
  }

  const skillFiles = findSkillFiles(workflowDir);
  if (skillFiles.length === 0) {
    console.log('No SKILL.md files found — skipping clone detection');
    process.exit(0);
  }

  // Compute fingerprints for the new workflow
  const newFingerprints = {};
  for (const file of skillFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const skeleton = extractSkeleton(content);
    const relPath = path.relative(workflowDir, file);
    newFingerprints[relPath] = {
      hash: simhash(skeleton),
      length: skeleton.length,
    };
  }

  // Load existing fingerprints
  const db = loadFingerprints();
  let hasWarning = false;
  let hasBlock = false;

  // Compare against all existing workflows
  for (const [existingName, existingData] of Object.entries(db.workflows)) {
    if (existingName === workflowName) continue; // Skip self

    for (const [newPath, newFp] of Object.entries(newFingerprints)) {
      for (const [existingPath, existingFp] of Object.entries(existingData.skills || {})) {
        const sim = similarity(newFp.hash, existingFp.hash);

        if (sim >= BLOCK_THRESHOLD) {
          console.error(
            `BLOCKED: "${workflowName}/${newPath}" is ${sim.toFixed(1)}% similar to "${existingName}/${existingPath}"`
          );
          hasBlock = true;
        } else if (sim >= warnThreshold) {
          console.warn(
            `WARNING: "${workflowName}/${newPath}" is ${sim.toFixed(1)}% similar to "${existingName}/${existingPath}"`
          );
          hasWarning = true;
        }
      }
    }
  }

  // If not blocked, update fingerprints with new workflow
  if (!hasBlock) {
    db.workflows[workflowName] = {
      skills: newFingerprints,
      updatedAt: new Date().toISOString(),
    };
    saveFingerprints(db);
    console.log(`Fingerprints updated for "${workflowName}" (${Object.keys(newFingerprints).length} skill(s))`);
  }

  if (hasBlock) {
    console.error('\nClone detection FAILED — submission blocked');
    process.exit(1);
  } else if (hasWarning) {
    console.warn('\nClone detection WARNING — review recommended');
    process.exit(2);
  } else {
    console.log('Clone detection passed — no similar workflows found');
    process.exit(0);
  }
}

main();
