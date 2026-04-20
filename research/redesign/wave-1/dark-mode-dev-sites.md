# Dark Mode Developer Tool Websites — Design Reference

Research date: 2026-04-16
Purpose: Design reference for ClaudeFlows storefront (dark mode by default, craftsperson's workshop feel)

---

## Key Findings

**The dark-first hierarchy**: Linear, Raycast, and Warp launched dark-first — the dark interface is the designed version, and light feels secondary. ClaudeFlows should follow this: dark is the truth, light is the inversion.

**Near-black beats pure black**: Every good dark-mode site avoids `#000000`. They use near-blacks with subtle undertones: cool blue-black (Raycast `#070921`), warm brown-black (Cursor `#14120b`), deep purple-black (Railway `#13111C`). Pure black looks cheap on OLED and makes text feel harsh.

**Elevation through luminance**: Shadows do not read on dark backgrounds. Depth is achieved by making surfaces lighter, not by casting shadows. Expect ~5–8% luminance steps per level: base → card → modal → tooltip.

**Three-tier border system**: The best sites use three border types: (1) invisible structural borders using background-color difference, (2) 1px solid at `rgba(255,255,255,0.08–0.12)` for cards and panels, (3) 1px solid at `rgba(255,255,255,0.20)` for interactive/focused elements.

**Accent color rules**: One accent, used sparingly. The accent is for CTAs and the single most important interactive element on screen. Every site below uses their accent once in the hero CTA and nowhere else on first scroll.

**Typography split**: Display font for heroes (often a custom or distinctive serif/display), sans-serif for body (Inter, Geist, Suisse Intl), monospace for code (JetBrains Mono, Berkeley Mono, Commit Mono). Never mix more than 3 typefaces.

**Code blocks are marketing**: Every site treats code snippets and CLI commands as first-class marketing content. They're not styled as documentation — they're styled as art. Dark backgrounds, syntax highlighting, subtle glow on key tokens.

---

## Detailed Analysis

### Vercel — The Reference Implementation

**Positioning**: Infrastructure for the frontend cloud. Clean, quiet, authoritative.

**Color system**:
- Uses the Geist design system with `--ds-` prefixed CSS custom properties
- Dark mode: 10-scale gray system (`--ds-gray-100` through `--ds-gray-1000`)
- Backgrounds: `--ds-background-100` (primary), `--ds-background-200` (elevated)
- Text: `--ds-gray-1000` (primary), `--ds-gray-800` (secondary), `--ds-gray-700` (tertiary)
- Accents: `--ds-blue-700/800`, `--ds-purple-700`, `--ds-green-800` — semantic, never decorative
- Borders: `--ds-gray-alpha-400` for subtle dividers

**Typography**:
- Primary: **Geist** (their own open-source typeface, geometric sans-serif)
- Monospace: **Geist Mono**
- Also loads Geist Pixel variants (Circle, Grid, Line, Square, Triangle) for generative/decorative use
- Code uses `data-geist-code-block` attributes with per-line structure

**What they do exceptionally well**:
- Radical restraint — almost no color except one blue accent on primary CTAs
- Code blocks styled to match the dark UI surface, not contrasting with it
- Template cards use subtle thumbnail previews with consistent crop and scale
- Hero section uses a large typographic statement + infrastructure metric, not a screenshot

**What to steal for ClaudeFlows**:
- The single-accent restraint principle
- Geist Mono for CLI command display
- Per-line code block structure with subtle line highlighting

---

### Linear — Dark-First UI Perfection

**Positioning**: The issue tracker that developers actually want to use. Product-first, marketing-minimal.

**Color system**:
- Moved from cool blue-black to a **warmer gray that still feels crisp, less saturated** in 2025 refresh
- CSS custom property naming convention: `--color-bg-primary`, `--color-text-primary/secondary/tertiary/quaternary`
- Four-tier text hierarchy (primary → secondary → tertiary → quaternary) — most sites only do two
- Accent: `--color-red`, `--color-green` — minimal palette, functional not decorative
- Monospace: `--font-monospace` CSS variable for consistency across all code contexts

**Typography**:
- Font weights as CSS variables (light, normal, medium, semibold)
- Size scale: title-1 through title-9 plus text-regular/mini/micro/small/large/tiny
- Individual control of letter-spacing and line-height per size
- Text decorations: `text-decoration-thickness: 1.5px`, `text-underline-offset: 2.5px` — obsessive precision

**Design philosophy (2025 refresh)**:
- "Don't compete for attention you haven't earned" — supporting elements (nav, sidebar) made several notches dimmer
- "Structure should be felt, not seen" — borders and separators softened/reduced rather than eliminated
- Shifted from cool to warm gray — maintains crispness without clinical coldness
- Removed colored team icon backgrounds, reduced icon sizes throughout
- Grid-based animations using `steps(1, end)` with opacity 0.3–1.0 for discrete frame changes

**Animations**:
- Grid dot animations: 3200ms and 2800ms with `step` timing (not easing)
- Opacity pulses between 0.3 and 1 — creates a living-grid feeling without being distracting

**What to steal for ClaudeFlows**:
- Four-tier text hierarchy for the skill card hierarchy (title → description → metadata → tags)
- The "dimmer supporting elements" principle for navigation
- Warm gray base over cool gray for a workshop/craft feel
- Grid dot animations for background texture without heavy rendering cost

---

### Raycast — Premium Dark Atmosphere

**Positioning**: Your shortcut to everything. Extensions, integrations, ambient power-user tool.

**Color system**:
- Primary background: **`#070921`** (deep navy-black, almost indigo)
- Secondary background: **`#0d1023`** (slightly lighter)
- Gradient range: `#20235b`, `#2b5eb4` for blue-spectrum hero gradients
- Accent palette: `#FF7A98` (pink/coral), `#2ED469` (vibrant green), `#043F96`, `#026F91` (blues)
- Purple range: `#523091`, `#4A154B`, `#833497`
- White at opacity for borders: `rgba(255,255,255,0.1)` for inset highlights
- Dark shadows at 30px offset, 50px blur radius with 0.25 opacity — very diffuse, very soft

**Typography**:
- **Inter** primary — clear, readable, neutral enough to not compete with content
- Strong weight hierarchy using bold for key feature names: "Fast," "Ergonomic," "Native," "Reliable"
- White text on dark backgrounds, not gray text — uses opacity for hierarchy, not desaturation

**Visual effects**:
- **Radial and linear gradients with opacity-controlled color stops**: primary at 0.7 opacity fading to 0.05–0.42
- **Multi-layered shadow system**: inset white highlight at 0.1 opacity at top + dark outset shadow
- **Glassmorphism**: thickness 1, roughness 0.35, chromatic aberration 3
- **3D canvas rendering**: cube visualization with configurable camera and rotation
- **Extension cards**: icon + title + description + custom radial gradient background per card

**What they do exceptionally well**:
- The indigo-black background reads as "dark without being oppressive"
- Each extension card has its own gradient personality — they feel handcrafted
- Keyboard key visualization as a design element (not just documentation)
- Hero uses a 3D animated element, not a product screenshot

**What to steal for ClaudeFlows**:
- **`#070921` or similar indigo-black** as an alternative to neutral dark gray — gives personality
- Per-skill card gradient personality (each skill category could have its own accent gradient)
- Layered shadow system: inset white highlight + outset dark shadow for depth without color
- The "badge cluster" layout for showing keyboard shortcuts / CLI commands

---

### Cursor — Warm Dark with Identity

**Positioning**: The AI code editor. Confident, technical, slightly editorial.

**Color system**:
- Dark background: **`#14120b`** (very dark warm brown — unusual, distinctive)
- Light background: `#f7f7f4` (warm off-white)
- Dark text: `rgba(237, 236, 236, 0.55)` on dark (not pure white — uses opacity)
- Brand dark: `#26251e` (brownish dark, primary text color on light backgrounds)
- Borders: 1px solid with `rgba(..., 0.08)` opacity — barely visible

**Typography**:
- **CursorGothic**: custom proprietary display font — creates strong brand identity
- **BerkeleyMono**: monospace for code — premium, warm, editorial character
- **JJannon**: serif, secondary use
- Fallback stack: `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`

**Visual effects**:
- Fade animations: `fadeIn`, `fadeSlideUp`, `fadeSlideRight`, scale pop-in
- `data-theme` attributes for seamless light/dark switching via CSS custom properties
- Hero uses large-scale background image with text overlay (editorial approach)

**What they do exceptionally well**:
- The warm brown-black background is the most distinctive dark-mode choice in the category — instantly recognizable
- Custom typeface (CursorGothic) signals "we thought about this" to developers
- BerkeleyMono for code reads as a premium, considered choice (not just the default)
- IDE screenshot in hero is heavily stylized, not a raw screenshot

**What to steal for ClaudeFlows**:
- Warm dark background as an alternative to neutral/cool dark — feels more like a workshop
- Berkeley Mono or a premium monospace for CLI command display
- The editorial hero with background image approach (skill in use, not skill explained)

---

### Railway — Deep Purple Craft

**Positioning**: Cloud deployment that doesn't fight you. Developer empathy, production reliability.

**Color system**:
- Primary dark background: **`#13111C`** (deep purple-black — HSL 250, 24%, 9%)
- Secondary BG: `hsl(250, 21%, 11%)` (slightly elevated)
- Foreground: `hsl(0, 0%, 100%)` (white)
- Blue scale: `hsl(220, 80%, 55%)` through `hsl(220, 55%, 10%)`
- Cyan accent: `hsl(180, 50%, 44%)`
- Pink/Magenta: `hsl(270, 60%, 52%)`
- Green: `hsl(152, 38%, 42%)` for success states
- Vaporwave theme variant: `#fedeff` foreground on `#4b0390` background (shows personality)

**Typography**:
- **Inter** and **Inter Tight** for UI sans-serif
- **JetBrains Mono** for code
- **IBM Plex Serif** for editorial/accent use

**Gradients**:
- Hero: `linear-gradient(327.21deg, rgba(33, 0, 75, 0.24) 3.65%, rgba(60, 0, 136, 0) 40.32%)`
- Shadow: `0 0 30px hsla(0, 0%, 30%, 0.25)` in dark mode

**What they do exceptionally well**:
- Purple-black background makes Railway instantly distinct from the gray-black crowd
- HSL-based color system allows easy scaling across the full lightness range
- The Vaporwave theme easter egg shows confident brand personality
- Real-time deployment metrics visualized in hero (numbers that move)

**What to steal for ClaudeFlows**:
- **`#13111C` or HSL 250, 24%, 9%** as an option — the purple undertone reads as "developer crafted"
- IBM Plex Serif as an accent serif for hero statements or pull quotes
- HSL-first color system definition (easier to maintain than hex)
- Live metric displays as a component type (skills installed, runs today)

---

### Resend — Minimal Black Craft

**Positioning**: Email for developers. No fluff. Just works.

**Color system**:
- Background: **`#000000`** (pure black — the exception that works because of their minimal approach)
- Text: `#FFFFFF` with Radix Slate tokens for gray hierarchy: `slate-4`, `slate-11`, `slate-12`
- Blue CTA: **`#00A3FF`** — one accent, one use
- Card gradients: `linear-gradient(104deg, rgba(253,253,253,0.05) 5%, rgba(240,240,228,0.1) 100%)`

**Typography**:
- **ABC Favorit** (Book, Medium) — editorial, confident, not developer-generic
- **Domaine** (Regular, Medium, Bold) — display/serif for statements
- **Commit Mono** (Regular, Italic) — monospace for code, unusual choice, technical personality
- **Inter** — variable font, functional fallback

**Cards and effects**:
- Border: `border-[2px]` with white/opacity fills
- Glassmorphism: `backdrop-blur-[25px]` on button backgrounds
- Gradient borders using CSS custom properties
- Background texture overlays (grain/noise)
- Hover: `hover:bg-white/90`, `hover:text-black` (full inversion on hover)

**What they do exceptionally well**:
- ABC Favorit is a subtle brand differentiator — looks premium without being showy
- Commit Mono as code font is a statement: "we care about every detail"
- The pure black background works because they fill it with texture (grain, gradients) — it's not empty
- CTA button glassmorphism with `backdrop-blur` on black background creates floating glass effect

**What to steal for ClaudeFlows**:
- Grain texture overlay to give the dark background life (not flat black)
- `backdrop-blur` glassmorphism on primary CTA buttons
- The full-inversion hover state (button goes white on black instead of just lightening)
- Commit Mono or similar distinctive monospace as a brand signal

---

### Clerk — Atmospheric Depth

**Positioning**: Authentication infrastructure. Security meets design.

**Color system**:
- Root: `--root-bg` → dark mode maps to `theme(colors.gray.950)` (Tailwind's deepest gray)
- Default dark set via `:root { --dark: initial; }`
- White text at opacity tiers: 0.3, 0.5, 0.7, 0.8, 0.9 for full hierarchy
- Border/dividers: `rgba(255 255 255 / 0.3)` — more visible than most, creates deliberate structure

**Typography**:
- **Suisse Intl**: Book, Medium, SemiBold, Bold weights — Swiss grotesque, neutral-premium
- **Geist Variable**: for monospace/numbers
- **Sohne Mono**: secondary monospace

**Visual effects**:
- GLSL shader animations for dynamic dot/circuit patterns in hero
- `mix-blend-overlay` at 70% opacity for glow depth
- SVG-based gradient dividers with `WebkitMaskImage`/`maskImage` — dividers that fade out at edges
- Circuit line decorative graphics using AVIF/PNG blend modes

**What they do exceptionally well**:
- The GLSL shader hero is the most technically impressive in the category — living, breathing background
- Sohne Mono + Geist Variable pair for their component previews (auth forms)
- `rgba(255 255 255 / 0.3)` border weight is more visible than usual — creates clear structure
- SVG gradient dividers that fade at edges rather than abrupt horizontal rules

**What to steal for ClaudeFlows**:
- White-at-opacity text hierarchy (0.3/0.5/0.7/0.9 tiers) instead of multiple gray values
- SVG gradient dividers that fade to transparent — cleaner than hairlines
- Circuit/grid pattern for background texture (fits "terminal/craft" aesthetic)

---

### Supabase — The Open Source Warmth

**Positioning**: The open source Firebase alternative. Build in a weekend, scale to millions.

**Color system**:
- Uses CSS custom properties: `background.default`, `background.alternative`, `foreground.DEFAULT`, `foreground.light`
- Brand green (`#3ECF8E` approximately) reserved exclusively for CTAs — strict rule
- Custom font: `--font-custom` (their proprietary font, likely a version of Circular or similar)
- Code: `--font-source-code-pro` → Source Code Pro / Office Code Pro / Menlo fallback chain
- Multiple themes: "dark", "light", "classic-dark" — classic-dark being the green-terminal aesthetic

**Philosophy**:
- Dieter Rams influence: "Less is more" — remove fluff and overbearing information
- "Will this still feel good in a few years?" — deliberately bucks trends
- Brand green only for CTAs — never decorative
- Design system adds components only after multiple uses (avoid bloat)

**What they do exceptionally well**:
- The "classic-dark" theme with green accents evokes terminal nostalgia without being retro-kitsch
- Source Code Pro / Office Code Pro for CLI commands reads as technical heritage
- The social proof ticker (Mozilla, GitHub, 1Password logos) in repeating carousel
- `customFont → Circular → Helvetica Neue` fallback chain shows font care

**What to steal for ClaudeFlows**:
- The single green CTA rule — ClaudeFlows could adopt "one brand color, CTAs only"
- "Classic dark" as a secondary theme option (terminal green for power users)
- Source Code Pro as a fallback chain choice for CLI display

---

## Design Pattern Library

### Color System Specifications

#### Background Stacks (pick one personality)

**Neutral cool (Vercel-like)**
```
Level 0 (page bg):    #0a0a0a  — near-black, neutral
Level 1 (card):       #111111  — +1 step
Level 2 (elevated):   #1a1a1a  — +2 steps
Level 3 (modal):      #222222  — +3 steps
Border subtle:        rgba(255,255,255,0.06)
Border default:       rgba(255,255,255,0.10)
Border strong:        rgba(255,255,255,0.18)
```

**Indigo-black (Raycast-like)**
```
Level 0:   #070921  — deep navy-black
Level 1:   #0d1023  — slightly lighter
Level 2:   #14183a  — elevated panels
Border:    rgba(255,255,255,0.08)
Glow:      rgba(74,90,230,0.15) — matching the blue undertone
```

**Purple-black (Railway-like)**
```
Level 0:   hsl(250,24%,9%)   ≈ #13111C
Level 1:   hsl(250,21%,11%)  ≈ #181622
Level 2:   hsl(250,18%,14%)  ≈ #1f1c2e
Border:    rgba(255,255,255,0.08)
```

**Warm dark (Cursor-like)**
```
Level 0:   #14120b  — dark warm brown
Level 1:   #1c1a12  — elevated
Level 2:   #262419  — card surfaces
Border:    rgba(255,255,255,0.08)
Glow:      rgba(200,180,120,0.08) — warm amber undertone
```

#### Text Hierarchy (opacity model — works in any color system)
```
Primary text:    rgba(255,255,255,0.92)   — use for: titles, active labels
Secondary text:  rgba(255,255,255,0.60)   — use for: descriptions, secondary labels
Tertiary text:   rgba(255,255,255,0.36)   — use for: metadata, timestamps, disabled
Quaternary text: rgba(255,255,255,0.20)   — use for: placeholders, decorative labels
```

#### Accent Color Philosophy
- One accent maximum on first viewport
- Accent lives on: primary CTA, active nav indicator, focused inputs
- Accent NEVER on: decorative elements, borders, backgrounds (unless gradient)
- Recommended accent for ClaudeFlows: `#3B82F6` (blue-500) or `#6366F1` (indigo-500)
- CTAs only → never decorative → this is the Supabase green rule applied to our palette

### Typography Stack

#### Font Combination A — Premium Monospace Focus (recommended for ClaudeFlows)
```
Display:    Geist or Inter (700 weight)
Body:       Inter or Geist (400/500)
Mono:       JetBrains Mono or Berkeley Mono
```
Why: Geist is free, purpose-built for dev tools, pairs naturally with monospace content.

#### Font Combination B — Editorial Dark
```
Display:    ABC Favorit or Suisse Intl (500/600)
Body:       Inter (400/500)
Mono:       Commit Mono or Berkeley Mono
```
Why: ABC Favorit signals craft and editorial intent without feeling trendy.

#### Font Combination C — Maximum Personality
```
Display:    Custom display or IBM Plex Serif (for headings only)
Body:       Inter Tight or Geist (400/500)
Mono:       JetBrains Mono
```
Why: IBM Plex Serif in white on dark backgrounds has incredible weight.

#### Type Scale (minimum viable)
```
Hero:        clamp(48px, 6vw, 96px)  — weight 700
H2:          clamp(32px, 4vw, 56px)  — weight 600
H3:          clamp(22px, 2.5vw, 32px) — weight 600
Body large:  18px / line-height 1.7  — weight 400
Body:        16px / line-height 1.6  — weight 400
Small:       14px / line-height 1.5  — weight 400
Micro:       12px / line-height 1.4  — weight 400/500
Code:        14px / line-height 1.6  — mono
```

### Code and Terminal Aesthetic

#### CLI Command Display Pattern
```css
.cli-block {
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 8px;
  padding: 16px 20px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
}

.cli-prompt {
  color: rgba(255,255,255,0.35);  /* dim the $ or > */
}

.cli-command {
  color: rgba(255,255,255,0.92);  /* bright for the command */
}

.cli-comment {
  color: rgba(100,160,255,0.70);  /* blue for comments */
}
```

#### Code Block Syntax Highlighting (dark mode)
```
Background:  #0d0d0d or transparent (let the card bg show)
Comments:    rgba(255,255,255,0.35)
Strings:     #98D8A0  — muted green
Keywords:    #79B8FF  — muted blue
Functions:   #B392F0  — muted purple
Numbers:     #FDCA7C  — warm yellow
Variables:   rgba(255,255,255,0.85)
Line nums:   rgba(255,255,255,0.18)
```

#### Line Highlight (for featured lines)
```css
.line-highlight {
  background: rgba(255,255,255,0.04);
  border-left: 2px solid rgba(99,102,241,0.7);  /* accent color */
  margin: 0 -20px;
  padding: 0 18px;
}
```

### Card and Component Design

#### Skill Card Anatomy
```css
.skill-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 150ms, background 150ms;
}

.skill-card:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.15);
}

/* Optional: glow on hover */
.skill-card:hover {
  box-shadow: 0 0 0 1px rgba(99,102,241,0.3),
              0 8px 32px rgba(99,102,241,0.08);
}
```

#### Card Depth System
```
Flat card:    background + border only (no shadow)
Raised card:  background + border + 0 4px 16px rgba(0,0,0,0.4)
Floating:     glassmorphism — backdrop-blur-md + rgba(255,255,255,0.05) bg
```

#### Glassmorphism (use sparingly — CTAs only)
```css
.cta-primary {
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 8px;
}

.cta-primary:hover {
  background: rgba(255,255,255,0.90);
  color: #000;
}
```

### Gradient and Glow Effects

#### What's Tasteful
```css
/* Hero background gradient — stays in the bottom half */
.hero-gradient {
  background: radial-gradient(
    ellipse 80% 50% at 50% 100%,
    rgba(99,102,241,0.15) 0%,
    transparent 70%
  );
}

/* Section divider glow */
.section-glow {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(99,102,241,0.2),
    transparent
  );
  height: 1px;
}

/* Card accent glow on hover */
.card-glow-hover:hover {
  box-shadow: 0 0 40px rgba(99,102,241,0.12);
}
```

#### What's Overdone (avoid)
- Full-width gradient backgrounds with 3+ colors fighting each other
- Glow on every card simultaneously (all glow = no glow)
- Animated gradients that shift hue
- Gradient text on body copy (reserve for hero display only)
- Multiple accent colors in the same viewport

#### Gradient Text (hero only)
```css
.hero-headline-gradient {
  background: linear-gradient(
    135deg,
    rgba(255,255,255,1) 0%,
    rgba(255,255,255,0.65) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
Note: Gradient text on pure white-to-off-white (not on color-to-color) is far more readable and elegant.

### Hero Section Patterns

#### Pattern A — Type-Led (Vercel style)
```
Large headline (8–10 words max)
One-line subheadline
Two CTAs (primary + secondary)
No image / abstract grid background
```
Strong when: the brand IS the design (Vercel, Linear can afford no hero screenshot)

#### Pattern B — Product-Led (Cursor style)
```
Medium headline
Short subheadline
Background-filling product image/screenshot (heavily stylized)
One CTA
```
Strong when: the product UI is beautiful and self-explanatory

#### Pattern C — Atmospheric Depth (Raycast style)
```
Headline with gradient text
Subheadline
3D or animated hero element (not a flat screenshot)
CTA cluster (download + secondary)
Background: multi-layer radial gradients
```
Strong when: the product is ambient (launcher, terminal) and the vibe IS the product

#### Pattern D — Terminal-Forward (for ClaudeFlows)
```
Short punchy headline
CLI install command in styled block ($ npm install -g claudeflows)
Primary CTA (Browse skills)
Background: subtle grid or noise texture
```
Why this works: Claude Code users live in terminals — showing the install command in the hero is the CTA

### Contrast and Accessibility

#### Minimum viable contrast ratios (WCAG AA)
```
Body text on dark bg:    ≥ 4.5:1
Large text / headings:   ≥ 3:1
UI components/borders:   ≥ 3:1
Placeholder text:        ≥ 3:1 (don't go too dim)
```

#### Approximate ratios for common choices
```
#FFFFFF on #0a0a0a:  21:1  (maximum — reserve for primary text)
rgba(255,255,255,0.92) on #0a0a0a:  ~18:1  (primary text)
rgba(255,255,255,0.60) on #0a0a0a:  ~11:1  (secondary text — safe)
rgba(255,255,255,0.36) on #0a0a0a:  ~6:1   (tertiary — just passes AA)
rgba(255,255,255,0.20) on #0a0a0a:  ~3.4:1 (quaternary — decorative only, fails AA for body)
```

---

## Actionable Takeaways

### For ClaudeFlows Specifically

**1. Background choice**: Purple-black (`#13111C` Railway) or warm dark (`#14120b` Cursor) over neutral gray. The undertone signals personality. Recommendation: test both — purple-black reads as "system tool," warm brown reads as "craftsperson's workshop."

**2. Typography**: Inter + JetBrains Mono as baseline. Upgrade path: ABC Favorit or Suisse Intl for display when budget allows. Do not use a generic system-ui font stack for the primary interface.

**3. CLI command in the hero**: This is the biggest differentiator for ClaudeFlows. Every competitor shows a screenshot. Show the install command. It tells Claude Code users in 2 seconds that this is for them.

**4. Skill cards**: Use the opacity card style (3% fill, 8% border) with hover state that brightens both. Give each category a gradient accent (blue for automation, green for research, purple for content). Per-card gradient personality like Raycast's extension cards.

**5. Code blocks**: Style CLI examples as first-class content. Dim the prompt character (`$`), brighten the command, blue for comments. Use `JetBrains Mono` at 14px.

**6. Single accent rule**: Pick one color (suggest `#6366F1` indigo-500). Use it on: the primary CTA button, the active skill category tab, focused input outlines. Nowhere else.

**7. Elevation without shadows**: Cards should lift via background lightness, not box-shadow. Use the 3-level system: page bg → card bg → elevated/modal. Shadows only for the primary CTA button (colored glow, not gray shadow).

**8. Navigation**: Follow Linear's principle — make the nav "a few notches dimmer" than the content. It should recede. The skills are the hero, not the nav.

**9. Texture over flat black**: If using a very dark background, add noise texture at 2–4% opacity or a subtle grid at 3% opacity. Flat `#000` reads as broken/unstyled; textured dark reads as intentional.

**10. Section transitions**: Use the SVG gradient divider pattern (Clerk) — a 1px horizontal line that fades to transparent at both edges. Much more refined than a full-width hairline.

---

## Sources

- [Vercel Geist Color System](https://vercel.com/geist/colors)
- [Linear Design Refresh Blog Post](https://linear.app/now/behind-the-latest-design-refresh)
- [Linear Design Tokens — FontOfWeb](https://fontofweb.com/tokens/linear.app)
- [Linear Design: The SaaS Design Trend — LogRocket](https://blog.logrocket.com/ux-design/linear-design/)
- [Raycast Colors API Reference](https://developers.raycast.com/api-reference/user-interface/colors)
- [Raycast Brand Colors — Loftlyy](https://www.loftlyy.com/en/raycast)
- [Railway Design System](https://railway.com/design)
- [Supabase Design System](https://supabase.com/design-system)
- [How Design Works at Supabase](https://supabase.com/blog/how-design-works-at-supabase)
- [Dark Mode Design Systems: Complete Guide — Muzli](https://muz.li/blog/dark-mode-design-systems-a-complete-guide-to-patterns-tokens-and-hierarchy/)
- [Dark Mode UI Best Practices 2025 — Graphic Eagle](https://www.graphiceagle.com/dark-mode-ui/)
- [Typography in Dark Mode — Design Shack](https://designshack.net/articles/typography/dark-mode-typography/)
- [Resend.com](https://resend.com)
- [Cursor.com](https://cursor.com)
- [Clerk.com](https://clerk.com)
- [Raycast.com](https://www.raycast.com)
