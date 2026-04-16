# ClaudeFlows — Upwork + Dev.to + Show HN Drafts

---

## 1. Upwork Profile

### Title

`Claude Code & MCP Specialist | Custom Skills, Workflows, Memory Systems`

### Overview

*(First ~200 chars are visible before "read more" on Upwork)*

I build Claude Code workspaces that make AI output consistent across sessions instead of starting from scratch every time. My last three builds:

- Prediction market platform (React/Supabase/TRON, 95 migrations, 18 edge functions, launched)
- AI vision prototype, idea to live URL in 4 hours
- 48-agent research pipeline that runs competitive analysis in 45 minutes

I focus on the parts most AI freelancers don't touch: CLAUDE.md configuration, MCP server setup, persistent memory systems, multi-agent coordination, custom skill development. If Claude keeps forgetting your project context or proposing things you already rejected, that's what I fix.

Sprint setup ($500, same-day) | Full workspace ($2K) | Architecture ($5K+)
See portfolio at claudeflows.com

### Portfolio Pieces

**1. Vanga — Prediction Market Platform**
Full-stack prediction market for Russian-speaking audiences. React + Supabase + TRON blockchain, bilingual (RU/EN), 95+ database migrations, 18 Supabase Edge Functions, real USDT deposits and payouts. Built and shipped with Claude Code as the primary development environment, including a 45-finding security audit run entirely through Claude agents.

**2. Invention Companion — AI Vision Prototype**
"Claude Code for physical things." Mobile-first app where you photograph equipment, and AI identifies it, tracks its history, and builds a knowledge graph of everything you own. Went from idea to live prototype at app.erikov.me in a single 4-hour session. Next.js 16, Supabase Auth + Storage, multi-provider AI router (Claude, OpenAI, Gemini).

**3. Venture Studio — 48-Agent Research Pipeline**
Automated market validation system: 25 discovery agents each research a different angle (competitors, pricing, distribution, sentiment, GitHub activity), 4 synthesis agents cross-reference findings, 2 gap evaluators stress-test conclusions. Runs a full competitive landscape analysis in ~45 minutes. Used it on my own projects, packaged it as a distributable Claude Code skill.

### Services (Fixed-Price Catalog)

**Claude Code Sprint — $500**
2-hour setup session. I configure your Claude Code workspace: CLAUDE.md rules, 1 custom skill for your specific workflow, memory system so context persists between sessions. 30-day async support. Same-day delivery.

**Full Workspace Setup — $2,000**
Complete Claude Code environment for your team. 3-5 custom skills, MCP server configuration, memory system, session persistence, onboarding docs. 60-day async support. 3-5 day delivery.

**Multi-Agent Architecture — $5,000+**
For teams that need parallel agent systems, custom methodology development, or complex integrations. Includes system design, build, production deployment, architecture docs. 90-day support. 1-2 weeks.

**Architecture Review Call — $350**
Standalone 60-minute session. I review your current Claude Code setup, identify gaps, and give you a concrete list of what to fix. No ongoing commitment.

---

## 2. Dev.to Article

```
---
title: 10 Claude Code rules I add to every project (with the incidents that caused them)
published: true
description: The exact CLAUDE.md setup behind a prediction market platform, an AI prototype, and a 48-agent research pipeline. Copy-paste ready.
tags: claudecode, ai, productivity, devtools
canonical_url: https://claudeflows.com/blog/skills-i-install
---
```

## TL;DR

If you just want the rules, here they are. Copy this block into your `CLAUDE.md`:

```markdown
# Rules

## 1. Verify before claiming
Before saying "X doesn't exist" or "X is not configured" — actually check.
Read the file, query the database, list the directory. Never assert absence
from memory alone.

## 2. Auto-save session state
After completing a feature or major decision, commit all changes and write
a summary to LAST_SESSION.md with what was built, decisions made, and
open threads.

## 3. File organization
Keep project roots clean. Don't dump .md files in root. Use subfolders:
plans/, research/, docs/. Name for searchability, not convenience.

## 4. Decision tracking
When the user makes a clear decision (rejects an approach, picks a
direction, sets a constraint), save it immediately as a decision file.
Include what was decided, what was rejected, and why.

## 5. Security self-review
Before any staging/production deploy, run a security review. If the session
involved 5+ iterations on the same files, spawn a separate review agent
with fresh context.

## 6. No deploy without consent
Never deploy to production without explicit user consent. Staging/preview
first, always.

## 7. Try before delegating
Before telling the user "you need to manually do X", check whether you
can do it yourself with Bash, CLI tools, or MCP servers.

## 8. Wisdom extraction
When a mistake is corrected, ask: is this specific to this project, or a
general pattern? If general, create a wisdom entry with trigger condition,
rule, and the incident that taught it.

## 9. Context loading on session start
On first action in a session, read the project's context file and STATE.md
before responding. Ensures you start with architecture knowledge and
current state, not a blank slate.

## 10. Append-only state files
STATE.md is append-only. Use Edit to add/update specific sections — never
Write/replace. Shared inter-agent state; deleting content breaks coordination.
```

