import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { input, confirm } from '@inquirer/prompts';
import type { McpServer, McpEnvVar } from './manifest.js';

interface McpJsonServer {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

interface McpJson {
  mcpServers: Record<string, McpJsonServer>;
}

function getMcpJsonPath(): string {
  return join(homedir(), '.claude', '.mcp.json');
}

async function loadMcpJson(): Promise<McpJson> {
  try {
    const raw = await readFile(getMcpJsonPath(), 'utf-8');
    return JSON.parse(raw) as McpJson;
  } catch {
    return { mcpServers: {} };
  }
}

async function saveMcpJson(data: McpJson): Promise<void> {
  const dir = join(homedir(), '.claude');
  await mkdir(dir, { recursive: true });
  await writeFile(getMcpJsonPath(), JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

export function checkMcpServer(name: string, mcpJson: McpJson): boolean {
  return name in mcpJson.mcpServers;
}

export async function promptForEnvVars(
  envConfig: Record<string, McpEnvVar>
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  for (const [varName, config] of Object.entries(envConfig)) {
    const existing = process.env[varName];
    if (existing) {
      result[varName] = existing;
      continue;
    }

    let message = `Enter value for ${varName}`;
    if (config.description) {
      message += ` (${config.description})`;
    }
    if (config.url) {
      message += `\n  Get it at: ${config.url}`;
    }
    message += ':';

    const value = await input({ message });
    result[varName] = value;
  }

  return result;
}

export async function installMcpServer(
  name: string,
  config: McpServer
): Promise<boolean> {
  const mcpJson = await loadMcpJson();

  if (checkMcpServer(name, mcpJson)) {
    return true; // Already configured
  }

  const shouldInstall = await confirm({
    message: `MCP server "${name}" (${config.package}) is not configured. Add it now?`,
    default: true,
  });

  if (!shouldInstall) {
    return false;
  }

  let envVars: Record<string, string> = {};
  if (config.env && Object.keys(config.env).length > 0) {
    envVars = await promptForEnvVars(config.env);
  }

  const serverEntry: McpJsonServer = {
    command: 'npx',
    args: ['-y', config.package, ...(config.args ?? [])],
  };

  if (Object.keys(envVars).length > 0) {
    serverEntry.env = envVars;
  }

  mcpJson.mcpServers[name] = serverEntry;
  await saveMcpJson(mcpJson);

  return true;
}

export async function setupMcpServers(
  mcpConfig: Record<string, McpServer>
): Promise<{ configured: string[]; skipped: string[] }> {
  const configured: string[] = [];
  const skipped: string[] = [];

  const mcpJson = await loadMcpJson();

  for (const [name, config] of Object.entries(mcpConfig)) {
    if (checkMcpServer(name, mcpJson)) {
      configured.push(name);
      continue;
    }

    const installed = await installMcpServer(name, config);
    if (installed) {
      configured.push(name);
    } else {
      skipped.push(name);
    }
  }

  return { configured, skipped };
}
