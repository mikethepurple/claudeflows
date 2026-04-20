# ClaudeFlows Pricing Framework — Wave 2 Synthesis
**Date:** 2026-04-16
**Sources:** 6 Wave 1 research files (upwork-ai-profiles, ai-consulting-pages, package-pricing-ux, booking-integration, notion-template-pricing, dev-tool-pricing)

---

## Executive Summary

ClaudeFlows operates in a white space where no competitor yet combines Claude Code skill products with transparent, packaged consulting — most Upwork competitors sell hourly time, most Notion template sellers don't do implementation. The skill catalog should anchor at $9–$79 with an All-Access bundle at $149–$199, following Notion template market norms where bundles outsell individuals 3:1. Consulting packages ($500–$5,000) are priced at or below Upwork market rates for comparable work, which means transparent pricing is a differentiator, not a risk — agencies hide prices, solo experts who show them convert more qualified leads. The full upsell architecture runs from free skill → email list → paid skill → bundle → consulting sprint → retainer, with each stage triggered by a specific behavioral signal rather than arbitrary time delays.

---

## Skill Pricing

### Price Points

**What the Notion template market says about price ceilings:**
The Notion market has proven ceilings: $9 (impulse buy), $29–49 (mid-tier systems), $79–129 (flagship products), $149–389 (bundles with future access). Thomas Frank's $129 Ultimate Brain and Easlo's $79 Second Brain are the upper bound for single products without ongoing infrastructure. Claude Code skills map cleanly onto this structure — they are similar in category: one-time digital products with no recurring hosting cost. The ceiling for a single skill without a consultation component is $79. Above that, buyers expect a service layer.

**What the dev tool market says about one-time vs subscription:**
One-time payment dominates for code-based products. Subscriptions are only defensible when tied to ongoing hosted infrastructure (live APIs, model updates, cloud syncing). Claude Code skills that are static workflow automation are one-time purchases — "pay once, lifetime updates" is table stakes in 2026. The Caleb Porzio rule applies directly: set the minimum paid tier at $14+. Below $14, buyers don't experience the product as a real purchase. The sweet spot per the dev tool research is $29.

**Framing that converts:**
- Time math: "This skill replaces 3 hours of prompt engineering per week. At $75/hr Upwork rates, it pays for itself in the first use."
- SaaS replacement: "$29 vs $30/month for a comparable tool. One-time."
- Upwork anchor: "A Claude Code freelancer charges $75–$150/hr for this kind of setup. This is self-serve at $49."
- Social proof number: "Used by 200+ Claude Code developers" (even an early number beats zero)

**Recommended price points by tier:**

| Tier | Price | Examples | Rationale |
|------|-------|----------|-----------|
| Free | $0 | Checkpoint, Roadmap (current) | Lead magnets, email capture, top-of-funnel |
| Entry | $9 | Simple single-purpose skills | Impulse buy, highest conversion rate, minimal friction |
| Mid | $29 | Save Workflow, Daily Report, Knowledge Base | Sweet spot for first purchase; Caleb Porzio's $14 floor with room |
| Premium | $49–$79 | Venture Studio Pipeline, Market Watch, Vibecheck | Multi-step systems, flagship products |
| Showcase | $99 | Memory System (top-tier) | Reserved for the most comprehensive system skill |

Note: The current catalog prices ($9–$99) are broadly correct. The $99 ceiling for Memory System is justified only if the product page includes a demo video and outcome metrics. Without those, $79 is safer.

---

### Bundle Strategy

**Should there be an "Everything Bundle"? At what price?**

Yes. The Notion template data is decisive: bundles outsell individuals 3:1 and produce 40%+ more lifetime value. Two bundle tiers make sense:

- **Category Bundles** at $49–$79: Group 3–4 related skills (e.g., "Research Pack": Scout + Market Watch + Research Startups; "Operations Pack": Save + Checkpoint + Daily Report). Price at 50–60% off sum-of-parts. These catch buyers who want a specific workflow, not everything.
- **All-Access Pass** at $149–$199: All current + future skills. "Future skills included" is the key copy — it eliminates the wait-and-see objection (Easlo's $389 Everything Bundle uses this language explicitly). Price at 60%+ off sum-of-parts value.

The All-Access Pass at $149 anchors well against the consulting entry price of $500 — it's clearly self-serve vs. done-for-you. Don't price it higher than $199; above that, buyers start comparing to the Sprint consulting package and get confused about the value proposition.

**Future access inclusion (Easlo model):**
Recommended. The "all future skills included" promise creates FOMO, eliminates the wait-and-see objection, and gives existing buyers a stake in seeing more skills published. It also creates a reason to email the list every time a new skill ships — each launch is a retention event, not just a acquisition event.

**How bundling affects individual skill perceived value:**
Done correctly, bundles raise individual perceived value rather than undermine it. The mechanism: show the crossed-out sum-of-parts price alongside the bundle price. If the All-Access Pass is $149 and the skills listed sum to $380, each individual skill feels correctly priced at its tier. Never lead with the bundle price without showing what's inside — the anchor only works with context.

---

### Free Tier Strategy

**Which skills should be free and why:**

Checkpoint and Roadmap are already positioned as free lead magnets. This is correct — they are high-utility, low-complexity, and directly demonstrate the ClaudeFlows format to first-time visitors. Keep both free permanently.

Add one free skill per category cluster as a gateway: the free skill should be the one that creates the clearest "aha moment" for the category's use case. For the consulting funnel specifically, a free "Claude Code Setup Checklist" or "Workspace Starter" skill would work well — it attracts the buyer persona who's just starting with Claude Code, exactly who's likely to convert to paid consulting later.

**Email capture mechanics:**

Do not use a plain Gumroad $0 checkout as the only capture mechanism. The Gumroad email capture works, but is minimal. Preferred pattern from the Notion template research:
1. Free skill listing on the site links to a dedicated landing page
2. Landing page has a short email capture form ("Get the free skill + setup guide")
3. After email submit, redirect to the download link OR Gumroad $0 checkout (belt-and-suspenders)
4. Immediately trigger welcome email with setup guide + "you might also like" for one paid skill

Marie Poulin's 25%+ free-to-paid conversion validates this pattern. The email sequence does the conversion work, not the download page.

**How free skills funnel to paid:**

The funnel has three forcing functions:
1. **In-skill experience:** The free skill itself shows what a well-built ClaudeFlows skill feels like. When it solves their problem, they want more of the same.
2. **Post-download email sequence:** Day 0 = setup guide. Day 3 = "here's what you can do next with [paid skill X]." Day 7 = specific bundle offer with crossed-out price.
3. **Consulting upsell:** Free skill → email → "Want this set up for your whole workflow?" → consulting landing page. The free skill establishes that ClaudeFlows skills are real and functional; the consulting CTA offers to do the implementation work.

---

## Consulting Pricing

### Package Presentation

**3-card layout specs:**

Horizontal 3-card grid is the correct format, confirmed across all 9 consulting pages reviewed. Exact specs:

- **Card anatomy:** Tier name (large) → one-sentence "Best for" description → price (prominent, no hiding) → 5–7 deliverables (specific and countable) → delivery timeframe → guarantee line → CTA button
- **Sprint card:** Standard style, left position, slightly muted background
- **Full Setup card:** Elevated — raised shadow, accent border color, "Most Popular" badge top-right. This is the card to sell most; visual weight should reflect that.
- **Architecture card:** Standard style, right position, "$5,000+" price with "+" visible (not hidden). Use "Book a call" CTA, not "Get started," to signal the relationship shift.
- **Retainer:** Separate section below the 3-card grid, clearly labeled "Ongoing." Not a fourth card in the row — it stands apart because it's a different product type (recurring vs. one-time).

**Which tier gets "Most Popular":** Full Setup ($2,000). It's the realistic anchor for most buyers — Sprint is for testing the relationship, Architecture is for complex engagements. Full Setup is where margin lives and where buyers in the middle of the funnel naturally land.

**CTA language per tier:**
- Sprint ($500): "Get started" — direct, low-commitment, action-oriented
- Full Setup ($2,000): "Get started" — same framing; buyers should feel no friction bump between these two
- Architecture ($5,000+): "Book a call" — correctly signals the scoped engagement model; no self-serve checkout
- Retainer ($500–1K/mo): "Apply" or "Let's talk" — signals qualification step; not everyone gets a retainer slot

**"Best for..." copy per tier:**

- Sprint: "Best for founders who need one specific workflow built and shipped this week."
- Full Setup: "Best for teams ready to run Claude Code across their whole operation — start to finish, production-ready."
- Architecture: "Best for CTOs and leads who need a strategic Claude Code roadmap before committing to implementation."
- Retainer: "Best for operators who want ongoing build capacity without a full-time hire."

**Floor price in hero? Yes.**

Show "Starting at $500" in the consulting hero section. This is the Processter technique — it sets budget expectations before visitors reach the pricing section, filtering out tire-kickers and pre-qualifying for the Sprint tier. Place it in the hero subheading, not a separate callout: "Claude Code consulting, productized. Starting at $500."

---

### Rate Positioning

**How proposed prices compare to Upwork market rates:**

| Package | ClaudeFlows Price | Upwork Equivalent | Effective Rate |
|---------|-------------------|-------------------|----------------|
| Sprint ($500) | $500 flat | $75–150/hr × 5–7 hrs | $71–100/hr |
| Full Setup ($2,000) | $2,000 flat | $75–150/hr × 15–25 hrs | $80–133/hr |
| Architecture ($5,000+) | $5,000+ flat | $150–300/hr × 20–35 hrs | $143–250/hr |
| Retainer ($750/mo avg) | $500–1K/mo | $200–500/mo AI chatbot retainer | At market |

All packages are priced at or below Upwork market rates for equivalent work. This is the correct positioning for launch — ClaudeFlows is not yet Expert-Vetted with hundreds of reviews. The flat-rate model also removes the buyer's math problem (hourly billing requires tracking; fixed price removes anxiety).

**Entry pricing strategy:**

Sprint at $500 is already appropriate for getting first reviews. Do not go lower — at $299 or below, the buyer profile shifts to price-sensitive clients who are harder to satisfy and less likely to convert to Full Setup. The $500 floor also filters for buyers who understand the value of professional implementation. The research (Upwork profiles) shows that entry-level Claude Code consultation listings go for $299–$499 as fixed-price catalog items; $500 for a Sprint that delivers a production-ready workflow is competitive.

First 3–5 clients: offer to publish a case study in exchange for a testimonial. This is better than discounting — it produces social proof that compounds, whereas a $200 discount evaporates.

**Add-on pricing:**

Place below the 3-card grid, above the FAQ. Format: Add-on name | Price | One-line description | "Add to any plan."

Recommended add-ons:
- Extra skill built: +$200 per skill
- Async Slack support: +$300/month (30 days of direct access)
- Rush delivery (48-hour turnaround): +$150 on Sprint, +$300 on Full Setup
- Architecture review call (standalone 60-min): $350 (acts as Architecture tier entry point for fence-sitters)
- Documentation package (written handoff docs for the team): +$250

---

### Booking Flow

**Cal.com vs Calendly recommendation:**

Cal.com. The research is definitive on this for the consulting use case. Key reasons:
1. **Package pre-selection via metadata:** Cal.com's `config` object passes arbitrary metadata (selected package, tier, price) to the booking record. This means every booked call arrives pre-tagged with which package the client is interested in — no "what brought you here?" friction.
2. **Full embed customization:** Cal.com allows complete style control. The embed matches the ClaudeFlows brand without Calendly branding leak.
3. **Free tier includes everything needed:** Unlimited event types, webhooks, workflows — no paid tier required at launch.
4. **Open API:** Future extensibility for automating follow-up sequences, Supabase webhook integration, etc.

Calendly's advantages (native mobile apps, deeper CRM integration) are not relevant to the current use case.

**Embed pattern (inline, popup, redirect — when to use each):**

- **Inline embed:** Consulting landing page (primary CTA), after the process section. Always-visible calendar at the moment of peak interest. 15–25% conversion improvement vs redirect. Use on `/consulting` page.
- **Popup widget:** Navigation bar ("Book a call" persistent link), blog posts, skill product pages (secondary CTA). Preserves page real estate; activated on click only.
- **Redirect:** Email follow-ups and outreach only. Context is already established in the email, so the redirect doesn't lose the visitor. Never use as primary CTA on the website.

**Package pre-selection via metadata:**

When a visitor clicks "Book a call" from the Architecture card specifically, the Cal.com embed should pre-populate metadata with `selectedPackage: "architecture"` and `packagePrice: 5000`. This tags the booking in the admin view and allows a pre-customized confirmation email that references the specific package scope. Implementation is a simple state pass from the pricing card button to the Cal.com `config` prop.

**How many CTAs per page:**

Consulting page: 4–5 booking CTAs total.
- Hero (1): Primary "Book a free 30-min call" above the fold
- After trust bar (1): Secondary, smaller
- After packages section (1): Below the 3-card grid
- After FAQ (1): Final CTA before footer
- Sticky mobile bar (1): Bottom-of-viewport on mobile only

Do not exceed 5 — the research (Automaly example) shows that 5+ CTAs tips from helpful to pushy for a technical audience.

---

## Upsell Architecture

The full journey, with conversion triggers at each stage:

```
FREE SKILL DOWNLOAD
  ↓ trigger: email capture on download
EMAIL WELCOME SEQUENCE (3-7 days)
  - Day 0: Setup guide for the free skill
  - Day 3: "Here's what you can build next" — introduces 1-2 paid skills
  - Day 7: Category bundle offer (50%+ off, time-limited framing)
  ↓ trigger: email click on paid skill or bundle
PAID SKILL PURCHASE ($9–$79)
  - Post-purchase: Thank you page shows related skills + bundle CTA
  - Day 7 post-purchase: bundle discount email ("complete the pack")
  ↓ trigger: 2nd paid purchase OR bundle purchase
ALL-ACCESS BUNDLE ($149–$199)
  - Post-purchase: Welcome to All-Access email, future skills notification opt-in
  - 14 days post-bundle: consulting upsell ("Want this set up across your whole workflow?")
  ↓ trigger: consulting CTA click OR direct inbound
CONSULTING SPRINT ($500)
  - Deliverable: production-ready workflow, documented
  - End-of-sprint: present Full Setup scope ("here's what a full implementation looks like")
  ↓ trigger: Sprint completion + upsell presentation
FULL SETUP ($2,000)
  - Deliverable: complete Claude Code system, team onboarded
  - End-of-engagement: retainer offer ("keep this running and growing")
  ↓ trigger: Full Setup completion OR Architecture engagement
RETAINER ($500–$1K/mo)
  - Monthly: new skills deployed, async support, system maintenance
  - Quarterly: Architecture review included at $1K/mo tier
  ↓ (high-value path, parallel)
ARCHITECTURE ($5,000+)
  - Entry via standalone Architecture Review call ($350 add-on)
  - Converts to full Architecture engagement for complex organizations
```

**Where each conversion happens:**
- Free → paid skill: Email sequence (day 3 or 7), not on the free skill download page itself
- Paid skill → bundle: Post-purchase thank you page + day 7 email
- Bundle → consulting: 14-day post-purchase email (after they've lived with the skills)
- Sprint → Full Setup: End-of-sprint call, in-person (not email)
- Full Setup → Retainer: End-of-engagement offboarding conversation
- Any tier → Architecture: Architecture Review add-on call serves as the qualifying step

**What triggers the upsell:**
The research shows that the highest-converting upsells happen at moments of demonstrated value, not arbitrary time intervals. End-of-Sprint and end-of-Full-Setup are natural transitions. The 14-day post-bundle email works because the buyer has had time to actually use the skills and feel the gap between self-serve and implementation support.

---

## Pricing Page Design

**Layout:**

3-card horizontal grid for consulting packages. Not a comparison table as the primary element — tables are secondary (below the fold). The card layout is the decision layer; the comparison table is for doubters who scroll further.

Recommended page order for `/consulting`:
1. Hero (outcome-first headline + "Starting at $500" + one metric + primary CTA)
2. Trust bar (skills published count, developers using ClaudeFlows, one outcome stat)
3. 3-card package grid (Sprint / Full Setup / Architecture) — Full Setup elevated
4. Add-ons row (below grid, above FAQ)
5. Retainer callout (separate section, "Ongoing partnership")
6. Process section ("How it works" — 3–4 numbered steps)
7. "Us vs. DIY" comparison (steal from Goodspeed Studio; works especially for developer audience)
8. Comparison table (full feature breakdown, Sprint vs Full Setup vs Architecture)
9. FAQ (6 questions max)
10. Footer CTA (repeat booking link)

**Price anchoring:**

Show Architecture ($5,000+) last in the card row (rightmost), but reference the range early in the hero headline: "From $500 sprints to $5,000 architecture engagements." This sets the psychological range immediately — Sprint reads as accessible, not cheap, because Architecture establishes the ceiling.

Do NOT lead with Architecture on the left (despite the package-pricing-ux research suggesting high-anchor-first). The ClaudeFlows audience is technical founders and operators, not enterprise buyers. Leading with $5,000 will lose them before they see Sprint. The hero range-statement does the anchoring work without leading with the intimidating number.

**Trust signals placement:**

- Trust bar: immediately after the hero, before packages (answers "why should I trust this")
- Sprint card: small guarantee line at bottom of card ("Works or we rebuild it")
- Full Setup card: testimonial or outcome stat near the CTA button ("Teams shipped in week 1")
- Architecture card: no guarantee — "Book a call" implies scoping conversation, not fixed deliverable
- Above the FAQ: "Fixed price. No hourly billing. No scope creep." as a standalone line

**Mobile stacking order:**

Cards stack vertically in this order: Full Setup → Sprint → Architecture. Lead with the "Most Popular" anchor on mobile. Sprint second (accessible, they understand it). Architecture last (complex, fewer buyers). This mirrors how most visitors should be thinking about their own needs.

Sticky CTA bar at the bottom of mobile viewport: "Book a free 30-min call" button, always visible while scrolling.

**"Us vs. DIY" comparison table inclusion:**

Yes. Include it. Goodspeed Studio's version is the standout element from the consulting page research, and it works specifically for the ClaudeFlows audience: developers and technical founders who are actively considering building it themselves. The table should address that exact objection:

| | Build it yourself | ClaudeFlows |
|---|---|---|
| Time to first workflow | 20–40 hours | 5 business days |
| Cost of your time | $1,500–$3,000 at $75/hr | $500 flat |
| Ongoing support | Your problem | Included for 30 days |
| Reusable skill library | Start from scratch | Built in |
| Documentation | You write it | Delivered with handoff |

This section should appear after the process steps, before the full comparison table.

---

## Anti-Patterns

What the research says NOT to do:

**On pricing display:**
- Do not hide prices behind "contact us for a quote." Transparent pricing is a differentiator for solo operators. Every page that hid prices converted fewer qualified leads.
- Do not show hourly rate equivalents on the pricing cards ("That's only $100/hr!"). It undermines the fixed-price value proposition — the whole point is that the buyer doesn't have to think in hours.
- Do not use bronze/silver/gold or starter/growth/enterprise naming. These are generic and don't resolve "which one is for me?" Use outcome-named tiers (Sprint, Full Setup, Architecture, Studio).

**On tier structure:**
- Do not list four consulting tiers in the same card row. Four tiers cause decision paralysis. Retainer must be separated from the three one-time packages.
- Do not set any paid tier below $14 (or effectively below $29 for skills). Low tiers cannibalize higher-intent purchases without building sustainable revenue.
- Do not put add-ons inside the tier cards. They create noise. Add-ons live in their own section below the grid.

**On CTA language:**
- Never use "Learn more," "Inquire," or "Explore" as primary CTAs. These stall decisions.
- Do not make a contact form the primary CTA for consulting. Forms feel bureaucratic to a technical audience. Calendly/Cal.com link beats form every time.
- Do not repeat the booking CTA more than 5 times on a single page — past 5, it reads as desperate.

**On trust signals:**
- Do not fake or inflate metrics. "X skills published" should be the real number even if small. "47 developers" is more credible than "thousands of users" when you're early-stage.
- Do not use ISO badges or partner certifications you don't have. ZeroCodeNinja's page had zero trust signals and it showed — nothing compensates for absent social proof except real metrics.
- Do not use stock testimonials or paraphrase user feedback. Screenshots of real messages (Slack, Twitter/X, email) outperform polished quote blocks.

**On bundles:**
- Do not price the All-Access bundle above $199 at launch. Above that, buyers compare it to the Sprint consulting package and get confused. The bundle is self-serve; $199 keeps it clearly in that lane.
- Do not gate the free skill behind too many form fields. Name + email is the maximum. Phone number in the capture form kills conversion.

**On booking:**
- Do not redirect to an external booking page as the primary consulting CTA. The research shows ~50% of redirected visitors never return. Inline embed on the consulting page is mandatory for the primary CTA.
- Do not offer too many booking types without clear differentiation. One event type per consulting package is cleaner than a single generic "book a call" that doesn't pre-filter intent.

**On pricing psychology:**
- Do not discount individual skills frequently or deeply. Discounts train buyers to wait. The Easlo model (permanent 50% off flagship, crossed out) works because it's structural, not a "sale." Run the bundle math instead of discounting individuals.
- Do not skip the "30-day refund" or equivalent guarantee on skills $29+. It is the single highest-impact trust signal for first-time buyers and the research shows it consistently removes final purchase resistance.
