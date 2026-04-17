# CuratedFlows: Go-to-Market Synthesis

**Date:** 2026-04-17
**Based on:** 31 research agents across 3 waves, 22 research files
**Brand:** CuratedFlows (curatedflows.com)
**Operator:** Misha Erikov, solo operator selling to US market
**Budget:** $750/month paid media

---

## 1. Executive Summary

Five findings that matter most, with what to do about each:

**Finding 1: The audience is vibecoders, not SMB CEOs.** Wave 1-2 targeted cleaning companies and law firms. Wave 3 found the real buyer: 15-25M non-developer builders using AI coding tools, 63% of whom are not professional developers (wave3/01, wave3/05). These people already pay $40-120/month for Claude Code, Cursor, and similar tools. They don't need to be educated about AI -- they need their Claude Code to stop breaking. **Action:** All positioning, ads, and content target vibecoders. Abandon SMB CEO messaging entirely.

**Finding 2: The product is "Claude Code that works like it should" -- not an automation agency.** Vibecoders' top frustrations are context loss (silent memory wipe), bug whack-a-mole (fix one break two), security blindness (196/198 apps had vulnerabilities), and the deployment wall (wave3/02, wave3/04). CuratedFlows solves these with sophisticated multi-agent systems, persistent memory, security checks, and smart installers. **Action:** Lead with the frustration, sell the fix. The tagline is about making Claude Code reliable, not about "AI automation."

**Finding 3: Nobody sells productized Claude Code consulting.** The market has courses ($10-800), security audits ($2,500+), and freelance hourly work ($50-200/hr). Nobody offers a fixed-price, fixed-scope Sprint where Misha joins for 2-4 hours, configures CLAUDE.md + hooks + architecture + security guardrails for a specific project (wave3/07). **Action:** The Sprint is the core revenue product at $500-1,500. Self-serve flows ($29-99) are the top-of-funnel.

**Finding 4: Reddit and YouTube are the channels, not Meta or LinkedIn.** Vibecoders live on r/ClaudeCode (4,200+ weekly contributors), r/vibecoding (153K members), and YouTube Claude Code tutorials. Meta requires $150+/day minimum for B2B learning phase -- $15/day is structurally insufficient (16-counter-evidence). LinkedIn is relevant only for organic content, not ads at this budget (15-linkedin-strategy). **Action:** Allocate $750/month across Google Search ($300), Reddit ($250), and YouTube ($200). Zero on Meta.

