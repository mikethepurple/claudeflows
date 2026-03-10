import { Command } from 'commander';
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { createServer } from 'node:http';
import { randomBytes } from 'node:crypto';
import chalk from 'chalk';
import ora from 'ora';

const AUTH_FILE = join(homedir(), '.claude-workflows', 'auth.json');
const OAUTH_CLIENT_ID = 'claudeflows-cli';
const OAUTH_CALLBACK_PORT = 9876;

async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export function registerLogin(program: Command): void {
  program
    .command('login')
    .description('Authenticate with Claude Flows using GitHub OAuth')
    .action(async () => {
      try {
        // Check if already logged in
        if (await fileExists(AUTH_FILE)) {
          try {
            const raw = await readFile(AUTH_FILE, 'utf-8');
            const auth = JSON.parse(raw) as { user?: string; token?: string };
            if (auth.user && auth.token) {
              console.log(chalk.green(`Already logged in as ${chalk.bold(auth.user)}`));
              console.log(chalk.dim('Run `claudeflows logout` to sign out, or `claudeflows login --force` to re-authenticate.'));
              return;
            }
          } catch {
            // Corrupt auth file, proceed with login
          }
        }

        const state = randomBytes(16).toString('hex');

        // Start a local HTTP server to receive the OAuth callback
        const spinner = ora('Waiting for GitHub authentication...').start();

        const authPromise = new Promise<{ code: string; state: string }>((resolve, reject) => {
          const server = createServer((req, res) => {
            const url = new URL(req.url ?? '/', `http://localhost:${OAUTH_CALLBACK_PORT}`);

            if (url.pathname === '/callback') {
              const code = url.searchParams.get('code');
              const returnedState = url.searchParams.get('state');

              if (!code || !returnedState) {
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.end('<h1>Authentication failed</h1><p>Missing code or state parameter.</p>');
                reject(new Error('Missing OAuth parameters'));
                return;
              }

              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(
                '<h1>Authentication successful!</h1><p>You can close this window and return to the terminal.</p>'
              );
              server.close();
              resolve({ code, state: returnedState });
            } else {
              res.writeHead(404);
              res.end();
            }
          });

          server.listen(OAUTH_CALLBACK_PORT, () => {
            // Server is ready
          });

          // Timeout after 2 minutes
          setTimeout(() => {
            server.close();
            reject(new Error('Authentication timed out'));
          }, 120000);
        });

        // Open browser for GitHub OAuth
        const authUrl =
          `https://claudeflows.dev/api/auth/github?` +
          `client_id=${OAUTH_CLIENT_ID}&` +
          `redirect_uri=http://localhost:${OAUTH_CALLBACK_PORT}/callback&` +
          `state=${state}`;

        console.log('');
        console.log(chalk.bold('Open this URL in your browser to authenticate:'));
        console.log(chalk.cyan(authUrl));
        console.log('');

        // Try to open browser automatically
        try {
          const { execSync } = await import('node:child_process');
          const openCmd =
            process.platform === 'darwin'
              ? 'open'
              : process.platform === 'win32'
                ? 'start'
                : 'xdg-open';
          execSync(`${openCmd} "${authUrl}"`, { stdio: 'ignore' });
        } catch {
          // Couldn't open browser automatically — user will copy URL
        }

        const { code, state: returnedState } = await authPromise;

        if (returnedState !== state) {
          spinner.fail('OAuth state mismatch — possible CSRF attack');
          process.exit(1);
        }

        // Exchange code for token
        spinner.text = 'Exchanging authorization code...';

        const tokenResponse = await fetch('https://claudeflows.dev/api/auth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, client_id: OAUTH_CLIENT_ID }),
        });

        if (!tokenResponse.ok) {
          spinner.fail('Failed to exchange authorization code');
          console.error(chalk.red(`Server returned ${tokenResponse.status}`));
          process.exit(1);
        }

        const tokenData = (await tokenResponse.json()) as { token: string; user: string };

        // Save auth
        await mkdir(join(homedir(), '.claude-workflows'), { recursive: true });
        await writeFile(
          AUTH_FILE,
          JSON.stringify(
            {
              user: tokenData.user,
              token: tokenData.token,
              authenticatedAt: new Date().toISOString(),
            },
            null,
            2
          ) + '\n',
          'utf-8'
        );

        spinner.succeed(`Authenticated as ${chalk.bold(tokenData.user)}`);
      } catch (err) {
        console.error(chalk.red(`Login failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });

  program
    .command('logout')
    .description('Sign out of Claude Flows')
    .action(async () => {
      try {
        const { rm } = await import('node:fs/promises');
        await rm(AUTH_FILE, { force: true });
        console.log(chalk.green('Signed out successfully.'));
      } catch (err) {
        console.error(chalk.red(`Logout failed: ${(err as Error).message}`));
        process.exit(1);
      }
    });
}
