import { readFile, writeFile, symlink, unlink, readlink, mkdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { select } from '@inquirer/prompts';
import type { ManifestSkill } from './manifest.js';

interface SkillLink {
  skillName: string;
  linkedName: string;
  targetPath: string;
}

interface SkillLinksFile {
  workflowName: string;
  links: SkillLink[];
}

function getSkillsDir(): string {
  return join(homedir(), '.claude', 'skills');
}

function getSkillLinksPath(installDir: string): string {
  return join(installDir, '.skill-links.json');
}

async function loadSkillLinks(installDir: string): Promise<SkillLinksFile | null> {
  try {
    const raw = await readFile(getSkillLinksPath(installDir), 'utf-8');
    return JSON.parse(raw) as SkillLinksFile;
  } catch {
    return null;
  }
}

async function saveSkillLinks(installDir: string, data: SkillLinksFile): Promise<void> {
  await writeFile(getSkillLinksPath(installDir), JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function isSymlink(path: string): Promise<boolean> {
  try {
    await readlink(path);
    return true;
  } catch {
    return false;
  }
}

export async function checkCollisions(
  targetName: string
): Promise<{ exists: boolean; isLink: boolean; linkTarget?: string }> {
  const skillsDir = getSkillsDir();
  const targetPath = join(skillsDir, targetName);

  if (!(await fileExists(targetPath))) {
    return { exists: false, isLink: false };
  }

  if (await isSymlink(targetPath)) {
    const linkTarget = await readlink(targetPath);
    return { exists: true, isLink: true, linkTarget };
  }

  return { exists: true, isLink: false };
}

export async function backupSkill(name: string): Promise<string> {
  const skillsDir = getSkillsDir();
  const original = join(skillsDir, name);
  const backupName = `${name}.backup-${Date.now()}`;
  const backupPath = join(skillsDir, backupName);

  const { rename } = await import('node:fs/promises');
  await rename(original, backupPath);

  return backupName;
}

export async function linkSkills(
  workflowName: string,
  skills: ManifestSkill[],
  installDir: string
): Promise<{ linked: string[]; skipped: string[] }> {
  const skillsDir = getSkillsDir();
  await mkdir(skillsDir, { recursive: true });

  const linked: string[] = [];
  const skipped: string[] = [];
  const links: SkillLink[] = [];

  for (const skill of skills) {
    const linkedName = `${workflowName}-${skill.name}`;
    const linkPath = join(skillsDir, linkedName);
    const targetPath = resolve(installDir, skill.path);

    // Check for the target file
    if (!(await fileExists(targetPath))) {
      skipped.push(`${linkedName} (source not found: ${skill.path})`);
      continue;
    }

    const collision = await checkCollisions(linkedName);

    if (collision.exists) {
      const action = await select({
        message: `Skill "${linkedName}" already exists${collision.isLink ? ` (linked to ${collision.linkTarget})` : ''}. What should we do?`,
        choices: [
          { value: 'replace', name: 'Replace (backup existing)' },
          { value: 'overwrite', name: 'Overwrite without backup' },
          { value: 'skip', name: 'Skip' },
        ],
      });

      if (action === 'skip') {
        skipped.push(linkedName);
        continue;
      }

      if (action === 'replace') {
        await backupSkill(linkedName);
      }

      // Remove existing before creating new symlink
      try {
        await unlink(linkPath);
      } catch {
        // Ignore if already gone
      }
    }

    await symlink(targetPath, linkPath);
    linked.push(linkedName);
    links.push({ skillName: skill.name, linkedName, targetPath });
  }

  // Save link tracking file
  const linksFile: SkillLinksFile = { workflowName, links };
  await saveSkillLinks(installDir, linksFile);

  return { linked, skipped };
}

export async function unlinkSkills(
  workflowName: string,
  installDir: string
): Promise<string[]> {
  const linksData = await loadSkillLinks(installDir);
  const removed: string[] = [];

  if (!linksData) {
    return removed;
  }

  const skillsDir = getSkillsDir();

  for (const link of linksData.links) {
    const linkPath = join(skillsDir, link.linkedName);
    try {
      // Verify it's a symlink pointing to our install before removing
      const target = await readlink(linkPath);
      if (resolve(target) === resolve(link.targetPath)) {
        await unlink(linkPath);
        removed.push(link.linkedName);
      }
    } catch {
      // Link already gone — that's fine
    }
  }

  return removed;
}
