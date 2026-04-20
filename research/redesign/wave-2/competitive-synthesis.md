# ClaudeFlows Competitive Landscape — Synthesis Report
**Date:** April 16, 2026
**Sources:** Wave 1 research (anthropic-marketplace.md, claw-mart-current.md, new-skill-sellers.md, agensi-current.md)

---

## Executive Summary

The Claude Code skill ecosystem has moved from a ghost town to a noisy, crowded early market in roughly 6 weeks. Since March 2026, Claw Mart has nearly doubled revenue to $159K total ($51K in the last 30 days), multi-seller activity has emerged on OpenClaw platforms, and at least 10 new marketplace or directory players launched. The critical structural shift: the SKILL.md format is now a cross-industry open standard adopted by 35+ tools — Claude Code, Cursor, GitHub Copilot, Gemini CLI, and more — meaning the market is no longer Claude-only. Anthropic controls CLI distribution and enterprise procurement but has deliberately left two gaps: no monetization path for skill creators, and no UX built for non-technical audiences. Agent37 ($5.8K MRR, verified) is the fastest-moving transactional competitor; every other entrant is either a free directory or pre-launch vapor.

---

## Competitor Map

### Anthropic — Three Surfaces

**1. anthropics/skills + agentskills.io**
- **URL:** github.com/anthropics/skills, agentskills.io
- **Model:** Open standard reference + community governance
- **Revenue:** None (open source)
- **Strengths:** 119K GitHub stars, 13.7K forks, canonical format authority, 35+ cross-tool adoptions
- **Weaknesses:** Sparse content (28 commits), spec artifact not a growing library, no commercial layer
- **Threat level: LOW** — Defines the format. ClaudeFlows builds on top of this, not against it.

**2. claude-plugins-official + claude.com/plugins**
- **URL:** github.com/anthropics/claude-plugins-official, claude.com/plugins
- **Model:** CLI-integrated plugin directory (330+ plugins)
- **Revenue:** None; entirely free
- **Strengths:** Default marketplace slot in Claude Code terminal, "Anthropic verified" badge, install counts visible (top plugin: 455K installs)
- **Weaknesses:** No ratings/reviews, no editorial curation, no non-technical framing, no monetization for creators, opaque verification criteria, no "try before you install" UX
- **Threat level: MEDIUM** — Controls the install pathway. But the UX is deliberately thin and Anthropic shows no intent to build the layer above it.

**3. Claude Marketplace (claude.com/platform/marketplace)**
- **URL:** claude.com/platform/marketplace
- **Model:** Enterprise B2B procurement (limited preview)
- **Revenue:** Zero commission; bills against existing enterprise spend
- **Strengths:** Anthropic-sanctioned, 6 credible launch partners (GitLab, Harvey, Lovable, Replit, Rogo, Snowflake), no friction for enterprise procurement
- **Weaknesses:** Invite-only, sales-gated, not browsable publicly, not for individual developers, not for skills — this is SaaS procurement infrastructure
- **Threat level: LOW** — Different market entirely. Enterprise spend consolidation, not a skill creator economy.

---

### Claw Mart (shopclawmart.com)

- **URL:** shopclawmart.com
- **Model:** Transactional marketplace (OpenClaw-native, multi-seller)
- **Revenue:** $159,921 total Stripe-verified; $51,404 last 30 days; $6,020 MRR (277 subscriptions); $100K+ paid to creators
- **Strengths:** Largest verified revenue in the space, first-mover trust, multi-seller supply now real (6 sellers with meaningful sales), 13+ categories, 90% rev share to creators, active blog (60+ posts), #1 on TrustMRR OpenClaw leaderboard, cultural cachet from Felix/"Nat Eliason $177K" story
- **Weaknesses:** 100% OpenClaw-dependent (not Claude Code native), Felix Craft still likely 50-70% of GMV, no editorial curation, no non-technical UX, no cross-platform angle, press is "founder story" not "marketplace story" — fragile brand
- **Threat level: MEDIUM** — Biggest proof point in the adjacent ecosystem, but anchored in OpenClaw not Claude Code. Different audience (OpenClaw tends toward AI agents-as-businesses), different install paradigm.

