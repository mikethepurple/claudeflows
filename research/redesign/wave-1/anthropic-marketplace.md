# Anthropic Official Skill/Plugin Ecosystem Research

Research date: April 16, 2026

---

## Key Findings

**Anthropic runs three distinct but overlapping surfaces** — the Skills repo (open standard reference), the `claude-plugins-official` marketplace (300+ plugins via `/plugin` CLI), and the Claude Marketplace (enterprise procurement with 6 launch partners). None of these is a monetized developer storefront.

**No revenue share, no paid skills.** Every plugin in the official directory is free. The enterprise Claude Marketplace has no commissions and is exclusively for enterprise spend consolidation — not individual developer monetization.

**The Skills format is now a cross-industry open standard.** `agentskills.io` lists 35+ tools (Cursor, GitHub Copilot, Gemini CLI, VS Code, OpenAI Codex, JetBrains Junie, etc.) all supporting the same `SKILL.md` format. Skills written once run everywhere. This is the NPM moment for agentic instructions.

**Discovery UX is functional but thin.** `/plugin` in the terminal has four tabs: Discover, Installed, Marketplaces, Errors. Install counts are shown on claude.com/plugins. No ratings, no reviews, no editorial curation, no "staff picks," no non-technical-friendly framing.

**Community is fragmented across 2,400+ third-party marketplaces** — nobody has won the aggregation layer yet. claudemarketplaces.com, skillsmp.com, skillhub.club, and claudeskills.info all launched in early 2026 and are competing for the same space ClaudeFlows is targeting.

---

## Detailed Analysis

### 1. What Exists Today

**A. anthropics/skills (GitHub) — 119K stars**
- URL: github.com/anthropics/skills
- The canonical reference repo for the Agent Skills open standard
- Contains the spec (`/spec`), a template (`/template`), and example skills organized by category
- 4 top-level skill categories: Creative & Design, Development & Technical, Enterprise & Communication, Document Skills
- Document skills (DOCX, PDF, PPTX, XLSX) are source-available but not open source — shown as reference implementations
- 28 commits on main, relatively sparse — this is a specification artifact, not a growing library
- Forks: 13.7K — significant; developers use this as a starting template

**B. anthropics/claude-plugins-official (GitHub) — 17.1K stars**
- URL: github.com/anthropics/claude-plugins-official
- The actual plugin directory powering `/plugin` in Claude Code
- 330+ plugins in marketplace.json across two buckets: `/plugins` (Anthropic-built) and `/external_plugins` (partner/community)
- Created November 20, 2025 — very recent, 262 commits, active
- Categories: Development, Productivity, Database, Deployment, Security, Monitoring, Design, Testing, Learning, Migration, Automation, Location
- Notable plugins: GitHub, Figma, Supabase, Vercel, Slack, Stripe, MongoDB, SonarQube, Terraform, Atlassian, Sentry, Linear, Notion
- Also includes LSP (language server) plugins for 11 languages: Python, TypeScript, Go, Rust, Java, C#, Swift, Kotlin, C++, PHP, Lua
- Mix of Anthropic-managed and community-managed; no clear quality tiering
- Submission: via form at clau.de/plugin-directory-submission or claude.ai/settings/plugins/submit

**C. claude.com/plugins — Web Directory**
- Browsable UI with search and filter
- Shows install counts (Frontend Design: 455K installs; Superpowers: 355K; Context7: 231K; GitHub: 172K)
- "Anthropic verified" badge on some plugins — no public criteria for verification
- No star ratings or review text
- Submit link at clau.de/plugin-directory-submission

**D. Claude Marketplace (claude.com/platform/marketplace)**
- Launched March 6, 2026 — enterprise-only, limited preview
- 6 launch partners: GitLab, Harvey, Lovable, Replit, Rogo, Snowflake
- Billing model: partner purchases draw against existing Anthropic enterprise commitment — no separate invoice
- No commissions taken by Anthropic (stated at launch)
- No ratings/reviews; no public catalog browsing; "talk to sales" gated
- This is B2B procurement infrastructure, not a developer marketplace

### 2. The Plugin/Skill System Architecture

Skills are a `SKILL.md` file (YAML frontmatter + markdown instructions) in a directory. They can include supporting files, scripts, templates, and examples. The format is trivially simple to author.

