import { execSync } from 'node:child_process';
import { rm, cp, mkdtemp, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

export async function downloadFromGithub(url: string, destDir: string): Promise<void> {
  // Normalize the URL — accept both https://github.com/user/repo and full .git URLs
  let repoUrl = url.trim();
  if (!repoUrl.endsWith('.git')) {
    repoUrl = repoUrl.replace(/\/$/, '') + '.git';
  }

  const tempDir = await mkdtemp(join(tmpdir(), 'cw-clone-'));

  try {
    execSync(`git clone --depth 1 "${repoUrl}" "${tempDir}/repo"`, {
      stdio: 'pipe',
      timeout: 60_000,
    });

    const clonedDir = join(tempDir, 'repo');

    // Remove .git directory
    await rm(join(clonedDir, '.git'), { recursive: true, force: true });

    // Copy contents to destination
    await cp(clonedDir, destDir, { recursive: true });
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

export async function extractWorkflow(source: string, dest: string): Promise<void> {
  // Determine if source is a local path or URL
  try {
    const s = await stat(source);
    if (s.isDirectory()) {
      await cp(source, dest, { recursive: true });
      // Remove .git if present
      await rm(join(dest, '.git'), { recursive: true, force: true });
      return;
    }
  } catch {
    // Not a local path — try as URL
  }

  await downloadFromGithub(source, dest);
}
