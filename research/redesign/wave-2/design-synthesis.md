# ClaudeFlows Design System Brief
**Wave 2 Synthesis — Ready for Implementation**
Date: 2026-04-16
Sources: 9 Wave 1 research files (thomas-frank, god-of-prompt, claw-mart, premium-dev-tools, indie-hacker-stores, dark-mode-dev-sites, notion-template-pricing, dev-tool-pricing, cli-install-ux)

---

## Executive Summary

ClaudeFlows is a solo-creator storefront for Claude Code skills and consulting — not a marketplace, not SaaS. The design direction is a **dark-mode craftsperson's workshop**: professional enough that a non-technical buyer trusts it, technical enough that a Claude Code power user feels at home. The visual model is closer to Railway or Resend than to God of Prompt or Gumroad — minimal color, heavy typography, CLI command as a first-class design element. The conversion model is Thomas Frank's: personal brand first, free skill as email gate, one-time pricing, bundle as the primary revenue driver. The dual audience (non-technical professionals who want outcomes, Claude Code users who want install commands) is resolved by layering, not by choosing — the hero speaks human, the install block speaks code, both appear above the fold.

---

## Color System

### Background Stack — Purple-Black (primary recommendation)

Choose one personality and commit. The purple-black reads as "developer-crafted system tool" — distinct from gray-black competitors, warmer than pure navy.

```
Page background (Level 0):  #13111C   — deep purple-black (Railway)
Card surface  (Level 1):    #1A1828   — +2 lightness steps
Elevated card (Level 2):    #211F30   — modals, dropdowns, code blocks
Active/focus  (Level 3):    #29273D   — hover states on interactive elements
```

**Alternative — Warm Dark** (if "workshop" over "system" feel is preferred):
```
Page background:  #14120B   — Cursor's warm brown-black
Card surface:     #1C1A12
Elevated:         #252219
```

Do not use `#000000`. Pure black looks broken on OLED and makes text feel harsh. The undertone is part of the brand.

### Border System

```
Border subtle   (structural): rgba(255, 255, 255, 0.06)  — invisible dividers, section separators
Border default  (cards):      rgba(255, 255, 255, 0.10)  — skill cards, input fields, panels
Border strong   (interactive):rgba(255, 255, 255, 0.20)  — focused inputs, hovered cards, selected states
```

### Text Hierarchy — Opacity Model

Use opacity, not different gray hex values. This works correctly against any background color.

```
Primary text    (headings, active labels): rgba(255, 255, 255, 0.92)
Secondary text  (descriptions, body):      rgba(255, 255, 255, 0.60)
Tertiary text   (metadata, timestamps):    rgba(255, 255, 255, 0.36)
Quaternary text (placeholders, ghost):     rgba(255, 255, 255, 0.20)
```

WCAG notes: Primary (0.92) ≈18:1 on #13111C. Secondary (0.60) ≈11:1 — safe for body. Tertiary (0.36) ≈6:1 — just passes AA for normal text. Quaternary (0.20) ≈3.4:1 — decorative only, do not use for readable copy.

### Accent Color

**Single accent: `#6366F1`** (Tailwind indigo-500)

Use it on: primary CTA button, active skill category tab indicator, focused input outline, the highlighted line in code blocks.

Use it nowhere else. No decorative borders, no category badges, no background fills.

```
Accent:           #6366F1   — indigo-500
Accent hover:     #4F46E5   — indigo-600 (darken on hover, do not lighten)
Accent glow:      rgba(99, 102, 241, 0.15)  — for box-shadow only
```

### Semantic Colors (non-decorative)

```
Success / Active:    #10B981   — emerald-500 (skill status: live)
Warning / Beta:      #F59E0B   — amber-500  (skill status: beta)
Danger / Deprecated: #EF4444   — red-500    (skill status: deprecated)
Muted / Coming soon: rgba(255, 255, 255, 0.20)
```

---

## Typography

### Font Stack

**Display / Headings:** Inter (700, 600 weight)
- Free, purpose-built for interfaces, excellent dark-mode rendering
- Fallback: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

**Body:** Inter (400, 500 weight)
- Same family as display — no mixing sans-serif typefaces

**Monospace (CLI commands, skill names, code):** JetBrains Mono (400, 500 weight)
- Free, excellent legibility at 13–14px, strong technical signal
- Fallback: `"Fira Code", "Cascadia Code", "SF Mono", Menlo, monospace`

