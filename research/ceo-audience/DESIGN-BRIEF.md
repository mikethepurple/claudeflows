# CuratedFlows — Website Design Brief

**Date:** 2026-04-17
**Brand:** CuratedFlows (curatedflows.com)
**Stack:** Next.js 15 + Tailwind CSS + Supabase
**Based on:** 31 research agents, 22 research files, real audience data

---

## 1. The Brand

**CuratedFlows** is a storefront for production-grade Claude Code systems — multi-agent workflows, memory persistence, session management, security checks, and smart installers. It also offers done-with-you Sprint sessions where the founder behind CuratedFlows configures everything for a builder's specific project.

**Tagline:** "Claude Code that remembers."

**What CuratedFlows is not:**
- Not a free skills directory (there are 96K+ free skills already — CuratedFlows sells sophisticated systems, not .md files)
- Not an AI automation agency (that term is polluted by low-skill course graduates flooding the market)
- Not a course platform (courses teach tool operation, CuratedFlows delivers configured, working systems)
- Not a rescue service (rescue agencies charge $2,500+ to fix broken projects — CuratedFlows prevents the break)

---

## 2. The Audience

### Primary: Vibecoders / Non-Technical Builders

People who build software using AI coding tools without being professional developers. 63% of the vibecoding community are non-developers — founders, product managers, designers, marketers. Estimated 15-25M globally, growing 50%+ annually.

**Demographics:**
- Age 28-44, mostly millennials
- Founders, side-project builders, PMs, technical-adjacent professionals
- Already paying $40-170/month on Claude Code, Cursor, or similar tools
- US market primary target

**Psychographics:**
- They call themselves "builders" not "coders" or "developers"
- They say "I vibed this out" not "I programmed this"
- They describe outcomes, not process ("I built an app that does X" not "I wrote a React component")
- They are proud of building but anxious about quality, security, and maintenance
- They are in the DISILLUSIONMENT PHASE of vibecoding (April 2026) — initial excitement has faded, trust in AI code accuracy dropped to 33%, they've hit real walls
- They don't read code output carefully. Some don't read it at all.

**Their top pain points (ranked by severity):**
1. **Silent context loss** — Claude forgets everything at ~200K tokens with zero warning. The #1 trust-destroyer. They can't rebuild the understanding Claude lost.
2. **Security blindness** — 196 of 198 vibecoded apps audited had security vulnerabilities. They can't see SQL injection, exposed keys, or broken auth. They don't know what CSRF means.
3. **Bug whack-a-mole** — fix one thing, break two others. Claude sometimes changes tests to match wrong behavior instead of fixing code.
4. **File structure chaos** — Claude dumps files everywhere, creates duplicates, ignores folder conventions. They don't know what "good" looks like.
5. **Session resumption broken** — every terminal close = start from zero. 10-15 minutes of context rebuild per project switch.
6. **The deployment wall** — can build locally, can't ship. Docker, DNS, and credentials are foreign territory.
7. **Maintenance collapse at Day 30-90** — projects that worked initially fall apart as complexity grows. 20-30% of time consumed by bugs from original implementation by Day 90.

**What they search for:**
- "Claude Code keeps losing context"
- "Claude Code memory between sessions"
- "CLAUDE.md template"
- "vibecoding security audit"
- "hire Claude Code expert"
- "why does Claude Code keep breaking my project"
- "Claude Code vs Cursor for non-developer"

They do NOT search for: "AI agent framework," "agentic workflows," "MCP server configuration."

**Where they hang out:**
- Reddit: r/vibecoding (153K), r/ClaudeCode (4,200+ weekly), r/SideProject, r/ClaudeAI
- YouTube: Claude Code tutorial channels
- Twitter/X: vibecoding discourse, build-in-public
- Indie Hackers, Product Hunt
- Discord: vibec0de, src.club

### Secondary: Rusty Technical People

Engineering degree holders who haven't coded professionally in years. Comfortable in a terminal but can't review code line-by-line. They use Claude Code because it lets them build without writing code, but they understand architecture well enough to appreciate what a proper setup does. Higher willingness to pay.

### Tertiary: PMs Who Build

Product managers building prototypes to skip the sprint backlog. They use Claude Code on weekends. They need help going from prototype to production. "The PM who waits two sprints for engineering bandwidth is being replaced by the PM who built, tested, and iterated over a weekend."

---

## 3. Competitive Landscape: Why Every AI Skills Site Looks the Same

