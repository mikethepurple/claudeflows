# ClaudeFlows — Reddit + Twitter Drafts

---

## 1. Reddit r/SideProject Launch Post

**Title:** I built a storefront selling Claude Code skills after copy-pasting the same setups across 12 projects

**Body:**

been building with Claude Code for the past year. prediction market platform, an AI vision prototype, a 48-agent research pipeline, various smaller things. every single project started the same way — copy the same CLAUDE.md, paste the same memory system, set up the same save workflow. got tired of it.

so I built ClaudeFlows — a storefront where I sell the skills and configurations I actually use. dark mode site, 16 skills in the catalog, prices from $9 to $99. also do consulting ($500-5K) for people who want custom setups.

the honest numbers: $0 revenue so far. site is live, skills are real and tested across my own projects, but I haven't started distribution yet. this post is part of that.

what's on the site: things like a memory system that persists state across Claude sessions, a market research skill that runs 30+ agents in parallel, a security audit tool, daily reporting. all stuff I built for my own projects and packaged up.

the research I did before building was interesting — I ran 31 agents in parallel to study the competitive landscape. Claw Mart (the biggest existing store) does $50K/month but it's all OpenClaw stuff, not Claude Code native. Agent37 launched 5 weeks ago and already hit $5.8K MRR. there's a 6-9 month window before this market consolidates.

stack: Next.js, Supabase, Vercel. the skills themselves are just SKILL.md files that work in Claude Code, Cursor, Copilot, and 30+ other tools.

screenshot description: dark mode homepage with a hero showing my face + name, a CLI install block, and rows of skill cards with category icons. think indie Gumroad for Claude workflows.

what I'm trying to figure out: is the consulting angle (custom Claude setups for teams) more interesting to you than the individual skills? I keep going back and forth on which side to push harder.

---

## 2. Reddit r/ClaudeAI Post

**Title:** I ran 31 research agents in parallel to map the Claude Code skills ecosystem — here's what surprised me

**Body:**

I've been building with Claude Code for about a year and wanted to understand where the skills ecosystem is actually heading. so I set up a research pipeline: 25 discovery agents each studying a different angle (competitor sites, pricing models, distribution channels, reddit sentiment, GitHub star growth), then 4 synthesis agents that cross-referenced everything, then 2 gap evaluators that stress-tested the conclusions.

total runtime was about 45 minutes. here's what came out of it.

**the SKILL.md format is way bigger than Claude Code**

anthropics/skills has 119K GitHub stars. but the real story is that SKILL.md is now adopted by 35+ tools — Cursor, GitHub Copilot, Gemini CLI, and others. when you write a skill for Claude, it already works everywhere else. I didn't know this before the research.

**Claw Mart's numbers are real but misleading**

$159K total revenue, $51K last 30 days. sounds huge. but dig in: it's OpenClaw ecosystem (different from Claude Code), one seller (Felix Craft) likely accounts for 50-70% of GMV, and the top-selling items are "AI personas" at $19-99 — not skills/workflows.

**courses outsell individual skills by a wide margin**

a single Gumroad course ("Claude Code for Designers", $49.99) has more verified sales evidence than any standalone skill file on any platform. the Notion template market shows the same pattern — bundles outsell individuals 3:1. standalone SKILL.md files have a ceiling around $5 EUR based on current market evidence.

**the consulting layer is completely empty**

1,600+ open Claude Code jobs on Upwork at $50-5K each. people want "set up Claude for my team" as a service. nobody is packaging this as a productized offering yet. the money is in outcomes, not files.

**Agent37 is the one to watch**

launched march 14, hit $5.8K MRR in 5 weeks, got #1 on Product Hunt with 418 upvotes. they sell hosting subscriptions, not skill transactions, but they're the fastest-moving player in the space.

the full pipeline generated about 40 pages of structured research across competitive landscape, pricing, marketing channels, and gap analysis. happy to answer questions about any specific findings.

what CLAUDE.md patterns are you all using? I've been experimenting with structured sections (rules, project context, enforcement stacks) and curious what actually sticks for people long-term.

---

## 3. Twitter Thread #1 — Build Story

**Tweet 1 (hook):**
I ran 31 research agents in parallel to figure out if anyone buys Claude Code skills.

The answer changed how I'm building my business. A thread:

**Tweet 2:**
Started 4 months ago with the obvious idea: build an npm-style marketplace for Claude Code workflows. Registry, CLI tool, the whole thing.

Got it working. Published to npm. Deployed to Vercel.

Then actually looked at what people buy.

**Tweet 3:**
The research: 25 discovery agents studying competitors, pricing, distribution, reddit threads, GitHub stars, Upwork jobs. 4 synthesis agents cross-referencing. 2 evaluators poking holes.