Explanation for each one below, including the specific screwup that made me add it.

---

I've been building with Claude Code for about a year. During that time I've shipped a prediction market platform (React, Supabase, TRON blockchain, 95 database migrations), an AI vision prototype that went from nothing to a live URL in 4 hours, and a 48-agent research pipeline that runs competitive analysis in parallel.

Every one of those projects taught me something about how Claude Code fails when you don't configure it properly. These 10 rules are the result. They all live in my `CLAUDE.md` file and I copy them into every new project.

## 1. Verify before claiming

```markdown
Before saying "X doesn't exist" or "X is not configured" — actually check.
Read the file, query the database, list the directory. Never assert absence
from memory alone.
```

**The incident:** Claude told me a Supabase table didn't exist. It did. I'd created it in a previous session. One confident wrong answer cascaded into 30 minutes of debugging a problem that wasn't there.

The problem is that Claude sounds completely sure when it's wrong. Without this rule it'll confidently say "that environment variable isn't set" without running `env | grep`, and you'll waste time fixing something that was already working.

## 2. Auto-save session state

```markdown
After completing a feature or major decision, commit all changes and write
a summary to LAST_SESSION.md with what was built, decisions made, and
open threads.
```

**The incident:** A session crashed and took an entire evening of architecture decisions with it. The next session, Claude had zero context on what we'd decided. It proposed the same approaches we'd already rejected.

`LAST_SESSION.md` is a simple file. It takes 10 seconds to write. But it means the next session starts with full context instead of re-discovering the project from scratch.

## 3. File organization

```markdown
Keep project roots clean. Don't dump .md files in root. Use subfolders:
plans/, research/, docs/. Name for searchability, not convenience.
```

**The incident:** After 20 sessions on one project, I had 47 markdown files in root. Plans, research, notes, reports, all flat in one directory. Took an hour to sort them out.

Claude defaults to creating files wherever is convenient in the moment. This rule forces it to think about where things belong. Sounds trivial, but after a month of daily sessions with Claude, your project directory is either organized or it's a disaster.

## 4. Decision tracking

```markdown
When the user makes a clear decision (rejects an approach, picks a
direction, sets a constraint), save it immediately as a decision file.
Include what was decided, what was rejected, and why.
```

**The incident:** I rejected a database schema during session 5. Session 8, Claude proposed the exact same schema. It had no memory of why we rejected it the first time.

Decision files are the fix. Each one captures what was decided, what alternatives were considered, and the reasoning. Claude reads them at session start and stops re-proposing dead ideas.

## 5. Security self-review

```markdown
Before any staging/production deploy, run a security review. If the session
involved 5+ iterations on the same files, spawn a separate review agent
with fresh context.
```

**The incident:** I deployed a Supabase project with a `SECURITY DEFINER` function that was callable by anyone. A fresh-context security agent caught it in 2 minutes. The agent that wrote the code never noticed because it was too deep in the implementation.

The "5+ iterations" threshold comes from a pattern I've seen repeatedly: the more rounds you go on the same code, the more likely you are to introduce bugs that the current context can't see. A fresh agent with no prior context is genuinely better at finding these.

## 6. No deploy without consent

```markdown
Never deploy to production without explicit user consent. Staging/preview
first, always.
```

**The incident:** Claude ran `vercel --prod` during a debugging session. On a Saturday. With broken auth middleware.

Claude is helpful and proactive, which is usually great, right up until it decides to ship broken code to production while you're looking at something else. Staging first. Always.

## 7. Try before delegating

```markdown
Before telling the user "you need to manually do X", check whether you
can do it yourself with Bash, CLI tools, or MCP servers.
```

**The incident:** Claude kept telling me to "go to the Supabase dashboard" to do things. Half the time, the Supabase CLI could handle it from the terminal. Claude just didn't try.

Claude has access to Bash, file editing, CLI tools, and MCP servers. It can do way more than it thinks it can. Without this rule, it defaults to sending you to a dashboard for something a CLI command could handle.

## 8. Wisdom extraction

```markdown
When a mistake is corrected, ask: is this specific to this project, or a
general pattern? If general, create a wisdom entry with trigger condition,
rule, and the incident that taught it.
```

**The incident:** I fixed the same Supabase migration numbering bug three times across different projects. Each time Claude ran into the same issue, debugged it from scratch, and arrived at the same solution. Three projects, same lesson learned three times.

Wisdom files have a trigger condition ("when pushing Supabase migrations"), a rule ("use timestamped names, verify with migration list"), and the incident that taught it. Claude checks these before performing the triggering action. The migration bug never came back.