Full CSS font-family declarations:
```css
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace;
```

### Size Scale

```
Hero heading:    clamp(44px, 6vw, 80px)   — weight: 700, line-height: 1.08
H2 (sections):   clamp(28px, 3.5vw, 48px) — weight: 600, line-height: 1.15
H3 (subsections):clamp(20px, 2.5vw, 28px) — weight: 600, line-height: 1.25
Body large:      18px / line-height: 1.7  — weight: 400 — feature descriptions
Body:            16px / line-height: 1.6  — weight: 400 — card text, general
Small:           14px / line-height: 1.5  — weight: 400 — metadata, tags, labels
Micro:           12px / line-height: 1.4  — weight: 500 — badges, status pills
Code:            13px / line-height: 1.6  — JetBrains Mono — CLI blocks, skill names
```

### Weight Hierarchy

- 700: Hero headlines only
- 600: Section headings, card titles
- 500: Interactive labels, skill names in mono, badge text
- 400: All body copy, descriptions, metadata

Never use 300 (thin) weight on dark backgrounds — poor contrast against near-black.

---

## Layout Patterns

### Homepage Structure (sections in order)

**1. Navigation bar** (sticky)
- Logo left (wordmark only — no icon), nav links center (Browse Skills, Consulting, About), primary CTA button right ("Get Started Free")
- Background: transparent over hero, then `#13111C` + `border-bottom: 1px solid rgba(255,255,255,0.08)` on scroll
- Nav should be "a few notches dimmer" than page content per Linear's principle — use `rgba(255,255,255,0.60)` text on nav links, `rgba(255,255,255,0.92)` only on active page

**2. Hero section**
- Personal intro line: "Hi, I'm Misha — I build Claude Code skills" in secondary text (0.60 opacity), 16px
- Headline (hero scale): The outcome in 8 words or fewer. Not a product name.
- Subheadline (body large): One sentence on who this is for.
- CLI install block: `npm install -g claudeflows` (see Component Specs)
- Two CTAs: primary ("Browse Skills") + ghost ("See what's included →")
- Social proof micro-line below CTAs: "X developers · 30-day refund · Yours forever"
- Background: subtle grid texture at 3% opacity OR radial gradient at bottom: `rgba(99,102,241,0.12)` ellipse

**3. Authority strip** (below hero fold)
- Horizontal bar, medium opacity: "As used by..." + 3-5 company/tool names or social handles
- OR: metric strip — "47 skills installed · 200+ developers · $0 CAC"
- No logos unless you have permission. Use text names.

**4. Featured skills grid** ("What you get")
- Grid of 3 or 6 skill cards (see Skill Card specs)
- Section heading: "Skills that ship on day one"
- Filter tabs above: All · Research · Writing · Coding · Consulting
- "View all skills →" link at bottom right

**5. How it works** (3-step)
- 3 columns: Install · Browse · Run
- Icon (24px, accent color) + heading + 2-sentence description per step
- Thin section with generous whitespace — not a heavy design moment

**6. Pricing section**
- Section heading: "Pick what you need. Own it forever."
- 3-tier pricing cards (see Pricing Display specs)
- Subtext below: "No subscriptions. One-time payment. Lifetime updates."

**7. Social proof / testimonials**
- Section heading: "What developers are saying"
- 3 testimonials in a row (desktop) / stacked (mobile)
- Format: quote → name + handle + role (see Social Proof spec)

**8. Email capture / free skill**
- "Start free. Upgrade when ready."
- Single input + button: "Get the free skill + setup guide"
- Below: "Join 200+ developers. Unsubscribe anytime."

**9. Footer**
- Logo + tagline left
- Links: Skills · Consulting · Blog · GitHub · Twitter
- Bottom row: "Built by Misha Erikov · © 2026 · Privacy"

---

### Product / Skill Card Design

Skill cards appear in grids (3 or 4 columns desktop, 2 tablet, 1 mobile).

**Information hierarchy (top to bottom):**
1. **Skill name** — 16px, Inter 600, `rgba(255,255,255,0.92)` — e.g., `/checkpoint`
2. **Skill command** — 12px, JetBrains Mono 400, indigo accent — e.g., `claude /checkpoint`
3. **One-line description** — 14px, Inter 400, `rgba(255,255,255,0.60)` — the outcome, not the feature
4. **Tags** — 11px, Inter 500, pill shape — category (Research, Writing, Coding) + compatibility (Claude Code)
5. **Status badge** — top-right corner — "Live" (green) / "Beta" (amber) / "New" (accent)
6. **Price** — bottom row left — "$29" or "Free" in Inter 600
7. **Install count** — bottom row right — "47 installs" in 12px tertiary text

