# Session Checkpoint

Never lose session context again.

## What it does

Long Claude Code sessions lose context as conversations grow. Decisions you made an hour ago get compressed away. You close the terminal and tomorrow's session starts from scratch. This skill captures your session state in under 30 seconds — what's deployed, what's pending, what you decided and why — so the next session can pick up exactly where you left off.

## Install

```bash
claudeflows install checkpoint
```

## Usage

```
claude
> /checkpoint
```

Run it anytime — before a break, before risky operations, or at natural stopping points. Takes about 30 seconds.

## What you get

- **STATE.md** — snapshot of environment, pending actions, known issues
- **Decision files** — each significant choice saved with reasoning
- **PLAN.md updates** — completed items marked off automatically

## Requirements

- Claude Code

## Example

```
> /checkpoint

Saved 3 items:
- STATE.md updated (2 pending actions, 1 known issue)
- Created decision_use-supabase-over-firebase.md
- PLAN.md: marked 4 items complete
```