**Finding 5: The window is 6-12 months.** Anthropic is building an official skills marketplace (GitHub feature request #30727). SkillsMP already has 96K+ free skills. The malware crisis (12-20% of OpenClaw skills were malicious) created a trust gap that favors curated, verified sellers -- but this window closes when Anthropic ships their own marketplace (wave3/03). **Action:** Move fast. First 30 days: launch storefront + run first ads. First 90 days: 5+ Sprint clients, 50+ flow sales, content engine running.

---

## 2. The Audience

### Primary Persona: The Non-Technical Founder / Vibecoder

**Who they are:** Startup founders, product managers, marketers, and designers who build software using AI coding tools without understanding the code being produced. 63% of vibe coding community members are non-developers (wave3/01, Taskade 2026). They call themselves "builders," not "coders." Age 28-44, mostly millennials. They say things like "I'm not a developer, but I built..." and "I vibed this out over the weekend." (wave3/01)

**What they use:** Claude Code, Cursor, Lovable, Bolt.new, Replit. The more technical ones (Claude Code, Cursor) are CuratedFlows' primary audience. They spend $40-170/month on AI tools and infrastructure (wave3/04).

**What they build:** Landing pages, SaaS MVPs, internal dashboards, Chrome extensions, AI wrappers. 44% build user interfaces, 20% full-stack applications (wave3/01).

**Their #1 problem:** Not building -- distribution. "One developer spent 7 months building and earned $4." But after that, the immediate pain is maintenance: "The problem with vibe coding is nobody wants to talk about maintenance" -- 562 upvotes, 252 comments on Reddit (wave3/01).

**Where they hang out:** r/vibecoding (153K+), r/ClaudeCode, r/SideProject, Indie Hackers, Product Hunt, Twitter/X, YouTube Claude Code tutorials, Discord communities (vibec0de, src.club) (wave3/01, wave3/07).

**What language they use:** "Credits" not tokens. "Prompting" not coding. "It broke and I can't fix it." "Error loop." "Stuck." They search for "Claude Code keeps losing context," "hire Claude Code expert," "vibecoding security," not "AI automation consulting" (wave3/06).

### Secondary Persona: The Rusty Technical Person

**Who they are:** Engineering degree holders who haven't coded professionally in years. They can reason about architecture but can't review code line-by-line. They use Claude Code because they're comfortable enough with a terminal but need the AI to do the heavy lifting. Misha fits this profile exactly (wave3/04).

**Why they're valuable:** Higher willingness to pay ($500-1,500 for a Sprint), more likely to understand the value of proper CLAUDE.md architecture, and more likely to become long-term retainer clients.

### Tertiary Persona: The PM Who Builds

Product managers building prototypes to skip the sprint backlog. "The PM who waits two sprints for engineering bandwidth is being replaced by the PM who built, tested, and iterated over a weekend" (ACM Communications, wave3/01). They use Claude Code on weekends. They need help going from prototype to production.

---

## 3. The Product

### Core Offer: CuratedFlows is a storefront for production-grade Claude Code systems + consulting sprints to install and customize them.

**What CuratedFlows actually sells (reframed from research):**

Not "AI automation skills." Not "a marketplace." Not "an agency."

CuratedFlows sells **Claude Code that works like a senior engineer set it up** -- memory persistence, multi-agent coordination, security checks, and deployment guardrails. Packaged as installable flows that turn Claude Code from "smart autocomplete" into a production system (wave3/08).

### Product Ladder

| Tier | Product | Price | What They Get | Purpose |
|------|---------|-------|---------------|---------|
| **Free** | /vibecheck security audit | $0 | 7 automated checks scanning for the vulnerabilities AI creates (wave3/08 Ad 3, composite 9.4) | Lead magnet. Captures email. Shows immediate value. |
| **Self-Serve** | Individual flows (CLAUDE.md systems, memory persistence, multi-agent workflows) | $29-99 | One-command install. Production-grade system for a specific capability. Tested, verified, supported. | Revenue + top-of-funnel for Sprint. |
| **Starter Kit** | Stack-specific setup bundle (Next.js + Supabase, React + Firebase) | $49-149 | CLAUDE.md template + hooks + conventions guide + .claudeignore for the most common stacks | Bridge between self-serve and Sprint. |
| **Sprint** | Done-with-you project setup | $500-1,500 | 2-4 hours with Misha. Custom CLAUDE.md, hooks, architecture doc, security guardrails, testing conventions -- all tailored to the founder's specific project (wave3/04). | Primary revenue driver. |
| **Monthly Checkpoint** | Async code review + security scan retainer | $200-400/month | 2-3 hours/month. "Here's what's degrading" report. Prevents Day 90 technical debt reckoning (wave3/04). | Recurring revenue. Target 5-10 clients = $1K-4K/mo. |
| **Emergency Fix** | "My app is broken and I don't know why" | $200-500/incident | Shared debugging session. Captures panic buyers (wave3/04). | Opportunistic revenue. |

**Evidence for pricing:**
- Vibecoders spend $40-170/mo on tools already (wave3/04). $29-99 for a flow is a rounding error.
- Rescue agencies charge $2,500+ per engagement (wave3/07). A $500 preventive Sprint is 5x cheaper.
- Production bug costs a startup $8K-$25K (wave3/04). $500 for prevention is a no-brainer.
- Security incident costs 6+ months of growth (wave3/04). /vibecheck as lead magnet has visceral value.
- Upwork Claude specialists charge $50-200/hr (wave3/07). Sprint at $500-1,500 is competitive for 2-4 hours.

### Lead Magnet: /vibecheck

The free security audit is the highest-performing lead magnet concept across all research (wave3/08, composite score 9.4). It maps directly to the audience's fear: 196/198 vibecoded apps had security vulnerabilities, and non-developers cannot catch them (wave3/01, wave3/02). One command, results in 2 minutes, immediate value. Captures email for follow-up.

---

## 4. Positioning & Tagline

### Tagline

**CuratedFlows: Claude Code that remembers.**

Alternative: **CuratedFlows: Professional Claude Code workflows. One command to install.**

### Elevator Pitch (one paragraph)

CuratedFlows sells production-grade Claude Code systems to vibecoders who are tired of re-explaining their project every session, shipping security vulnerabilities they can't see, and watching their apps fall apart at day 90. Each flow is a CLAUDE.md + skills + hooks package that installs in one command and turns Claude Code from smart autocomplete into a reliable production system -- memory persistence, multi-agent coordination, automated security checks. For builders who need more than a template but less than a $2,500 audit, CuratedFlows offers Sprint sessions where Misha configures everything for your specific project in 2-4 hours.

### How CuratedFlows Is Different

| Competitor Type | What They Offer | What CuratedFlows Does Differently |
|-----------------|-----------------|-------------------------------------|
| **Free skill directories** (SkillsMP, GitHub awesome-lists) | 96K+ free skills, no curation, 12-20% were malware (wave3/03) | Verified, tested, sophisticated multi-agent systems -- not single-file skills |
| **Courses** ($10-800, Udemy/Maven/Coursera) | Teach tool operation. Generic. Not project-specific (wave3/07) | Done-with-you. Configured for YOUR project, YOUR stack, YOUR conventions |
| **Rescue agencies** ($2,500+, VibeAudits, Varyence) | Reactive. Fix what's already broken (wave3/07) | Preventive. Set up right from Day 1 so it doesn't break at Day 90 |
| **Upwork freelancers** ($50-200/hr, custom quotes) | Unstructured, hourly, no productized deliverable (wave3/07) | Fixed-price Sprint. Clear scope, clear deliverable, clear timeline |
| **Anthropic official marketplace** | Small catalog, slow review, auto-available (wave3/03) | Opinionated, sophisticated systems. Not basic skills -- multi-agent architectures |

---

## 5. Channel Strategy

### Budget Allocation: $750/month

| Channel | Monthly Budget | Role | Why |
|---------|---------------|------|-----|
| **Google Search** | $300 (40%) | Capture high-intent searches | "Claude Code keeps forgetting," "vibecoding security," "hire Claude Code expert" -- people already looking for what CuratedFlows sells. CPC $2-8 for vibecoder queries. Zero competition on most terms (wave3/08). |
| **Reddit** | $250 (33%) | Direct audience access | r/ClaudeCode has 4,200+ weekly contributors. Reddit promoted posts that look organic achieve 4.7x ROAS. 9/10 Reddit users trust the platform for product discovery. $10-15/day is viable (wave3/08). |
| **YouTube** | $200 (27%) | Visual demo + awareness | Pre-roll on Claude Code tutorials is hyper-targeted. CPV $0.02-0.05 for niche tech content. Vibecoders learn by watching, not reading (wave3/08). |
| **Meta** | $0 | Skip | $15/day is 10x below Meta's recommended minimum for B2B ($150+/day). Algorithm can't learn with this budget. Vibecoders don't discover tools on Facebook (16-counter-evidence, wave3/08). |
| **LinkedIn** | $0 paid / organic only | Organic content from Misha's profile | Personal profiles generate 8x more engagement than company pages. 3-5 posts/week, 10-20 comments/day on ICP posts. $0 cost, 10-12 hrs/week (15-linkedin-strategy). TLAs ($50-100/post) only after organic base established (Month 3+). |
| **Twitter/X** | $0 initially | Organic + $5/day after Month 2 | Where vibecoding discourse happens. Awareness, not conversion. Build-in-public content, share CLAUDE.md setups, post Sprint results. |

### Reddit: Which Subreddits

| Subreddit | Members | Fit | Strategy |
|-----------|---------|-----|----------|
| r/ClaudeCode | 4,200+ weekly | Perfect | Promoted posts targeting frustration queries. Share CLAUDE.md templates as organic content. |
| r/ClaudeAI | Large | Strong | Context loss and quality regression threads. Organic "here's how I fixed it" posts. |
| r/vibecoding | 153K+ | Strong | Show-and-tell + "here's my setup" format. Promoted posts. |
| r/SideProject | Large | Medium | Launch announcements for self-serve flows. |
| r/EntrepreneurRideAlong | Active | Medium | Sprint case studies: "I set up a founder's Claude Code in 3 hours" |

### YouTube: What Content

1. **"Claude Code Keeps Forgetting? Here's the Fix"** -- frustration-driven tutorial, doubles as ad creative
2. **"I Set Up a Founder's Claude Code in 3 Hours -- Full Sprint Walkthrough"** -- demonstrates the Sprint product
3. **"Your Vibecoded App Has Security Holes: 7 Things to Check"** -- fear-driven, leads to /vibecheck
4. **"You're Using 10% of Claude Code"** -- mastery-driven, shows multi-agent systems
5. **"Claude Code CLAUDE.md Template -- Copy This Exactly"** -- pure value, SEO play

### LinkedIn: Relevant or Not?

**Yes for organic, no for paid.** LinkedIn has 80% of B2B social leads and PMs are a secondary persona (15-linkedin-strategy). But LinkedIn ads require $1,500+/month minimum to exit learning phase. At $750/month total, zero should go to LinkedIn ads. Instead: 3-5 organic posts/week from Misha's personal profile, 10-20 comments/day on PM and founder posts, bi-weekly newsletter. Expected timeline: 30-60 days to first inbound DMs, 60-90 days to consistent pipeline (15-linkedin-strategy).

---

## 6. Ad Campaign -- Google Search

### Final Keyword List (validated winners only, from 18-query-validation and 23-google-ads-validation)

**Tier 1: Highest Intent, Lowest Competition (start here)**

| Keyword | Est. CPC | Competition | Why |
|---------|----------|-------------|-----|
| "Claude Code keeps forgetting" | $1-3 | Very low | Exact pain point. Zero ads currently (wave3/08) |
| "Claude Code memory" / "Claude Code context loss" | $1-3 | Very low | Same pain, alternative phrasing |
| "CLAUDE.md template" / "CLAUDE.md examples" | $1-3 | Very low | People already looking for the product |
| "vibecoding security" / "vibecoded app security audit" | $2-5 | Very low | Fear-driven, leads to /vibecheck |
| "hire Claude Code expert" / "Claude Code consultant" | $3-8 | Low | Transactional intent (wave3/06) |
| "someone to set up Claude Code for me" | $3-6 | Low | Natural language hire-intent (18-query-validation) |
| "Claude Code multi-agent" / "Claude Code subagents" | $1-3 | Very low | Power user searches |

**Tier 2: Broader, Moderate Competition**

| Keyword | Est. CPC | Competition | Why |
|---------|----------|-------------|-----|
| "done for you AI automation" | $4-8 | Low-medium | Perfect intent match (18-query-validation) |
| "how to use Claude AI for my business" | $2-5 | Very low | Claude-curious business owners (18-query-validation) |
| "Claude Code workflows" / "Claude Code skills" | $2-5 | Low | Discovery searches |
| "vibecoding course" / "Claude Code course" | $3-8 | Medium | Capture course shoppers, redirect to Sprint |

**Negative Keywords:**
`jobs`, `career`, `salary`, `free`, `open source`, `GitHub`, `tutorial` (for bottom-funnel campaigns only), `enterprise`, `Salesforce` (08-google-ads-strategy)

### Three RSAs

**RSA 1: The Memory Fix (Bottom-Funnel)**

Headlines:
1. `Claude Keeps Forgetting Your Project?`
2. `Fix Claude Code's Memory Problem`
3. `CLAUDE.md Systems That Actually Work`
4. `Session Persistence for Claude Code`
5. `Stop Re-Explaining Your Project`
6. `One Install. Claude Remembers Everything.`
7. `Multi-Agent Workflows for Claude Code`
8. `Professional Claude Code Setup`
9. `Built by Someone Running 6 Projects`
10. `Install in One Command`
11. `Context Survives Compaction`
12. `Used by Vibecoders Building Real Products`
13. `From $29 — No Subscription Required`
14. `Sprint Setup: $500 for Your Project`
15. `Free Security Audit Included`

Descriptions:
1. `Tired of re-explaining your project every session? Install a CLAUDE.md system that keeps Claude's memory across sessions, agents, and compaction. One command.`
2. `Professional Claude Code workflows used across 6 live products. Memory persistence, multi-agent coordination, security checks. From $29 or book a Sprint.`
3. `196 of 198 vibecoded apps had security vulnerabilities. CuratedFlows includes /vibecheck — 7 automated security checks. Run it free on any project.`
4. `Not a course. Not a template. An actual production system for Claude Code. Install in one command. See what changes immediately.`

Pin strategy: Pin "Claude Keeps Forgetting Your Project?" to Headline 1.

**RSA 2: The Security Angle**

Headlines:
1. `45% of AI Code Has Security Flaws`
2. `Is Your Vibecoded App Secure?`
3. `Free Security Audit for Claude Code`
4. `/vibecheck: 7 Automated Security Checks`
5. `Results in 2 Minutes. No Cost.`
6. `196/198 Vibecoded Apps Had Vulnerabilities`
7. `Don't Ship What You Can't Audit`
8. `Security Checks Built Into Every Flow`
9. `Trusted by Builders, Not Just Devs`
10. `One Command. Know Your Risk.`
11. `Fix It Before Your Users Find It`
12. `From the Creator of /vibecheck`
13. `curatedflows.com/vibecheck`
14. `Professional Claude Code Workflows`
15. `Audit → Fix → Ship Safely`

Descriptions:
1. `Veracode found 45% of AI-generated code fails security tests. Run /vibecheck on your project — 7 automated checks, results in 2 minutes, completely free.`
2. `Non-developers can't catch SQL injection, exposed API keys, or broken auth. /vibecheck scans your vibecoded project for the vulnerabilities AI creates.`
3. `Every CuratedFlows workflow includes built-in security checks. Don't bolt on security after shipping — build it in from Day 1. Free audit at curatedflows.com.`
4. `One Lovable showcase app exposed 18,697 users. One Claude Code project deleted 1,206 records. Know your risk before your users do. Free scan.`

**RSA 3: The Sprint Service**

Headlines:
1. `Your Claude Code, Set Up Right`
2. `Done-With-You Claude Code Sprint`
3. `$500: Your Project, Configured Properly`
4. `CLAUDE.md + Hooks + Security in 3 Hours`
5. `Stop Your Day 90 Technical Debt`
6. `Preventive Setup, Not Rescue`
7. `Built for Vibecoders, by a Vibecoder`
8. `Custom Setup for Your Specific Stack`
9. `Book a Sprint. Ship With Confidence.`
10. `Next.js + Supabase? React + Firebase?`
11. `Architecture That Survives 1000 Sessions`
12. `Rescue Agencies Charge $2,500+. We Prevent.`
13. `Fixed Price. No Hourly Surprises.`
14. `Memory Persistence Across Every Session`
15. `5x Cheaper Than Fixing What Breaks`

Descriptions:
1. `In a 2-4 hour Sprint, I configure CLAUDE.md, hooks, .claudeignore, architecture docs, and security guardrails — all tailored to your project. $500-1,500.`
2. `Rescue agencies charge $2,500+ to fix broken vibecoded apps. A $500 preventive Sprint sets up Claude Code right so it doesn't fall apart at Day 90.`
3. `Most vibecoded projects break between Day 30-90. Duplicated logic, inconsistent conventions, security holes. A Sprint prevents all of it. Book at curatedflows.com.`
4. `Not a course. I join your project for 3 hours and configure everything: CLAUDE.md, memory persistence, testing conventions, security checks. You keep building.`

### Landing Page Requirements

Three dedicated pages (not a generic homepage):

1. **curatedflows.com/vibecheck** -- Free security audit. Hero: "196 of 198 vibecoded apps had security vulnerabilities. Yours probably does too." Terminal screenshot showing /vibecheck running. Install command. Email capture. Upsell to flows.

2. **curatedflows.com/flows** -- Self-serve storefront. Categories: Memory Systems, Security, Multi-Agent, Deployment. Each flow shows: what it does (in plain English), before/after screenshot, install command, price. No jargon.

3. **curatedflows.com/sprint** -- Sprint booking. Hero: "Your Claude Code project, set up right in 3 hours." Three steps (Book / Sprint / Ship). What's included. Pricing ($500-1,500 depending on complexity). Testimonials (once available). Cal.com booking link.

Technical: Load < 3 seconds. Mobile-first. No navigation menu on ad landing pages. Google Ads conversion pixel + Reddit pixel. UTM parameters on every ad.

---

## 7. Ad Campaign -- Reddit

### Subreddit Targeting

| Subreddit | Format | Budget |
|-----------|--------|--------|
| r/ClaudeCode | Promoted post | $100/month |
| r/ClaudeAI | Promoted post | $75/month |
| r/vibecoding | Promoted post | $75/month |

### Promoted Post Concepts

**Post 1: "The Amnesia Fix" (wave3/08 Ad 1, composite 9.0)**

*Subreddit:* r/ClaudeCode

*Title:* Claude Code forgets your project after every session. This CLAUDE.md fixes that.

*Body:* I got tired of re-explaining my project to Claude every time I opened a new session. So I built a memory system -- a CLAUDE.md + session persistence layer that keeps Claude's context across sessions, across agents, across compaction events. It remembers your architecture decisions, your coding conventions, your open threads. One install command. Works with any project. I've been running this on 6 projects for 3 months and Claude hasn't "forgotten" a single session since.

*Visual:* Screenshot showing Claude Code greeting: "Last session you were working on the payment integration. The Stripe webhook is deployed but the retry logic on line 47 still needs the edge case we discussed. Want to pick up there?"

*CTA:* Link to curatedflows.com/flows/memory

**Post 2: "The Security Check" (based on wave3/08 Ad 3)**

*Subreddit:* r/vibecoding

*Title:* I scanned 198 vibecoded apps. 196 had security vulnerabilities. Here's a free tool to check yours.

*Body:* [Link to /vibecheck landing page with install instructions and what it checks]

**Post 3: "The Setup Post" (organic style)**

*Subreddit:* r/ClaudeCode

*Title:* Here's the CLAUDE.md I use across 6 production projects. Feel free to steal it.

*Body:* Genuine value post sharing a real CLAUDE.md template. Mentions CuratedFlows as source only at the end. "If you want the full system with hooks, memory persistence, and security checks, I packaged it at curatedflows.com."

### Reddit Rules

- Never sound like marketing. Write like a user sharing a tool.
- Always provide genuine value in the post itself. Don't tease.
- Expect hostile comments. Answer every one helpfully.
- Frequency cap: 1 promoted post per subreddit per week maximum.
- Kill any post with <0.5% CTR after 3 days.

---

## 8. Content Calendar -- First 30 Days

### Week 1: Foundation

| Day | Platform | Content | Purpose |
|-----|----------|---------|---------|
| Mon | Reddit (organic) | "Here's my CLAUDE.md template for multi-project workflows" on r/ClaudeCode | Establish credibility. Zero selling. |
| Tue | YouTube | Upload: "Claude Code Keeps Forgetting? Here's the Fix (2026)" -- 8 min tutorial | SEO + ad creative fuel |
| Wed | LinkedIn | Post: "I run 6 Claude Code projects simultaneously. Here's the system that makes it work." (carousel) | Build authority with PM/founder audience |
| Thu | Twitter/X | Thread: "63% of vibecoders aren't developers. Here's what they struggle with most (and how to fix each one)" | Awareness. Tag @AnthropicAI |
| Fri | Reddit (organic) | Comment helpfully on 10+ r/ClaudeCode threads about context loss | Community presence |

### Week 2: Launch Ads

| Day | Platform | Content | Purpose |
|-----|----------|---------|---------|
| Mon | Google Ads | Launch RSA 2 (Security) targeting "vibecoding security" keywords | Capture high-intent security searches |
| Mon | Reddit | Launch promoted post 1 ("Amnesia Fix") on r/ClaudeCode | Direct audience, native format |
| Tue | YouTube | Upload: "Your Vibecoded App Has Security Holes: 7 Things to Check" | SEO + /vibecheck funnel |
| Wed | LinkedIn | Post: "196 of 198 vibecoded apps had security vulnerabilities. Here's a free tool." | Drive /vibecheck installs |
| Thu | Twitter/X | Post: "I built /vibecheck because I got tired of finding the same 7 security holes in every vibecoded project" | Build-in-public |
| Fri | Reddit (organic) | Share /vibecheck on r/vibecoding as a free tool | Organic reach + credibility |

### Week 3: Sprint Promotion

| Day | Platform | Content | Purpose |
|-----|----------|---------|---------|
| Mon | Google Ads | Launch RSA 1 (Memory Fix) targeting "Claude Code memory" keywords | Expand keyword coverage |
| Mon | Google Ads | Launch RSA 3 (Sprint) targeting "hire Claude Code expert" keywords | Capture hire-intent |
| Tue | YouTube | Upload: "I Set Up a Founder's Claude Code in 3 Hours -- Full Sprint Walkthrough" | Demonstrate Sprint product |
| Wed | LinkedIn | Post: "Most vibecoded projects break between Day 30-90. Here's the predictable failure timeline and how to prevent it." (data from wave3/04) | Lead gen for Sprint |
| Thu | YouTube Ads | Launch pre-roll ad targeting Claude Code tutorial viewers | Awareness at $0.02-0.05 CPV |
| Fri | Reddit | Launch promoted post 2 ("Security Check") on r/vibecoding | /vibecheck lead magnet |

### Week 4: Optimize + Double Down

| Day | Platform | Content | Purpose |
|-----|----------|---------|---------|
| Mon | All | Review all ad performance. Kill CTR < 0.5%. Double budget on winners. | Optimization |
| Tue | YouTube | Upload: "You're Using 10% of Claude Code -- Here's the Other 90%" | Mastery hook content |
| Wed | LinkedIn | Post: Case study from first Sprint client (if available) OR "What I learned configuring 6 Claude Code projects" | Social proof |
| Thu | Twitter/X | Thread: "The vibecoding disillusionment cycle is real. But the builders who survive it are the ones who..." | Thought leadership |
| Fri | Reddit (organic) | "Here's my CLAUDE.md" post on r/ClaudeCode (updated version with results) | Ongoing credibility |

---

## 9. Sales Process

### From First Touch to Closed Sprint ($500-$1,500)

**Step 1: First Touch (Day 0)**
- Prospect finds CuratedFlows via: Google ad, Reddit post, /vibecheck install, YouTube video, or organic content
- They either: install /vibecheck (free), buy a self-serve flow ($29-99), or visit curatedflows.com/sprint

**Step 2: Lead Capture (Day 0-1)**
- /vibecheck users: prompted to enter email for full results report + "Want someone to fix these? Book a Sprint."
- Flow buyers: post-purchase email with "Need custom setup for your project? Book a Sprint."
- Sprint page visitors: Cal.com booking form with 3 fields: Name, Project Description, Stack (dropdown)

**Step 3: Discovery Call (Day 1-3)**
- 15-minute call (not 30 -- vibecoders value speed)
- Questions: What are you building? What stack? What's breaking? What have you tried?
- Determine if Sprint, Monthly Checkpoint, or Emergency Fix is the right product
- If Sprint: describe exactly what they'll get (custom CLAUDE.md, hooks, .claudeignore, architecture doc, security guardrails)
- 96% of SMB purchases are made by the CEO alone (17-gaps-found). No committee. Decision on the call.

**Step 4: Proposal (Day 1-3)**
- Send same-day. Proposals sent within 24 hours close 35% faster (17-gaps-found).
- One-page: What we'll do, what you'll have afterward, price, timeline (this week), payment link
- Accept credit cards via Stripe. If they have to wire or invoice, the deal dies.

**Step 5: Sprint Delivery (Day 3-10)**
- Schedule 2-4 hour session via Cal.com
- Misha joins their project in a shared screen/terminal session
- Deliver: Custom CLAUDE.md, hooks configuration, .claudeignore, architecture document, testing conventions, security guardrails
- Walk them through everything. They understand what was built and why.

**Step 6: Follow-Up (Day 14)**
- Check-in email: "How's Claude behaving? Anything breaking?"
- Offer Monthly Checkpoint ($200-400/mo) for ongoing reviews
- Ask for testimonial if they're happy

**Step 7: Retention (Ongoing)**
- Monthly Checkpoint clients get: async code review + security scan + "here's what's degrading" report
- Quarterly optimization review: what's new in Claude Code, what should we update
- Complexity ladder: start with simple setup, introduce multi-agent systems, then deployment automation (17-gaps-found)

**Target sales cycle:** 3-7 days from first touch to Sprint delivery. Maximum 14 days.

---

## 10. Pricing Strategy

### Price Points and Evidence

| Product | Price | Evidence | Frame |
|---------|-------|----------|-------|
| /vibecheck | Free | Lead magnet. 45% of AI code has vulnerabilities (wave3/04). Immediate value creates trust. | "Find out what's wrong before your users do" |
| Individual flow | $29-99 | Skills marketplace norm is $5-15 but those are simple .md files. CuratedFlows sells multi-agent systems with installers, not individual skills. The $19-79 range for AI digital products on Gumroad validates this (wave3/03). | "Less than one hour of Upwork consulting. Works forever." |
| Starter Kit bundle | $49-149 | Bundles of 3-5 related flows tested together justify 2-3x individual pricing (wave3/03). | "Your entire stack, configured in one install" |
| Sprint | $500-1,500 | Rescue agencies charge $2,500+ (wave3/07). Upwork Claude specialists $50-200/hr for 2-4 hours = $100-800 but unstructured. Sprint is the productized middle ground. Founders' typical project budgets: $3K-$10K; $500 is 5-15% of budget (wave3/04). | "5x cheaper than fixing what breaks" |
| Monthly Checkpoint | $200-400/mo | Codementor charges $120-450/mo for generic mentoring (wave3/04). This is specialized. Average client lifetime with proactive retention: 24+ months vs 8 months without (17-gaps-found). | "Cheaper than your Claude Code subscription. Catches what it misses." |
| Emergency Fix | $200-500/incident | Production bug costs $8K-$25K (wave3/04). $200-500 for a fix is 2-6% of the alternative cost. | "Fix it now, not next week" |

### Value Framing

**Lead with cost avoided, not time saved** (10-pricing-research). "A production bug costs $8K-$25K. A security incident costs 6+ months of growth. A $500 Sprint prevents both."

**Anchor against rescue, not against free.** "Rescue agencies charge $2,500 to fix broken vibecoded apps. CuratedFlows prevents the break for $500." Never anchor against free GitHub skills -- that's a race to the bottom.

**Show the Day 30-90 timeline** (wave3/04):
- Day 1-7: Everything works. Founder feels invincible.
- Day 30: Duplicated logic, inconsistent error handling, 15-20 undiscussed dependencies.
- Day 60: 2-day features take 2 weeks. First edge case collisions.
- Day 90: 20-30% of capacity consumed by bugs from original implementation.

"A Sprint on Day 1 costs $500. A rescue on Day 90 costs $2,500+. The math writes itself."

---

## 11. 30-60-90 Day Plan

### Days 1-30: Launch

| Week | Deliverable | Success Metric |
|------|------------|----------------|
| Week 1 | curatedflows.com live with 3 pages (/vibecheck, /flows, /sprint). 3+ flows in store. /vibecheck working. Cal.com booking connected. Stripe payments working. | Pages load < 3s. Stripe test payment works. |
| Week 1 | 2 organic Reddit posts on r/ClaudeCode (CLAUDE.md template share + /vibecheck announcement) | 50+ upvotes combined |
| Week 1 | 1 YouTube video uploaded ("Claude Code Keeps Forgetting?") | Published |
| Week 2 | Google Ads live: RSA 2 (Security) + RSA 1 (Memory). $15/day. | Ads approved. Impressions flowing. |
| Week 2 | Reddit promoted post live on r/ClaudeCode. $8/day. | CTR > 0.5% |
| Week 2 | LinkedIn: 5 posts published from Misha's profile | 3+ posts with 10+ engagement |
| Week 3 | YouTube pre-roll ad live. $7/day. | CPV < $0.08 |
| Week 3 | Google Ads: RSA 3 (Sprint) added. | 3 campaigns running |
| Week 4 | Review all metrics. Kill underperformers. Double winners. | See Metrics section |
| **Month 1 targets** | **10+ /vibecheck installs, 5+ flow sales, 2+ Sprint discovery calls, 1+ Sprint closed** | **Revenue target: $500-2,000** |

### Days 31-60: Optimize

| Week | Deliverable | Success Metric |
|------|------------|----------------|
| Week 5-6 | Add 3 more flows to store based on Sprint client feedback. Refresh ad creative. | 6+ flows in store |
| Week 5-6 | Publish 2 more YouTube videos. Start YouTube mid-roll ads if pre-roll CPV is good. | 4+ videos total |
| Week 7-8 | Launch Twitter/X organic strategy: 3-5 posts/week. $5/day promoted tweets if budget allows. | 500+ followers |
| Week 7-8 | First Sprint case study published (with client permission). Use in all channels. | Case study live |
| Week 7-8 | Start Monthly Checkpoint pilot with Sprint clients. | 1-2 retainer clients |
| **Month 2 targets** | **30+ /vibecheck installs, 15+ flow sales, 5+ Sprint calls, 3+ Sprints closed, 1+ retainer** | **Revenue target: $2,000-5,000** |

### Days 61-90: Scale

| Week | Deliverable | Success Metric |
|------|------------|----------------|
| Week 9-10 | Launch Starter Kit bundle ($49-149). Test LinkedIn Thought Leader Ads ($50-100 boosting best organic post). | Bundle live. TLA CTR > 2% |
| Week 9-10 | Build referral program: $100-250 per closed Sprint from referring partners. Recruit 5 partners (business coaches, Shopify devs, startup advisors). | 5 partners recruited |
| Week 11-12 | Monthly webinar: "Watch Me Set Up Claude Code for a Real Project" -- live Sprint demo. Promote via email list + LinkedIn + Reddit. | 20+ attendees, 3+ Sprint leads |
| Week 11-12 | Evaluate: Is YouTube or Reddit delivering better ROI? Shift budget accordingly. | Clear winner identified |
| **Month 3 targets** | **50+ /vibecheck installs, 30+ flow sales, 8+ Sprint calls, 5+ Sprints closed, 3+ retainers** | **Revenue target: $4,000-10,000** |

---

## 12. Risks & Mitigations

### Risk 1: Anthropic builds an official marketplace
**Severity:** High. GitHub feature request #30727 has traction (wave3/03).
**Timeline:** 6-12 months.
**Mitigation:** CuratedFlows sells sophisticated multi-agent systems and Sprint consulting, not individual skills. If Anthropic launches a marketplace, CuratedFlows becomes one of the premium sellers on it, not a competitor to it. The consulting pipeline (Sprints, retainers) is unaffected by a skills marketplace. Start building email list and client relationships now so the brand has gravity before any marketplace launches.

### Risk 2: Skills get commoditized to free
**Severity:** Medium. SkillsMP already has 96K+ free skills. The $5-15 price ceiling for individual skills is real (wave3/03).
**Timeline:** Already happening.
**Mitigation:** Never compete on individual skills. Compete on: (a) multi-file, multi-agent systems that are hard to replicate, (b) curation trust after the malware crisis, (c) Sprint consulting as the primary revenue driver. The skill storefront is top-of-funnel, not the business model.

### Risk 3: Vibecoding disillusionment deepens
**Severity:** Medium. Developer favorability dropped from 77% to 60%. Trust in AI code accuracy: only 33% (wave3/01).
**Timeline:** Happening now (mid-2026).
**Mitigation:** Disillusionment is actually good for CuratedFlows. The builders who survive the hangover are exactly who needs professional Claude Code systems. Position CuratedFlows as "the adult in the room" -- not another hype tool, but the thing that makes vibecoding actually work. The /vibecheck security audit positions perfectly against the fear narrative.

### Risk 4: Claude Code quality degrades further
**Severity:** Medium-High. Median thinking length collapsed 73% Jan-Mar 2026. API retries up 80x (wave3/02).
**Timeline:** Ongoing, unpredictable.
**Mitigation:** Quality regressions increase demand for expert help. When Claude Code gets worse, more vibecoders hit walls and look for someone who can make it work. This is a tailwind, not a headwind -- as long as CuratedFlows' own flows are maintained and updated.

### Risk 5: Solo operator capacity ceiling
**Severity:** High. A solo operator can run 3-4 Sprint clients per month at $500-1,500 each = $1,500-6,000/month ceiling (16-counter-evidence).
**Timeline:** Month 3-6 when pipeline fills.
**Mitigation:** (a) Self-serve flows scale infinitely with zero marginal cost. (b) Monthly Checkpoints are async (2-3 hours per client per month), stack to 10+ clients. (c) Sprints can be scoped smaller (2 hours at $500) to increase throughput. (d) If demand exceeds capacity, raise Sprint prices to $1,500-2,500. (e) Long-term: train a second operator or build automated setup tools.

---

## 13. Metrics & Kill Criteria

### Weekly Dashboard

| Metric | Source | "Keep Going" | "Investigate" | "Pivot" |
|--------|--------|-------------|---------------|---------|
| /vibecheck installs | Google Analytics | 3+/week | 1-2/week | 0 for 2 weeks |
| Flow sales | Stripe | 2+/week | 1/week | 0 for 2 weeks |
| Sprint discovery calls | Cal.com | 2+/week | 1/week | 0 for 3 weeks |
| Sprint close rate | Manual | >25% | 15-25% | <15% |
| Google Ads CTR | Google Ads | >3% | 1-3% | <1% after 2 weeks |
| Google Ads CPC | Google Ads | <$5 | $5-10 | >$10 consistently |
| Reddit promoted post CTR | Reddit Ads | >0.5% | 0.3-0.5% | <0.3% |
| YouTube CPV | YouTube Ads | <$0.05 | $0.05-0.10 | >$0.10 |
| Cost per Sprint lead | All channels | <$100 | $100-200 | >$200 |
| Monthly revenue | Stripe | Growing MoM | Flat | Declining 2 months |

### Kill Criteria

**Kill the self-serve storefront if:** <10 flow sales in first 60 days despite 500+ visitors. This means the product-market fit isn't there for self-serve. Pivot to Sprint-only model.

**Kill Google Search ads if:** CPC consistently >$10 and CTR <1% after 30 days of optimization. Reallocate to Reddit.

**Kill Reddit ads if:** CTR <0.3% across all promoted posts after testing 5+ concepts. Switch to organic-only.

**Kill YouTube ads if:** CPV >$0.10 after 30 days. The audience isn't responding to video.

**Pivot the entire model if:** 0 Sprint clients after 90 days with consistent traffic (500+ visitors/month). This means the audience doesn't want done-with-you consulting. Pivot to pure product (larger flow bundles) or pure content (paid newsletter/course).

**The north star metric:** Sprint clients per month. Everything else (flows, /vibecheck, content, ads) exists to fill the Sprint pipeline. If Sprints are closing, the model works. If they're not, nothing else matters.

### Revenue Milestones

| Month | Target | Composition |
|-------|--------|-------------|
| Month 1 | $500-2,000 | 1 Sprint + 5 flow sales |
| Month 2 | $2,000-5,000 | 3 Sprints + 15 flow sales + 1 retainer |
| Month 3 | $4,000-10,000 | 5 Sprints + 30 flow sales + 3 retainers |
| Month 6 | $8,000-15,000 | 5 Sprints ($7,500) + flows ($1,500) + 5 retainers ($2,000) |
| Month 12 | $10,000-20,000 | Sprints at higher prices + retainers + self-serve at scale |

These are conservative estimates based on counter-evidence analysis: median solo operator earns $3K-$8K/month in Year 1, not the $15K-$100K claimed by survivorship-biased reports (16-counter-evidence). Plan for the median. Be pleasantly surprised by the upside.

---

*Research files referenced throughout. Key citations:*
- *wave3/01-vibecoder-profile.md — audience demographics, pain points, communities*
- *wave3/02-claude-code-frustrations.md — failure modes, context loss, quality regressions*
- *wave3/03-skill-buying-behavior.md — marketplace landscape, price ceilings, trust crisis*
- *wave3/04-founder-vibecoder-needs.md — product shape, willingness to pay, competitive landscape*
- *wave3/05-vibecoding-market-size.md — 15-25M vibecoders, TAM calculation*
- *wave3/06-vibecoder-search-queries.md — 130+ validated queries by intent category*
- *wave3/07-vibecoder-competitors.md — courses, communities, consulting, events, gaps*
- *wave3/08-vibecoder-ad-concepts.md — 5 validated ad concepts with scores, platform recs*
- *16-counter-evidence.md — budget reality, income expectations, structural risks*
- *17-gaps-found.md — sales process, retention, referrals, webinars*
- *18-query-validation.md — live SERP validation, "done for you" as money phrase*
- *23-google-ads-validation.md — 7/20 original keywords survived, 10 new zero-competition keywords*
- *10-pricing-research.md — price ranges, value framing, ROI math*
- *11-adoption-barriers.md — trust signals, guarantees, barrier severity ranking*
- *15-linkedin-strategy.md — organic vs paid, TLA case studies, budget thresholds*
