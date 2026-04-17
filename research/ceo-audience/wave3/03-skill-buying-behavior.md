# Skill Buying Behavior: How People Discover, Evaluate, and Buy Claude Code Skills

**Research date:** 2026-04-17
**Sources:** GitHub repos, marketplace sites (SkillsMP, SkillHub, ClaudeSkills.ai), DEV Community, Medium, security research (VirusTotal, Socket.dev), Anthropic docs, KDnuggets, agensi.io, MindStudio
**Confidence:** Medium-high on discovery/evaluation patterns, low on revenue data (market is early, most sellers don't share numbers)

---

## Executive Summary

The Claude Code skills market in April 2026 is a bazaar, not a mall. Discovery is fragmented across 6+ awesome-lists, 4+ marketplaces, Twitter/X threads, and Medium posts. Roughly 95% of skills are free. Paid skills cluster at 5-15 EUR with almost no evidence of skills selling above $25. The market has a serious trust/security crisis (12-20% of OpenClaw marketplace skills were malware), which creates an opening for curated, verified sellers -- but also means buyers are cautious. The gap between "downloads a free skill from GitHub" and "pays for a premium flow" is not about the skill itself -- it's about the wrapper: trust, support, a guarantee it works, and time saved evaluating.

---

## 1. How People Discover Skills Today

### Primary Discovery Channels (ranked by volume)

| Channel | What happens | Strength | Weakness |
|---------|-------------|----------|----------|
| **GitHub awesome-lists** | 5+ competing lists (hesreallyhim/awesome-claude-code, travisvn/awesome-claude-skills, ComposioHQ, VoltAgent, rohitg00/awesome-claude-code-toolkit). Users star and browse. | High trust (open source, can read code). rohitg00 list has 135 agents, 35 skills, 176+ plugins. | Overwhelming. No quality filter. Dead repos mixed with active ones. |
| **Twitter/X threads** | Developers share "10 must-have Claude Code skills" threads. Go viral, drive installs. | High reach. Social proof (likes, RTs). Creates FOMO. | Ephemeral. Hard to find later. Often affiliate/promotional. |
| **Medium / DEV Community posts** | "Best Claude Code Skills 2026" listicles. Multiple competing posts. | SEO-driven, found via Google. | Recycled content. Many posts are barely differentiated. |
| **Third-party marketplaces** | SkillsMP (96K+ skills), SkillHub (7K+), ClaudeSkills.ai, claudeskills.info, claudemarketplaces.com | Browsable, categorized, some have ratings. | No security audit (SkillsMP). Quality scoring doesn't check security (SkillHub). |
| **Anthropic official marketplace** | claude.com/plugins + claude-plugins-official GitHub repo. "Anthropic Verified" badge. | Highest trust. Auto-available in Claude Code. | Small catalog. Slow review process. Community has filed feature requests for expansion. |
| **Word of mouth / Discord** | Anthropic Discord server. Devs recommend skills in #claude-code channel. | High-trust recommendations. | Low volume. Hard to search. |
| **One-click installers** | `npx clawhub@latest install <skill>`, Vercel's `npx skills add`, manual curl. | Fast. Reduced friction. | Fragmented -- 3+ competing install tools. Restart required after install. |

### Discovery Pattern

Typical journey: Google search ("best Claude Code skills 2026") -> Medium/DEV listicle -> GitHub repo -> manual install OR `npx clawhub install`. The official Anthropic marketplace is a secondary discovery path (users discover it from within Claude Code, not from search).

**Key insight:** There is no single authoritative source. The ecosystem looks like npm in 2014 -- lots of packages, no curation layer people trust. GitHub's feature request (#30727) for an "Official Verified Marketplace" has traction, with community members explicitly comparing the gap to VS Code's Extension Marketplace.

---

## 2. What Makes Someone Pay vs Use Free

### The Free Skill User (95%+ of the market)

- Comfortable with terminal and Git
- Can evaluate code quality by reading SKILL.md
- Has time to browse awesome-lists and test skills
- Installs 5-15 skills, actively uses 3-5
- Will spend 30 min evaluating and installing a skill rather than pay $10
- Primary motivation: capability expansion ("I want Claude to do X")

### The Paid Skill Buyer (tiny minority today)

Evidence of actual paid transactions is thin. What exists:

| Evidence | Price | Platform |
|----------|-------|----------|
| Git Dojo (interactive git training skill) | 5 EUR | raxxo.shop |
| Professional workflow skills (general) | 5-15 EUR | Various (Gumroad, own shops) |
| ClaudeSkills.ai sellers | Unknown (90/10 rev split via Stripe Connect) | ClaudeSkills.ai |
| AI digital products (prompt libraries, workflow templates) | $19-$79 | Gumroad, Lemon Squeezy |
| Claude Code for Designers course | Unknown | aidesignlab.gumroad.com |

**What paid buyers want that free doesn't give them:**

1. **Time savings on evaluation.** The biggest cost isn't the $10 -- it's the 2 hours spent finding, testing, and debugging a free skill that turns out to be mediocre. Paid = someone already did the vetting.
2. **Workflow-specific solutions.** Free skills are generic (git automation, code review). Paid skills target specific professional workflows (e.g., "GTM skill for revenue teams," "compliance audit skill").
3. **Guarantee it works.** Free skills break silently. No support. No updates. Paid implies accountability.
4. **Multi-tool bridging.** The skills that generate the most interest "replace a manual 3-4 step workflow with a single command" -- these are harder to find free because they require domain knowledge to build.
5. **Security trust.** After the OpenClaw malware crisis (12-20% of skills were malware), buyers who care about security will pay for verified, audited skills.

### Price Ceiling

No evidence of individual skills selling above $25 in the current market. The $5-15 EUR range appears to be the established norm. Skills are perceived as "just markdown files" -- paying $50+ for a .md file feels wrong to most developers, even if the instructions inside save hours.

**The exception:** Bundled skill packs + courses/consulting. "Claude Code for Designers" on Gumroad is a course that happens to include skills, not a skill sold standalone. The education/service wrapper justifies higher pricing.

---

## 3. Marketplace Reviews and Complaints

### SkillsMP (largest, 96K+ skills)
- **Strength:** Huge catalog, Claude Code + Codex compatibility
- **Complaint:** Zero security audit. Kaspersky documented the AMOS infostealer campaign targeting ClawHub skills specifically.
- **Complaint:** Quality signal is weak -- stars, installs, and reviews are inconsistent.
- **Complaint:** Hard to distinguish maintained skills from abandoned ones.

### SkillHub (7K+ skills)
- **Strength:** AI-based quality scoring, playground to try skills.
- **Complaint:** Quality scoring doesn't check security -- only usability/formatting.
- **Complaint:** Smaller catalog than SkillsMP.

### ClaudeSkills.ai
- **Strength:** Stripe Connect (sellers keep 90%), marketplace model.
- **Weakness:** No public data on transaction volume. Likely very early.

### OpenClaw (now remediated)
- **Crisis:** VirusTotal, Socket.dev, 1Password, and Bitdefender all published reports documenting 824-900 malicious skills (12-20% of catalog). Attack types: data exfiltration via curl, prompt injection in descriptions, keyloggers disguised as "solana-wallet-tracker."
- **Response:** Shipped verified skill screening. But trust damage is lasting.
- **Impact on buying behavior:** Developers are now more cautious about installing skills from unknown sources. This creates opportunity for trusted curators.

### Anthropic Official (claude.com/plugins)
- **Strength:** "Anthropic Verified" badge, auto-available, highest trust.
- **Complaint:** Small catalog. Slow to add community contributions. Feature request #30727 on GitHub asks for expansion.

---

## 4. Real Transaction Prices

Honest answer: hard evidence of what people actually pay is scarce. The market is nascent.

**What we can confirm:**
- Individual skills: 5-15 EUR (dominant range for the few paid skills that exist)
- AI digital products broadly (templates, prompt packs): $19-$79 on Gumroad
- AI courses that include skills: $29-$99 range
- Consulting/done-for-you skill setup: $500-$2,000+ (different market entirely)
- SkillDepot and ClaudeSkills.ai both offer 90/10 revenue splits

**What we cannot confirm:**
- Monthly revenue for any skill seller
- Total transaction volume on any marketplace
- Whether anyone has built a sustainable business selling skills alone (vs. skills as lead-gen for consulting)

**One data point:** A builder who shipped 8 skills on Gumroad reported that workflow automation skills bridging multiple tools get the most interest -- but no revenue figure was shared.

---

## 5. Single-File vs Multi-File Preference

The ecosystem has matured toward **directory-based, multi-file skills** as the standard for anything non-trivial.

**Official recommendation (Anthropic + MindStudio):**
- SKILL.md contains process steps only
- Reference files contain context, rules, definitions, templates
- One file per concern (separation of concerns for token efficiency)
- Claude loads only the reference files it needs -- the rest consume zero tokens

**User preference in practice:**
- Simple skills (single SKILL.md, <50 lines): Easy to evaluate, easy to install, easy to share. Good for atomic tasks (format code, generate commit messages).
- Complex skills (directory with 5-20 files): Required for professional workflows. But harder to evaluate quality before installing. This is where the "trust gap" matters most.

**Implication for selling:** Complex multi-file skills are harder to replicate (moat) but also harder to sell (buyer can't evaluate quality from a README alone). This is why demos, screenshots, and "try before you buy" features matter.

---

## 6. What Makes a Skill Valuable vs Useless

### The 5 quality criteria (aggregated from multiple sources)

1. **Immediate usefulness** -- Solves a problem you face daily, not a nice-to-have. The frontend-design skill (277K+ installs) succeeds because every developer builds UIs.
2. **Output quality** -- Results are usable without heavy editing. First-pass accuracy matters more than feature count.
3. **Reliability** -- Works consistently across different projects, not just the author's repo. Edge cases handled.
4. **Simplicity** -- Usable in under a minute without complex setup. Zero-config is the gold standard.
5. **Compatibility** -- Works across multiple agents (Claude Code, Codex CLI, Cursor, Gemini CLI). Cross-agent skills have larger addressable market.

### What makes skills useless
- Require significant setup overhead (API keys, config files, external dependencies)
- Only work in the author's specific environment
- Duplicate what Claude Code already does well without prompting
- Abandoned -- no updates after initial publish
- Cramming everything into a single SKILL.md (bad architecture, unreliable output)

### The #1 value driver
**Transforming default behavior.** The best skills change what Claude does by default -- like how frontend-design transforms "build me a landing page" from generic Bootstrap output to production-grade design with proper typography, spacing, and dark mode. The skill replaces constant re-prompting with encoded expertise.

---

## 7. The Installer/Setup Experience

### Current state (fragmented)

Three competing installation methods:
1. **`/plugin` browser** (built into Claude Code) -- Easiest. Browse Discover tab, press Enter, choose scope (user vs project). Auto-loads on restart.
2. **`npx clawhub@latest install <skill>`** -- CLI-first. Popular with power users. Requires knowing the skill name.
3. **Vercel's `npx skills add`** -- Newer entrant. Generates skills-lock.json for reproducible installs across environments.
4. **Manual** -- `mkdir -p .claude/skills/<name> && curl -o SKILL.md <url>`. Always works. Most friction.

### Friction points
- Must restart Claude Code after installing (skills load at startup, not dynamically)
- No preview/sandbox to test a skill before committing to install
- Some skills require external dependencies (API keys, CLI tools) not mentioned until after install
- Fragmentation between install tools creates confusion ("do I use clawhub or npx skills?")

### What matters to buyers
The install experience is a purchasing signal. If a paid skill installs with one command and "just works," it justifies the price. If it requires 10 minutes of debugging, the buyer feels ripped off regardless of the skill's actual capability.

---

## 8. Communities Where People Share/Recommend Skills

| Community | Type | Activity Level | Notes |
|-----------|------|---------------|-------|
| Anthropic Discord (#claude-code) | Chat | Active | Direct skill recommendations, troubleshooting |
| GitHub awesome-lists (5+ repos) | Curated lists | Very active | Primary discovery for power users |
| Twitter/X #ClaudeCode | Social | High (bursty) | Skill threads go viral periodically |
| DEV Community | Blog posts | Moderate | "Best skills" listicles, plugin guides |
| Medium (All About Claude publication) | Blog posts | Moderate | More in-depth reviews |
| Reddit r/ClaudeAI, r/ChatGPTCoding | Forum | Active | Can't directly access, but referenced in multiple sources as a discussion hub |
| ClawHub community | Marketplace | Growing | 5,700+ published skills as of early 2026 |

---

## 9. Free Downloader vs Premium Buyer: The Profile Split

### The Free Downloader
- **Role:** Developer, often senior or staff-level
- **Budget:** Already paying $20-200/mo for Claude Code subscription. Sees skills as "part of the package"
- **Time:** Has 30+ min to evaluate skills. Enjoys the curation process.
- **Trust model:** Reads source code. Trusts GitHub stars and commit history.
- **Pain tolerance:** Will debug a broken skill. Sees it as learning.
- **What they'll never pay for:** Generic coding skills (git, testing, code review) -- these are everywhere free.

### The Premium Buyer ($5-15 EUR)
- **Role:** Developer or technical lead at a company, possibly a "vibecoder" (non-traditional background)
- **Budget:** $10-15 is a rounding error vs. the productivity gain
- **Time:** Does NOT have 30 min to evaluate. Needs it to work now.
- **Trust model:** Trusts the seller's reputation, not the source code. Looks for: reviews, install count, "verified" badge, professional README.
- **Pain tolerance:** Zero. If it doesn't work in 2 minutes, requests refund or leaves negative review.
- **What they'll pay for:** Domain-specific workflow skills that replace 3-4 manual steps. Especially: compliance, GTM, design systems, deployment pipelines.

### The Premium Buyer ($50-99) -- Theoretical, minimal evidence
- **Role:** Team lead or engineering manager buying for a team. Or: non-technical founder who uses Claude Code as their "CTO."
- **Budget:** Compares against hiring a contractor for the same task ($500-2K). $99 is cheap.
- **Time:** None. Needs outcomes, not tools.
- **Trust model:** Trusts brand, not code. Would buy from a known consultant's site, not a marketplace.
- **What they'd pay for:** Complete workflow systems (not individual skills). "Here's a full CI/CD pipeline skill + security audit skill + deployment skill, all tested together, with a setup guide and 30 days of support." This is really consulting-lite packaged as a product.
- **Evidence this buyer exists:** Thin. The $19-79 range for AI digital products (templates, prompt packs) on Gumroad suggests willingness. But no confirmed $50+ skill purchases found.

---

## 10. Implications for ClaudeFlows

### What the data says about positioning

1. **Selling individual skills at $5-15 is a volume game with no evidence of volume.** The market is too early. Most developers expect skills to be free. Competing with 96K+ free skills on SkillsMP is a losing proposition.

2. **The trust gap is the real opportunity.** After the OpenClaw malware crisis, "verified, audited, guaranteed to work" is a differentiator. But Anthropic is building toward this with their official marketplace -- so the window is limited.

3. **The money is in the wrapper, not the skill.** Courses, consulting, bundles, and support contracts justify higher prices. A skill alone is "just a markdown file." A skill + video walkthrough + setup support + updates = a product worth $29-79.

4. **The consulting-to-product bridge is real.** One builder found that the skills generating the most interest "replace a manual 3-4 step workflow with a single command." These are domain-specific (recruiting workflows, compliance audits, GTM pipelines) -- exactly the kind of thing a consultant builds for clients, then productizes.

5. **Cross-agent compatibility expands TAM.** Skills that work on Claude Code + Codex CLI + Cursor + Gemini CLI have 4x the addressable market of Claude-only skills.

### Pricing strategy signal

- $5-15: Individual skills (commodity, high competition)
- $29-49: Skill bundles (3-5 related skills, tested together)
- $49-99: Skill systems (multi-skill + setup guide + support)
- $99-299: Skill-based consulting packages ("I'll install and customize these skills for your workflow")
- $500+: Done-for-you workflow automation (uses skills as delivery vehicle)

The last two tiers are where real revenue exists today. The first three tiers are where the market is heading -- but not yet arrived.

---

## Sources

- [Claude Skills Marketplace: How to Sell Claude Skills in 2026](https://www.agent37.com/blog/claude-skills-marketplace)
- [Agent Skills Marketplace (SkillsMP)](https://skillsmp.com)
- [SkillHub - Claude Skills & Agent Skills Marketplace](https://www.skillhub.club/)
- [ClaudeSkills.ai Marketplace](https://claudeskills.ai/)
- [Extend Claude with skills - Claude Code Docs](https://code.claude.com/docs/en/skills)
- [How to Install Claude Skills: Complete Guide (DiscoverAISkills)](https://discoveraiskills.com/blog/how-to-install-claude-skills-complete-guide)
- [awesome-claude-code (hesreallyhim)](https://github.com/hesreallyhim/awesome-claude-code)
- [awesome-claude-skills (travisvn)](https://github.com/travisvn/awesome-claude-skills)
- [awesome-agent-skills (VoltAgent)](https://github.com/VoltAgent/awesome-agent-skills)
- [awesome-claude-code-toolkit (rohitg00)](https://github.com/rohitg00/awesome-claude-code-toolkit)
- [The Agent Skills Gold Rush Has a Malware Problem (DEV Community)](https://dev.to/meimakes/the-agent-skills-gold-rush-has-a-malware-problem-2jai)
- [Top 5 Agent Skill Marketplaces (KDnuggets)](https://www.kdnuggets.com/top-5-agent-skill-marketplaces-for-building-powerful-ai-agents)
- [SkillsMP Review 2026 (SmartScope)](https://smartscope.blog/en/blog/skillsmp-marketplace-guide/)
- [OpenClaw Malware Update: 12% Marketplace Skills Compromised (AI Daily)](https://www.ai-daily.news/articles/openclaw-deploys-verified-skill-screening-after-malware-disc)
- [OpenClaw's 230 Malicious Skills (AuthMind)](https://www.authmind.com/blogs/openclaw-malicious-skills-agentic-ai-supply-chain)
- [From Automation to Infection: OpenClaw Skills Weaponized (VirusTotal)](https://blog.virustotal.com/2026/02/from-automation-to-infection-how.html)
- [OpenClaw Skill Marketplace as Malware Vector (Socket.dev)](https://socket.dev/blog/openclaw-skill-marketplace-emerges-as-active-malware-vector)
- [Feature Request: Official Verified Marketplace (GitHub #30727)](https://github.com/anthropics/claude-code/issues/30727)
- [Claude Code Skills Architecture: SKILL.md Reference Files (MindStudio)](https://www.mindstudio.ai/blog/claude-code-skills-architecture-skill-md-reference-files)
- [Best Claude Code Skills & Plugins 2026 Guide (DEV Community)](https://dev.to/raxxostudios/best-claude-code-skills-plugins-2026-guide-4ak4)
- [10 Must-Have Skills for Claude Code (Medium)](https://medium.com/@unicodeveloper/10-must-have-skills-for-claude-and-any-coding-agent-in-2026-b5451b013051)
- [Anthropic Official Plugins Directory](https://github.com/anthropics/claude-plugins-official)
- [Discover and Install Plugins (Claude Code Docs)](https://code.claude.com/docs/en/discover-plugins)
- [Vercel Skills (npx skills)](https://github.com/vercel-labs/skills)
- [MCP Marketplace Landscape Comparison](https://aiskill.market/blog/mcp-marketplace-landscape)
- [SkillDepot: Framework-Agnostic Marketplace](https://earezki.com/ai-news/2026-04-02-building-the-app-store-for-ai-agent-skills/)
- [AI Digital Products: Templates That Earn Monthly](https://www.digitalapplied.com/blog/ai-digital-products-templates-workflows-sell-guide)
- [10 Best Skills for Claude Code 2026 (Tested & Reviewed)](https://www.agensi.io/learn/best-claude-code-skills-2026)
