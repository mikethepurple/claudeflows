# @claudeflows/cli

CLI tool for installing and managing Claude Code agentic workflows from the [CloudFlows](https://claudeflows.com) marketplace.

## Install

```bash
npm install -g @claudeflows/cli
```

Or run directly with npx:

```bash
npx @claudeflows/cli install venture-studio
```

## Commands

| Command | Description |
|---------|-------------|
| `claudeflows install <name>` | Install a workflow from the registry |
| `claudeflows uninstall <name>` | Remove an installed workflow |
| `claudeflows list` | List installed workflows |
| `claudeflows update [name]` | Update workflows to latest versions |
| `claudeflows init` | Create a new workflow project |
| `claudeflows validate` | Validate a workflow manifest |
| `claudeflows publish` | Publish a workflow to the registry |
| `claudeflows login` | Authenticate with the registry |
| `claudeflows doctor` | Check your environment for issues |
| `claudeflows verify` | Verify workflow integrity |
| `claudeflows license` | Show license information |

## Quick Start

```bash
# Install a workflow
claudeflows install venture-studio

# Start a new project
cd my-project
/start "AI-powered resume builder for job seekers"

# Run the current step
/run

# Review and advance
/graduate
```

## Requirements

- Node.js >= 18
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and authenticated

## License

MIT