45 minutes, 40 pages of output.

**Tweet 4:**
Finding that changed everything: Claw Mart does $50K/month selling AI stuff. But it's OpenClaw, not Claude Code. And one seller is probably 60% of revenue.

The actual market for standalone skill files? Ceiling is around 5 EUR per skill.

Meanwhile 1,600 open Upwork jobs asking someone to "set up Claude for my team" at $50-5K each.

**Tweet 5:**
So I killed the marketplace model. No multi-seller aggregation. No registry PRs.

Built a solo storefront instead. My skills, my consulting, my editorial voice. Dark mode, 16 skills, $9-99 for skills, $500-5K for consulting.

Think indie Gumroad, not App Store.

**Tweet 6:**
Other things the research caught:

- SKILL.md works in 35+ tools (not just Claude)
- Agent37 hit $5.8K MRR in 5 weeks
- Courses outsell skills 3:1
- anthropics/skills has 119K stars, more than claude-code itself
- The consulting layer is wide open

**Tweet 7:**
Current status: site live, $0 revenue, starting distribution this week.

The 6-9 month window before this market consolidates is real. Agent37 is the threat. Anthropic could launch a paid marketplace any quarter.

Building in public from here. Will share real numbers as they come in.

**Tweet 8:**
If you want to see the storefront or the research: reply or DM and I'll share.

Building @claudeflows — skills + consulting for Claude Code teams.

---

## 4. Twitter Thread #2 — Technical Deep Dive

**Tweet 1 (hook):**
I pointed 31 AI research agents at the Claude Code ecosystem and found some data that doesn't match the hype.

The numbers:

**Tweet 2:**
Setup: each agent gets a specific research question (e.g., "what is Claw Mart's actual revenue breakdown" or "what do r/ClaudeAI users complain about most"). Agents run in parallel, can't see each other's work. Then synthesis agents find contradictions between them.

The contradictions are where the interesting stuff lives.

**Tweet 3:**
Biggest surprise: the SKILL.md format has been quietly adopted by 35+ dev tools. Cursor, Copilot, Gemini CLI, and more all read the same format.

anthropics/skills repo has 119K GitHub stars. claude-code has 77K.

People want pre-built skills more than the tool itself. But the supply is mostly junk — 400K+ free skills scraped from GitHub, almost none tested or documented.

**Tweet 4:**
Revenue data that's actually verified:

- Claw Mart: $159K total, $51K/month, but ~60% from one seller and it's OpenClaw not Claude Code
- Agent37: $5.8K MRR, 5 weeks old, selling hosting not skills
- Gumroad Claude courses: $49.99 each, outselling any standalone skill file
- Upwork: 1,600+ open Claude jobs, $50-5K range

Individual skill files have a hard ceiling around $5 EUR. The money is in bundles, courses, and services.

**Tweet 5:**
What this means if you're building in this space:

Don't build a marketplace. The free supply is 400K+ and growing. You can't compete with free on volume.

Build a storefront with editorial curation. Package skills with services. The gap between "here's a SKILL.md file" and "I'll set up Claude for your team" is where the money sits.

**Tweet 6:**
Full research is 40 pages across competitive analysis, pricing models, distribution channels, and gap evaluation. Built the pipeline using Claude Code's agent parallelization.

If you want to see the methodology or specific findings, reply with what you're curious about.

---

## 5. Twitter Daily Breadcrumbs (5 standalone tweets)

**Breadcrumb 1 — Milestone:**
ClaudeFlows storefront is live with 16 skills. $0 revenue. Starting distribution today. Will report back with real numbers in 2 weeks.

**Breadcrumb 2 — Lesson learned:**
Ran 31 research agents before building the storefront. The biggest lesson: standalone skill files have a $5 ceiling. Bundles and consulting are where people actually spend. Saved me from building the wrong pricing model.

**Breadcrumb 3 — Today I'm building:**
Writing marketing copy for ClaudeFlows today. The hard part isn't describing what the product does. It's writing like a human when you've been inside Claude's context window for 8 hours straight.

**Breadcrumb 4 — Hot take:**
SKILL.md is quietly becoming the most important file format in AI development and nobody is talking about it. It works in 35+ tools already. Claude, Cursor, Copilot, Gemini CLI. The skills you write today are cross-platform whether you planned for that or not.

**Breadcrumb 5 — Reply bait:**
What's in your CLAUDE.md right now? I've landed on: project table, explicit rules section, enforcement stack for memory persistence, session start checklist. Curious what patterns other people have found that actually stick after 50+ sessions.
