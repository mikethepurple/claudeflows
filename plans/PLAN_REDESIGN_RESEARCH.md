# ClaudeFlows Redesign — Research Agent Architecture

**Date:** 2026-04-16
**Status:** In Progress
**Brief:** `plans/BRIEF_REDESIGN_AND_MARKETING.md`
**Output directory:** `research/redesign/`

## Overview

Execution research for the ClaudeFlows storefront redesign. Strategic research is done (demand validation, competitive landscape, pricing thesis in `research/DEMAND-VALIDATION-REPORT.md` and `~/Claude/roadmap/STRATEGIC_DECISION_2026-04-16.md`). This step answers: **how to actually build, present, and market the storefront.**

31 agents across 3-4 waves. Wave-based parallelization with gap evaluation and conditional remediation.

---

## Wave 1: Parallel Discovery (25 agents)

All agents run simultaneously. Each writes one output file to `research/redesign/wave-1/`.

### Storefront Design (6 agents)

| # | Agent ID | Focus | Model | Output File |
|---|----------|-------|-------|-------------|
| 1 | thomas-frank-store | Thomas Frank's Notion store — layout, pricing display, CTA placement, tier presentation, social proof | Sonnet | `thomas-frank-store.md` |
| 2 | god-of-prompt-store | God of Prompt — dark mode aesthetic, how $40K/mo packaged AI expertise is presented | Sonnet | `god-of-prompt-store.md` |
| 3 | claw-mart-store | Nat Eliason's Claw Mart — store layout, blog-as-traffic-engine, product page structure | Sonnet | `claw-mart-store.md` |
| 4 | premium-dev-tools | Tailwind UI, Refactoring UI, shadcn — how premium developer products present pricing + install UX | Sonnet | `premium-dev-tools.md` |
| 5 | indie-hacker-stores | Pieter Levels, Danny Postma, Marc Lou — solo creator portfolio/storefront patterns | Sonnet | `indie-hacker-stores.md` |
| 6 | dark-mode-dev-sites | 5 best dark-mode developer tool sites — color systems, typography, terminal aesthetic | Sonnet | `dark-mode-dev-sites.md` |

### Consulting Pages (4 agents)

| # | Agent ID | Focus | Model | Output File |
|---|----------|-------|-------|-------------|
| 7 | upwork-ai-profiles | Top 10 Claude/AI freelancers on Upwork — title, overview, portfolio, hourly rate, job success | Sonnet | `upwork-ai-profiles.md` |
| 8 | ai-consulting-pages | AI consulting landing pages — package presentation, portfolio display, trust signals | Sonnet | `ai-consulting-pages.md` |
| 9 | package-pricing-ux | Package-based pricing pages (not hourly) — Sprint/Setup/Architecture tier presentation patterns | Sonnet | `package-pricing-ux.md` |
| 10 | booking-integration | Calendly/Cal.com embed patterns — inline vs modal vs redirect, conversion best practices | Haiku | `booking-integration.md` |

### Digital Product Pricing (3 agents)

| # | Agent ID | Focus | Model | Output File |
|---|----------|-------|-------|-------------|
| 11 | notion-template-pricing | How top Notion template sellers present tiers, bundles, free-to-paid funnels | Sonnet | `notion-template-pricing.md` |
| 12 | dev-tool-pricing | WordPress themes, Gatsby starters, VS Code extensions — tier presentation, install UX | Sonnet | `dev-tool-pricing.md` |
| 13 | cli-install-ux | CLI tool install experiences — how `npx`, `brew`, `npm i -g` are presented to non-technical buyers | Haiku | `cli-install-ux.md` |

### Content Marketing (5 agents)

| # | Agent ID | Focus | Model | Output File |
|---|----------|-------|-------|-------------|
| 14 | reddit-claude-ai | r/ClaudeAI top 20 posts — format, length, what gets upvotes vs removed, self-promo tolerance | Sonnet | `reddit-claude-ai.md` |
| 15 | reddit-sideproject | r/SideProject + r/EntrepreneurRideAlong — self-promo posts that actually worked, format patterns | Sonnet | `reddit-sideproject.md` |
| 16 | hackernews-show | "Show HN" for developer tools — last 6 months, what reached front page, title patterns, comment strategy | Sonnet | `hackernews-show.md` |
| 17 | instagram-dev-reels | Instagram Reels for developer/AI tools — hooks, formats, engagement rates, accounts to study | Sonnet | `instagram-dev-reels.md` |
| 18 | build-in-public | "Build in public" content that converts followers → customers — Twitter, YouTube, newsletter examples | Sonnet | `build-in-public.md` |

### Competitive Intelligence (4 agents)

