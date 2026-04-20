# ClaudeFlows Redesign & Marketing — Agent Brief

**Date:** 2026-04-16
**Context:** Strategic portfolio decision session. ClaudeFlows reframed from "marketplace for Claude Code skills" to "storefront + consulting pipeline + brand." Full strategic report at `~/Claude/roadmap/STRATEGIC_DECISION_2026-04-16.md`.

## What Changed (Critical Context)

### Old Model: Marketplace
- Build a platform where third-party creators sell skills
- Revenue from take rate (10-20%)
- Grow supply side → grow demand side → network effects

### New Model: Storefront + Pipeline
- Misha's OWN skills are the product catalog
- The website is a portfolio/brand that attracts consulting leads
- Skills at $5-20 are top-of-funnel
- Consulting at $500-5,000 is the real revenue
- Every consulting gig produces a new skill that goes into the store
- The site IS the personal brand (not "Misha Erikov, consultant" but "ClaudeFlows, the Claude Code toolkit")

### Why The Change
Research from this session revealed:
- **Claw Mart** ($159K Stripe-verified) is 95% one seller (Nat Eliason). "Marketplace" is a wrapper around one person's products. It works because of Nat's AUDIENCE, not the platform.
- **Agensi.io** is a ghost town (SimilarWeb #2.5M, anonymous operator, zero evidence of sales)
- **Paid skills market** barely exists. Agensi caps at $20. Nobody has proven meaningful revenue from selling SKILL.md files.
- **Real money** flows to consulting ($150-250/hr, 2,756+ Upwork jobs) and courses ($50-1,250)
- **The Notion template playbook** (Thomas Frank $2.5M) works: sell YOUR stuff to YOUR audience, not build a platform for others
- **Anthropic launched official marketplace Feb 2026** — don't compete with platform owner on the platform play

## Objective

1. Redesign the ClaudeFlows website to be a storefront/portfolio (not a marketplace)
2. List 5-10 of Misha's best skills with pricing
3. Add consulting CTA + calendly link
4. Prepare marketing: Instagram reel concepts, Reddit/HN post ideas, Upwork profile copy
5. Deploy to production

## Website Redesign Requirements

### Structure

```
Home
├── Hero: "AI workflows that work. Built by someone who ships with Claude Code every day."
├── Featured Skills (3-5 best, with pricing)
├── Case Studies (2-3: Vanga, IC prototype, venture studio pipeline)
├── "Need something custom?" → Consulting CTA
├── Blog/Content section
└── About (brief, credible, not corporate)

/skills
├── Grid of all skills with categories, prices
├── Each skill: description, what it does, screenshot/demo, price, install instructions
└── Free skills exist as lead magnets

/consulting
├── What I do (Claude Code setup, skill building, AI workflow architecture)
├── Portfolio highlights
├── Pricing (packages, not hourly — $500 Sprint, $2,000 Full Setup, $5,000 Architecture)
├── Calendly embed
└── Testimonials (once available)

/blog
├── "I built X with Claude Code" articles
├── Skill tutorials
└── Behind-the-scenes of builds (content marketing engine)
```

### Design Principles
- **Not generic SaaS landing page.** Should feel like a craftsperson's workshop — tools on display, work visible.
- **Show real outputs.** Screenshots of actual skills in action, terminal output, before/after.
- **Dark mode default.** Claude Code users live in dark terminals.
- **Mobile-friendly.** Instagram traffic = phones.
- **Fast.** No heavy frameworks if not needed. Static site or simple Next.js.

### Messaging Framework

**For skill buyers (non-technical professionals):**
- "Stop fighting Claude. Start shipping with it."
- "Pre-built workflows for [marketing/sales/research/security]. Install in 2 minutes."
- Problem → Solution format. Not "here's a SKILL.md file" but "here's what it DOES for you."

**For consulting leads:**
- "I built a prediction market platform, an AI vision prototype, and a venture validation pipeline — all with Claude Code in the last month. I can build yours too."
- Show the portfolio. Let the work speak.

**For the Claude Code community (content marketing audience):**
- "Here's how I actually use Claude Code" — authentic, practical, specific
- Not "10 tips for better prompts" but "I ran 48 agents to validate a startup idea — here's what happened"

### Skills to List (Misha's existing catalog)

**Tier 1 — Showcase (most impressive, highest price):**
1. **Venture Studio Pipeline** — 6-step validation with parallel agents, synthesis. Price: $49-99
2. **Memory System** — cross-session persistence, decision tracking, wisdom layer. Price: $29-49
3. **Market Watch** — 9-agent vertical intelligence with gap analysis. Price: $29-49
4. **Vibecheck** — 7-check security audit for vibecoded projects. Price: $19-29

**Tier 2 — Practical (solve specific problems):**
5. **Save Workflow** — session state capture, LAST_SESSION, session reports. Price: $9-19
6. **Daily Report** — LaunchAgent + Sonnet, session digest. Price: $9-19
7. **Knowledge Base** — meeting transcripts, people graph, task extraction. Price: $19-29

**Tier 3 — Free (lead magnets):**
8. **Checkpoint** — mid-session state save. Free
9. **Roadmap** — portfolio planning. Free (gets people into the ecosystem)

### Consulting Packages

| Package | What | Price | Delivery |
|---------|------|:---:|---------|
| **Sprint** | 2-hour Claude Code setup: skills, memory, CLAUDE.md, workflow | $500 | Same day |
| **Full Setup** | Complete workspace: custom skills, MCP servers, hooks, testing | $2,000 | 3-5 days |
| **Architecture** | Multi-agent system design + build for your business | $5,000+ | 1-2 weeks |
| **Retainer** | Ongoing support + new skills as needed | $500-1,000/mo | Monthly |

## Marketing Plan

### Channel 1: Instagram Reels (Paid + Organic)

**Budget:** $50-100 for paid promotion of best-performing reels

**Content concepts:**
1. "My AI agent just deleted my database. Here's the skill that prevents this." (Vibecheck hook)
2. "I asked Claude to build a landing page. It built 47 files. Here's the one skill that fixed my workflow." (Save/Memory hook)
3. "48 AI agents researched a startup idea for me in 20 minutes. Here's what they found." (Venture Studio hook)
4. "Claude Code tip that saved me 3 hours today" (quick tips series)
5. "Building [X] live with Claude Code" (time-lapse builds)

**Format:** 30-60 seconds. Screen recordings with voiceover OR face-to-camera with terminal on screen. Raw > polished. Show real terminal output.

**Posting cadence:** 3-5 reels/week. Test which format resonates.

### Channel 2: Reddit / HackerNews (Organic)

**Target subs:** r/ClaudeAI, r/ChatGPT, r/LocalLLaMA, r/SideProject, r/EntrepreneurRideAlong

**Post concepts:**
1. "I built a 6-step venture validation pipeline using 48 parallel Claude Code agents — here's what it found" (r/ClaudeAI, HN)
2. "My Claude Code memory system: how I get cross-session persistence" (r/ClaudeAI)
3. "I security-audited 5 vibecoded projects. Here's what I found." (r/SideProject, HN)
4. "Show HN: ClaudeFlows — pre-built Claude Code workflows for non-developers" (HN)

**Rules:** Genuine value first. Link to ClaudeFlows naturally, not spammy. Respond to every comment.

### Channel 3: Upwork Profile

**Title:** "Claude Code Expert — AI Workflows, Skills, MCP Servers, Multi-Agent Systems"

**Portfolio pieces:**
- Vanga: "Full prediction market platform built with Claude Code — React, Supabase, TRON, 984 tests"
- IC: "Zero to live AI vision prototype in 4 hours with Claude Code"
- Venture Studio: "48-agent parallel research system"
- Memory System: "Cross-session state persistence for Claude Code"

**Link to ClaudeFlows** as portfolio/website.

**Services to offer:**
- Claude Code workspace setup ($500)
- Custom skill development ($200-500/skill)
- Multi-agent system architecture ($2,000-5,000)
- Vibecheck security audit ($500-1,000)

### Channel 4: Twitter/LinkedIn (Organic, lower priority)

"Build in public" thread format. Weekly posts about what was built, with screenshots. Links to blog posts on ClaudeFlows.

## Technical Requirements

### Current State (MORE DONE THAN EXPECTED — read PLAN.md)
The March 28 redesign already shipped a LOT of this. What EXISTS:
- CLI v0.2.0 on npm (`claudeflows`)
- Web deployed to staging: claudeflows.vercel.app
- **Homepage already redesigned:** outcome-first hero, job-function browsing, consulting CTA, dual CTAs
- **Consulting intake page** at /consulting with form → Supabase
- **11 non-technical skills** already built (sales-outreach, content-repurpose, lead-research, hiring-kit, perf-review, sop-generator, email-optimizer, api-docs, vendor-compare, brand-voice, checkpoint)
- **Email capture gate** on skill install (localStorage persistence)
- Supabase project created, migrations 001-002 applied, 003 written but not applied
- Ed25519 integrity verification
- Purchases table + migration ready for Stripe

### What Still Needs to Happen
1. **Apply migration 003** (user runs SQL in Supabase dashboard)
2. **Push to GitHub** (8 commits ahead)
3. **Deploy to production** (Vercel)
4. **Stripe integration** for paid skills (webhook → purchases table)
5. **Add pricing to skill pages** (currently no prices displayed)
6. **Add Misha's power skills** (venture studio, memory system, market watch, vibecheck) — these are the $29-99 showcase items, different from the 11 non-technical skills already listed
7. **Blog section** (even if just 1-2 posts initially)
8. **Meta Pixel + Google Analytics** for ad tracking
9. **Review messaging** against new strategic insights — the March redesign was "marketplace for non-technical professionals." The new framing is "Misha's storefront + consulting pipeline." May need copy adjustments to emphasize the personal brand / craftsperson angle over the marketplace angle.
10. **Instagram-friendly meta tags / OG images** for when reels link to the site

### Domain
- Currently: unknown (check PLAN.md)
- Ideal: claudeflows.com or similar
- Fallback: claudeflows.erikov.me via Cloudflare tunnel

## Research Already Done (Read These)

- `~/Claude/claudeflows/research/DEMAND-VALIDATION-REPORT.md` — 7-agent demand validation, competitive landscape, supply-side leads, pricing research. CRITICAL READ.
- `~/Claude/claudeflows/PLAN.md` — current technical plan, what's done, what's left
- `~/Claude/roadmap/STRATEGIC_DECISION_2026-04-16.md` — full strategic analysis including Claw Mart deep dive, Agensi.io ghost town finding, paid skills market mapping

## Key Research Findings to Inform Design

- **anthropics/skills: 91.6K stars > claude-code 77.1K.** People want skills MORE than the tool. Empty shelf.
- **1,643 open Upwork Claude jobs** at $50-5K — unproductized demand
- **God of Prompt: $40K/mo** selling packaged AI expertise (outcomes, not prompts)
- **Thomas Frank: $2.5M** from Notion templates — the playbook to follow
- **Claw Mart reality:** $159K Stripe-verified but 95% from one seller. The "marketplace" is marketing for one person's products. The daily blog is the traffic engine.
- **Agensi.io:** Ghost town. SimilarWeb #2.5M. Zero social proof. Don't follow this model.
- **Price ceiling for skills:** $20 on Agensi, $99 on Claw Mart (but that's a full persona, not a skill). $29-49 for complex multi-file systems (our skills) seems right.
- **The demand is NOT "buy a prompt."** It's "set up Claude for me" ($50-5K on Upwork) and "teach me Claude" (20-90K YouTube views per tutorial).
- **Target audience is non-technical professionals** — marketing managers, designers, HR leads, small business owners who want AI to work without learning to code

## Success Criteria

### Week 1
- Website live with 5+ skills listed and consulting page
- First Reddit/HN post published
- Upwork profile active
- 2-3 Instagram reels recorded

### Week 2
- 500-2,000 website visits (from content + paid)
- First skill purchase OR first consulting inquiry
- Instagram: 5+ reels posted, $50 in paid promotion on best performer
- Upwork: 2-3 proposals sent

### Month 1
- $500-2,000 from consulting or skill sales (combined)
- 50+ email subscribers
- Content engine running (2-3 posts/week across platforms)
- Clear signal on which channel converts best