**Visual specs:**
```css
.skill-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px 24px;
  transition: border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
  cursor: pointer;
}

.skill-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.20),
              0 8px 32px rgba(99, 102, 241, 0.08);
}
```

Do not use per-card gradient personality at launch (that is a Raycast-scale touch — save for V2 when there are 20+ skills).

---

### Pricing Display

Three-tier grid. Middle tier ("Bundle") is the hero. Layout: columns on desktop, stacked on mobile.

**Tier structure:**
| Column | Label | Price | What's in it |
|--------|-------|-------|--------------|
| Left | Single Skill | $9–$79 (varies) | One skill, lifetime access |
| Center ★ | Starter Pack | $99 | 5 curated skills + setup guide + email support |
| Right | All Access | $249 | All current + future skills + 1 consulting call |

**"Most Popular" treatment (center card):**
```css
.pricing-card--popular {
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.35);
  border-radius: 16px;
  transform: scale(1.02);  /* subtle lift */
  position: relative;
}

.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #6366F1;
  color: #fff;
  font: 500 11px/1 'Inter', sans-serif;
  padding: 4px 12px;
  border-radius: 99px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

**Pricing card anatomy (top to bottom):**
1. "Most Popular" badge (center only)
2. Tier name — Inter 600, 18px
3. Price — Inter 700, 40px, primary text + "/one-time" in 14px secondary
4. Crossed-out "value" price — e.g., "~~$199~~" in tertiary text (anchor pricing)
5. Divider line (1px, `rgba(255,255,255,0.08)`)
6. Feature list — checkmarks (accent color ✓) + 14px body text, 6 items max
7. CTA button — full-width, primary style for Popular, ghost style for others
8. Below CTA: "30-day refund · No subscription · Lifetime updates"

**Copy rules:**
- "One-time payment" and "No subscription" must appear in every pricing card
- "Lifetime updates" must appear in every paid tier
- Never use "plan" language — these are not plans, they are products

---

### Hero Section

**Recommended pattern: Terminal-Forward + Person anchor**

The hero resolves the dual-audience tension by layering:
- Line 1 (human): Brief personal intro at reduced opacity — one sentence, not a pitch
- Line 2 (headline): The big outcome claim — written for the non-technical buyer
- Line 3 (CLI): The install command — written for the Claude Code user

Structure:
```
[small text, 0.60 opacity]  Hi, I'm Misha — I build skills for Claude Code.

[hero headline, 700 weight] Ship faster.
                            Think less.
                            Let Claude do it.

[body, 0.60 opacity]        Claude Code skills for solo founders, writers, and anyone
                            who wants AI to actually do work — not just chat.

[CLI block]                 $ npm install -g claudeflows

