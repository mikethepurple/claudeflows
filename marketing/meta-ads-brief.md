# ClaudeFlows Meta Ads Brief

**Product:** ClaudeFlows — dark-mode storefront selling Claude Code skills ($9-99) and consulting ($500-5K)
**Site:** claudeflows.com
**Budget:** $15/day (~$450/month)
**Placements:** Instagram + Facebook (Reels, Stories, Feed)
**Date:** 2026-04-16

---

## Campaign Architecture

Three campaigns, phased:

### Campaign 1: TOFU Content (Week 1+) — $10/day
**Objective:** Video Views (ThruPlay optimization)
**Why Video Views, not Conversions:** At $15/day you will never exit Meta's learning phase on a Conversions campaign. You need volume first. Video Views are cheap ($0.01-0.03/view), build retargeting pools fast, and let Meta's algorithm find who actually watches developer content. Switch to Traffic or Conversions once you have 1,000+ video viewers in your retargeting pool (usually week 3-4).

- **Ad Set 1:** Broad developer audience — $5/day — 2 creatives
- **Ad Set 2:** Narrow technical audience — $5/day — 2 creatives

### Campaign 2: MOFU Traffic (Week 3+) — $3/day
**Objective:** Traffic (Landing Page Views optimization)
**Audience:** Retargeting pool — people who watched 50%+ of any video
**Why week 3:** You need ~500 people in the retargeting audience before this is worth running. Video Views campaign builds that pool.

- **Ad Set 1:** Video viewers retarget — $3/day — 1-2 creatives (carousel or static)

### Campaign 3: BOFU Conversions (Week 5+, optional) — $2/day
**Objective:** Conversions (optimized for consulting form submit or email capture)
**Audience:** Website visitors (Pixel required — install Meta Pixel on claudeflows.com before launching any ads)
**Only run this if:** You have 200+ website visitors in the retargeting pool AND CPC on Campaign 2 is under $2.

**Total: $15/day stays constant.** As Campaign 2 and 3 come online, reduce Campaign 1 spend proportionally.

### Pre-Launch Checklist
1. Install Meta Pixel on claudeflows.com (add to `layout.tsx` `<head>`)
2. Set up Custom Conversions: "consulting form submit" (URL contains /consulting + thank you state) and "email subscribe" (API event or URL-based)
3. Create Custom Audiences: blank shells for "Video Viewers 50%" and "Website Visitors 30 days" — they auto-populate once ads run
4. Verify domain in Meta Business Suite

---

## Ad Formats (Ranked for This Product)

### 1. Reels Ads (PRIMARY — run from day 1)
**Why it works for a developer tool:** Terminal recordings are inherently visual and satisfying to developers. Green text on black background stops the scroll because it looks different from every other Instagram ad. Reels get 2-3x the reach of static posts at the same spend. Your 5 scripts are already written — this is your unfair advantage.

**Specs:** 9:16 (1080x1920), 15-60 seconds, sound on, captions required

### 2. Carousel Ads (SECONDARY — run from week 3 for retargeting)
**Why it works:** Carousels let you show a progression: before/after, step-by-step, or multiple proof points. Developers swipe because each card promises a new piece of information. Carousel CTR is typically 20-30% higher than single image for educational content.

**Specs:** 1:1 (1080x1080), 2-10 cards, first card must hook

### 3. Stories Ads (SKIP for now)
**Why skip:** Stories are interstitial — users tap through fast. At $15/day you cannot afford to split attention across 3 formats. Stories only make sense when repurposing Reels content automatically (Meta does this if you select "Advantage+ placements"). Let Meta auto-place your Reels into Stories rather than creating Stories-specific creatives.

### 4. Static Image Ads (SKIP for now)
**Why skip:** Static images for developer tools look like every other SaaS ad. They blend into the feed. You cannot show the "aha moment" (terminal doing something impressive) in a still frame. Use static only if a specific Reel frame tests well as a thumbnail — then extract that frame later.

