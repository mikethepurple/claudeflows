# Session Checkpoint

Quick state save for Claude Code sessions. Run `/checkpoint` at any point to capture what's happened so far — decisions, progress, environment state, issues — without a full session wrap-up.

## When to use

- Before context gets too long and compression kicks in
- When switching between projects mid-session
- Before doing something risky (deploy, refactor, migration)
- At natural breakpoints in multi-hour sessions
- End of day when you'll continue tomorrow

## What it saves

- `STATE.md` — environment snapshot + pending work + issues
- Decision memory files — significant choices with reasoning
- `PLAN.md` updates — mark completed items