[CTAs]          [Browse Skills →]     [See what's included]

[micro social]  47 installs · One-time pricing · Lifetime updates
```

Background: The page `#13111C` base with a radial gradient bloom at the bottom of the hero viewport:
```css
.hero-background {
  background: radial-gradient(
    ellipse 80% 60% at 50% 110%,
    rgba(99, 102, 241, 0.12) 0%,
    transparent 70%
  );
}
```

No stock photos. No product screenshots in the hero. The CLI block IS the product demo.

---

## Component Specs

### CLI Install Block

Appears in the hero and the "How it works" section.

```html
<div class="cli-block">
  <div class="cli-top-bar">
    <span class="traffic-light red"></span>
    <span class="traffic-light yellow"></span>
    <span class="traffic-light green"></span>
    <span class="cli-label">Terminal</span>
  </div>
  <div class="cli-body">
    <span class="cli-prompt">$</span>
    <span class="cli-command"> npm install -g claudeflows</span>
    <button class="cli-copy" aria-label="Copy command">
      <!-- clipboard icon, changes to checkmark on copy -->
    </button>
  </div>
</div>
```

```css
.cli-block {
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 10px;
  overflow: hidden;
  max-width: 480px;
  font-family: var(--font-mono);
  font-size: 14px;
}

.cli-top-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
}

.traffic-light {
  width: 10px; height: 10px; border-radius: 50%;
}
.traffic-light.red    { background: #FF5F57; }
.traffic-light.yellow { background: #FEBC2E; }
.traffic-light.green  { background: #28C840; }

.cli-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.30);
  margin-left: auto;
  font-family: var(--font-sans);
}

.cli-body {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  gap: 4px;
}

.cli-prompt {
  color: rgba(255, 255, 255, 0.30);
  user-select: none;
}

.cli-command {
  color: rgba(255, 255, 255, 0.92);
  flex: 1;
}

.cli-copy {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.36);
  cursor: pointer;
  padding: 4px;
  transition: color 150ms;
}

.cli-copy:hover { color: rgba(255, 255, 255, 0.80); }
```

**Multi-package-manager tabs** (use below the hero in docs/install section, not in the hero itself):
```
[npm]  [yarn]  [pnpm]  [bun]
```
Tabs are 12px Inter 500, inactive at 0.36 opacity, active at 0.92 with a 2px bottom border in accent color. Active tab command shown in the code block below.

**Copy feedback:** JavaScript writes to `navigator.clipboard.writeText()`. Icon changes from clipboard SVG to checkmark SVG for 1200ms, then reverts.

**Below the CLI block** (non-technical users): 12px secondary text: "Paste in your terminal and press Enter. [Don't have Node? Install it here →]"

---

### Skill Cards

Covered in Layout Patterns above. Additional interactive states:

- **Default:** `background rgba(255,255,255,0.03)`, `border rgba(255,255,255,0.08)`
- **Hover:** Brightened background + stronger border + accent glow (see CSS above)
- **Selected / active:** Same as hover but persistent + checkbox or "Installed" badge
- **Free skill:** Subtle "Free" badge in `rgba(16, 185, 129, 0.15)` background with `#10B981` text — not just the word "Free" in price position

---

### Pricing Cards

Covered in Pricing Display above. One additional rule: the ghost/secondary cards should not compete with the Popular card. Use `background: transparent` with the border-only treatment on non-Popular tiers.

CTA button within the Popular card uses the full accent style. Side cards use ghost style (see CTA Buttons below).

---

### CTA Buttons

**Primary (accent-filled):**
```css
.btn-primary {
  background: #6366F1;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 12px 24px;
  font: 500 15px/1 var(--font-sans);
  cursor: pointer;
  transition: background 150ms, box-shadow 150ms;
}

.btn-primary:hover {
  background: #4F46E5;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}
```

**Secondary (border only):**
```css
.btn-secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.80);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  padding: 12px 24px;
  font: 500 15px/1 var(--font-sans);
  cursor: pointer;
  transition: border-color 150ms, background 150ms;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.28);
}
```

**Ghost (text link style):**
```css
.btn-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.60);
  border: none;
  padding: 12px 8px;
  font: 400 15px/1 var(--font-sans);
  cursor: pointer;
  transition: color 150ms;
}

.btn-ghost:hover { color: rgba(255, 255, 255, 0.92); }
```

**Sizing rules:**
- Hero CTA: 48px height, 24px horizontal padding
- Card CTA: 40px height, 20px horizontal padding
- Inline/text CTAs: 36px height, 16px horizontal padding
- Border-radius: 8px for all button types (consistent)

---

### Social Proof (Testimonials)

**Format:**
```
"[Quote — outcome language, specific result, no adjectives about the product]"

[Name]               @handle · [Role / Company]
```

**Card spec:**
- Background: `rgba(255, 255, 255, 0.03)`
- Border: `rgba(255, 255, 255, 0.08)` 1px
- Padding: 24px
- Border-radius: 12px
- Quote mark: 40px, `rgba(99, 102, 241, 0.30)` — decorative, above the quote text
- Name: 14px Inter 600, primary opacity
- Handle: 13px JetBrains Mono, secondary opacity
- Role: 13px Inter 400, tertiary opacity

**What makes a testimonial count:**
- Must include a specific outcome or number ("saved 2 hours," "shipped in one session")
- Must have a real Twitter/GitHub handle — unverified testimonials are worthless with the developer audience
- Named testimonial from someone recognizable in the Claude Code / indie hacker community > 100 anonymous five-stars
- 3 testimonials on homepage. "Load more" only if you have 10+.

**Trust signals below testimonials:**
```
[Icon] One-time payment    [Icon] 30-day refund    [Icon] Lifetime updates    [Icon] Open source skills
```
14px, secondary opacity, icon + text in a horizontal row.

---

### Email Capture (Free Skill Gate)

**Pattern: soft gate** — email required to download the free skill, not to browse.

```
[Section heading] Start free. See what you're getting first.

[Subheading]     Download the /checkpoint skill — free, forever. No credit card.

[Input + Button]  [your@email.com                    ] [Get the free skill →]

[Below input]    Join 200+ developers. No spam. Unsubscribe anytime.
```

**Component spec:**
```css
.email-capture-form {
  display: flex;
  gap: 8px;
  max-width: 440px;
}

input[type="email"] {
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.92);
  font: 400 15px/1 var(--font-sans);
}

input[type="email"]:focus {
  outline: none;
  border-color: rgba(99, 102, 241, 0.50);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
}
```

**After submit:**
- Inline success state: checkmark + "Check your inbox — the skill is on its way."
- Do not redirect to a separate thank-you page. Inline feedback keeps momentum.
- Do not show the email in a confirmation message (unnecessary).

**What not to do:**
- Do not require name + email. Email only. Each additional field cuts conversion 20–30%.
- Do not use "Subscribe to newsletter" as the CTA. The value exchange must be the free skill, not the newsletter.
- Do not pop the email gate before the user has scrolled past the hero. Wait until they reach the email section or click "Get free skill."

---

## Key Design Decisions

### Decision 1: Person-first vs CLI-first hero

**Resolved: Both, in layers.**

The research shows two legitimate patterns that serve different parts of the dual audience:
- Thomas Frank, Marc Lou, and Tony Dinh all lead with the person — and this is why their audiences trust them enough to pay $79–$299 for a digital product
- shadcn/ui, Vercel, and the dark-mode dev sites all put CLI commands front-and-center — and this is why developers know within 2 seconds whether it's for them

The solution is sequential, not competitive: a small personal intro line at reduced opacity (establishes who built this), followed by the outcome headline (speaks to the non-technical buyer), followed by the CLI block (speaks to the Claude Code user). Both audiences get their signal within the first viewport. Neither audience has to scroll to decide if they're in the right place.

**Do not** alternate between person-first and CLI-first on different pages. Consistency matters. The homepage establishes the pattern.

### Decision 2: Polished (Linear/Vercel) vs raw (indie hacker)

**Resolved: Polished execution, indie soul.**

Raw/rough aesthetics (Pieter Levels' brutalist homepage, Claw Mart's thin product pages) work because their founders have massive audiences who already trust them — the rough design is a signal that the person is a builder not a marketer. Without that pre-existing audience, raw reads as unfinished.

ClaudeFlows needs polished execution (clean typography, consistent spacing, real CSS) to earn trust at first visit from a non-technical buyer. But it should resist enterprise-polished SaaS design (Notion, Figma, Linear homepage) which reads as "company" not "creator."

The sweet spot: **Resend + Tony Dinh**. Resend is technically impeccable but has a craftsperson quality — clearly made by someone with taste, not by a 20-person design team. Tony Dinh's product sites (Xnapper, DevUtils) are clean and professional but feel like they came from one person who cared. This is achievable with Inter + JetBrains Mono + the color system above + consistent 8px spacing grid.

**Specific rule:** No CSS animations on first load except the hero gradient (which is static). No animated hero illustrations. No scroll-triggered elaborate animations. Motion budget: hover transitions (150ms), the CLI copy checkmark (1200ms), and a single subtle opacity fade-in on page load (300ms). That's it.

### Decision 3: Non-technical audience vs developer audience (dual audience problem)

**Resolved: Single page, layered reading paths.**

The research shows this is not actually a conflict — it's a sequencing problem.

Non-technical professionals read:
- The headline (outcome language)
- The social proof (names and numbers)
- The pricing (one-time framing)
- The testimonials (outcome language)

Claude Code developers read:
- The CLI block (install command)
- The skill names (JetBrains Mono, `/checkpoint` style)
- The tag system (compatibility: Claude Code)
- The GitHub link (open source signal)

Both audiences exist on the same page. The non-technical buyer does not need to understand the CLI block — they skip it and read the subheadline. The developer does not need the "what is a Claude Code skill?" FAQ — they already know. Neither audience is confused because the information is layered, not mixed.

**What to avoid:** Writing copy that tries to serve both audiences in the same sentence. "Download Claude Code skills to automate your workflow" — this is neither fish nor fowl. Write headlines for non-technical buyers. Write skill names and tags for developers. Keep them in separate design zones.

---

## Anti-Patterns to Avoid

These are patterns the research explicitly identifies as conversion killers or brand-damaging:

**1. Generic SaaS pricing (monthly/annual tiers)**
Every research source — Thomas Frank, God of Prompt, indie hacker data, dev tool pricing — confirms this. Non-technical buyers are SaaS-fatigued. Developers hate subscription lock-in for non-hosted tools. Use one-time pricing everywhere except consulting retainers.

**2. Pure black `#000000` background**
Resend is the one exception that proves the rule — and they compensate with grain textures and gradients. Without those techniques, `#000` reads as broken/unstyled. Use the layered near-black system above.

**3. Multiple accent colors**
God of Prompt uses yellow. Railway uses cyan, pink, purple, and blue. These work at their scale because they have design teams maintaining the system. One misplaced accent on a solo-creator site reads as amateur. Pick `#6366F1` and use it only on CTAs and active states.

**4. "Marketplace" language when you're a solo store**
Claw Mart's "2,000+ listings" claim is a ghost town. The research shows buyers don't want quantity — they want quality and trust. Do not inflate skill counts or use "marketplace" in copy. "I build skills for Claude Code" is more honest and more trusted.

**5. Feature-first product descriptions**
Every source from Thomas Frank to dev tool pricing research confirms: feature lists don't sell. "This skill runs `/checkpoint` and saves session context to STATE.md" is a feature. "Never lose your place mid-project" is an outcome. Lead with outcome, justify with feature.

**6. Fake social proof**
Anonymous five-star reviews, avatar stacks with no names, "500+ customers" with no handles. The developer audience actively distrusts this. One real testimonial with a GitHub handle is worth 100 anonymous ones. Start with 3 real quotes from real people and build from there.

**7. Gumroad as the primary storefront UI**
Thomas Frank's research explicitly notes that his custom sales page (not Gumroad's default) was critical to his $100K launch. God of Prompt runs its own checkout. The storefront IS the product for a design-forward creator. Don't outsource the first impression.