## 9. Context loading on session start

```markdown
On first action in a session, read the project's context file and STATE.md
before responding. Ensures you start with architecture knowledge and
current state, not a blank slate.
```

**The incident:** Without this, the first 10 minutes of every session was Claude rediscovering the project. "Let me read the codebase to understand the architecture..." Every single time. For a project it had been working on for weeks.

Context files are pre-written summaries of each project: stack, environments, key decisions, current state. Reading them takes 5 seconds and eliminates the cold-start problem.

## 10. Append-only state files

```markdown
STATE.md is append-only. Use Edit to add/update specific sections — never
Write/replace. Shared inter-agent state; deleting content breaks coordination.
```

**The incident:** A background agent rewrote STATE.md and deleted half the content. It wiped deployment records and pending action lists that other agents were actively reading. Took 20 minutes to reconstruct.

If you're running multiple agents (one building, one reviewing, one deploying), they all read from STATE.md. If any agent rewrites the whole file instead of editing a specific section, it destroys everyone else's state. Append-only is the only safe pattern for shared files.

---

## What these add up to

None of these are theoretical best practices. Every rule is a patch for a specific failure that cost me real time. I copy all 10 into every new project. Takes about 5 minutes. After a month of daily Claude sessions, you'll notice.

I packaged all of these into a Blueprint skill at [claudeflows.com](https://claudeflows.com) that installs them along with memory persistence, auto-checkpoints, and wisdom extraction in one command. But the rules above are the core of it and you can use them as-is.

---

## 3. Show HN Draft (Week 6-8)

### Title Options (ranked)

1. **Show HN: ClaudeFlows - npm for Claude Code skills**
2. **Show HN: I built a package registry for Claude Code workflows**
3. **Show HN: ClaudeFlows - distributable skill packs for Claude Code**

### Post Body

ClaudeFlows is a registry and CLI for distributing Claude Code skills. `claudeflows install venture-studio` pulls a validated workflow into your project's `.claude/skills/` directory. Think npm or Homebrew, but for SKILL.md files.

CLI: `npm i -g claudeflows`
Site: https://claudeflows.com
16 skills in the catalog, from memory persistence to multi-agent research pipelines.

### Founder's First Comment

I'm Misha. I build things with Claude Code full-time. Engineering background, but I barely read the code Claude writes at this point.

I built this because I kept copying the same CLAUDE.md rules and skill files across projects. Prediction market, AI prototype, research pipeline, market intelligence system. Every one started with the same 40 minutes of setup: paste the memory system, paste the save workflow, configure the session persistence, set up the security review rules. I wanted `npm install` for that.

**What this is not:**

- Not a prompt marketplace. Skills are structured configuration (CLAUDE.md rules, SKILL.md files, MCP configs), not prompt templates.
- Not Anthropic-exclusive. SKILL.md works in Cursor, Copilot, Windsurf, and 30+ other tools. I focus on Claude Code because that's what I use, but the format is cross-platform.
- Not a hosted service. The CLI clones files from GitHub repos into your local project. No lock-in, no runtime dependency on ClaudeFlows.

**Known limitations:**

- The registry is small (16 skills, one author: me). I'm eating my own cooking while building distribution. More creators is the next milestone.
- No automated testing for skills. Skills are configuration, not code, so traditional CI doesn't apply directly. I manually test each one across my own projects, but there's no automated verification pipeline yet.
- Payment integration isn't live. Free skills work, paid skills are listed but you can't buy them through the site yet. Consulting is the revenue side for now.
- Discovery is bad. The catalog page exists but there's no search in the CLI, no recommendations, no "skills that work well together" graph. It's a flat list.

**License:** The CLI is open source. Individual skills have their own licenses (most are MIT, some paid ones will be proprietary).

**Pre-empting the obvious questions:**

*"Why not just GitHub?"* You can already use GitHub directly. `claudeflows install` is a wrapper around cloning a repo and linking the skills into your project. The value is supposed to come from curation, verified compatibility, and not having to find the right repos yourself. Whether that's enough value over raw GitHub is a fair question and I don't know the answer yet.

*"Anthropic lock-in?"* SKILL.md is an open format that works in 35+ tools. If Anthropic disappears tomorrow, the skills still work everywhere else. The CLI is the only part tied to my infrastructure and it's a thin wrapper.

*"This is just a file convention."* Mostly, yeah. The question is whether a package manager and curated catalog around that convention is useful enough to justify existing. npm is "just a file convention" too (package.json), but the registry and tooling around it matter. I think the same will be true for SKILL.md as the ecosystem grows, but I could be wrong.

I built the site, CLI, 16 skills, and the research pipeline I used to validate demand all with Claude Code. The meta aspect is intentional: the tool is built with the tool it distributes workflows for.
