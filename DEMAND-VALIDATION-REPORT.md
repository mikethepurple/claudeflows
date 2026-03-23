# Claude Flows: Demand & Supply Validation Report

**Date:** 2026-03-12 (updated with search demand + buying behavior data)
**Methodology:** 7 independent research agents + cross-verification agent. Sources: web search, GitHub API, SimilarWeb, Semrush, Crunchbase, TrustMRR, YouTube view counts, Upwork/Fiverr job data, Udemy course data, Notion template revenue data, Reddit, Product Hunt, Indie Hackers, Twitter/X.

---

## EXECUTIVE SUMMARY

**Verdict: The demand is real but it's not shaped like "marketplace." It's shaped like "productized consulting."**

People are already paying $50-$5K on Upwork for someone to "set up Claude for me" (1,643 open jobs). They're paying $10-$500 for courses. They're paying $29-$99/mo for paid AI communities on Skool. The money flows to outcomes, not prompts.

The strongest signal: **anthropics/skills has 91.6K GitHub stars vs claude-code itself at 77.1K.** People want pre-built skills MORE than the tool itself. But that repo has only 10 contributors and ships only document skills. The shelf is empty.

Claw Mart (shopclawmart.com) is alive — built by Nat Eliason on the OpenClaw ecosystem, $86K Stripe-verified revenue. Different ecosystem (OpenClaw, not Claude Code) but validates the model. The GPT Store (3M+ GPTs, ~$0 for creators) is the cautionary tale. The Notion template playbook ($2.5M for top creator Thomas Frank) is the model to follow.

### Key Numbers