**Installation scopes:**
- Enterprise (managed settings — pushed to all users in org)
- Personal (`~/.claude/skills/` — all projects)
- Project (`.claude/skills/` — this repo)
- Plugin (via marketplace — namespaced as `plugin-name:skill-name`)

**Marketplaces** are any GitHub repo containing `.claude-plugin/marketplace.json`. Anyone can create and publish one. Claude Code supports adding arbitrary marketplaces via `/plugin marketplace add owner/repo`. The official one (`claude-plugins-official`) is auto-registered.

**Plugin sources supported:** GitHub repos, Git URLs, npm packages, git subdirectories, local paths.

**Update model:** Auto-update enabled by default for official marketplace, disabled by default for third-party.

### 3. Pricing

Across all Anthropic-controlled surfaces: **entirely free.** No paid skills, no revenue share program, no developer payout infrastructure. The enterprise Claude Marketplace bills through existing spend commitments only.

SkillHub.club (third-party) introduced the first paid tier in the ecosystem: $9.99/month Pro, $19-199/month for agent plans. This appears to be a market test — no Anthropic-sanctioned equivalent exists.

### 4. Discovery & Installation UX

**Inside Claude Code terminal:**
- `/plugin` opens a 4-tab TUI: Discover, Installed, Marketplaces, Errors
- Browse by marketplace or search by name
- Select plugin → choose scope (User/Project/Local) → install
- `/reload-plugins` activates changes without restart
- No ratings, no reviews, no "top picks," no difficulty level, no non-technical framing

**Web (claude.com/plugins):**
- Grid of plugins with install counts and brief descriptions
- Search box, filter options
- "Anthropic verified" badges (opaque criteria)
- No way to preview skill content before installing
- No user-generated reviews

**What's missing from official UX:**
- No editorial collections ("Best for React developers," "Essential for solo founders")
- No difficulty/audience indicator (developer vs. non-technical)
- No changelog or version history surfaced in UI
- No community Q&A
- No "installed by people who installed this" recommendations
- No quality score or trust signal beyond install count
- No monetization path for skill authors

### 5. The Agent Skills Open Standard (agentskills.io)

Anthropic created `SKILL.md` format and open-sourced it through agentskills.io. Governed as a community standard. 35+ tools now support it including:

- Claude Code, Claude.ai, Claude API
- Cursor, GitHub Copilot, VS Code
- Gemini CLI, OpenAI Codex
- JetBrains Junie, Roo Code, OpenCode, OpenHands
- Databricks, Snowflake Cortex, Spring AI, Laravel
- Goose (Block), Amp, Letta, Factory, Firebender

**Implication:** A skill built for ClaudeFlows works across all these platforms. A skill marketplace that emphasizes cross-platform compatibility immediately has a larger TAM than "Claude-only."

### 6. Third-Party Ecosystem (Competitive Landscape)

Multiple players launched in early 2026 trying to fill the gap left by Anthropic's thin UX:

| Player | Model | Scale | Differentiation |
|--------|-------|-------|-----------------|
| claudemarketplaces.com | Free aggregator | "100K+ monthly devs" | Community votes, aggregates all sources |
| skillsmp.com | Free + ads | 2,400+ marketplaces listed | Cross-agent (Claude, Codex, Gemini) |
| skillhub.club | Freemium ($9.99/mo Pro) | 87,075 skills | LLM-graded quality scoring (S→D rank) |
| claudeskills.info | Free | Large | Basic browsing |
| alirezarezvani/claude-skills | GitHub | 232+ skills | Cross-agent, functional role categories |
| lobehub.com/skills | Free | Large existing user base | LobeHub brand extension |
| travisvn/awesome-claude-skills | GitHub | Curated list | Curation without UX |

None of these has: a premium paid tier for skills themselves, consulting/professional services overlay, non-technical audience UX, editorial narrative, or a direct install → paid support model.

### 7. Community Signals

The HN post on March 10, 2026 about Claude Code skills as an open-source project got 1 comment — indicating low organic community momentum around the skills ecosystem at the "discussion" layer. The GitHub stars (119K for anthropics/skills) are high but driven by Claude Code's viral growth, not skills community engagement.

Discord exists at agentskills.io but appears nascent. No established community forum, newsletter, or creator economy around Claude skills yet.

---

## Actionable Takeaways

### Positioning ClaudeFlows vs Anthropic

