# Session Checkpoint

Quick state save for Claude Code sessions. Captures decisions, progress, environment state, and issues — so the next session can resume where this one left off.

## Auto-trigger rule

**Run `/checkpoint` automatically after:**
- Deploying to staging or production
- Completing a multi-step feature or batch of changes
- 1+ hours of work without a checkpoint
- Before any risky operation (migration, major refactor, data changes)

Do NOT ask the user. Just do it. If the project has a STATE.md, it should always reflect reality.

## Manual trigger

The user can also run `/checkpoint` anytime — before a break, before switching projects, end of day.

## What it saves

- `STATE.md` — environment snapshot + pending work + issues
- Decision memory files — significant choices with reasoning
- `PLAN.md` updates — mark completed items