| # | Agent ID | Focus | Model | Output File |
|---|----------|-------|-------|-------------|
| 19 | anthropic-marketplace | Anthropic's official skill/prompt marketplace — current state, what's listed, pricing, UX, gaps | Sonnet | `anthropic-marketplace.md` |
| 20 | claw-mart-current | Claw Mart today — traffic trends, new products, pricing changes, blog cadence since our last scan | Sonnet | `claw-mart-current.md` |
| 21 | new-skill-sellers | Anyone new selling Claude Code skills/workflows since March 2026? Scan GitHub, ProductHunt, Twitter | Sonnet | `new-skill-sellers.md` |
| 22 | agensi-current | Agensi.io — still ghost town? Any changes? Also check for other marketplace attempts | Haiku | `agensi-current.md` |

### SEO & Distribution (3 agents)

| # | Agent ID | Focus | Model | Output File |
|---|----------|-------|-------|-------------|
| 23 | keyword-research | "Claude Code skills/setup/consulting" — search volume proxies, competition, long-tail opportunities | Sonnet | `keyword-research.md` |
| 24 | og-meta-instagram | OG image best practices for developer tools + Instagram link-in-bio optimization | Haiku | `og-meta-instagram.md` |
| 25 | distribution-channels | Beyond Reddit/IG — Discord servers, Slack communities, newsletters that cover Claude Code tools | Sonnet | `distribution-channels.md` |

---

## Wave 2: Processing & Synthesis (4 agents)

Waits for all Wave 1 agents. Each reads multiple Wave 1 outputs and writes to `research/redesign/wave-2/`.

| # | Agent ID | Reads (Wave 1 agents) | Produces | Model | Output File |
|---|----------|-----------------------|----------|-------|-------------|
| 26 | design-synthesis | 1-6, 11-13 | Design system brief: layout patterns, color, typography, pricing UI, CTA patterns. Concrete specs. | Sonnet | `design-synthesis.md` |
| 27 | marketing-synthesis | 14-18, 24-25 | Channel playbook: what works per platform, posting templates, content calendar skeleton | Sonnet | `marketing-synthesis.md` |
| 28 | competitive-synthesis | 19-22 | Current landscape map: who's doing what, openings, what to avoid | Sonnet | `competitive-synthesis.md` |
| 29 | pricing-synthesis | 7-12 | Pricing framework: optimal price points per tier, presentation patterns, bundle strategies | Sonnet | `pricing-synthesis.md` |

---

## Wave 3: Gap Evaluation (2 agents)

Sequential: scanner runs first, then evaluator reads scanner output.

| # | Agent ID | Reads | Produces | Model | Output File |
|---|----------|-------|----------|-------|-------------|
| 30 | gap-scanner | All Wave 2 outputs | Raw findings: what's missing, thin areas, unanswered questions | Haiku | `gap-scanner.md` |
| 31 | gap-evaluator | Scanner + Wave 2 | Bias diagnosis + remediation plan. Decides: good / needs-work / significant-gaps | Opus | `gap-evaluator.md` |

---

## Wave 4: Remediation (0-6 agents, conditional)

Only runs if gap evaluator returns `needs-work` or `significant-gaps`. Agent count and focus determined by evaluator's remediation plan. Each uses DIFFERENT sources than Wave 1 to avoid same blind spots.

---

## Post-Research Steps (future sessions)

Research outputs feed directly into the build:

1. **Design** — site design informed by `design-synthesis.md`
2. **Build** — page by page (homepage → skills → consulting → blog)
3. **Marketing copy** — informed by `marketing-synthesis.md` + channel playbook
4. **Deploy** — staging → production (with /vibecheck before prod)
5. **Launch content** — Reddit posts, reels, Upwork profile (informed by content research)

Each step gets its own agent architecture when we reach it.

---

## Agent Preamble (inject into all agents)

```
You are a research agent for ClaudeFlows — a storefront + consulting pipeline for Claude Code skills.

Context: ClaudeFlows is being redesigned from a "marketplace" to a solo-creator storefront (Misha's own skills are the product). The site sells skills at $5-99 and consulting at $500-5,000. Target audience: non-technical professionals who want Claude Code to work without learning to code.

Key strategic insight: The demand is NOT "buy a prompt." It's "set up Claude for me" ($50-5K on Upwork) and "teach me Claude" (YouTube tutorials). The Notion template playbook (Thomas Frank $2.5M) is the model to follow — sell YOUR stuff to YOUR audience.

Your job: Research your assigned topic thoroughly. Use web search and web fetch. Write findings to your assigned output file. Be specific — URLs, screenshots descriptions, exact numbers, concrete patterns. No vibes, no generic advice. If you can't find something, say so explicitly rather than filling with generalities.

Write your output as a structured markdown report with:
- ## Key Findings (3-5 bullet executive summary)
- ## Detailed Analysis (the meat — organized by whatever structure fits the topic)
- ## Actionable Takeaways (what ClaudeFlows should steal/adopt/avoid)
- ## Sources (URLs you actually visited)
```
