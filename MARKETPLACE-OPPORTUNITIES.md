# Claude Code Skills Marketplace — Opportunity Research

**Date:** 2026-03-26
**Method:** Cross-platform demand analysis (Upwork, Fiverr, Gumroad, Notion, God of Prompt, n8n/Zapier, Skool/Maven, Reddit, X/Twitter, LinkedIn)

---

## Competitive Landscape (Important Context)

Before the opportunities: the skills marketplace space is already active.

- **SkillHub.club** — 36,000+ skills, $9.99/mo Pro plan, agent plans up to $199/mo. Multi-platform (Claude, Codex, Gemini, etc.)
- **ClaudeMarketplaces.com** — Directory of Claude Code plugins, skills, MCP servers
- **SkillsMP.com** — Agent skills marketplace for Claude, Codex, ChatGPT
- **GitHub anthropics/skills** — Official Anthropic public skills repo

The market exists but is early. Most skills are free/open-source. The monetization layer is thin. This is the gap.

---

## Top 15 Opportunities (Ranked by Evidence Strength)

### 1. YouTube Content Production Pipeline
- **Workflow:** Fully autonomous 24/7 YouTube content pipeline — research, scripting, thumbnail generation, scheduling
- **Target buyer:** YouTube creators, content agencies
- **Evidence:** Upwork job posting: "$1,500 fixed price" for a Claude Code AI Agent Architect to build exactly this ([Upwork listing](https://www.upwork.com/freelance-jobs/apply/Claude-Code-Agent-Architect-Build-Fully-Autonomous-YouTube-Content-Production-Pipeline_~022021773044817109399/))
- **Current price:** $1,500 per custom build on Upwork; SaaS alternatives (Pictory, InVideo) charge $25-50/mo but don't do end-to-end
- **Claude Code fit:** HIGH — file generation (scripts), can call image gen APIs, structured output. Needs MCP for YouTube API.
- **Skill price point:** $29-49 one-time

### 2. Real Estate Operations Automation
- **Workflow:** Transaction management, lead management, CRM sync (FUB, Skyslope, Sage 50), capital finance workflows
- **Target buyer:** Real estate brokerages, property management firms
- **Evidence:** Upwork job: "$1,200 fixed price" for AI Automation Integrator with Claude + Zapier + n8n for high-volume real estate operations ([Upwork listing](https://www.upwork.com/freelance-jobs/apply/Automation-Integrator-Real-Estate-Operation-Claude-Zapier-N8N-FUB-Skyslope-Sage-M360_~022029980076768635170/))
- **Current price:** $1,200 one-time on Upwork; custom integrators charge $75-150/hr
- **Claude Code fit:** MEDIUM — analysis and document generation strong, but needs n8n/Zapier for live integrations. Skill could handle the AI logic layer.
- **Skill price point:** $39-79

### 3. SEO Content Brief Generator
- **Workflow:** Analyze SERP results for target keyword, generate comprehensive content brief (headings, word count, entities, competitor gaps, internal linking suggestions)
- **Target buyer:** SEO managers at agencies, in-house content teams
- **Evidence:** Frase ($15-115/mo), Surfer SEO ($89-129/mo) are entire SaaS businesses doing this. SEO Optimizer is already one of the [39 real Claude skills](https://aiblewmymind.substack.com/p/claude-skills-36-examples) people built. Fiverr SEO writing gigs charge $15-30 per 1,000 words.
- **Current price:** $89-129/mo for SaaS; $100-500 per brief on Upwork
- **Claude Code fit:** HIGH — pure text analysis and generation. With web search MCP, can analyze live SERPs. No special tooling needed.
- **Skill price point:** $19-39

### 4. Business Case / Proposal Builder
- **Workflow:** Generate 6-step investment cases with quantified costs, ROI metrics, risk assessments across multiple formats (executive summary, full deck, one-pager)
- **Target buyer:** Consultants, product managers, startup founders
- **Evidence:** Already exists as a popular Claude skill (Business Case Builder by Zain Haseeb). AI pitch deck tools (PlusAI, Beautiful.ai) charge $10-30/mo. Proposal Genie has 50,000+ freelancer users. [33 PM skills in marketplace](https://medium.com/product-powerhouse/33-claude-skills-for-pms-are-now-in-the-claude-code-marketplace-heres-how-to-install-them-7968ab6bb1e1).
- **Current price:** $10-30/mo SaaS; $200-500 per deck on Fiverr/Upwork
- **Claude Code fit:** HIGH — pure document generation. Can output HTML presentations, markdown, structured proposals.
- **Skill price point:** $19-29

### 5. Claude Bot Setup & Training (Meta-Skill)
- **Workflow:** Set up Claude for a specific business use case — configure skills, MCP servers, custom instructions, workflows. Train the team.
- **Target buyer:** SMB owners who want AI but can't configure it themselves
- **Evidence:** Upwork job: "$2,500 fixed price" for Claude Bot Setup and Training ([Upwork listing](https://www.upwork.com/freelance-jobs/apply/Claude-Bot-Setup-and-Training_~022028980117954349314/)). Multiple Claude specialist jobs at $65-2,500.
- **Current price:** $500-2,500 per setup on Upwork
- **Claude Code fit:** This IS Claude Code — the "skill" is a setup wizard / onboarding skill that configures other skills. Very meta, very valuable.
- **Skill price point:** $49-99 (or bundled with consulting)

### 6. Email Sequence / Conversion Optimizer
- **Workflow:** Audit email sequences for weak CTAs, value propositions, subject lines. Generate A/B variants. Score conversion potential.
- **Target buyer:** Email marketers, course creators, e-commerce owners
- **Evidence:** Email Conversion Tester and Post Live Class Email are among the [39 real Claude skills](https://aiblewmymind.substack.com/p/claude-skills-36-examples). Rhonda Britten built 5+ skills around email/conversion workflows. n8n has email automation as top category. Fiverr: email copywriting gigs $20-200.
- **Current price:** SaaS tools (Lavender, Copy.ai) $29-99/mo; Fiverr $50-200 per sequence
- **Claude Code fit:** HIGH — pure text analysis/generation. Can read existing emails, score them, generate variants.
- **Skill price point:** $19-29

### 7. Compliance & Policy Document Generator (SOC 2, ISO 27001)
- **Workflow:** Generate security policies, compliance documentation, gap analysis, audit preparation documents
- **Target buyer:** CTOs at startups pursuing SOC 2, compliance consultants
- **Evidence:** Upwork has active SOC 2 / ISO 27001 consultant jobs. AI SOC 2 automation cuts compliance work by 50% ([DSALTA](https://www.dsalta.com/resources/soc-2/soc-2-automation-ai-compliance)). Vanta/Drata charge $10K+/yr for compliance platforms.
- **Current price:** Compliance consultants $150-350/hr on Upwork; Vanta/Drata $10K-25K/yr
- **Claude Code fit:** HIGH — document generation is the core task. Can generate policy templates, control descriptions, evidence collection checklists. Needs no external APIs.
- **Skill price point:** $49-99 (massive value vs. $10K+ alternatives)

### 8. Competitor Analysis / Market Intelligence
- **Workflow:** Research competitors, extract pricing, features, positioning. Generate comparison matrices, SWOT analysis, market maps.
- **Target buyer:** Product managers, startup founders, strategy consultants
- **Evidence:** Lead generation specialists on Upwork charge $13-45/hr. Competitor analysis is one of the top n8n AI workflow categories. Apify (web scraping SaaS) specifically lists competitor tracking as top use case.
- **Current price:** $200-1,000 per analysis on Upwork; Crayon/Klue charge $15K+/yr
- **Claude Code fit:** HIGH with web search MCP — can research, analyze, and generate structured output. The Scout workflow already does a version of this.
- **Skill price point:** $29-49

### 9. AI Code Review & Documentation
- **Workflow:** Review PRs for bugs, security issues, style violations. Generate documentation from code. Create architecture diagrams.
- **Target buyer:** Engineering teams, solo developers, agencies
- **Evidence:** CodeRabbit has 2M+ connected repos. Graphite charges $10-50/user/mo. CodeAnt AI at $24/user/mo. 84% of developers use AI tools but 46% distrust accuracy ([Stack Overflow 2025](https://dev.to/heraldofsolace/the-best-ai-code-review-tools-of-2026-2mb3)). Multiple Claude skills exist: Verify-Work, Engineering Standards, Automated UI Test.
- **Current price:** $10-50/user/mo for SaaS; free for basic GitHub Copilot
- **Claude Code fit:** VERY HIGH — this is Claude Code's native domain. Skills like Verify-Work already exist. Documentation generation is trivial.
- **Skill price point:** $9-19 (competitive pressure from free tools)

### 10. Inventory & E-Commerce Analyst
- **Workflow:** Project 12-month sales, determine stock-out dates, recommend reorder timelines, analyze product performance
- **Target buyer:** E-commerce store owners, DTC brands, Amazon sellers
- **Evidence:** Inventory Analyst skill already built by Alex Willen (projects 12-month sales, stock-out dates, ordering timelines). E-commerce Notion templates are top sellers. Fiverr data analysis gigs $50-500.
- **Current price:** Inventory planning tools (Inventory Planner, Stocky) $50-200/mo; Fiverr analysts $100-500
- **Claude Code fit:** HIGH — CSV/spreadsheet analysis, projection calculations, report generation. Needs file access (already has it).
- **Skill price point:** $19-39

### 11. Voice DNA / Brand Voice Extractor
- **Workflow:** Analyze existing content to extract writing patterns, tone, vocabulary. Generate a reusable voice profile for consistent AI-generated content.
- **Target buyer:** Content agencies, brand managers, solopreneurs with established voices
- **Evidence:** Voice DNA by Daria Cupareanu is one of the most cited Claude skills. God of Prompt's $150 lifetime bundle highlights brand voice as key category. Content repurposing (turning one piece into many) is a top Gumroad product category.
- **Current price:** Brand voice guides from agencies: $2,000-5,000. God of Prompt: $17/mo or $150 lifetime. Jasper brand voice: $49-69/mo.
- **Claude Code fit:** VERY HIGH — pure text analysis. Read samples, extract patterns, output a CLAUDE.md style guide.
- **Skill price point:** $19-29

### 12. Meeting-to-Action Converter
- **Workflow:** Process meeting transcripts into action items, decisions log, follow-up emails, project updates. Track across meetings.
- **Target buyer:** Project managers, executives, consultants
- **Evidence:** Meeting Analyzer skill by Daria Cupareanu already exists. Otter.ai ($8-24/mo) and Fireflies ($10-19/mo) are multi-million dollar businesses. Granola (meeting tool) exists as MCP server.
- **Current price:** Otter.ai $8-24/mo; Fireflies $10-19/mo; custom meeting analysis $50-200/session on Fiverr
- **Claude Code fit:** HIGH — text processing of transcripts. Granola MCP integration available. Outputs structured markdown.
- **Skill price point:** $9-19

### 13. LinkedIn Content & Outreach Generator
- **Workflow:** Generate LinkedIn posts from articles/ideas, create personalized outreach sequences, optimize profile sections
- **Target buyer:** B2B salespeople, recruiters, founders doing personal branding
- **Evidence:** LinkedIn Teaser Generator is a real Claude skill. AI use in recruiting jumped to 43% in 2026 ([LinkedIn data](https://www.linkedin.com/news/story/ai-will-transform-hiring-in-2026-6848964/)). LinkedIn automation tools (Expandi, Dripify) charge $59-99/mo. n8n has LinkedIn post generation as top template.
- **Current price:** $59-99/mo for automation tools; Fiverr LinkedIn ghostwriting $30-150/post
- **Claude Code fit:** HIGH for content generation, MEDIUM for automation (needs LinkedIn API/MCP). Content generation alone is valuable.
- **Skill price point:** $19-29

### 14. Automated UI Testing Suite
- **Workflow:** Generate and run end-to-end browser tests using Playwright. Credential management, screenshot reporting, regression detection.
- **Target buyer:** Developers, QA engineers, agencies shipping client sites
- **Evidence:** Automated UI Test by Jenny Ouyang is a real Claude skill (Playwright + credential management + screenshot reporting). Testing is a top pain point — 46% of devs distrust AI output quality.
- **Current price:** QA engineers $40-80/hr; testing SaaS (BrowserStack, LambdaTest) $29-199/mo
- **Claude Code fit:** VERY HIGH — Claude Code can write and execute Playwright tests natively. This is one of the most natural skills possible.
- **Skill price point:** $19-39

### 15. EB-2 NIW / Immigration Petition Writer
- **Workflow:** Complete immigration petition pipeline — case evaluation, endeavor drafting, three-pillar petition, recommendation letters, document assembly, adversarial review, RFE responses
- **Target buyer:** Immigration attorneys, self-petitioning professionals
- **Evidence:** Mentioned in the [2026 Skill Economy report](https://stormy.ai/blog/2026-skill-economy-claude-mcp-marketing-skills) as an example of specialized high-value skill. Immigration attorneys charge $5,000-15,000 per EB-2 NIW petition.
- **Current price:** $5,000-15,000 per petition (attorney fees)
- **Claude Code fit:** HIGH — document generation, legal template filling, structured argumentation. Does not replace attorney judgment but handles 80% of drafting work.
- **Skill price point:** $99-199 (massive value vs. attorney fees)

---

## Demand Heat Map

| Category | Upwork Evidence | SaaS Competitor | Fiverr Volume | Claude Fit | Score |
|---|---|---|---|---|---|
| SEO Content Brief | $100-500/job | $89-129/mo | High | Very High | **9/10** |
| YouTube Pipeline | $1,500 job | $25-50/mo | Medium | High | **8/10** |
| Business Proposals | $200-500/job | $10-30/mo | High | Very High | **8/10** |
| Compliance Docs | $150-350/hr | $10-25K/yr | Low | Very High | **8/10** |
| Email Optimizer | $50-200/job | $29-99/mo | High | Very High | **8/10** |
| Real Estate Ops | $1,200 job | Custom | Low | Medium | **7/10** |
| Competitor Analysis | $200-1K/job | $15K+/yr | Medium | High | **8/10** |
| Code Review | $10-50/user/mo | $24/user/mo | Low | Very High | **7/10** |
| Voice Extractor | $2-5K (agency) | $49-69/mo | Medium | Very High | **8/10** |
| LinkedIn Content | $30-150/post | $59-99/mo | Very High | High | **8/10** |
| Meeting Converter | $50-200/session | $8-24/mo | Medium | High | **7/10** |
| UI Test Generator | $40-80/hr | $29-199/mo | Low | Very High | **7/10** |
| Inventory Analyst | $100-500/job | $50-200/mo | Medium | High | **7/10** |
| Immigration Writer | $5-15K/petition | None | Low | High | **8/10** |
| Bot Setup Wizard | $500-2,500/job | None | Low | Very High | **7/10** |

---

## Key Insights

### 1. The Winning Price Point Is $19-49
- God of Prompt sells 30,000+ prompts for $150 lifetime or $17/mo
- Gumroad AI products average $19-79 each
- SkillHub charges $9.99/mo for access to 36,000 skills
- But Upwork jobs for the SAME work are $200-2,500
- The sweet spot: charge $29-49 per skill (10-20x cheaper than hiring someone, but premium vs. free GitHub skills)

### 2. Three Tiers of Opportunity

**Tier 1 — "Replace a SaaS subscription" ($19-39)**
SEO briefs, email optimization, meeting analysis, code review. These compete with $50-130/mo SaaS tools. One-time payment of $29 vs. $1,200/yr is an easy sell.

**Tier 2 — "Replace a freelancer" ($39-79)**
YouTube pipeline, real estate ops, competitor analysis, LinkedIn content. These replace $200-1,500 Upwork jobs. Still 10x cheaper than hiring.

**Tier 3 — "Replace a consultant" ($99-199)**
Compliance docs, immigration petitions, business case builder. These replace $2,000-15,000 professional services. 50-100x cheaper.

### 3. The Real Moat Is Domain Expertise, Not Prompts
- 36,000 skills already exist on SkillHub (mostly free/generic)
- God of Prompt has 30,000+ prompts for $150
- Winning skills need: tested workflows + domain knowledge + real output quality
- Example: an "SEO Content Brief Generator" built by an actual SEO manager who tested it on 50 real briefs beats a generic prompt every time

### 4. Bundling Wins
- God of Prompt makes $40K/mo selling bundles, not individual prompts
- Rhonda Britten built 5+ interconnected skills (class prep → email → conversion test → social amplification)
- Opportunity: sell "Marketing Operations Bundle" (5 skills, $99) or "Developer Productivity Pack" (4 skills, $49)

### 5. The Course-to-Skill Pipeline
- Skool AI communities charge $30-150/member/mo for learning
- Maven AI courses cost $500-2,000 per cohort
- Every course topic = a skill opportunity: if someone pays $99/mo to LEARN how to do competitor analysis, they'd pay $39 once for a skill that DOES it

---

## Recommended First 5 Skills to Build/Acquire for ClaudeFlows

1. **SEO Content Brief Generator** — Highest demand signal, clearest SaaS replacement story, very high Claude fit
2. **Business Case Builder** — Already proven (exists as popular skill), wide buyer base, high value
3. **Compliance Doc Generator (SOC 2 starter)** — Highest value gap ($49 vs $10K+), low competition in skills space
4. **Voice DNA + Content Repurposer Bundle** — Already proven, maps to content creator economy, recurring need
5. **Competitor Intelligence Analyst** — Extends existing Scout workflow, clear Upwork demand signal

---

## Sources

- [Upwork Claude specialist jobs](https://www.upwork.com/hire/claude-specialists/)
- [Upwork AI automation engineers](https://www.upwork.com/hire/ai-automation-engineers/)
- [God of Prompt pricing](https://www.godofprompt.ai/pricing)
- [God of Prompt complete bundle](https://www.godofprompt.ai/complete-ai-bundle)
- [n8n AI workflow templates (6,122)](https://n8n.io/workflows/categories/ai/)
- [Fiverr AI services](https://www.fiverr.com/categories/ai-services)
- [Best AI gigs on Fiverr 2026](https://freelanceautomationai.com/ai-gigs-on-fiverr-2026/)
- [Gumroad AI prompt discovery](https://gumroad.com/?tags=ai+prompts)
- [Making $1K selling AI prompts on Gumroad](https://simplescale.medium.com/how-i-made-my-first-1-000-selling-ai-prompt-packs-on-gumroad-93663abcc492)
- [Notion template marketplace](https://www.notion.com/templates)
- [Top Notion templates to sell 2026](https://sellfy.com/blog/selling-notion-templates/)
- [39 Claude Skills examples](https://aiblewmymind.substack.com/p/claude-skills-36-examples)
- [33 PM Claude skills](https://medium.com/product-powerhouse/33-claude-skills-for-pms-are-now-in-the-claude-code-marketplace-heres-how-to-install-them-7968ab6bb1e1)
- [2026 Skill Economy report](https://stormy.ai/blog/2026-skill-economy-claude-mcp-marketing-skills)
- [SkillHub marketplace](https://www.skillhub.club)
- [Claude Code skills docs](https://code.claude.com/docs/en/skills)
- [Anthropic official skills repo](https://github.com/anthropics/skills)
- [SEO automation tools pricing 2026](https://www.trysight.ai/blog/automated-seo-content-tools-pricing)
- [AI code review tools 2026](https://dev.to/heraldofsolace/the-best-ai-code-review-tools-of-2026-2mb3)
- [SOC 2 automation with AI](https://www.dsalta.com/resources/soc-2/soc-2-automation-ai-compliance)
- [Skool AI Automation Society](https://www.skool.com/ai-automation-society)
- [AI communities replacing courses](https://www.humai.blog/ai-communities-instead-of-courses-a-new-knowledge-monetization-model-in-2026/)
- [Maven AI courses](https://maven.com/courses/ai)
- [LinkedIn: AI will transform hiring 2026](https://www.linkedin.com/news/story/ai-will-transform-hiring-in-2026-6848964/)
- [Claude Code Reddit discussion](https://www.aitooldiscovery.com/guides/claude-code-reddit)
- [Google engineer Claude Code confession](https://ppc.land/google-engineers-claude-code-confession-rattles-engineering-teams/)
- [AI digital products guide](https://www.digitalapplied.com/blog/ai-digital-products-templates-workflows-sell-guide)
- [Zapier AI workflow features](https://zapier.com/blog/ai-workflow-features/)
