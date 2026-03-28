# Claude Flows State — Last updated: 2026-03-28

## Environment

- **Staging:** claudeflows-staging.vercel.app (deployed, latest commit 5aaae3e)
- **Production:** claudeflows.vercel.app (OLD — pre-redesign, has not been updated)
- **Supabase:** myzmadvevthaegdetfjr (linked, migrations 001-002 applied, 003_leads_tables NOT yet applied — user needs to run SQL in dashboard)
- **npm:** claudeflows@0.2.0 (published, unscoped)
- **GitHub:** mikethepurple/claudeflows (READMEs committed, not pushed to remote yet — 8 commits ahead)
- **Skills:** 15 total in `skills/` directory (11 new + 4 original)

## Pending Actions

1. **Apply Supabase migration 003** — email_subscribers + consulting_leads tables. SQL ready, user needs to paste into dashboard (IPv6 blocks CLI push)
2. **Push to GitHub** — 8 local commits not pushed to remote
3. **Deploy to production** — staging is fully updated, production is old pre-redesign version
4. **Paid skill IP protection** — all skill prompts (including future paid ones) are in public repo. Need to split free/paid storage before charging.
5. **Claude Flows needs its own venture-studio project structure** — user flagged this, not yet created

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