**Run 2 formats: Reels (primary) + Carousel (retargeting only).**

---

## Creative Specs — 5 Specific Ads

---

### Creative 1: "Claude Lied to My Face"
**Format:** Reel (45 seconds)
**Based on:** Reel Script 1 (already written)
**Funnel position:** TOFU — broad audience

#### Visual
- **0-3s:** Dark terminal, monospace font. Claude's response visible: `The file config.yaml doesn't exist in this directory`. Text overlay top-center in white bold sans-serif: `Claude just lied to my face`. No face, no talking head — just the terminal.
- **3-8s:** Type `ls` and hit enter. File list appears. `config.yaml` is clearly there. Yellow highlight rectangle around it. Text overlay: `it's literally right there`
- **8-15s:** Cut to empty CLAUDE.md file in VS Code or terminal editor. Cursor blinking. Text overlay: `no CLAUDE.md = no rules = hallucinations`
- **15-25s:** Type the rule into CLAUDE.md: `Verify before asserting absence. Before saying "X doesn't exist" — actually check.` Show it being saved. Text overlay: `one rule in CLAUDE.md`
- **25-38s:** Same prompt to Claude. This time Claude runs `ls` first, finds the file, reads it, gives correct answer. Text overlay split screen style: `before: "doesn't exist"` / `after: reads it correctly`
- **38-45s:** Quick scroll through a full CLAUDE.md with many rules. Dense, real, impressive. Text overlay: `I have 30 of these. Link in bio.` Fade to indigo (#6366F1) background with `claudeflows.com` centered.

#### Primary Text
`Claude told me a file doesn't exist. It was right there.`

Expanded:
`Claude told me a file doesn't exist. It was right there.

The problem wasn't Claude — it was my setup. Zero rules, zero memory, zero structure.

One line in CLAUDE.md fixed it. I have 30 more that fix the rest.

Free blog post with all 10 essential rules at the link.`

#### Headline
`Fix Claude Code in 2 minutes`

#### CTA Button
Learn More

#### Landing Page
`claudeflows.com/blog/skills-i-install` — The blog post "10 Claude Code skills I install on every project." Why: This ad educates. The blog post continues the education and introduces the product naturally. Sending to the homepage or /consulting would be a mismatch — the viewer is problem-aware, not solution-aware yet.

UTM: `?utm_source=meta&utm_medium=paid&utm_campaign=tofu_reels&utm_content=claude_lied`

---

### Creative 2: "31 Agents, 20 Minutes"
**Format:** Reel (55 seconds)
**Based on:** Reel Script 2 (already written)
**Funnel position:** TOFU — narrow technical audience

#### Visual
- **0-3s:** Terminal. Rapid-fire agent spawn messages: `[agent-01] researching Cursor...`, `[agent-02] researching Bolt...`, `[agent-03] researching Replit...` — appearing fast, stacking up. Text overlay in large bold: `31 AI agents. Running simultaneously.`
- **3-10s:** Pull back to show full terminal. Each agent has a company name. Text overlay: `each one: funding, team, traction, product`
- **10-18s:** Time-lapse (2x speed). Agents reporting back. Green checkmarks appearing next to completed ones. Text overlay: `parallel execution — results in 60 seconds`
- **18-28s:** Cut to file explorer. Structured markdown files appearing one by one in a directory. Open one — clean data with headers: Company, Funding, Revenue, Team Size, Key Metrics. Text overlay: `structured output — same schema, every company`
- **28-38s:** Synthesis agent running. Reading all 31 files. Producing a ranked summary table. Text overlay: `synthesis agent reads all 31 and ranks them`
- **38-48s:** Final ranked table. Clean, readable, scrolling slowly. Text overlay: `2 weeks of research in 1 terminal command`
- **48-55s:** Terminal showing the single command that started everything. Indigo background fade. `claudeflows.com`

#### Primary Text
`31 agents researched 31 startups in 20 minutes.`

Expanded:
`31 agents researched 31 startups in 20 minutes.

Each one pulled funding data, team info, traction signals, and product analysis. Then a synthesis agent ranked all 31.

This used to take me two weeks of Crunchbase tabs and LinkedIn stalking.

The skill that runs this is called /scout. It's one of 15+ skills I've built for Claude Code.`

#### Headline
`Research 30 startups in 20 min`

#### CTA Button
Learn More

#### Landing Page
`claudeflows.com/skills` — The skills catalog. Why: This viewer is impressed by capability and wants to see what else exists. The skills page shows breadth. The scout skill card is there.

UTM: `?utm_source=meta&utm_medium=paid&utm_campaign=tofu_reels&utm_content=31_agents`

---

### Creative 3: "Empty Folder to Live App in 4 Hours"
**Format:** Reel (55 seconds)
**Based on:** Reel Script 4 (already written)
**Funnel position:** TOFU — broad audience

#### Visual
- **0-3s:** Terminal. `mkdir invention-companion && cd invention-companion`. Timestamp overlay in top-right corner: `10:00 AM`. Text overlay: `empty folder. 4 hours. let's go.`
- **3-12s:** Time-lapse. Schema files appearing. Supabase migration commands running. Tables being created. Timestamp: `11:00 AM`. Text overlay: `hour 1: database + auth + storage`
- **12-22s:** More time-lapse. React components appearing in the file tree. Browser preview showing pages rendering. Timestamp: `12:00 PM`. Text overlay: `hour 2: frontend builds itself`
- **22-32s:** The impressive part: photo upload in the app, Claude Vision analyzing the image, expert response appearing in the UI. Timestamp: `1:00 PM`. Text overlay: `hour 3: AI vision — photo to diagnosis`
- **32-40s:** Deploy command: `npx vercel --prod`. URL appearing in terminal. Timestamp: `2:00 PM`. Text overlay: `hour 4: deployed. live URL. real users.`
- **40-48s:** Live app walkthrough at app.erikov.me. Upload a photo, get a response, show the clean UI. Text overlay: `live right now — built in one afternoon`
- **48-55s:** Terminal with the skills setup. Indigo background. `claudeflows.com/consulting`

#### Primary Text
`Built a full AI app in 4 hours. From an empty folder.`

Expanded:
`Built a full AI app in 4 hours. From an empty folder.

Database, auth, AI vision, deployed to production. I was directing, not coding.

The secret isn't being a great coder. It's having the right Claude Code setup — skills that handle the repetitive parts, memory that keeps context between sessions, and rules that prevent the stupid mistakes.

I build these setups for teams. Starting at $500.`

#### Headline
`Empty folder to prod in 4 hours`

#### CTA Button
Learn More

#### Landing Page
`claudeflows.com/consulting` — The consulting page. Why: This ad sells speed and capability. The viewer's thought is "I want someone to set this up for me." Send them straight to the packages.

UTM: `?utm_source=meta&utm_medium=paid&utm_campaign=tofu_reels&utm_content=4hr_app`

---

### Creative 4: "Before/After Setup" (Retargeting)
**Format:** Carousel (5 panels)
**Funnel position:** MOFU — retargeting video viewers

#### Visual

**Panel 1 (Hook):**
Dark background (#0A0A0F). Split screen. Left side: messy terminal with red error text, label "Before" in red. Right side: clean terminal with green output, label "After" in green (#10B981). Large text center: `Same Claude. Different setup.` Small text bottom: `Swipe to see what changed`

**Panel 2:**
Dark background. Screenshot-style mockup of an empty project: just `index.js` and nothing else. Red accent. Header: `Before: No CLAUDE.md`. Body text: `Claude hallucinates files. Forgets decisions. Dumps markdown everywhere. Every session starts from zero.`

**Panel 3:**
Dark background. Screenshot-style mockup of a configured project: CLAUDE.md, `.claude/skills/` with multiple items, `memory/` folder. Green accent. Header: `After: 2 minutes of setup`. Body text: `Claude verifies before claiming. Saves decisions automatically. Organizes files into subfolders. Picks up where you left off.`

**Panel 4:**
Dark background. Three proof points stacked vertically with indigo (#6366F1) accent:
- `Prediction market platform — 3 weeks, 984 tests`
- `AI vision prototype — 4 hours, zero to production`
- `31-agent research pipeline — 20 minutes`
Text at bottom: `All built with this exact setup.`

**Panel 5 (CTA):**
Indigo gradient background. `Get the setup.` Large, centered. Below: `Skills from $9 | Consulting from $500`. Below that: `claudeflows.com`

#### Primary Text
`Two developers. Same Claude subscription. One ships 10x faster.`

Expanded:
`Two developers. Same Claude subscription. One ships 10x faster.

The difference: 30 rules in CLAUDE.md, a memory system, and skills that automate the boring parts.

I built a prediction market platform, an AI vision app, and a 31-agent research pipeline — all with this exact setup.

Skills start at $9. Full setup consulting starts at $500. Or grab the free blog post and DIY it.`

#### Headline
`Same Claude. Better setup.`

#### CTA Button
Learn More

#### Landing Page
`claudeflows.com` — Homepage. Why: Carousel viewers have already seen a Reel (retargeting). They know the brand. The homepage shows skills, consulting, and the blog — letting them self-select into their path.

UTM: `?utm_source=meta&utm_medium=paid&utm_campaign=mofu_carousel&utm_content=before_after`

---

### Creative 5: "You're Using Claude Code Wrong"
**Format:** Reel (55 seconds)
**Based on:** Reel Script 5 (already written)
**Funnel position:** TOFU — broad audience (rotate in week 2 to replace weakest performer)

#### Visual
- **0-3s:** Terminal. Someone typing a massive prompt. No CLAUDE.md visible. Raw, unconfigured. Text overlay in bold red-tinted white: `you're using Claude Code wrong`
- **3-10s:** Run `ls -la`. No CLAUDE.md. No `.claude/` folder. Nothing. Claude starts a task and immediately asks a question it should already know. Text overlay: `no CLAUDE.md // no memory // starts from zero`
- **10-18s:** Claude suggests installing a package. The package doesn't exist. `npm install` fails. Text overlay: `hallucinated packages // forgotten decisions // repeated mistakes`
- **18-22s:** Hard cut. Terminal clears. Black screen, 1 second. Text overlay in white: `now watch`
- **22-34s:** Same project directory but now configured. Quick tour: CLAUDE.md with rules (scroll briefly), `.claude/skills/` directory with items, `memory/` folder with decision files. Text overlay: `CLAUDE.md = rules // skills = automation // memory = persistence`
- **34-45s:** Same task. Claude checks before asserting. Uses a skill. References a past decision from a memory file. Text overlay: `no hallucination // automated // remembered past decisions`
- **45-48s:** Side by side. Bare vs. configured. Text overlay: `bare Claude Code vs. configured Claude Code`
- **48-55s:** Indigo background. `claudeflows.com`. Text: `Free blog post with the full setup`

#### Primary Text
`You gave Claude Code zero rules and you're surprised it hallucinates?`

Expanded:
`You gave Claude Code zero rules and you're surprised it hallucinates?

No CLAUDE.md. No memory. No skills. Every session starts from scratch.

Add 30 rules, a memory system, and 5 skills — Claude stops lying, remembers your decisions, and automates the repetitive work.

Free guide: "10 Claude Code skills I install on every project." Link below.`

#### Headline
`Stop using Claude Code raw`

#### CTA Button
Learn More

#### Landing Page
`claudeflows.com/blog/skills-i-install` — Same blog post as Creative 1. Why: Same educational funnel. This ad and Creative 1 are A/B testing different hooks (empathy vs. confrontation) against the same landing page.

UTM: `?utm_source=meta&utm_medium=paid&utm_campaign=tofu_reels&utm_content=using_wrong`

---

## Targeting

### Audience 1: Broad Developer (Ad Set 1, Campaign 1)

**Age:** 22-45
**Gender:** All
**Locations:** US, UK, Canada, Australia, Germany, Netherlands (English-speaking + high dev density)

**Detailed Targeting (interests — use OR, not AND):**
- Software development
- Python (programming language)
- JavaScript
- GitHub
- Visual Studio Code
- Web development
- Artificial intelligence
- Machine learning
- Computer programming
- Node.js

**Exclude:**
- No exclusions week 1. Add "video viewers 50%" exclusion once retargeting campaign launches (avoid paying twice for the same person).

**Placements:** Advantage+ (let Meta optimize). This is important — manual placement selection at $15/day wastes learning budget.

**Estimated audience size:** 5-15 million (intentionally broad — let the algorithm narrow)

### Audience 2: Narrow Technical (Ad Set 2, Campaign 1)

**Age:** 25-40
**Gender:** All
**Locations:** US, UK, Canada only (tighter geography = more signal per dollar)

**Detailed Targeting (layered — use AND between groups, OR within):**

Group 1 (must match one):
- Anthropic (company)
- Claude AI
- OpenAI
- ChatGPT

AND Group 2 (must match one):
- Software development
- GitHub
- Computer programming
- Web development
- DevOps

**Behavior layer (optional, add if audience size drops below 500K):**
- Technology early adopters

**Placements:** Advantage+

**Estimated audience size:** 500K-2M

### Audience 3: Retargeting (Campaign 2, Week 3+)

**Custom Audience 1:** People who watched 50% of any video ad (past 30 days)
**Custom Audience 2:** Website visitors — all pages (past 30 days, requires Pixel)
**Custom Audience 3:** Website visitors — /consulting page only (past 60 days, requires Pixel)

Combine all three into one ad set. Do not break into separate ad sets — the audiences are too small at this budget.

**Lookalike (Week 5+, if retargeting pool > 1,000):** 1% lookalike of video viewers 75%+. This is your best scaling lever once you find what works.

---

## Budget Split

### Weeks 1-2: Testing Phase ($15/day = $210 total)

| Ad Set | Daily Budget | Creatives | Goal |
|--------|-------------|-----------|------|
| Broad developer (Audience 1) | $5 | Creative 1 + Creative 3 | Find which hook resonates |
| Narrow technical (Audience 2) | $5 | Creative 2 + Creative 5 | Test technical vs. general messaging |
| Reserve | $5 | Creative 4 (not live yet) | Held for retargeting launch in week 3 |

**Actually spend $10/day for weeks 1-2.** Bank the remaining $5/day ($70 total) to fund the retargeting campaign launch in week 3 with a slightly higher daily budget.

### Weeks 3-4: Retargeting Launch ($15/day)

| Ad Set | Daily Budget | Creatives |
|--------|-------------|-----------|
| Best-performing TOFU ad set | $7 | Winning creative + new rotation |
| Retargeting (Audience 3) | $5 | Creative 4 (carousel) |
| Second TOFU ad set (if still performing) | $3 | Surviving creative |

Kill the weaker TOFU ad set entirely. Redirect budget.

### Week 5+: Optimization ($15/day)

| Ad Set | Daily Budget | Creatives |
|--------|-------------|-----------|
| Best TOFU | $6 | Winner + 1 new test |
| Retargeting | $5 | Carousel + 1 new retargeting creative |
| Lookalike or Conversions | $4 | Best-performing creative from TOFU |

---

## Metrics & Kill Criteria

### Benchmarks for Developer Tool Ads on Meta

| Metric | Poor | Acceptable | Good |
|--------|------|-----------|------|
| CPM (cost per 1K impressions) | >$15 | $8-15 | <$8 |
| ThruPlay rate (video views) | <10% | 10-20% | >20% |
| Cost per ThruPlay | >$0.10 | $0.03-0.10 | <$0.03 |
| CTR (link clicks) | <0.5% | 0.5-1.5% | >1.5% |
| CPC (link click) | >$3 | $1-3 | <$1 |
| Landing page view rate | <50% of clicks | 50-70% | >70% |

### Kill Rules

- **Kill a creative** if ThruPlay rate is below 8% after $15 spent (500+ impressions). The hook failed.
- **Kill an ad set** if CPC is above $4 after $30 spent across all creatives in that set. The audience is wrong.
- **Kill a creative** if CTR is below 0.3% after 2,000 impressions. It's invisible.
- **Pause (don't kill) a creative** if it had good engagement but no link clicks — the CTA or landing page connection is broken, not the creative.

### Scale Rules

- **Increase budget 20%** on any ad set averaging CPC below $1.50 for 3+ consecutive days.
- **Never increase budget more than 20% at a time.** Larger jumps reset Meta's learning phase.
- **Duplicate a winning ad set** (with new budget) rather than increasing budget beyond $15/day on a single set. Duplication preserves the learning data.

### Conversion Benchmarks (for Campaigns 2-3)

- Email capture: aim for <$5 per email
- Consulting form submit: aim for <$50 per lead (at $500-5K packages, this is profitable)
- Skill purchase: tracking this is aspirational at $15/day — focus on email and consulting leads

---

## A/B Testing Plan

Test ONE variable at a time. Run each test for 5-7 days minimum (Meta needs 50+ conversions/events per ad set to optimize, and at $5/day you need time).

### Test 1 (Weeks 1-2): Hook
**Variable:** Which problem-hook stops the scroll?
- Creative 1 ("Claude lied") vs. Creative 3 ("4-hour app") on Audience 1
- Creative 2 ("31 agents") vs. Creative 5 ("using it wrong") on Audience 2

**What you learn:** Whether developers respond to frustration hooks (Claude failing) or aspiration hooks (speed/output).

**Decision:** Kill the loser from each pair. Winning hook informs all future creative.

### Test 2 (Weeks 3-4): Landing Page
**Variable:** Where does the click go?
- Send winning Reel to `/blog/skills-i-install` (educational) vs. `/skills` (catalog) vs. `/consulting` (direct sale)

**Method:** Duplicate the winning creative 3 times, each with a different URL. Run at $3/day each for 5 days.

**What you learn:** Whether this audience is browsing, buying skills, or buying consulting.

### Test 3 (Weeks 5-6): Primary Text
**Variable:** Long copy vs. short copy
- Version A: Full expanded text (as written above)
- Version B: Just the first line + "Link in bio" (no expanded text)

**What you learn:** Whether developers read or just watch-and-click.

### Test 4 (Weeks 7-8): Audience
**Variable:** Narrow vs. broad
- Winning creative on Audience 1 (broad) vs. Audience 2 (narrow) at equal budget

**What you learn:** Whether tight targeting (AI + dev overlap) outperforms letting Meta's algorithm find the right people in a broad pool. At small budgets, broad often wins.

### Test 5 (Week 9+): Format
**Variable:** Reel vs. Carousel
- Winning Reel vs. Carousel Creative 4 on the retargeting audience

**What you learn:** Whether warm audiences convert better with quick video or detailed swipeable content.

---

## Landing Page Recommendations

### Required Before Launch

1. **Meta Pixel installation.** Add to `packages/web/app/layout.tsx` in the `<head>`. Without this, retargeting and conversion tracking do not work. Everything from week 3 onward depends on this.

2. **UTM parameter persistence.** When a user arrives via `?utm_source=meta&utm_medium=paid...`, store those params in localStorage. If they later submit the consulting form or subscribe to email, include UTM params in the Supabase row. This is how you know which ad drove the lead.

3. **Open Graph image for each landing page.** The `/api/og` route exists but verify it works for `/blog/skills-i-install`, `/skills`, `/consulting`, and `/`. When someone shares a link from the ad, the OG image is a free second impression.

### Recommended Improvements

4. **Blog post CTA upgrade.** `/blog/skills-i-install` currently ends with... (check if it has a clear CTA). Add a sticky bottom bar or end-of-article CTA: "Want this setup done for you? Consulting starts at $500" with a button to `/consulting`. Every blog reader from ads should have an obvious next step.

5. **Social proof on /consulting.** The "Recent builds" section is good but add one line of quantified results to each: "Saved the founder ~40 hours of manual research" or similar. Testimonials from real clients would be transformative — even one.

6. **Mobile speed.** Developer audiences tolerate slow sites less than average. Run claudeflows.com through PageSpeed Insights. If LCP is above 2.5s on mobile, fix it before spending on ads. A slow landing page tanks your Quality Score and raises CPC.

7. **Dedicated ad landing pages (Month 2+).** Once you know which creative wins, build a stripped-down landing page specifically for that ad — no navigation, no distractions, just the continuation of the ad's promise and one CTA. Example: `/lp/claude-rules` for the "Claude lied" ad, containing the 3 free CLAUDE.md rules from the homepage + email gate for the full list + consulting upsell.

### UTM Parameter Structure

```
utm_source=meta
utm_medium=paid
utm_campaign={campaign_name}    — tofu_reels, mofu_carousel, bofu_conversions
utm_content={creative_name}     — claude_lied, 31_agents, 4hr_app, before_after, using_wrong
utm_term={audience_name}        — broad_dev, narrow_tech, retarget_video, retarget_web
```

Use Meta's dynamic URL parameters where possible:
```
utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}
```

This auto-fills from your Meta Ads Manager naming, reducing manual errors.

---

## Setup Checklist (Do This in 30 Minutes)

1. Go to Meta Business Suite > Events Manager > Install Pixel on claudeflows.com
2. Create 3 campaigns with the structure above (Campaign 1 only goes live week 1)
3. Build Audience 1 and Audience 2 in Audiences section
4. Create blank Custom Audiences for "Video Viewers 50%" and "Website Visitors 30d"
5. Upload Creative 1 and Creative 3 to Ad Set 1; Creative 2 and Creative 5 to Ad Set 2
6. Set daily budgets: $5 per ad set
7. Add UTM parameters to every ad's URL
8. Set Campaign 1 live. Do NOT touch it for 5 days.
9. Day 5: check metrics against kill criteria. Kill losers.
10. Week 3: launch Campaign 2 with Creative 4 carousel targeting video viewers.

---

## Creative Production Notes

### Recording the Reels

- **Terminal font size:** 18px minimum. Most viewers are on phones. If you can't read the terminal command from arm's length on your phone, it's too small.
- **Text overlays:** Use CapCut or Instagram's native editor. White bold sans-serif. Always top or center of frame. Never bottom 20% (Instagram UI covers it).
- **Captions:** Required. 80%+ of Instagram video is watched without sound. Use auto-captions (CapCut generates these) and proofread them — "Claude Code" will get transcribed wrong.
- **Aspect ratio:** Record in 9:16. Never letterbox a 16:9 screen recording.
- **First frame:** The thumbnail Meta shows in feed before autoplay. Make it visually distinct — terminal with a visible error message or a bold text overlay. This is your "poster frame" and it needs to work as a static image too.
- **No music needed.** Developer content performs better with just voiceover + keyboard sounds. Music is for lifestyle ads.

### Carousel Production

- Design in Figma at 1080x1080 per card.
- Background: #0A0A0F (matches the site).
- Accent: #6366F1 (indigo, matches the site).
- Font: Inter or system sans-serif. Not monospace for body text — monospace only for code snippets.
- Each card must be self-contained (someone might screenshot one card). But the sequence must flow left-to-right as a story.
