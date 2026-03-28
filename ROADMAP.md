# Claude Flows Roadmap

## Active Sprint

### Launch Funnel
- [x] Email capture gate on skill install
- [x] Consulting intake page (/consulting)
- [x] Replace all mailto: links
- [x] Problem-aware copy on skill pages
- [x] 15 skills on marketplace (4 original + 11 new)
- [ ] Apply Supabase migration (003_leads_tables.sql) — waiting on user
- [ ] Verify email capture + consulting form work end-to-end on staging
- [ ] Deploy to production

### Skill Auto-Sync (Build → Display Pipeline)
- [ ] Build script: scan `skills/*/workflow.json` → generate `sample-data.ts` at build time
- [ ] Remove hardcoded sample data — all skills read from filesystem
- [ ] Bonus: make this a general-purpose skill for the marketplace ("Skill Publisher" — auto-generates marketplace listings from workflow.json)

---

## Approved (ready to build)

### Stripe Payments
- Webhook to populate purchases table (schema + JWT license system already built)
- Paid skill checkout flow on detail page
- Creator payout tracking
- Price field in workflow.json schema

### Newsletter System
- Weekly email to subscribers (Supabase + Resend or similar)
- Auto-send on new skill publish
- Content: new skills, tips, consulting availability

### Ad Landing Pages
- Per-skill landing pages optimized for ad conversion
- `/use/competitive-research` → Scout
- `/use/business-validation` → Venture Studio
- UTM tracking → Supabase

### Analytics
- Vercel Analytics or Plausible
- Track: page views, email captures, consulting submissions, install clicks
- Funnel visualization: visit → email → install → consult

---

## Backlog (not yet approved)

### Product
- Skill ratings/reviews (real ones — system already scaffolded, needs Stripe to gate reviews to purchasers)
- Skill versioning (update notifications for installed skills)
- Skill bundles ("Marketing Toolkit" = sales-outreach + content-repurpose + email-optimizer + brand-voice at $149)
- Creator profiles with portfolio and revenue dashboard
- Skill search improvements (full-text search, filters by category/price/difficulty)
- "Try before you buy" — limited preview run of paid skills

### Skills to Build (Tier 1 — needs product design)
- Competitive Intelligence Report ($99)
- SEO Content Brief Generator ($39)
- RFP Response Writer ($149)
- Contract Review & Risk Analysis ($99)
- Financial Model Builder ($99)

### Skills to Build (Tier 2)
- YouTube Content Pipeline ($49)
- Grant Proposal Draft ($79)
- Business Case / Proposal Builder ($29)
- Compliance Doc Generator / SOC 2 ($99)

### Infrastructure
- Automated registry PR workflow (GitHub Actions from CLI publish)
- CLI `search` command (search registry from terminal)
- Rate limiting on API routes
- Supabase type regeneration (remove `as any` casts)

### Growth
- Supply-side outreach (25 leads identified, 18 high-priority)
- Creator onboarding flow (simplified publishing)
- Community Discord/Slack
- Content marketing (blog, tutorials, case studies)

---

## Completed

### Marketplace Web (v1)
- [x] Homepage with job-function browsing, outcome-first copy, consulting CTA
- [x] Skill detail pages: file tree preview, terminal preview, about, requirements, commands
- [x] Consulting intake page with form
- [x] Email capture gate on install
- [x] Search page
- [x] Publishing guide
- [x] Responsive design + sticky mobile CTA

### CLI (v0.2.0)
- [x] 10 commands: install, uninstall, update, init, publish, doctor, verify, list, login, license
- [x] Project-level skill linking (`claudeflows use`)
- [x] Published to npm as `claudeflows`
- [x] Install `--yes` flag for non-TTY

### Skills (15 total)
- [x] Venture Studio, Scout, Save (original 3)
- [x] Checkpoint (free, top-of-funnel)
- [x] Sales Outreach, Content Repurposing, Lead Research, Hiring Kit, Performance Review
- [x] SOP Generator, Email Optimizer, API Docs, Vendor Compare, Brand Voice
- [x] Code Reviewer (sample)

### Backend
- [x] Supabase: workflows, versions, installs, reviews, purchases tables
- [x] Ed25519 signing for integrity verification
- [x] License API with JWT
- [x] Graceful fallback when Supabase isn't configured

### Research
- [x] Demand validation report (7 agents, cross-verified)
- [x] Supply-side leads spreadsheet (25 leads, 18 high-priority)
- [x] Workflow opportunity research (20 ideas ranked by evidence)
