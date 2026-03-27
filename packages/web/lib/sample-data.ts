import type { Workflow, TokenEstimate } from "./types";

export const SAMPLE_WORKFLOWS: Workflow[] = [
  {
    name: "venture-studio",
    displayName: "AI Venture Studio",
    tagline: "Validate your startup idea before spending a dollar",
    description:
      "You have an idea but no way to know if it's worth your time and money. This skill runs it through a 6-step gauntlet — audience research, competitor analysis, solution design, business model, metrics, and execution — so you get a validated plan backed by data, not gut feelings.",
    detailedProcess: `Here's exactly what happens when you run this workflow:

**Phase 1 — Audience & Problems.** The AI searches the web for your target market. It reads forums, social media, review sites, and industry reports to find what problems real people are complaining about. It produces a report with specific quotes, pain points ranked by frequency, and audience segments you might not have considered. You review the findings and tell it which problems look worth solving.

**Phase 2 — Opportunities.** Using what it learned about the audience, the AI researches existing solutions — competitors, alternatives, workarounds people are using. It maps gaps in the market: problems that existing products don't solve well, underserved segments, pricing gaps. You get a competitive landscape with specific companies, their strengths, and where they fall short.

**Phase 3 — Solutions.** Based on validated problems and market gaps, the AI proposes 2–3 solution approaches. Each one includes a feature set, target segment, and rough positioning. You pick the direction you like, or mix and match.

**Phase 4 — Business Model.** The AI designs pricing strategy, revenue model, and unit economics for your chosen solution. It looks at what competitors charge, what the market expects, and suggests pricing tiers with reasoning. You get a spreadsheet-ready financial model, not just hand-waving.

**Phase 5 — Metrics.** The AI defines the KPIs that matter for your specific business type — acquisition costs, conversion rates, retention targets, revenue milestones. These are calibrated to your industry based on benchmarks it finds online, not generic startup advice.

**Phase 6 — Execution.** The AI builds a landing page with your value proposition, generates a GitHub repository with the project structure, and sets up basic analytics. If you've connected Vercel, the landing page goes live automatically. If not, you get the files to deploy however you want.

Throughout all six phases, the AI does the heavy lifting — searching, reading, analyzing, writing — but you make every strategic decision. It proposes; you approve or redirect.`,
    outputDescription: "You get a folder on your computer containing: a research report (Markdown), competitive analysis, business model document, a working landing page (HTML/CSS/JS), and optionally a live deployed site on Vercel. All files are plain text you can open in any editor.",
    costInfo: "The workflow itself is free. You need a Claude Pro subscription ($20/month) to run Claude Code. The Brave Search API free tier gives you 2,000 searches/month, which is enough for 3-4 full runs of this workflow.",
    setupTime: "15-20 minutes for first-time setup",
    limitations: [
      "Research quality depends on what's publicly available online — if your market is very niche or new, there may be less data to find",
      "Financial projections are estimates based on comparable companies, not guarantees",
      "The landing page is functional but basic — you'll likely want a designer to polish it for a real launch",
      "The AI can't talk to potential customers or run surveys — it works with existing public information only",
    ],
    differentiators: [
      "Doing this manually takes 2-4 weeks of Googling, reading, and spreadsheet work — this compresses it to a few hours with better coverage",
      "The AI reads hundreds of sources per phase, far more than you'd realistically read yourself",
      "Each phase builds on the last, so insights compound rather than being disconnected research sessions",
      "You get structured deliverables, not just a chat transcript you'd have to organize yourself",
    ],
    benefits: [
      "Validated audience research and problem analysis with real quotes and data",
      "A complete business model with pricing strategy and unit economics",
      "KPIs and success metrics calibrated to your specific industry",
      "A working landing page deployed automatically (or files to deploy yourself)",
    ],
    inputs: [
      {
        name: "A startup idea",
        description: "A brief description of the problem you want to solve or the audience you want to serve. Can be as rough as one sentence.",
        example: "AI-powered resume builder for job seekers",
      },
    ],
    prerequisites: [
      "Claude Code installed on your computer",
      "A free Brave Search API key (for research)",
    ],
    prerequisiteDetails: [
      {
        label: "Claude Code",
        description: "A command-line tool that lets AI work with files on your computer. It runs in your terminal — you type commands and it does the work. Requires a Claude Pro subscription.",
        url: "https://docs.anthropic.com/en/docs/claude-code/overview",
        timeEstimate: "10 minutes to install",
        cost: "Free tool, but requires Claude Pro ($20/month)",
      },
      {
        label: "Brave Search API key",
        description: "A free key that lets the AI search the web. You sign up on Brave's website, copy a key, and paste it during setup. No credit card required for the free tier.",
        url: "https://brave.com/search/api/",
        timeEstimate: "2 minutes to sign up",
        cost: "Free (2,000 searches/month)",
      },
    ],
    setupSteps: [
      {
        title: "Install Claude Code",
        description: "Open your terminal (on Mac: search for 'Terminal' in Spotlight) and paste the install command. Follow the prompts to sign in with your Claude account.",
        required: true,
        actionUrl: "https://docs.anthropic.com/en/docs/claude-code/overview",
        timeEstimate: "10 minutes",
      },
      {
        title: "Enable web search",
        description: "This workflow searches the web to research your audience and competitors. You'll add a free Brave Search connection — the setup wizard walks you through it.",
        required: true,
        mcpServer: "brave-search",
        actionUrl: "https://brave.com/search/api/",
        timeEstimate: "2 minutes",
      },
      {
        title: "Enable web access",
        description: "Allows the AI to visit websites and read content from public pages. This is how it gathers information from company sites, forums, and reports.",
        required: true,
        mcpServer: "fetch",
        timeEstimate: "1 minute",
      },
      {
        title: "Connect Vercel (optional)",
        description: "If you want your landing page automatically deployed to a live URL, connect a free Vercel account. Skip this if you prefer to deploy manually or just want the files.",
        required: false,
        envVar: "VERCEL_TOKEN",
        actionUrl: "https://vercel.com/signup",
        timeEstimate: "5 minutes",
      },
      {
        title: "Connect GitHub (optional)",
        description: "Automatically creates a repository for your project code. Skip this if you don't use GitHub or prefer to manage code yourself.",
        required: false,
        envVar: "GITHUB_TOKEN",
        actionUrl: "https://github.com/settings/tokens",
        timeEstimate: "3 minutes",
      },
    ],
    estimatedTime: "2-4 hours of active work (reviewing AI output and making decisions)",
    difficulty: "beginner",
    heroColor: "from-orange-500 to-red-600",
    author: { name: "mikethepurple", github: "mikethepurple", bio: "Builder of AI-powered business tools. Turning startup ideas into validated plans." },
    version: "1.0.0",
    category: "business",
    tags: ["venture", "startup", "product-development"],
    installs: 142,
    rating: 4.8,
    skills: [
      {
        name: "start",
        description: "Begin a new project — you give it your idea and it kicks off Phase 1 (audience research)",
      },
      {
        name: "run",
        description: "Continue working through the current phase — use this when you're ready to keep going after reviewing results",
      },
      {
        name: "graduate",
        description: "Move to the next phase when you're happy with the current one's output",
      },
      {
        name: "studio",
        description: "See a dashboard of all your projects and their current phase",
      },
    ],
    tokenEstimate: {
      inputTokens: 520000,
      outputTokens: 255000,
      totalTokens: 775000,
      confidence: "estimated",
      note: "Based on typical runs with 3 methodology agents per step. Actual usage varies with market complexity.",
    },
    steps: [
      {
        name: "Audience & Problems",
        description: "AI searches the web to find your target audience, reads forums and reviews, identifies their real pain points with specific quotes and data",
        methodologyCount: 3,
        tokenEstimate: { inputTokens: 140000, outputTokens: 60000, totalTokens: 200000, confidence: "estimated" },
      },
      {
        name: "Opportunities",
        description: "Researches competitors and existing solutions, maps market gaps, identifies where current products fall short",
        methodologyCount: 2,
        tokenEstimate: { inputTokens: 105000, outputTokens: 45000, totalTokens: 150000, confidence: "estimated" },
      },
      {
        name: "Solutions",
        description: "Proposes 2-3 solution approaches based on validated problems, each with features, positioning, and target segment",
        methodologyCount: 3,
        tokenEstimate: { inputTokens: 90000, outputTokens: 40000, totalTokens: 130000, confidence: "estimated" },
      },
      {
        name: "Business Model",
        description: "Designs pricing, revenue model, and unit economics based on competitor pricing and market expectations",
        methodologyCount: 2,
        tokenEstimate: { inputTokens: 80000, outputTokens: 35000, totalTokens: 115000, confidence: "estimated" },
      },
      {
        name: "Metrics",
        description: "Defines industry-calibrated KPIs: acquisition costs, conversion rates, retention targets, revenue milestones",
        methodologyCount: 2,
        tokenEstimate: { inputTokens: 40000, outputTokens: 20000, totalTokens: 60000, confidence: "estimated" },
      },
      {
        name: "Execution",
        description: "Builds your landing page, creates a GitHub repo, deploys to Vercel — you get a live site and all source files",
        methodologyCount: 4,
        tokenEstimate: { inputTokens: 65000, outputTokens: 55000, totalTokens: 120000, confidence: "estimated" },
      },
    ],
    mcp: {
      "brave-search": {
        required: true,
        plainName: "Web Search",
        plainDescription: "Lets the AI search the internet to research your market, competitors, and audience",
        setupUrl: "https://brave.com/search/api/",
        setupTime: "2 minutes",
      },
      fetch: {
        required: true,
        plainName: "Web Access",
        plainDescription: "Lets the AI visit and read public websites — company pages, forums, reports, articles",
        setupUrl: "https://docs.anthropic.com/en/docs/claude-code/mcp",
        setupTime: "1 minute",
      },
    },
    env: {
      VERCEL_TOKEN: { required: false, description: "Auto-deploy your landing page to a live URL" },
      GITHUB_TOKEN: { required: false, description: "Auto-create a GitHub repository for your project" },
    },
    repository: "https://github.com/mikethepurple/venture-studio",
    license: "MIT",
    readme: `# AI Venture Studio

Go from a rough idea to a validated business with a live landing page — all guided by AI.

## What It Does

This workflow walks you through a structured 6-phase process:

1. **Audience & Problems** — Discover who you're building for and what problems actually matter to them
2. **Opportunities** — Find gaps in the market that are worth pursuing
3. **Solutions** — Design approaches that solve validated problems
4. **Business Model** — Figure out pricing, revenue streams, and unit economics
5. **Metrics** — Set the KPIs and success measurements that matter
6. **Execution** — Build a landing page, create a GitHub repo, and set up analytics

Each phase does the research and analysis automatically. You review the results and decide when to move forward.

## Quick Start

\`\`\`bash
npx @claudeflows/cli install venture-studio
cd my-project
/start "AI-powered resume builder for job seekers"
/run
/graduate
\`\`\`

## What You'll Need

- **Web search** — for researching audiences and competitors
- **Web access** — for gathering information from public pages
- Vercel account (optional) — for auto-deploying your landing page
- GitHub account (optional) — for creating project repos`,
  },
  {
    name: "scout",
    displayName: "Scout — Startup Research Engine",
    tagline: "Research any industry in 30 minutes, not 3 days",
    description:
      "Researching an industry from scratch means days of Googling, tab-hopping, and spreadsheet wrangling. This skill profiles 20+ companies with funding data, market positioning, and competitive gaps — all verified with a second pass and delivered in one structured report.",
    detailedProcess: `Here's exactly what happens when you run Scout:

**Step 1 — You name an industry.** You type something like "AI developer tools" or "B2B fintech in Europe" and the AI starts working.

**Step 2 — Discovery search.** The AI searches the web across multiple sources: Crunchbase-style databases, news articles, funding announcements, company websites, LinkedIn profiles, and industry reports. It's looking for startups that match your industry, prioritizing companies with recent activity.

**Step 3 — Profile building.** For each startup it finds, the AI visits the company's website, reads their about page, pricing page, and any press coverage. It extracts structured data: company name, founding year, founders, headquarters, funding raised, last round, valuation, investors, business model, number of employees, and a summary of what they do.

**Step 4 — Financial verification.** This is the critical step that sets Scout apart from just Googling. The AI does a second pass specifically focused on financial data — cross-referencing funding amounts, valuations, and investor names across multiple sources. If numbers conflict, it flags the discrepancy rather than guessing.

**Step 5 — Table assembly.** All the data gets organized into a structured 15-column table. The AI validates that every row has the right number of columns (a surprisingly common failure mode with AI-generated tables) and that data is in the right fields.

**Step 6 — Output.** You get the results as a formatted table in your terminal, plus a CSV file. If you run the sync command, it pushes everything to a Google Sheet where your team can collaborate.

The whole process takes 30-60 minutes depending on how niche the industry is. More obscure markets take longer because there's more searching required.`,
    outputDescription: "You get a structured table (displayed in terminal + saved as CSV) with 15 columns per startup: name, website, founded, HQ, founders, funding, valuation, last round, investors, business model, employees, description, and more. Optionally synced to Google Sheets.",
    costInfo: "Free workflow + Claude Pro ($20/month). Brave Search free tier (2,000 searches/month) is enough for 2-3 full research runs. Google Sheets sync requires a Google account (free).",
    setupTime: "10-15 minutes for first-time setup",
    limitations: [
      "Financial data accuracy depends on what's publicly reported — private companies with no press coverage may have gaps",
      "The AI can only find startups that have some web presence — very early stealth-mode companies won't appear",
      "Results are a snapshot in time — funding rounds and valuations change. Run /refresh-research to update",
      "Google Sheets sync requires some manual setup of the Google Sheets MCP connection",
    ],
    differentiators: [
      "Manual research on 20 startups typically takes 2-3 full days of Googling, reading, and spreadsheet entry — this does it in under an hour",
      "The financial verification pass catches errors that single-pass research misses (AI frequently confuses funding rounds or mixes up companies)",
      "Structured output means you can immediately sort, filter, and share — no cleaning up a messy document",
      "Repeatable: run it again next month and get updated data, rather than starting from scratch",
    ],
    benefits: [
      "Detailed profiles of 20+ startups per industry with verified financial data",
      "Structured 15-column dataset: funding, valuation, founders, business model, and more",
      "Automatic Google Sheets sync so your team can collaborate on the data",
      "Second-pass financial verification catches errors from initial research",
    ],
    inputs: [
      {
        name: "An industry or vertical",
        description: "The market or space you want to research. Can be broad ('AI tools') or specific ('B2B fintech startups in Southeast Asia founded after 2020')",
        example: "AI developer tools",
      },
    ],
    prerequisites: [
      "Claude Code installed on your computer",
      "A free Brave Search API key (for research)",
    ],
    prerequisiteDetails: [
      {
        label: "Claude Code",
        description: "A command-line tool that lets AI work with files on your computer. It runs in your terminal — you type commands and it does the work.",
        url: "https://docs.anthropic.com/en/docs/claude-code/overview",
        timeEstimate: "10 minutes to install",
        cost: "Free tool, requires Claude Pro ($20/month)",
      },
      {
        label: "Brave Search API key",
        description: "A free key that lets the AI search the web. Sign up, copy your key, paste it during setup.",
        url: "https://brave.com/search/api/",
        timeEstimate: "2 minutes",
        cost: "Free (2,000 searches/month)",
      },
    ],
    setupSteps: [
      {
        title: "Enable web search",
        description: "The research engine searches the web to find startup information from public sources. You'll connect a free Brave Search account.",
        required: true,
        mcpServer: "brave-search",
        actionUrl: "https://brave.com/search/api/",
        timeEstimate: "2 minutes",
      },
      {
        title: "Enable web access",
        description: "Allows the AI to visit company websites, read about pages, and verify information directly from the source.",
        required: true,
        mcpServer: "fetch",
        timeEstimate: "1 minute",
      },
    ],
    estimatedTime: "30-60 minutes (you start it and check back when it's done)",
    difficulty: "beginner",
    heroColor: "from-yellow-500 to-amber-600",
    author: { name: "mikethepurple", github: "mikethepurple", bio: "Builder of AI-powered business tools. Turning startup ideas into validated plans." },
    version: "1.0.0",
    category: "research",
    tags: ["research", "startups", "competitive-intelligence"],
    installs: 89,
    rating: 4.6,
    skills: [
      {
        name: "research-startups",
        description: "Research startups in any industry — you name the market, it finds and profiles 20+ companies",
      },
      {
        name: "sync-sheets",
        description: "Push your research results to a Google Sheet so your team can view, sort, and filter the data",
      },
      {
        name: "refresh-research",
        description: "Re-run the research to catch new companies or updated funding information since your last run",
      },
    ],
    mcp: {
      "brave-search": {
        required: true,
        plainName: "Web Search",
        plainDescription: "Lets the AI search the internet to find startups, funding data, and company information",
        setupUrl: "https://brave.com/search/api/",
        setupTime: "2 minutes",
      },
      fetch: {
        required: true,
        plainName: "Web Access",
        plainDescription: "Lets the AI visit company websites to read about pages, team info, and press releases",
        setupUrl: "https://docs.anthropic.com/en/docs/claude-code/mcp",
        setupTime: "1 minute",
      },
    },
    tokenEstimate: {
      inputTokens: 400000,
      outputTokens: 200000,
      totalTokens: 600000,
      confidence: "estimated",
      note: "Varies with industry breadth. Niche markets may use fewer tokens; broad verticals more.",
    },
    repository: "https://github.com/mikethepurple/scout",
    license: "MIT",
    readme: `# Scout — Startup Research Engine

Research any industry vertical and get structured data on 20+ startups in minutes.

## What It Does

- Searches public sources to find startups in your chosen industry
- Builds a structured 15-column dataset: name, funding, valuation, founders, business model, and more
- Verifies financial data with a second pass for accuracy
- Syncs results to Google Sheets so your team can collaborate

## Quick Start

\`\`\`bash
npx @claudeflows/cli install scout
/research-startups "AI developer tools"
/sync-sheets
\`\`\`

## What You'll Need

- **Web search** — for finding startup information
- **Web access** — for visiting company websites and verifying data`,
  },
  {
    name: "code-reviewer",
    displayName: "Deep Code Reviewer",
    tagline: "Catch bugs, security issues, and performance problems automatically",
    description:
      "Get a thorough, multi-pass code review without waiting for a teammate. The AI reads your staged changes, checks for security vulnerabilities, finds performance bottlenecks, evaluates architecture decisions, and gives you specific, actionable feedback with line-by-line comments. It runs three separate review passes to catch what a single pass misses.",
    detailedProcess: `Here's what happens when you run a review:

**Pass 1 — Code quality & correctness.** The AI reads every changed file, understands the context (it reads surrounding code too, not just the diff), and looks for bugs, logic errors, missing edge cases, and code that doesn't do what the comments say it does. It checks naming conventions, code organization, and whether the changes follow the patterns already established in your codebase.

**Pass 2 — Security scan.** A focused second pass looking specifically for security vulnerabilities: SQL injection, XSS, insecure authentication, exposed secrets, missing input validation, unsafe deserialization, and other OWASP Top 10 issues. The AI looks up current best practices online to make sure its recommendations are up to date.

**Pass 3 — Performance audit.** The third pass looks for performance problems: N+1 queries, unnecessary re-renders, missing indexes, expensive operations in loops, large bundle sizes, and memory leaks. It considers the scale context — something that works fine with 100 users might break at 10,000.

**Output.** You get a structured review with issues categorized by severity (critical / warning / suggestion), each with the exact file and line number, what the problem is, why it matters, and a specific fix. Critical issues are flagged at the top so you see them first.`,
    outputDescription: "A structured code review printed in your terminal, organized by severity. Each issue shows the file, line number, problem description, why it matters, and a suggested fix. Also saved as a Markdown file in your project.",
    costInfo: "Free workflow + Claude Pro ($20/month). No additional API keys or services needed beyond the basic web access integration.",
    setupTime: "5 minutes",
    limitations: [
      "The AI reviews code quality but can't run your tests or verify that code compiles — it's a static analysis tool",
      "Complex business logic errors that require deep domain knowledge may be missed",
      "Security scanning covers common vulnerabilities but isn't a replacement for a dedicated security audit on production systems",
      "Works best with mainstream languages (JS/TS, Python, Go, Rust, Java) — less coverage for niche languages",
    ],
    differentiators: [
      "Three separate passes catch more than a single review — each pass has a different focus and prompt",
      "Unlike generic AI code review, it reads surrounding code for context, not just the diff",
      "Available instantly — no waiting for a teammate's schedule to free up",
      "Consistent quality regardless of how tired or busy the reviewer is",
    ],
    benefits: [
      "Three-pass review catches bugs, security issues, and performance problems that single reviews miss",
      "Security vulnerability scanning based on current OWASP guidelines",
      "Performance bottleneck detection with scale-aware recommendations",
      "Actionable feedback with exact line numbers and specific fix suggestions",
    ],
    inputs: [
      {
        name: "Code changes to review",
        description: "Stage your changes with git add, then run the review. The AI reads your staged diff plus surrounding context.",
        example: "git add . && then run /review",
      },
    ],
    prerequisites: [
      "Claude Code installed on your computer",
      "A git repository with staged changes",
    ],
    prerequisiteDetails: [
      {
        label: "Claude Code",
        description: "A command-line tool that lets AI work with files on your computer. If you're a developer, you probably already have a terminal open.",
        url: "https://docs.anthropic.com/en/docs/claude-code/overview",
        timeEstimate: "5 minutes to install",
        cost: "Free tool, requires Claude Pro ($20/month)",
      },
    ],
    setupSteps: [
      {
        title: "Enable web access",
        description: "Allows the reviewer to look up current security best practices and documentation while analyzing your code.",
        required: true,
        mcpServer: "fetch",
        timeEstimate: "1 minute",
      },
    ],
    estimatedTime: "5-15 minutes per review (depends on size of changes)",
    difficulty: "beginner",
    heroColor: "from-green-500 to-emerald-600",
    author: {
      name: "devtools-collective",
      github: "devtools-collective",
      bio: "Open-source developer tools for modern teams. Code quality at scale.",
    },
    version: "0.9.2",
    category: "development",
    tags: ["code-review", "security", "devtools"],
    installs: 231,
    rating: 4.9,
    skills: [
      {
        name: "review",
        description: "Run a full 3-pass review on your staged changes — checks correctness, security, and performance",
      },
      {
        name: "security-scan",
        description: "Run only the security-focused pass — faster when you just want to check for vulnerabilities",
      },
      {
        name: "perf-audit",
        description: "Run only the performance pass — finds N+1 queries, memory leaks, and bottlenecks",
      },
    ],
    mcp: {
      fetch: {
        required: true,
        plainName: "Web Access",
        plainDescription: "Lets the AI look up current documentation and security best practices while reviewing",
        setupUrl: "https://docs.anthropic.com/en/docs/claude-code/mcp",
        setupTime: "1 minute",
      },
    },
    tokenEstimate: {
      inputTokens: 45000,
      outputTokens: 20000,
      totalTokens: 65000,
      confidence: "estimated",
      note: "Depends on diff size. A typical PR (200-500 lines changed) uses ~65K tokens across 3 review passes.",
    },
    repository: "https://github.com/devtools-collective/code-reviewer",
    license: "Apache-2.0",
  },
  {
    name: "content-pipeline",
    displayName: "Content Pipeline",
    tagline: "Go from topic to published content without the blank page",
    description:
      "Give it a topic and an audience, and the AI researches the subject across the web, outlines an article structure, writes a full draft with real sources, optimizes it for SEO, and runs an editing pass for clarity and tone. You review and redirect at each stage. The output is a polished Markdown file ready to paste into your CMS, blog platform, or Google Doc.",
    detailedProcess: `Here's exactly what happens, step by step:

**Step 1 — You provide a topic brief.** You tell it what to write about and who it's for. Example: "How small teams use AI to ship faster — for a startup engineering blog, technical but accessible tone." The more context you give, the better the output, but even a sentence works.

**Step 2 — Research phase.** The AI searches the web for your topic. It reads 15-30 articles, blog posts, studies, and reports. It's looking for: key statistics, expert quotes, real examples, counterarguments, and recent developments. It compiles a research brief showing you what it found, with links to every source. You can tell it to dig deeper on specific angles or skip others.

**Step 3 — Outline generation.** Based on the research, the AI creates a structured outline: headline options, section headings, key points per section, where to place statistics and examples, and a proposed word count. You approve the outline or ask for changes before it starts writing.

**Step 4 — First draft.** The AI writes the full article following the approved outline. It weaves in the research naturally — not just dumping quotes, but integrating facts and examples into the narrative. Sources are cited inline so you can verify anything. The draft targets your specified tone and audience level.

**Step 5 — SEO optimization.** The AI analyzes the draft for search engine performance: keyword density, heading structure (H1/H2/H3), meta title and description, internal linking opportunities, and readability score. It suggests specific improvements and can apply them automatically.

**Step 6 — Editing pass.** A final pass focused on clarity, flow, and polish. The AI tightens prose, removes filler, fixes transitions, ensures consistent tone, and checks for factual consistency across the article. Think of it as a copy editor pass, not just grammar checking.

**Output.** You get a Markdown file with the finished article, plus a separate file with the research notes and source links. The Markdown can be pasted directly into WordPress, Ghost, Notion, Substack, or any platform that accepts Markdown or rich text.`,
    outputDescription: "A polished Markdown file (.md) saved in your project folder, ready to paste into any blog platform (WordPress, Ghost, Substack, Notion, Medium). Plus a separate research notes file with all source links. No proprietary format — just text files you can open anywhere.",
    costInfo: "Free workflow + Claude Pro ($20/month). Brave Search free tier (2,000 searches/month) is enough for roughly 20-30 articles per month.",
    setupTime: "10-15 minutes for first-time setup",
    limitations: [
      "Research is limited to publicly available web content — the AI can't access paywalled articles, internal company data, or proprietary research",
      "The AI writes well but in a recognizable AI style — you'll want to add your personal voice and specific anecdotes in editing",
      "SEO suggestions are based on general best practices, not your specific domain authority or existing keyword rankings",
      "Sources are real links, but websites change — verify critical statistics before publishing",
      "Works best for informational and thought-leadership content. Not ideal for highly technical documentation or creative fiction",
    ],
    differentiators: [
      "Unlike prompting ChatGPT/Claude directly, this workflow actually reads 15-30 real articles before writing — so the content has genuine research behind it, not just the AI's training data",
      "You approve an outline before writing starts, so you're not stuck revising a 2,000-word draft that went in the wrong direction",
      "The editing pass is a separate step with a different prompt, so it catches things the writing pass missed — like having a second pair of eyes",
      "Output is a plain Markdown file, not locked into any platform. Paste it anywhere.",
      "Repeatable process: once you've set it up, every new article takes 30-60 minutes instead of 4-8 hours",
    ],
    benefits: [
      "Research-backed content that cites 15-30 real sources, not just AI training data",
      "SEO-optimized structure: headings, meta descriptions, keyword placement, readability",
      "Multiple content formats: blog posts, newsletters, documentation, thought leadership",
      "Built-in editing pass catches clarity issues, filler, and inconsistent tone",
    ],
    inputs: [
      {
        name: "A topic or content brief",
        description: "What you want to write about, with optional notes on audience, tone, and angle. More detail = better output, but even a sentence works.",
        example: "How small teams use AI to ship faster — for a startup engineering blog, technical but accessible tone",
      },
    ],
    prerequisites: [
      "Claude Code installed on your computer",
      "A free Brave Search API key (for research)",
    ],
    prerequisiteDetails: [
      {
        label: "Claude Code",
        description: "A command-line tool that lets AI work with files on your computer. You type commands in your terminal and it handles the rest. Requires a Claude Pro subscription to run.",
        url: "https://docs.anthropic.com/en/docs/claude-code/overview",
        timeEstimate: "10 minutes to install",
        cost: "Free tool, requires Claude Pro ($20/month)",
      },
      {
        label: "Brave Search API key",
        description: "A free key that lets the AI search the web to research your topics. Sign up on Brave's site, copy the key, and paste it when prompted during setup.",
        url: "https://brave.com/search/api/",
        timeEstimate: "2 minutes to sign up",
        cost: "Free (2,000 searches/month — enough for ~25 articles)",
      },
    ],
    setupSteps: [
      {
        title: "Install Claude Code",
        description: "Open your terminal (on Mac: search for 'Terminal' in Spotlight, on Windows: search for 'PowerShell') and follow the install instructions. You'll sign in with your Claude account.",
        required: true,
        actionUrl: "https://docs.anthropic.com/en/docs/claude-code/overview",
        timeEstimate: "10 minutes",
      },
      {
        title: "Enable web search",
        description: "This is how the AI researches your topics. It searches the web to find articles, statistics, and expert opinions. You'll add a free Brave Search connection.",
        required: true,
        mcpServer: "brave-search",
        actionUrl: "https://brave.com/search/api/",
        timeEstimate: "2 minutes",
      },
      {
        title: "Enable web access",
        description: "Lets the AI actually read the articles it finds — visiting URLs, extracting content, and pulling out relevant quotes and data.",
        required: true,
        mcpServer: "fetch",
        timeEstimate: "1 minute",
      },
    ],
    estimatedTime: "30-60 minutes per article (mostly waiting while AI researches and writes)",
    difficulty: "beginner",
    heroColor: "from-pink-500 to-rose-600",
    author: { name: "contentops", github: "contentops", bio: "Content automation for marketing teams. Research-backed writing at speed." },
    version: "1.2.0",
    category: "marketing",
    tags: ["content", "writing", "marketing", "seo"],
    installs: 67,
    rating: 4.3,
    skills: [
      {
        name: "draft",
        description: "The main command — give it a topic and it researches, outlines, writes, and optimizes a full article",
      },
      {
        name: "edit",
        description: "Run an additional editing pass on existing content — tightens prose, fixes tone, improves clarity",
      },
      {
        name: "publish",
        description: "Formats the final draft for your platform — adds front matter, adjusts heading levels, generates meta descriptions",
      },
    ],
    mcp: {
      "brave-search": {
        required: true,
        plainName: "Web Search",
        plainDescription: "Lets the AI search the internet to research your topic — finds articles, statistics, expert opinions, and recent news",
        setupUrl: "https://brave.com/search/api/",
        setupTime: "2 minutes",
      },
      fetch: {
        required: true,
        plainName: "Web Access",
        plainDescription: "Lets the AI read the articles it finds — it visits URLs and extracts relevant content, quotes, and data",
        setupUrl: "https://docs.anthropic.com/en/docs/claude-code/mcp",
        setupTime: "1 minute",
      },
    },
    tokenEstimate: {
      inputTokens: 185000,
      outputTokens: 95000,
      totalTokens: 280000,
      confidence: "estimated",
      note: "Research-heavy topics use more tokens. A 2,000-word article with 20+ sources is typical.",
    },
    repository: "https://github.com/contentops/content-pipeline",
    license: "MIT",
  },
  // ─── New skills (Batch 1) ───
  {
    name: "sales-outreach",
    displayName: "Sales Outreach Sequence Generator",
    tagline: "Cold outreach sequences that actually get replies",
    description: "Cold emails that don't sound like cold emails. Give it your target persona and value prop, get back a complete 5-7 step outreach sequence with subject lines, personalization hooks, follow-up timing, and A/B variants. Replaces $37-99/mo tools like Instantly or Lemlist.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "marketing",
    tags: ["sales", "outreach", "email", "cold-email", "sequences", "SDR"],
    installs: 0,
    rating: 0,
    skills: [{ name: "generate-sequence", description: "Generate a complete outreach sequence from persona + value prop" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "5-10 minutes",
  },
  {
    name: "content-repurpose",
    displayName: "Content Repurposing Engine",
    tagline: "One blog post → five platforms, zero extra writing",
    description: "You wrote a blog post. Now you need it as a LinkedIn carousel, a Twitter thread, a newsletter intro, and an email nurture sequence. This skill takes one piece of content and transforms it into 5+ formats, matching the tone and conventions of each platform.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "marketing",
    tags: ["content", "repurposing", "social-media", "linkedin", "twitter", "newsletter"],
    installs: 0,
    rating: 0,
    skills: [{ name: "repurpose", description: "Transform one piece of content into multiple platform-specific formats" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "3-5 minutes",
  },
  {
    name: "lead-research",
    displayName: "Lead Research & Prospect Briefing",
    tagline: "Know everything about your prospect in 2 minutes",
    description: "Your next sales call is in 30 minutes and you know nothing about the prospect. This skill researches any company and builds you a complete briefing: what they do, recent news, tech stack, decision makers, pain points, and exactly what to say on the call.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "business",
    tags: ["sales", "lead-research", "prospect", "briefing", "account-research"],
    installs: 0,
    rating: 0,
    skills: [{ name: "research-prospect", description: "Research a company and generate a sales briefing" }],
    mcp: { "brave-search": { required: true, plainName: "Web Search", plainDescription: "Search the web for company information" } },
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "2-3 minutes",
  },
  {
    name: "hiring-kit",
    displayName: "Job Description + Interview Kit",
    tagline: "Everything you need to hire well, in 5 minutes",
    description: "Hiring someone? Stop spending 3 hours writing a job description and making up interview questions on the spot. Give it the role and level, get back a polished JD, structured interview scorecard, behavioral questions with scoring rubrics, and a take-home assignment.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "business",
    tags: ["hiring", "HR", "job-description", "interview", "recruiting"],
    installs: 0,
    rating: 0,
    skills: [{ name: "create-kit", description: "Generate a complete hiring kit for any role" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "5 minutes",
  },
  {
    name: "perf-review",
    displayName: "Performance Review Writer",
    tagline: "Write thoughtful reviews in minutes, not hours",
    description: "It's review season and you have 8 direct reports to write reviews for. You know what you want to say but staring at the blank form is painful. Give it bullet points about each person's work, get back a complete, nuanced review that sounds like you wrote it thoughtfully.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "business",
    tags: ["performance-review", "HR", "management", "feedback", "career-development"],
    installs: 0,
    rating: 0,
    skills: [{ name: "write-review", description: "Generate a structured performance review from rough notes" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "5 minutes per review",
  },
  {
    name: "sop-generator",
    displayName: "SOP & Process Documentation",
    tagline: "Turn tribal knowledge into documented processes",
    description: "Your team does the same thing every week but it only lives in one person's head. Describe the process in plain English and get back a clean, structured SOP with numbered steps, decision points, checklists, and role assignments. Ready to drop into Notion or Confluence.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "operations",
    tags: ["SOP", "process", "documentation", "operations", "procedures", "onboarding"],
    installs: 0,
    rating: 0,
    skills: [{ name: "create-sop", description: "Generate a structured SOP from a plain-English process description" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "5-10 minutes",
  },
  {
    name: "email-optimizer",
    displayName: "Email Sequence Optimizer",
    tagline: "Audit and fix your email sequences",
    description: "Your welcome sequence has a 12% open rate and you're not sure why. Paste your existing emails and get back a line-by-line audit: what's killing your opens, where you're losing readers, and rewritten versions that fix each issue. Includes A/B test suggestions.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "marketing",
    tags: ["email", "optimization", "conversion", "copywriting", "A/B-testing"],
    installs: 0,
    rating: 0,
    skills: [{ name: "optimize", description: "Audit existing email sequences and generate optimized versions" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "5-10 minutes",
  },
  {
    name: "api-docs",
    displayName: "API Documentation Generator",
    tagline: "API docs developers actually want to read",
    description: "Your API works but nobody can figure out how to use it because the docs are either missing or auto-generated garbage. Point this at your codebase and get back clean, developer-friendly documentation with examples, error handling guides, and quickstart tutorials.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "development",
    tags: ["API", "documentation", "developer-tools", "REST", "reference"],
    installs: 0,
    rating: 0,
    skills: [{ name: "generate-docs", description: "Generate comprehensive API documentation from your codebase" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "intermediate",
    estimatedTime: "10-20 minutes",
  },
  {
    name: "vendor-compare",
    displayName: "Vendor Comparison Report",
    tagline: "Compare vendors objectively, decide in minutes",
    description: "Evaluating 4 CRM tools and drowning in feature comparison tabs? Give it the vendors and your requirements, get back a structured comparison matrix with scoring, pros/cons, pricing analysis, and a clear recommendation. The kind of analysis a consultant would charge $2K for.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "operations",
    tags: ["vendor", "comparison", "procurement", "evaluation", "RFP"],
    installs: 0,
    rating: 0,
    skills: [{ name: "compare", description: "Generate a structured vendor comparison report" }],
    mcp: { "brave-search": { required: true, plainName: "Web Search", plainDescription: "Research vendor features and pricing" } },
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "5-10 minutes",
  },
  {
    name: "brand-voice",
    displayName: "Voice DNA & Brand Guide",
    tagline: "Extract your brand voice into a guide anyone can follow",
    description: "Your brand sounds different in every email, social post, and landing page because there's no written guide. Paste 5-10 samples of your best content and get back a complete brand voice guide: tone dimensions, vocabulary rules, do's and don'ts, and before/after rewrites.",
    author: { name: "claudeflows", github: "mikethepurple" },
    version: "1.0.0",
    category: "marketing",
    tags: ["brand", "voice", "tone", "copywriting", "style-guide", "content-strategy"],
    installs: 0,
    rating: 0,
    skills: [{ name: "extract-voice", description: "Analyze content samples and generate a brand voice guide" }],
    mcp: {},
    repository: "https://github.com/mikethepurple/claudeflows",
    difficulty: "beginner",
    estimatedTime: "5-10 minutes",
  },
];

export const CATEGORIES = [
  { name: "Business", slug: "business", icon: "briefcase", count: 12 },
  { name: "Development", slug: "development", icon: "code", count: 24 },
  { name: "Data", slug: "data", icon: "database", count: 8 },
  { name: "Research", slug: "research", icon: "search", count: 15 },
  { name: "Marketing", slug: "marketing", icon: "megaphone", count: 6 },
  { name: "Design", slug: "design", icon: "palette", count: 4 },
  { name: "Operations", slug: "operations", icon: "server", count: 11 },
  { name: "Productivity", slug: "productivity", icon: "zap", count: 9 },
  { name: "Finance", slug: "finance", icon: "chart", count: 5 },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
