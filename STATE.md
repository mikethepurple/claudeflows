# CuratedFlows State — Last updated: 2026-04-18

## Environment

- **Production:** curatedflows.vercel.app (deployed 2026-04-18, rebrand complete)
- **Custom domain:** curatedflows.com (DNS configured via Cloudflare API, A records live: @ + www → 76.76.21.21)
- **Local dev:** localhost:3847 (dark mode redesign, fully functional)
- **Supabase:** myzmadvevthaegdetfjr (linked, migrations 001-002 applied, 003 NOT yet applied)
- **npm:** claudeflows@0.2.0 (published, unscoped)
- **GitHub:** mikethepurple/claudeflows (local, not pushed since ed8b79e — 2 more commits ahead)
- **Skills on site:** 16 in catalog (11 non-technical + 5 power skills: Memory System, Market Watch, Vibecheck, Daily Report, Blueprint)
- **Auto-sync:** `scripts/generate-sample-data.ts` reads workflow.json → generates sample-data.ts on prebuild

## What Was Done (2026-04-18)

- Fixed broken GitHub/npm links pointing to non-existent `curatedflows` repo/package — reverted to `claudeflows`
- Fixed voice inconsistency: "the team behind" → "the maker of", "people who ship" → "someone who ships"
- Removed old `claudeflows` Vercel project, created new `curatedflows` project
- Deployed to production at curatedflows.vercel.app
- Added curatedflows.com + www.curatedflows.com domains on Vercel
- Configured Cloudflare DNS via API (A records: @ + www → 76.76.21.21)
- Brand name standardized: "CuratedFlows" (one word) everywhere in site copy

## What Was Built (2026-04-16)

### Research (complete)
- 31-agent research pipeline: 25 discovery → 4 synthesis → 2 gap evaluation
- All outputs in `research/redesign/` (wave-1/, wave-2/, wave-3/)
- Gap evaluator verdict: `good` — proceed to build
- Key findings: Agent37 is HIGH threat ($5.8K MRR), 6-9 month window, SKILL.md is cross-platform (35+ tools)

### Site Redesign (in progress)
- **Dark mode foundation:** globals.css, layout.tsx, Inter + JetBrains Mono, #13111C + #6366F1
- **Homepage:** Hero (person intro → headline → CLI block), featured skills, how it works, Blueprint tips (indigo zone), consulting CTA, email capture
- **Consulting page:** 3-card packages, add-ons, retainer, case studies (Vanga, IC, research pipeline), how it works, Us vs DIY table, FAQ
- **Skills page:** category filters, skill cards with icons + tints + CLI fingerprint, "Request a Skill" form
- **Blog scaffold:** 2 coming-soon articles
- **12 secondary files** dark-mode converted by background agent
- **5 power skills added to catalog:** Memory System, Market Watch, Vibecheck, Daily Report, Blueprint

## Pending Actions

1. **Apply Supabase migration 003** — email_subscribers + consulting_leads tables
2. **Configure Cloudflare DNS** — A records for curatedflows.com (@ + www → 76.76.21.21, grey cloud)
4. **Smart installer (Phase 5)** — setup skill that Claude Code runs to install complex skills
5. **Stripe / Lemon Squeezy** — payment processing for paid skills
6. **OG images** — Vercel OG / Satori for per-skill dynamic generation
7. **Real blog posts** — "10 Claude Code skills I install on every project"
8. **GitHub distribution** — tag repos, submit PRs to awesome-lists
9. **Cal.com setup** — replace placeholder URLs in consulting page

## Decisions Made This Session

1. **Target non-technical professionals** — not just developers. Marketing managers, designers, HR leads who've been told to "learn AI." This is the mass market. (Rejected: developer-only focus)
2. **Marketplace = showroom + consulting funnel** — revenue comes from skill sales AND consulting. Consulting is likely larger early on.
3. **Single scrollable page, no tabs** — removed 4-tab structure. Sections appear only if data exists. (Rejected: tab-based layout that assumed all skills have the same content shape)
4. **Remove AI-generated content sections** — killed strengths/limitations, benefits, detailed process markdown, process timeline. These were content-shaped-UI, not user-needed-UI.
5. **File tree + terminal preview as hero** — HTML components generated from skill metadata, not screenshots. (Rejected: static image files)
6. **Checkpoint = free top-of-funnel skill** — drives email captures, builds trust. Not a paid skill. (Rejected: selling it)
7. **Skills terminology** — unified on "skills" everywhere. Dropped "workflows", "commands", "providers".
8. **Email gate before install** — captures email, stores in localStorage to skip for returning visitors.

## Known Issues

1. Supabase types not regenerated — API routes use `as any` casts for new tables
2. Trust bar stats are hardcoded (15 skills, 529 installs, 3 creators) — should be dynamic
3. Homepage category filtering maps to job functions but only has content for a few categories
4. No analytics — can't measure funnel performance
5. Git not pushed — all work is local only