Every Claude Code skills marketplace in 2026 follows the same template:
- Dark mode (#0A0A0F to #13111C background)
- Purple/indigo accent (#6366F1)
- Card grid layout for browsing
- Monospace terminal blocks in the hero
- "Install in one command" as the headline
- Minimalist "modern SaaS" aesthetic
- Inter or system sans-serif typography

This includes: SkillsMP, ClaudeSkills.info, SkillHub, SkillsLLM, pawgrammer.com, and the current CuratedFlows site.

The result: a visitor landing on any of these sites cannot tell them apart from a screenshot. The dark+purple+cards design signals "developer tool directory" — which is exactly the audience that already has 96K+ free skills. It does not signal "curated, production-grade, worth paying $29-99 for."

**CuratedFlows needs to visually communicate:**
- This is NOT another free directory — this is where the serious stuff is
- These flows are complex, tested, and maintained — not one-file throwaway skills
- There's a real person behind this who builds with Claude Code every day
- You can buy a flow OR get a done-with-you Sprint
- Trust: verified, tested, no malware (12-20% of OpenClaw marketplace skills were malicious)

---

## 4. Current Site Structure

The existing site has these routes:

| Route | Purpose | Current State |
|-------|---------|---------------|
| `/` | Homepage | Hero + featured flows grid + how it works + blueprint tips + consulting CTA + email capture |
| `/skills` | Flow catalog | Category filter + card grid + request form |
| `/w/[name]` | Individual flow detail | Dynamic page per flow |
| `/consulting` | Consulting packages | 3 tiers (Sprint/Full Setup/Architecture) + add-ons + retainer + case studies + comparison table + FAQ |
| `/blog` | Blog index | 1 published post + 1 coming soon |
| `/blog/skills-i-install` | Blog post | "10 Claude Code skills I install on every project" |
| `/publish` | Creator guide | How to create and submit a flow |
| `/u/[author]` | Author profile | Per-author page |
| `/browse` | Browse page | Unclear purpose, may overlap with /skills |
| `/search` | Search | Flow search |
| `/api/og` | OG image generator | Dynamic OpenGraph images |
| `/api/subscribe` | Email capture | Supabase backend |
| `/api/workflows` | Workflows API | Data endpoint |

---

## 5. Proposed Site Structure

Based on the research, the site needs three new dedicated pages (for ad landing) and a restructured homepage. The blog and consulting pages need reframing but not full rebuilds.

### Pages Needed

| Route | Purpose | Ad Traffic? | Notes |
|-------|---------|-------------|-------|
| `/` | Homepage | Yes (organic, brand) | Complete rethink. See section 6. |
| `/vibecheck` | Free security audit landing page | Yes (Google Ads, Reddit) | NEW. Lead magnet. Highest-priority ad destination. |
| `/flows` | Flow catalog (rename from /skills) | Yes (Google Ads) | Reframe from "skills" to "flows." Emphasize complexity, testing, installer. |
| `/flows/[name]` | Individual flow detail (rename from /w/) | Organic | Needs before/after, complexity indicators, what's included. |
| `/sprint` | Sprint booking page | Yes (Google Ads, Reddit) | NEW. Dedicated landing for done-with-you consulting. NOT the current /consulting page — that has too many options. Sprint is the entry product. |
| `/consulting` | Full consulting menu | Organic, referral | Keep for existing visitors who want the full picture. Sprint/Full Setup/Architecture. |
| `/blog` | Blog index | Organic | Reframe tone. See section 7. |
| `/blog/[slug]` | Blog posts | Organic, SEO | Key content pieces drive organic traffic |
| `/publish` | Creator guide | Deprioritize | Not needed for launch. Can keep as-is. |

**Pages to remove or merge:**
- `/browse` → merge into `/flows`
- `/search` → inline search on `/flows` page
- `/u/[author]` → deprioritize (single-author store for now)

### Navigation

| Nav Item | Links To | Why |
|----------|----------|-----|
| CuratedFlows (logo) | `/` | Home |
| Flows | `/flows` | The catalog — the store shelves |
| Sprint | `/sprint` | The primary revenue product, deserves nav presence |
| Blog | `/blog` | Content + SEO |
| /vibecheck (accent button) | `/vibecheck` | CTA position — the free lead magnet always visible |

Drop "Consulting" from primary nav — it's accessible from `/sprint` as an upsell ("Need more? See full consulting packages"). The nav should have max 4-5 items.

---

## 6. Homepage — Section by Section

The homepage has one job: get the visitor to either run /vibecheck (free, captures email) or browse flows (leads to purchase or Sprint). Every section should move toward one of these actions.

### Section 1: Hero

**Current:** "Not another AI skills directory. These actually work." + CLI install block + two CTAs (Browse Flows / See consulting packages).

**Problem:** The CLI install block is the first thing visitors see. Vibecoders who are scared of the terminal (terminal fear is the #1 entry barrier, per research) will bounce. The hero currently speaks to people who already know what a CLI is and want to install something. It doesn't speak to someone who just discovered CuratedFlows from a Google ad about "Claude Code keeps forgetting."

**What the hero should do:**
- Name the pain they're feeling right now ("Claude forgets your project every session")
- Show the fix exists ("CuratedFlows makes it remember")
- Give them an immediate action that costs nothing (/vibecheck or browse flows)
- NOT lead with a terminal block — that's a how-it-works detail, not a hook

**Hero content structure:**
1. Eyebrow text: what CuratedFlows is in one line
2. Headline: name the pain or promise the outcome
3. Subheadline: 1-2 sentences expanding on how
4. Primary CTA: "Run /vibecheck free" or "Browse flows"
5. Secondary CTA: "Book a Sprint" (for ready-to-buy visitors)
6. Trust line: "Production-tested. Verified. No malware."

### Section 2: The Problem (NEW)

A section that doesn't exist currently. It should articulate what goes wrong with unconfigured Claude Code — the problems the audience recognizes from their own experience.

**Content:** 3-4 pain points as cards or a visual timeline:
- "Claude forgets everything after 200K tokens — no warning"
- "196 of 198 vibecoded apps had security vulnerabilities"
- "Fix one bug, break two others"
- "Day 30-90: your project falls apart"

**Tone:** Not scolding, not fear-mongering. Recognition. "This probably happened to you. It's not your fault — it's how Claude Code works out of the box."

**Purpose:** Validate the visitor's experience. Make them feel understood. Then transition to the solution.

### Section 3: The Fix — Featured Flows

**Current:** "Production-proven flows" + category pills + 6 cards.

**What should change:**
- Each flow card should communicate COMPLEXITY, not just title + tagline. Show: "18 skills, 6 methodology agents, smart installer" — not just "AI Venture Studio." The complexity is the differentiator from free directories.
- Show a before/after or a "what changes" preview: "Before: Claude forgets. After: Claude greets you with last session's context."
- The card should feel like a PRODUCT worth paying for, not a GitHub repo card.

### Section 4: How It Works

**Current:** Install → Pick a flow → Run it.

**Problem:** Step 1 "Install the CLI" is intimidating for non-devs and unclear about WHAT you're installing. The current version doesn't distinguish between installing CuratedFlows (the CLI) vs installing a flow (the product).

**Proposed:**
1. "Pick a flow" — browse the catalog, find what solves your problem
2. "One command installs it" — the smart installer handles everything: CLAUDE.md, hooks, conventions, directory structure
3. "Claude works like it should" — show the result: persistent memory, security checks running, multi-agent coordination active

Move the CLI install block HERE, not in the hero.

### Section 5: /vibecheck CTA (NEW)

A dedicated section promoting the free security audit. This is the lead magnet and the highest-converting ad concept (score 9.4).

**Content:**
- Headline: "Is your project secure? Find out in 2 minutes."
- The stat: "196 of 198 vibecoded apps had security vulnerabilities."
- What /vibecheck does: 7 automated checks for the vulnerabilities AI creates
- Install command
- Email capture: "Get the full report emailed to you"

**Design:** Should feel different from the rest of the page — a full-bleed section with contrasting background. This is the one free thing CuratedFlows gives away and it needs to stand out.

### Section 6: Sprint CTA

**Current:** "Need something custom?" generic consulting CTA.

**What it should be:** A dedicated pitch for the Sprint product — the primary revenue driver.

**Content:**
- Headline: "Want it set up for YOUR project?"
- What a Sprint is: 2-4 hours, done-with-you, custom CLAUDE.md + hooks + security + architecture
- Price: from $500
- The anchor: "Rescue agencies charge $2,500+ to fix broken projects. A Sprint prevents the break for $500."
- CTA: Book a Sprint → links to /sprint
- Trust: "Same-day delivery. Works or we rebuild it."

### Section 7: Social Proof

**Current:** Doesn't exist on homepage.

**What it should be:** As soon as there are Sprint clients, this section shows:
- Number of flows installed (real data from Supabase)
- Number of projects configured
- Brief testimonials (once available)

**For launch (no clients yet), use product proof instead:**
- "Built across 6 production projects" (true — Vanga, IC, venture studio, etc.)
- "Every flow tested before listing" (true)
- "Verified: no malware, no data exfiltration" (differentiator vs OpenClaw crisis)

### Section 8: Blueprint Tips (KEEP but reframe)

**Current:** "3 quick wins for your CLAUDE.md" with free rules to copy.

**This section works well.** It provides immediate value, demonstrates expertise, and naturally leads to "want the full system? Browse flows." Keep it but consider:
- Retitling to speak vibecoder language: "3 rules that make Claude stop being stupid"
- Making the rules more visceral (the "Claude lies to your face" framing is strong)

### Section 9: Email Capture

**Current:** "Get the /checkpoint flow — free, forever."

**Consider changing to:** /vibecheck as the lead magnet instead of /checkpoint. Security audit has a 9.4 composite score as an ad concept. /checkpoint is useful but doesn't trigger the same urgency.

### Section 10: Footer

Keep current structure. Ensure "Flows" not "Skills" everywhere. Add /vibecheck and /sprint links.

---

## 7. Key Page Briefs

### /vibecheck (NEW — highest priority)

**Purpose:** Free security audit. Lead magnet. #1 ad landing page.

**Hero:** 
- Headline: large, fear-driven but helpful. "Your vibecoded app probably has security holes. Let's find out."
- The stat: "196/198 vibecoded apps audited had security vulnerabilities."
- What it checks: list of 7 specific checks (exposed API keys, SQL injection, broken auth, etc.)
- Install command (terminal block — appropriate here because the visitor is ready to act)
- Email gate: "Enter your email to get the full report"

**Below the fold:**
- What each check looks for (expandable or scrollable list)
- What to do if vulnerabilities are found (leads to Sprint CTA)
- "Built by someone who's found these same 7 holes in every project" (credibility without "I")

**Design notes:**
- This page must load fast — it's an ad landing page. No nav menu distractions. Minimal layout.
- Mobile-first — many visitors will come from Reddit on mobile.
- Trust signals: "No data leaves your machine. All checks run locally."
- One primary action: install /vibecheck. One secondary: book a Sprint.

### /flows (renamed from /skills)

**Purpose:** The catalog. The store shelves.

**Changes from current /skills:**
- Page title: "Flows" not "Curated Flows" (that's the brand, not the page heading)
- Each card needs complexity indicators: "X skills, X agents, smart installer" — not just a title and tagline
- Category organization should reflect vibecoder needs: Memory & Sessions, Security, Multi-Agent, Research, Operations, Deployment
- Price display should be confident. "$49" not hidden at the bottom.
- "What's included" preview on hover or in expanded view: list of files/skills in the flow, what CLAUDE.md rules get added, what hooks get configured
- Request form at bottom: "Don't see what you need?" (keep current)

### /sprint (NEW)

**Purpose:** Sprint booking. Dedicated ad landing page for "hire Claude Code expert" queries.

**Content:**
- Hero: "Your Claude Code project. Set up right. In 3 hours."
- What a Sprint includes (specific deliverables: custom CLAUDE.md, hooks, .claudeignore, architecture doc, security guardrails, testing conventions)
- Price: from $500, fixed-price, no hourly surprises
- The anchor comparison: "Rescue agencies: $2,500+ to fix what broke. Sprint: $500 to prevent it."
- "How it works" — 3 steps: Book → Sprint → Ship
- What stacks are supported (Next.js + Supabase, React + Firebase, Python, etc.)
- FAQ: "Do I need to know how to code?" "What if it doesn't work?" "How fast?"
- CTA: Cal.com booking embed
- Trust: "Works or we rebuild it. 30-day async support included."

**Design notes:**
- Like /vibecheck, this is an ad landing page. Minimal navigation. One conversion action.
- Mobile-first.
- The page must answer the question: "Is this person legitimate and will my money be wasted?" Trust is everything.

### /consulting (keep, reframe)

**Changes:**
- Add "Start with a Sprint" callout at the top for visitors who land here but only need the entry product
- Reframe packages from "Skills + Consulting" language to "Flows + Sprint" language
- Keep the comparison table but update: "Build it yourself vs. CuratedFlows Sprint"
- Case studies section: rewrite to emphasize the OUTCOME not the technical details

### /blog (reframe)

**Changes:**
- Subtitle: something that speaks to vibecoders, not general tech: "How to make Claude Code actually work — from someone running 6 projects with it"
- Blog post topics should map to search queries vibecoders use:
  - "Claude Code keeps forgetting — here's the fix" (SEO for top frustration query)
  - "Your vibecoded app has security holes: 7 things to check" (drives /vibecheck)
  - "The Day 30-90 problem: why vibecoded projects fall apart" (drives Sprint)
  - "I set up a founder's Claude Code in 3 hours — full walkthrough" (Sprint case study)

---

## 8. Design Considerations

### Visual Differentiation

The site should NOT look like another SkillsMP/SkillHub clone. Specific differences to consider:

**Color:**
- Every competitor uses indigo/purple (#6366F1) on dark (#0A0A0F). CuratedFlows could keep dark mode (vibecoders work in dark terminals) but differentiate on accent color. OR go warm — amber/orange, deep green, or teal on dark.
- If keeping purple, consider a distinct shade or a secondary warm accent that breaks the pattern.

**Typography:**
- Every competitor uses Inter. Consider a different sans-serif for headings (Satoshi, General Sans, Cabinet Grotesk) or even a subtle slab-serif for main headings. The body should remain highly readable sans-serif.
- Monospace belongs ONLY in code/terminal blocks, not as a design element sprinkled throughout.

**Layout:**
- Competitors use card grids exclusively. CuratedFlows could use editorial-style featured flow sections (full-width, with before/after, problem/solution storytelling) for the homepage, reserving card grids for the /flows catalog.
- Consider asymmetric layouts for the hero — not center-aligned text like every other site.

**Imagery/Illustration:**
- Competitors use zero imagery — pure text + cards. CuratedFlows could use:
  - Terminal screenshots showing REAL before/after (Claude greeting with context vs. Claude asking "what project is this?")
  - Architecture diagrams showing what a flow includes (multi-file, multi-agent)
  - The "complexity" of a flow visualized (not just a card — show the system)

**Feeling:**
- Competitors feel like GitHub repos with a buy button
- CuratedFlows should feel like a **workshop** — somewhere things are built properly. The "curated" in the name should feel like walking into a store where everything has been tested, not a dump where everything is free and untested.
- Premium without pretension. Confident without corporate.

### Mobile Considerations

- Many visitors will arrive from Reddit (mobile-heavy) and Google (60%+ mobile)
- /vibecheck and /sprint must be fully mobile-optimized as ad landing pages
- Terminal blocks on mobile need special attention — they break on narrow screens
- The flow catalog cards must be scannable on a single-column mobile layout

### Performance

- Ad landing pages (/vibecheck, /sprint) must load in < 3 seconds on mobile
- Google Ads Quality Score depends on page speed — slow pages raise CPC
- Minimize JavaScript on landing pages. Static where possible.

### Trust Signals

The audience has been burned: 12-20% of marketplace skills were malware. Trust is the #1 purchase barrier.

Signals to include throughout:
- "Verified: every flow tested before listing"
- "All checks run locally — no data leaves your machine" (for /vibecheck)
- "Used across 6 production projects"
- Client testimonials (once available — placeholder with product proof for now)
- "Works or we rebuild it" guarantee on Sprint
- Transparent pricing everywhere — never "contact for pricing"

---

## 9. Content Tone

**Voice:** The site speaks as CuratedFlows (the brand), not as Misha (the person). "I" appears only on the consulting page and blog posts. The homepage, /vibecheck, /flows, and /sprint speak as "we" or in third person.

**Register:** Technical enough to be credible, plain enough for vibecoders. Use their vocabulary:
- "Claude forgets" not "context window truncation"
- "Your project breaks" not "architectural degradation"
- "Security holes" not "OWASP Top 10 vulnerabilities"
- "Smart installer" not "declarative configuration management"

**Confidence level:** State facts. Don't hedge. "196 of 198 vibecoded apps had security vulnerabilities" — not "many apps may have issues." The audience respects directness.

**What to avoid:**
- AI hype language ("revolutionary," "cutting-edge," "transformative")
- Developer jargon that vibecoders don't use ("agentic," "orchestration layer," "tool-use paradigm")
- Scolding tone ("you SHOULD be doing X") — use recognition instead ("this probably happened to you")
- Generic startup copy ("for teams of all sizes," "scale your business")

---

## 10. Priority Order

If building incrementally:

1. **`/vibecheck`** — can start running ads to this page immediately
2. **`/sprint`** — can start running ads to this page immediately  
3. **Homepage hero + problem section** — reframe for vibecoder audience
4. **`/flows` rename + card redesign** — better communicate flow complexity
5. **Homepage remaining sections** — /vibecheck CTA, Sprint CTA, social proof
6. **`/consulting` reframe** — update language, add Sprint entry point
7. **`/blog` reframe** — new post titles aligned with search queries
8. **Visual redesign** — color, typography, layout differentiation (can happen in parallel)