---

### Agent37 (agent37.com)

- **URL:** agent37.com
- **Model:** Hosted OpenClaw container + skill monetization platform (SaaS + marketplace hybrid)
- **Revenue:** $5,819/month verified MRR (Stripe-confirmed, TrustMRR, ~March 25 2026); launched March 14, 2026
- **Strengths:** Only platform combining hosting + payments in one workflow; launched Product Hunt March 14 at #1 (418 upvotes, 651 followers); 80/20 creator split; frictionless "skill → live product with payments in one day" pitch; fastest-moving transactional player in Claude Code native space
- **Weaknesses:** Revenue is platform MRR ($3.99/month hosting), not skill transaction GMV — the model is "sell the hosting," not "sell the skill"; still small; OpenClaw-oriented; no editorial layer
- **Threat level: HIGH** — Directly competing on the paid transactional layer for Claude Code skills. 5 weeks old and already at $5.8K MRR. If they execute on the marketplace side, they get there first.

---

### Agensi.io

- **URL:** agensi.io
- **Model:** Curated, security-reviewed skill directory (referral/commission model unclear)
- **Revenue:** Not publicly disclosed; no verified transaction data
- **Strengths:** 200+ curated skills, 8-point automated security scan on every listing, learning center with monetization guides, weekly winners leaderboard, bounty/request system, multi-agent compatibility (Claude Code, OpenClaw, Codex CLI, Cursor, 20+ agents), active content (Claude Code plugin marketplace guide)
- **Weaknesses:** Revenue opaque, team/company anonymous, no public traction metrics, free browsing model unclear how it monetizes, directory not transactional marketplace
- **Threat level: LOW-MEDIUM** — Good positioning on curation + security. If they add a paid transactional layer, they become a direct competitor. Currently they're a directory with editorial ambition.

---

### SkillHub.club (skillhub.club)

- **URL:** skillhub.club
- **Model:** Freemium API proxy / cross-platform skill directory
- **Revenue:** $9.99/month Pro subscriptions; pay-as-you-go credits — no individual skill sales
- **Strengths:** 87,075 skills, LLM-graded quality scoring (S-D rank), cross-platform (30+ tools), first mover on paid tier in the official Claude ecosystem
- **Weaknesses:** Not a transactional marketplace — sells Claude API access, not skills; automated quality scoring not human editorial; no consulting layer; no services upsell
- **Threat level: LOW** — Competing on API access, not skill sales. Different product.

---

### SkillsMP (skillsmp.com)

- **URL:** skillsmp.com
- **Model:** Free aggregator / cross-agent directory
- **Revenue:** None (sponsorships at $X per 100K monthly developer views)
- **Strengths:** 66,541+ skills aggregated, 800K+ compatible skills across Claude/Codex/ChatGPT, independent, cross-agent, GitHub-sourced
- **Weaknesses:** Aggregator with no original inventory, no curation quality, ad-supported = no creator economics, no services layer
- **Threat level: LOW** — SEO play, not a marketplace. Can't monetize skills.

---

### claudemarketplaces.com

- **URL:** claudemarketplaces.com
- **Model:** Free directory/registry (ad-supported, sponsorships)
- **Revenue:** Sponsorship-based (no disclosed revenue)
- **Strengths:** Community votes, aggregates all sources, independent brand
- **Weaknesses:** Not transactional, not curated, anonymous founder (@mertduzgun), no creator economics
- **Threat level: LOW** — Aggregator. Useful for ClaudeFlows to list on, not compete with.

---

### claudeskills.info

- **URL:** claudeskills.info
- **Model:** Free directory / basic browsing
- **Revenue:** None disclosed
- **Strengths:** Early presence in search
- **Weaknesses:** Basic UX, no curation, no revenue model, no editorial voice
- **Threat level: LOW**