**1. Anthropic will own CLI distribution. Don't compete there.**
The `/plugin` system in Claude Code terminal is deeply integrated. Anthropic controls the default marketplace slot. ClaudeFlows should offer a richer web experience and curated collections — not a competing CLI install mechanism. Make installing through ClaudeFlows feel premium vs. the bare-bones terminal UX.

**2. Monetization is the white space.**
Anthropic has no revenue share, no paid skills, no developer payout model. The entire ecosystem is free. ClaudeFlows can be the first marketplace with a monetization layer — premium skills from expert authors (consultants, agencies, domain specialists) with a revenue split. This is the App Store model that nobody has built yet for skills.

**3. Non-technical audience is completely unaddressed.**
Every existing surface (official and third-party) is written for developers. Terms like `SKILL.md`, `/plugin install`, npm sources, and LSP binaries are everywhere. ClaudeFlows can target product managers, founders, marketers, and operators — non-coders who use Claude and want "superpowers" without touching a terminal. A curated, browsable web UI with plain-English descriptions, use-case categories (not tech categories), and one-click copy-paste install is a real gap.

**4. Editorial curation is the moat.**
Install counts are the only ranking signal in the official marketplace. No quality grading (SkillHub is trying but it's automated LLM grading, not human editorial). ClaudeFlows can build trust through human-curated "collections" — "Essential skills for SaaS founders," "Top 10 for freelance developers," "The security audit starter pack" — that feel like a magazine, not a database.

**5. Cross-platform is a feature to lead with.**
The Agent Skills open standard means any skill works across Claude, Cursor, Copilot, Gemini CLI, etc. Anthropic downplays this (they want Claude Code loyalty). ClaudeFlows should lead with it: "Skills you install here work in Cursor, Copilot, Gemini, and 30+ other tools." This is a massive differentiator vs. the official Anthropic marketplace which frames everything as Claude-native.

**6. The "consulting" overlay is untapped.**
No marketplace offers "buy this skill + get setup help" or "we'll customize this for your codebase." Premium skills from real practitioners (CTO-in-a-box skill from an actual CTO, compliance pack from a legal firm) with optional consulting upsell is a business model zero competitors have attempted.

**7. Enterprise team marketplace tooling is immature.**
The official docs explain how enterprises can host private marketplaces, but there's no SaaS tooling for it. ClaudeFlows could offer "managed team marketplace" — a hosted private marketplace with admin controls, team installs, usage analytics, and policy enforcement — as a B2B SaaS tier. This addresses a real enterprise pain point without competing with Anthropic's enterprise procurement play.

**8. Beware the reserved namespaces.**
Anthropic has reserved these marketplace names: `claude-code-marketplace`, `claude-code-plugins`, `claude-plugins-official`, `anthropic-marketplace`, `anthropic-plugins`, `agent-skills`, `knowledge-work-plugins`, `life-sciences`. ClaudeFlows brand positioning must avoid anything that sounds like an official Anthropic property.

---

## Sources

- [anthropics/skills GitHub](https://github.com/anthropics/skills) — official skills repo, 119K stars
- [anthropics/claude-plugins-official GitHub](https://github.com/anthropics/claude-plugins-official) — official plugin directory
- [claude.com/plugins](https://claude.com/plugins) — web plugin browser with install counts
- [claude.com/platform/marketplace](https://claude.com/platform/marketplace) — enterprise marketplace (limited preview)
- [code.claude.com/docs/en/skills](https://code.claude.com/docs/en/skills) — complete skills documentation
- [code.claude.com/docs/en/discover-plugins](https://code.claude.com/docs/en/discover-plugins) — plugin discovery & install UX
- [code.claude.com/docs/en/plugin-marketplaces](https://code.claude.com/docs/en/plugin-marketplaces) — marketplace creation docs
- [agentskills.io](https://agentskills.io) — Agent Skills open standard, 35+ adopting tools
- [skillhub.club](https://www.skillhub.club) — third-party marketplace, 87K skills, freemium model
- [claudemarketplaces.com](https://claudemarketplaces.com) — community aggregator
- [skillsmp.com](https://skillsmp.com) — cross-agent skills aggregator
- [buildfastwithai.com — Claude Marketplace explained](https://www.buildfastwithai.com/blogs/claude-marketplace-explained) — launch partner analysis
- [HN: Claude Code Skills as Open Source Project](https://news.ycombinator.com/item?id=47321892) — March 10, 2026
- [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) — 232+ cross-agent skills
- [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — curated GitHub list
