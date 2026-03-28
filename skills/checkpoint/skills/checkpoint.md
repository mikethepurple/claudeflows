# /checkpoint — Mid-session State Save

Lightweight mid-session save. Do ALL of the following:

1. **STATE.md** (project dir) — Update or create for the active project. Include:
   - Current environment state (what's deployed, what's running, what's configured)
   - Pending actions (things started but not finished)
   - Decisions made since last checkpoint/session start
   - Known issues discovered this session
   - Header format: `# <Project> State — Last updated: <date>`

2. **Decision memories** — For each significant decision made since last checkpoint that hasn't been saved yet, create a `decision_*.md` file in the memory directory:
   - Frontmatter: name, description, type: feedback
   - What was decided and what was rejected
   - Why (the user's reasoning)
   - How to apply going forward

3. **PLAN.md** (project dir) — Mark any items completed or update status if progress was made

## Rules

- Do NOT update MEMORY.md index (that's for full save operations)
- Do NOT update root-level plan indexes
- Keep it fast — this should take <30 seconds
- Briefly list what was saved when done