---

### ClaudeSkills.ai

- **URL:** claudeskills.ai
- **Model:** Pre-launch transactional marketplace (90% rev share, Stripe Connect)
- **Revenue:** Zero — waitlist only
- **Strengths:** Right model (transactional, creator-first), right split
- **Weaknesses:** No founder named, no traction, no launch date, may never ship
- **Threat level: LOW (currently)** — Monitor. If they launch with distribution, threat escalates.

---

### ClaudeSkillsMarket.com

- **URL:** claudeskillsmarket.com
- **Model:** Free directory + 14-week certification course + job board for commissions
- **Revenue:** Not disclosed
- **Strengths:** Non-developer / agency focus, certification adds perceived legitimacy, small business targeting
- **Weaknesses:** Overlapping positioning with ClaudeFlows but no verified commercial activity, anonymous, no social presence
- **Threat level: LOW-MEDIUM** — Exact same non-technical audience positioning. If they gain traction, they're a direct positioning conflict.

---

### LobeHub (lobehub.com/skills)

- **URL:** lobehub.com/skills
- **Model:** Free open-source AI platform (GitHub of skills)
- **Revenue:** None from skills; existing SaaS business
- **Strengths:** 73,800 GitHub stars, 217,527+ skills claimed, massive existing user base, multi-agent support, established brand
- **Weaknesses:** Entirely free — sets a free floor; no editorial curation; no creator monetization; skills are a side feature of a larger platform
- **Threat level: LOW** — Sets the free floor. Not competing on paid skills.

---

### GitHub Ecosystem (alirezarezvani, onewave-ai, travisvn, hesreallyhim, etc.)

- **Model:** Free open-source curation, GitHub repos as lead gen
- **Revenue:** None from skills; consulting referral only
- **Strengths:** Where discovery actually happens for developers today; some repos (rohitg00) were #1 trending on GitHub
- **Weaknesses:** No UX, no monetization, no non-technical audience, no services layer
- **Threat level: LOW** — These are the free floor. ClaudeFlows needs to be listed here, not competing with them.

---

## Market Structure

**Fragmented, not winner-take-all — for now.**

The market is in the "directory proliferation" phase typical of any emerging ecosystem: 10+ players all launched in early 2026, most monetizing on ads or subscriptions rather than skill transactions. No dominant marketplace exists yet. This is the pre-App Store moment, not the post-App Store moment.

**TAM signals from available data:**
- OpenClaw ecosystem: 183+ verified startups generating $201K+/month collectively on TrustMRR
- Claw Mart alone: $51K/month and growing 267% over 6 weeks
- Agent37: $5.8K MRR at 5 weeks old
- Claude Code: r/ClaudeCode at 4,200+ weekly contributors; anthropics/skills at 119K GitHub stars
- Comparable: Gumroad's Claude Code course ("Claude Code for Designers") at $49.99 with 42 verified reviews shows non-trivial consumer spend

**Where money is flowing:**
1. **Personas / AI agent identities ($19-99)** — Claw Mart's top earners. High-touch, complete products.
2. **Hosting subscriptions ($3.99-9.99/month)** — Agent37 model, SkillHub model. Sell access, not content.
3. **Courses ($49-99)** — Gumroad. Outperforming raw skills on consumer conversion.
4. **Creator subscriptions ($20/month)** — Claw Mart. B-side revenue from creators wanting API/publish access.
5. **Individual skills ($1-55)** — Smallest bucket. 5 EUR is the high-water mark for a standalone SKILL.md file.

**The consulting layer ($500-5,000) is completely unmonetized.** No competitor has built a skills-to-services pipeline.

---

## Positioning Map

### Axis 1: Free vs. Paid