**8. `curl | bash` install pattern**
The CLI research is clear: non-technical users fear it, security-conscious developers distrust it. Lead with `npm install -g claudeflows`. Mention `npx` as the low-commitment alternative. Avoid curl scripts entirely at launch.

**9. Monospace body text**
JetBrains Mono on skill names and CLI commands signals "technical." JetBrains Mono on marketing copy and product descriptions signals "template I didn't customize." Use mono only where it adds meaning: skill commands, code examples, terminal output.

**10. Counting features before the price**
The Claw Mart lesson: "2,000+ listings" as a headline stat is meaningless when most have zero sales. Don't lead with quantity claims you can't back up with quality. Let the price be visible and let the testimonials justify it.

**11. Heavy animations on dark backgrounds**
God of Prompt's floating card orbits and scroll-triggered bar charts signal effort, but they also signal "trying too hard" to a developer audience that respects restraint. Linear's 2025 refresh explicitly cut animations. Keep motion budget minimal (see Decision 2).

**12. Asking for name + email on the free download**
Every additional form field cuts conversion 20–30%. Email only. The name is not needed and signals "we're going to mail-merge your name into spam."

---

## Implementation Notes

### Grid and Spacing

Use an 8px base unit throughout:
- Section vertical padding: 96px (12 × 8)
- Card padding: 24px (3 × 8)
- Gap between grid items: 24px
- Small component padding: 8px / 12px / 16px

### Border Radius

- Cards: 12px
- Buttons: 8px
- Badges/pills: 99px (fully rounded)
- Code blocks: 10px
- Input fields: 8px

### Max Content Width

- Page max-width: 1200px
- Content max-width (text sections): 720px
- Hero max-width: 900px (constrain the headline, don't let it go full-bleed)
- Skill grid: 3 columns at 1200px, 2 at 768px, 1 at 480px

### Noise Texture

Add a subtle grain over the dark background to prevent the "empty flat black" look:
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
}
```

Alternative: Use a CSS `background-image` with a tiled SVG noise filter. Opacity 2–4% — invisible unless you know to look for it, but makes the background feel "alive."

### Section Dividers

Use SVG gradient dividers (Clerk pattern) instead of full-width hairlines:
```css
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
  border: none;
  margin: 0;
}
```

This is significantly more refined than a full-width `border-top: 1px solid rgba(255,255,255,0.10)`. The fade-out at edges removes the "harsh cut" between sections.
