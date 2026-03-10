#!/usr/bin/env bash
set -euo pipefail

# CloudFlows bootstrap installer
# Usage: curl -fsSL cloudflows.dev/install.sh | bash -s -- <workflow-name>

WORKFLOW_NAME="${1:-}"
BOLD="\033[1m"
DIM="\033[2m"
GREEN="\033[32m"
YELLOW="\033[33m"
RED="\033[31m"
CYAN="\033[36m"
RESET="\033[0m"

info()  { printf "${BOLD}${CYAN}==>${RESET} %s\n" "$1"; }
ok()    { printf "${GREEN}  OK${RESET} %s\n" "$1"; }
warn()  { printf "${YELLOW}WARN${RESET} %s\n" "$1"; }
fail()  { printf "${RED}FAIL${RESET} %s\n" "$1"; }

echo ""
printf "${BOLD}CloudFlows Installer${RESET}\n"
echo "─────────────────────────────────"
echo ""

# ── Step 1: Check Node.js >= 18 ──

info "Checking Node.js..."

if command -v node &>/dev/null; then
  NODE_VERSION=$(node -v | sed 's/^v//')
  NODE_MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
  if [ "$NODE_MAJOR" -ge 18 ]; then
    ok "Node.js v${NODE_VERSION}"
  else
    fail "Node.js v${NODE_VERSION} found, but v18+ is required."
    echo ""
    echo "Please upgrade Node.js:"
    case "$(uname -s)" in
      Darwin)
        echo "  brew install node        # via Homebrew"
        echo "  # or visit https://nodejs.org"
        ;;
      Linux)
        echo "  # Using nvm (recommended):"
        echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
        echo "  nvm install 20"
        echo ""
        echo "  # Or via package manager:"
        echo "  # https://nodejs.org/en/download/package-manager"
        ;;
      *)
        echo "  Visit https://nodejs.org to download the latest LTS version."
        ;;
    esac
    exit 1
  fi
else
  fail "Node.js is not installed."
  echo ""
  echo "Install Node.js v18 or later:"
  case "$(uname -s)" in
    Darwin)
      echo "  brew install node        # via Homebrew"
      echo "  # or visit https://nodejs.org"
      ;;
    Linux)
      echo "  # Using nvm (recommended):"
      echo "  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
      echo "  nvm install 20"
      echo ""
      echo "  # Or via package manager:"
      echo "  # https://nodejs.org/en/download/package-manager"
      ;;
    *)
      echo "  Visit https://nodejs.org to download the latest LTS version."
      ;;
  esac
  exit 1
fi

# ── Step 2: Check/install Claude Code ──

info "Checking Claude Code..."

if command -v claude &>/dev/null; then
  ok "Claude Code is installed"
else
  warn "Claude Code not found. Installing..."
  npm install -g @anthropic-ai/claude-code
  if command -v claude &>/dev/null; then
    ok "Claude Code installed"
  else
    fail "Could not install Claude Code."
    echo "  Try: npm install -g @anthropic-ai/claude-code"
    exit 1
  fi
fi

# Check if user has authenticated
if [ ! -d "$HOME/.claude" ]; then
  echo ""
  warn "Claude Code hasn't been set up yet."
  echo "  Run ${BOLD}claude${RESET} once to authenticate, then re-run this script."
  exit 1
fi

# ── Step 3: Check/install @claudeflows/cli ──

info "Checking CloudFlows CLI..."

if command -v claudeflows &>/dev/null; then
  ok "CloudFlows CLI ( claudeflows) is installed"
else
  warn "CloudFlows CLI not found. Installing..."
  npm install -g @claudeflows/cli
  if command -v claudeflows &>/dev/null; then
    ok "CloudFlows CLI installed"
  else
    fail "Could not install CloudFlows CLI."
    echo "  Try: npm install -g @claudeflows/cli"
    exit 1
  fi
fi

# ── Step 4: Install workflow if name provided ──

if [ -n "$WORKFLOW_NAME" ]; then
  echo ""
  info "Installing workflow: ${WORKFLOW_NAME}"
  claudeflows install "$WORKFLOW_NAME"
fi

# ── Summary ──

echo ""
echo "─────────────────────────────────"
printf "${GREEN}${BOLD}All set!${RESET}\n"
echo ""
if [ -n "$WORKFLOW_NAME" ]; then
  echo "Your workflow is ready. Next steps:"
  echo "  cd your-project"
  echo "  claude"
  echo "  Then type: /start"
else
  echo "Next steps:"
  echo "  claudeflows install <workflow-name>    # install a workflow"
  echo "  claudeflows list                       # browse available workflows"
fi
echo ""