```
Free                                              Paid
|---|---|---|---|---|---|---|---|---|---|---|---|---|
LobeHub  GitHub   SkillsMP  Agensi  ClaudeSkills.ai  Agent37  Claw Mart
claudemarketplaces             claudeskills.info      SkillHub  [ClaudeFlows]
```

ClaudeFlows: firmly paid on the skill side, with consulting as the high-ticket tier.

### Axis 2: Developer-only vs. Non-technical friendly

```
Developer-only                               Non-technical
|---|---|---|---|---|---|---|---|---|---|---|---|---|
GitHub  SkillHub  Agensi  Agent37  Claw Mart  ClaudeSkillsMarket  [ClaudeFlows]
anthropic official                 claudemarketplaces
```

ClaudeFlows: most aggressively non-technical of any transactional player.

### Axis 3: Marketplace vs. Solo Storefront

```
Marketplace (multi-seller)        Solo Storefront (single creator)
|---|---|---|---|---|---|---|---|---|---|---|---|---|
LobeHub  Agensi  Claw Mart  Agent37  [ClaudeFlows]
SkillsMP  claudemarketplaces
```

ClaudeFlows: solo storefront with curated editorial voice, not trying to aggregate all sellers.

### Axis 4: Skills-only vs. Skills + Services

```
Skills only                              Skills + Services
|---|---|---|---|---|---|---|---|---|---|---|---|---|
LobeHub  SkillHub  Agensi  Claw Mart  Agent37  [ClaudeFlows]
GitHub repos
```

ClaudeFlows: the only player with a deliberate skills-to-consulting pipeline at $500-5,000.

---

## Strategic Gaps

**What NO competitor is doing that ClaudeFlows could own:**

**1. Paid skills transaction layer with consulting upsell**
No competitor combines "buy this skill ($5-99)" with "hire us to customize it for your stack ($500-5,000)." Claw Mart has the skills; Agent37 has the payments; nobody has the services layer. This is the App Store + consulting agency hybrid that doesn't exist yet.

**2. Non-technical audience as a first-class citizen**
Every live transactional platform — Agent37, Claw Mart, SkillHub, Agensi — is written for developers. Terms like SKILL.md, `/plugin install`, and "GitHub repo" appear in every product description. ClaudeFlows can build for founders, PMs, marketers, and operators who use Claude daily but never open a terminal. This audience is larger and less price-sensitive.

**3. Human editorial curation as a trust signal**
Agensi has an 8-point automated security scan. SkillHub has LLM-graded quality scores. Neither is human editorial. No competitor publishes "10 essential skills for SaaS founders" or "the security audit starter pack" or "what we actually install ourselves." This editorial voice creates a moat that algorithmic ranking can't replicate.

**4. Cross-platform positioning as a lead feature**
SKILL.md works across Claude, Cursor, Copilot, Gemini CLI, and 30+ tools. Anthropic downplays this. Agent37 and Claw Mart ignore it. SkillHub mentions it but doesn't lead with it. ClaudeFlows can position every skill as "works in Claude, Cursor, Copilot, and 30+ tools" — massively expanding the addressable audience beyond Claude Code users only.

**5. Courses as a demand conversion layer**
Gumroad's "Claude Code for Designers" ($49.99, 42 reviews) outperforms any standalone skill in verified sales evidence. Courses convert non-technical audiences better than raw skills. No current competitor offers: skill + accompanying course. ClaudeFlows can bundle: "Buy the skill + watch the 45-minute walkthrough" — higher ACV, lower refund rate.

**6. Managed team marketplace for SMBs**
Enterprises can self-host private marketplaces per Anthropic docs, but no SaaS product makes this easy. A "team skills hub" — private marketplace, admin controls, team installs, usage analytics — at $99-499/month for 5-50 person teams is completely unclaimed.

---

## Positioning Recommendation

**"The only place to buy skills built by practitioners — and get them installed for you."**