| Metric | Value | Confidence |
|--------|-------|------------|
| anthropics/skills GitHub stars | 91.6K (more than claude-code's 77.1K) | Verified — strongest demand signal |
| Claw Mart (OpenClaw marketplace) | $86K Stripe-verified revenue | Verified (TrustMRR) — different ecosystem |
| Open Claude jobs on Upwork | 1,643 active | Verified — unproductized demand |
| Notion top creator revenue | Thomas Frank: $100K+/mo, $2.5M total | Verified — closest playbook |
| GPT Store creator revenue | ~$0 for most creators | Verified — cautionary tale |
| God of Prompt revenue | $40K/month | Verified (Stripe-linked) |
| Free Claude skills available | 400,000+ (SkillsMP) | Verified (GitHub scrape) |
| n8n template marketplace | 8,732 templates, $60M funding | Verified — validates workflow marketplace |
| Claude Code YT tutorial views | 20-90K per video (growing fast) | Verified — 10-20x smaller than ChatGPT/n8n |
| Active Claude skill creators | ~35 identified with 100+ skills each | Verified via GitHub |
| Supply-side leads identified | 25 in spreadsheet, 18 high-priority | Research-based |

---

## 1. DEMAND VALIDATION

### What's Actually Selling (Verified)

| Category | Price Range | Evidence | Verdict |
|----------|-------------|----------|---------|
| Individual prompts | $2-5 | PromptBase (563K visits/mo, zero funding after 3yr). Sellers report "more sellers than buyers" | Nearly dead |
| Prompt bundles | $3-30 | Etsy (9K+ monthly searches for "ChatGPT prompt", individual shops $3.5-9.3K revenue) | Modest, declining |
| Packaged expertise | $100+ | God of Prompt ($40K/mo verified, sells business outcomes not prompts) | Works, but it's consulting-as-product |
| Workflow templates | $19-79 | n8n marketplaces exist (ManageN8N, N8N Market, HaveWorkflow). $3,200/mo claim unverified | Best signal for Claude Flows model |
| SaaS with prompts | $10-499/mo | AIPRM (2M+ users, Chrome extension). Subscription, not marketplace | Winning model is SaaS |

### Claude-Specific Landscape

- **SkillsMP:** 400,000+ free skills aggregated from GitHub (up from 66K in Jan 2026)
- **ClaudePluginHub:** Community directory, no commerce
- **daymade's "Claude Code Skills Marketplace":** 591 GitHub stars, calls itself a marketplace but has no payment layer
- **Anthropic's own Skills:** Plugin marketplace (`/plugin install`), Skills API (beta), pre-built skills for paid plans

**Bottom line:** Massive free supply exists. No one has proven paid demand for Claude skills specifically.

### Five Reasons for Skepticism

1. **PromptBase's zero funding** after 3 years — VCs see no TAM
2. **"Prompt engineering is dead"** is the 2026 narrative — 68% of firms now train employees on it internally
3. **Models are getting better** at following vague instructions — reduces prompt value
4. **Free supply is overwhelming** — 400K+ free Claude skills already aggregated
5. **Every prompt marketplace survivor pivoted** — FlowGPT to roleplay, PromptHero to SaaS, AIPRM to SaaS

### Three Reasons for Qualified Optimism

1. **Workflows ≠ prompts.** Multi-step executable workflows with code, MCP integrations, and tested behavior have defensibility that copy-paste prompts don't
2. **God of Prompt proves willingness to pay** for packaged expertise ($40K/mo) — but the value is the outcome, not the prompt
3. **Neura Market model** (5K+ automation templates, 90% creator rev share) suggests the workflow marketplace model can work — though their claims are unverified

---

## 2. COMPETITIVE LANDSCAPE

### Dead or Pivoted

| Competitor | Status | What Happened |
|-----------|--------|---------------|
| **Claw Mart** (clawmart.com) | DEAD | Original domain redirects to Afternic (for sale) |
| **PromptPal** | DEAD | Redirects to promptimizeai.com, empty Framer landing page |
| **FlowGPT** | PIVOTED | Now "AI Character Roleplay" — entertainment, not productivity |
| **PromptHero** | PIVOTED | Now image generation SaaS ($16-25/mo), prompt search is a feature |

### Alive but Not Direct Competitors

| Competitor | Model | Threat Level |
|-----------|-------|--------------|
| **PromptBase** | Marketplace (20% take, $2-10 prompts) | Low — zero funding, no evidence of meaningful revenue |
| **AIPRM** | SaaS ($10-33/mo Chrome extension) | Medium — 2M users but entirely platform-dependent |
| **God of Prompt** | Direct sales ($40K/mo verified) | Low — sells own products, not a marketplace |
| **Snack Prompt** | Community marketplace (Stripe payments) | Low — tiny, no visible users |
| **Neura Market** | Automation workflow marketplace | Medium — validates the model, but focuses on Zapier/n8n/Make |

### Claw Mart (shopclawmart.com) — Alive, Different Ecosystem

- **Built by:** Nat Eliason (experienced marketer, grew Growth Machine to $85K/mo)
- **Ecosystem:** OpenClaw (307K GitHub stars), NOT Claude Code
- **Revenue:** $86K Stripe-verified (TrustMRR), mostly last 30 days
- **Listings:** ~14 (6 personas, 8 skills), most free. Top items are Eliason's own products.
- **Model:** 90% creator rev share
- **Reality:** One guy selling his own stuff on his own marketplace. Third-party creator economy appears near-zero.
- **Security issues:** 341 malicious skills found in OpenClaw ecosystem. Install counts trivially inflatable.
- **Relevance:** Validates the marketplace concept can generate revenue quickly with an audience. Does NOT prove third-party supply/demand works.

### The Anthropic Threat (Existential)

Anthropic has already built:
- Skills format spec (SKILL.md with YAML frontmatter)
- Plugin marketplace for Claude Code (`/plugin install`)
- Skills API (beta `skills-2025-10-02`)
- Pre-built skills for paid Claude plans
- GitHub repo `anthropics/skills` — **91.6K stars, but only 10 contributors, 23 commits, ships only document skills**

**What they haven't built:** A third-party marketplace with monetization. This is Claude Flows' opportunity window — but Anthropic could build their own at any time.

---

## 3. SUPPLY-SIDE ASSESSMENT

### The Gap is Real

Dozens of developers have invested hundreds of hours building Claude skills with **zero monetization path**. The ecosystem is fragmented across 5+ "awesome lists" and 3 nascent "marketplaces" — none with payments.

### Priority Leads (See spreadsheet for full list)

**Tier 1 — Contact First** (building Claude workflows, high audience, no monetization):
1. **Alireza Rezvani** — 180+ production-ready Claude skills, CTO, zero revenue from them
2. **Corey Haines** — 12,960 GitHub stars, 26.8K Twitter, SaaS founder DNA
3. **Sabrina Ramonov** — 1M+ cross-platform followers, teaches Claude workflows
4. **Alex Finn** — $300K/yr from Claude-built app (Creator Buddy)
5. **sickn33** — 23,539 GitHub stars, 1,272+ skills, largest library in ecosystem

**Tier 2 — High Value, Needs Tailored Pitch:**
6. **Peter Yang** — 140K newsletter subscribers
7. **Teresa Torres** — Product management authority, runs life from Claude
8. **God of Prompt** — $40K/mo verified, 30K+ prompts (multi-platform brand)
9. **daymade** — Already calls their repo a "marketplace," needs payment layer
10. **Karo Zieminski** — Viral Claude Skills Substack posts

---

## 4. CROSS-CHECK RESULTS

| Claim | Verdict | Notes |
|-------|---------|-------|
| GitHub star counts (all 4 repos) | UNDERSTATED | All repos real, actual counts 12-28% higher than reported |
| God of Prompt $317K revenue | VERIFIED | Stripe-linked via TrustMRR |
| Claw Mart is dead | CONFIRMED | Domain for sale |
| SkillsMP 66K+ skills | OUTDATED | Now 400K+ (aggregates from GitHub, min 2 stars) |
| Neura Market 50K+ businesses | UNVERIFIABLE | Self-reported marketing claim |
| Alex Finn $300K/yr | VERIFIED | Multiple independent sources, ARR not cash collected |
| Anthropic plugin marketplace | VERIFIED | `/plugin install` exists since v2.0.13 |
| Sabrina Ramonov 500K followers | UNDERSTATED | Actually 1M+ cross-platform |
| n8n $3,200/mo creator income | UNVERIFIABLE | No public source |
| PromptBase 563K monthly visits | VERIFIED | SimilarWeb data |
| PromptBase zero funding | VERIFIED | Crunchbase shows no rounds |

---

## 5. SEARCH DEMAND ANALYSIS

### What People Actually Search For

| Search intent | Volume proxy | Distance from Claude Flows |
|---|---|---|
| "How to build AI agents" | Millions of YT views | Far — too broad |
| "n8n tutorial / AI agent" | 460K-2.2M views per video | Adjacent — visual builders |
| "ChatGPT prompts for X" | 100K-1.2M views | Wrong ecosystem |
| **"Claude Code tutorial"** | **20-90K views, growing fast** | **Funnel top** |
| "Agentic coding workflow" | 25-50K views | Close |
| "Claude Code skills marketplace" | **Zero** | Category doesn't exist yet |

### The Killer Data Point

**anthropics/skills: 91.6K stars vs claude-code: 77.1K stars.** The skills repo has MORE stars than the tool itself. Only 10 contributors, 23 commits, ships only document skills (docx, pdf, xlsx, pptx). The shelf is empty. People want pre-built skills and there's nowhere to get them.

### YouTube View Comparison

| Category | Top video views | Signal |
|---|---|---|
| Claude Code tutorials | 87K (Net Ninja) | Small but growing fast |
| n8n / AI automation | 2.2M (Liam Ottley) | 25x larger audience |
| ChatGPT prompts | 1.2M (Skill Leap AI) | 14x larger audience |

Claude's search funnel is 10-20x smaller than ChatGPT/n8n. Growth depends on Claude Code adoption.

### GitHub Engagement

- **anthropics/claude-code** — 77.1K stars, 6.3K forks
- **anthropics/skills** — 91.6K stars, 9.8K forks (MORE than claude-code)
- **n8n** — 8,732 templates in marketplace, $60M raised (Mar 2025)

---

## 6. WHERE THE MONEY FLOWS TODAY

### The Demand Stack

| Channel | Est. Annual Spend | Price Points | What They're Buying |
|---|---|---|---|
| AI Consulting/Agencies | $13B+ | $5K-$500K | "Make AI work for my business" |
| Courses (Udemy, Maven) | $100M+ | $10-$500 | "Teach me how to use AI" |
| Paid Communities (Skool) | $50M+ | $29-$99/mo | Access to people who know AI |
| Freelancers (Upwork/Fiverr) | $50M+ | $50-$5K/project | "Build it for me" — **1,643 open Claude jobs** |
| Notion-style Templates | $10M+ | $5-$229 | "Give me a system to customize" |
| Digital Products (Gumroad) | $5M+ | $19-$79 | Shortcuts and bundles |
| GPT Store | ~$0 for creators | Free | **Failed experiment** |

### The Notion Template Playbook (Follow This, Not PromptBase)

| Creator | Revenue | Key Insight |
|---|---|---|
| Thomas Frank | $2.5M total, $100K+/mo | "Ultimate Brain" at $129. Revenue went UP when price INCREASED |
| Easlo | $500K+ | $20K/mo passive income |
| Nick Lafferty | $80K in 12 months | Mid-tier is viable |

**Why Notion templates work and GPT Store didn't:**
1. Creators set their own prices ($29-$229, not platform-controlled)
2. Bundles outsell singles
3. Creator brand drives sales — top 5 capture disproportionate revenue
4. Distribution comes from creators' own audiences (YouTube, newsletters), not marketplace discovery
5. IP is protected — templates can't be trivially extracted
6. The marketplace is a trust/discovery mechanism, not the primary sales channel

### The GPT Store Cautionary Tale

- 3M+ GPTs created, only ~159K active
- Revenue sharing perpetually "coming soon"
- Most creators earn literally $0
- Critical flaws: no creator pricing control, trivial IP extraction, broken discovery
- Real money went to creators who used GPTs as lead generators for their own paid products

### Unproductized Demand (Your Opportunity)

**1,643 open Claude jobs on Upwork** — people paying $50-$5K for someone to "set up Claude for me." This is raw demand that hasn't been productized. A $29-$99 workflow replaces a $150-$500 freelancer gig.

**AI consulting at $5K-$15K per engagement** — a $49-$199 workflow that does 80% of the same thing is a massive price disruption.

---

## 7. STRATEGIC IMPLICATIONS

### The Demand Shape

The demand is NOT "I want to buy a Claude skill." It's:
1. **"Set up Claude for me"** — 1,643 Upwork jobs, $50-$5K each
2. **"Teach me Claude"** — 20-90K YouTube views per tutorial, growing fast
3. **"Give me a system I can customize"** — Notion template playbook, $29-$229

### Follow the Notion Playbook, Not PromptBase

1. **Price for value** ($49-149 workflows), not volume ($4.99 prompts)
2. **Curate 50-100 excellent workflows**, not 10K mediocre ones
3. **Let creators set prices** and keep 80-90%
4. **Distribution comes from creator audiences**, not marketplace SEO
5. **Protect creator IP** — Claude Flows already has Ed25519 integrity verification
6. **Bundles outsell singles** — "Complete Business Builder" at $199 beats 6 individual skills at $19 each

### Kill Signals

- Anthropic announces official Skills marketplace with monetization
- No paying customers after 50 supply-side conversations
- Average willingness to pay < $10/workflow (commodity pricing)
- GPT Store dynamics emerge (race to free, no creator economics)

### Go Signals

- 5+ creators commit to listings at $29+ price points
- Organic installs of free workflows exceed 100/month within 60 days
- Anthropic signals they want third-party distribution (partnership, not competition)
- 91.6K stars on anthropics/skills continues to grow with no official marketplace

---

## APPENDIX: Sources

- SimilarWeb (PromptBase traffic)
- Semrush (search volumes, keyword data)
- Crunchbase (funding data)
- TrustMRR (God of Prompt revenue, Claw Mart revenue)
- GitHub API (star counts, repo verification)
- YouTube / Bing Video (view counts for tutorials)
- Upwork (1,643 open Claude jobs)
- Fiverr (Claude and n8n gig data)
- Udemy (course catalog, pricing)
- Notion template revenue data (Thomas Frank, Easlo, Nick Lafferty)
- GPT Store analysis (creator economics)
- Skool (paid community revenue data)
- Reddit r/ChatGPT, r/ClaudeAI, r/PromptEngineering
- Product Hunt, Indie Hackers
- Trustpilot (PromptBase seller reviews)
- Individual creator profiles (GitHub, Twitter/X, Substack)