This single sentence captures ClaudeFlows' differentiation on four axes: (1) paid, not free; (2) practitioner-built, not community dumps; (3) cross-platform skills, not Claude-only; (4) services/installation available, not just a download. It speaks to non-technical buyers who don't want to figure out the terminal.

Alternative formulation for a more editorial angle:
**"Curated Claude skills from people who actually use them — with consulting available when you need it."**

---

## Threats and Timing

### What could kill this

**Threat 1: Anthropic launches a paid creator marketplace**
The biggest single risk. If Anthropic adds a revenue share program to claude.com/plugins (App Store model, 30% cut), they'd have unbeatable distribution overnight. Current evidence suggests this is NOT imminent — the enterprise Claude Marketplace explicitly has no commissions and the official plugin directory is free with no stated intent to change. But this is the event to watch quarterly. Reserved namespaces (`claude-code-marketplace`, `anthropic-marketplace`) suggest Anthropic is protecting the option without executing it.

**Threat 2: Agent37 executes on the marketplace side**
Agent37 is 5 weeks old, at $5.8K MRR, with #1 Product Hunt launch. If they expand from "hosting subscriptions" to "skill transaction GMV" and add editorial curation, they become the direct competitor. Their technical infrastructure is ahead. ClaudeFlows' advantage is editorial voice, non-technical UX, and the consulting layer — none of which Agent37 has shown intent to build.

**Threat 3: Claw Mart expands to Claude Code native**
Claw Mart is OpenClaw-first and shows no sign of pivoting. But if they add Claude Code skill support and cross-promote to their existing buyer base of 3,000+ customers, they have distribution advantage. Monitor their blog and product catalog monthly.

**Threat 4: LobeHub or SkillHub adds a paid transactional layer**
LobeHub has 73,800 GitHub stars and massive traffic. SkillHub has 87K skills. If either adds per-skill payments, they win on volume. Both are currently free platforms — adding payments requires product and trust infrastructure they don't have yet.

**Threat 5: ClaudeSkillsMarket.com or ClaudeSkills.ai launches with funding**
Both are in the same non-technical / solo-creator positioning. If either gains funding and executes fast, they share the positioning. ClaudeSkills.ai has been on pre-launch waitlist with no timeline. ClaudeSkillsMarket.com is live but unmonetized.

### How long is the window

**6-9 months before the market consolidates.** The directory proliferation phase typically lasts 6-12 months, then 2-3 players emerge with real traction and the rest die. Agent37 is the current frontrunner. ClaudeFlows has a window to establish editorial authority and consulting revenue before Agent37 either dominates or gets acquired.

The cross-platform angle (SKILL.md across 35+ tools) extends the window — it's a larger, slower-moving market than Claude-only, so the consolidation timeline is longer.

### What needs to happen in the next 30/60/90 days

**30 days:**
- Ship the storefront with at least 5-10 practitioner-built skills, clearly priced ($5-99)
- Publish first editorial collections (not a database — a magazine)
- List ClaudeFlows on claudemarketplaces.com, awesome-claude-code, and GitHub Topics for distribution
- Establish one consulting offering with a fixed scope and price ($500-2,000 range)

**60 days:**
- Publish "skills that work in Cursor + Copilot + Claude" framing prominently — the cross-platform angle before competitors claim it
- Begin non-technical audience content: "no terminal required," use-case categories (not tech categories), plain-English descriptions
- Target first $1,000 in verified GMV (skills + consulting combined) to de-risk the model
- Watch Agent37 for any move toward editorial or consulting — that's the signal to accelerate

**90 days:**
- Evaluate course / skill bundle ($49-99) as conversion layer for non-technical audience
- Assess whether team marketplace (private hosted skill library for 5-50 person teams) is worth building based on consulting inquiry signals
- If Anthropic has not announced a paid creator program by this point, the window is confirmed open for at least another quarter

---

*Synthesis by Claude — April 16, 2026. Based on Wave 1 research files: anthropic-marketplace.md, claw-mart-current.md, new-skill-sellers.md, agensi-current.md.*
