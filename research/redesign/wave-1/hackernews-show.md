# HackerNews Show HN — Launch Research for ClaudeFlows

*Research date: April 16, 2026. Sources: HN Algolia API, bestofshowhn.com, markepear.dev, myriade.ai, individual HN threads.*

---

## Key Findings

### 1. What Show HN Posts Actually Reach the Front Page

The top Show HN posts by all-time points (last 2 years, from Algolia data) reveal a pattern: **the highest performers are personal passion projects, not product launches.** The top 5:

| Title | Points | Comments |
|-------|--------|----------|
| Gemini Pro 3 imagines the HN front page 10 years from now | 3,346 | 965 |
| I made an open-source laptop from scratch | 3,237 | 323 |
| If YouTube had actual channels | 2,741 | 514 |
| I got laid off from Meta and created a minor hit on Steam | 1,581 | 356 |
| Jmail – Google Suite for Epstein files | 1,557 | 363 |

For **dev tools specifically**, the front-page threshold appears to be ~200+ points. Notable recent performers:

| Title | Points | Comments | Why It Worked |
|-------|--------|----------|--------------|
| InstantDB – A Modern Firebase | 1,145 | 297 | Strong OSS positioning, founders replied to every comment |
| I built an AI that turns GitHub codebases into easy tutorials | 923 | 172 | Concrete before/after, practical utility, personal framing |
| Wealthfolio: Private, open-source investment tracker | 924 | 263 | Privacy + OSS combo, zero hype |
| Kitten TTS – 25MB CPU-Only, Open-Source TTS Model | 1,003 | 361 | Specific, measurable, local-first |
| Clippy – 90s UI for local LLMs | 1,122 | 275 | Nostalgia + local-first + wit |
| Term.everything – Run any GUI app in the terminal | 1,094 | 144 | Solves a clear dev frustration |

**Claude-adjacent posts specifically:**
| Title | Points | Comments |
|-------|--------|----------|
| Tell HN: I'm 60 years old. Claude Code has re-ignited a passion | 1,086 | 989 |
| Claudraband – Claude Code for the Power User | 119 | 44 |
| Real-time dashboard for Claude Code agent teams | 77 | 28 |
| I built a social media management tool in 3 weeks with Claude and Codex | 188 | 132 |

### 2. Title Patterns That Work

**Format analysis from 100+ successful posts:**

- **"I built/made X"** — performs consistently for solo projects. Personal framing signals authentic creator.
- **"[Product] – [one-line description]"** — the dash format dominates dev tool launches. Clear product + what it does.
- **"[Adjective describing key property] + noun"** — "Open-source", "Local", "Private", "Tiny" in the title signal values HN cares about.
- **Technical specificity signals credibility** — "25MB CPU-Only" outperforms "lightweight"; "~500ms latency" outperforms "fast".

**Title length:** 6–12 words hits the sweet spot. Under 5 words = vague; over 15 = desperate.

**Patterns that die at 2 points:**
- Generic descriptor: "A visual workflow automation platform"
- Buzzword-first: "AI-powered tool for developers"
- Landing-page speak: "The future of X"
- Anything with "revolutionary", "seamless", "powerful"
- Company name without description: "Introducing Foobar"

**What the data shows for Claude-adjacent tools:** All the low-performing Claude Code workflow posts (1–5 points, 0–1 comments) share one trait — they lead with the mechanism ("workflow plugin for Claude Code") not the outcome. The 119-point Claudraband post led with *who it's for* ("for the Power User"), not how it works.

### 3. What Makes Posts Succeed vs. Die at 2 Points

**Success factors (in order of impact):**

1. **The founder shows up and answers fast.** InstantDB founders answered nearly every comment thread. One studied launch showed 53 comments answered by a team member. HN is a conversation, not a broadcast.

2. **You can try it right now, no signup.** HN guidelines literally say "make it easy for users to try your thing out, ideally without barriers such as signups or emails." Posts behind signup walls die.

3. **Personal voice in the body text.** "I spent 6 years on this" lands. "We're excited to announce" gets flagged.

4. **GitHub link for anything dev-related.** A repo signals: real product, real code, self-hostable, not vaporware. HN overindexes on OSS.

5. **Honest backstory comment from the creator.** Drop a first comment immediately after posting explaining the backstory — how you came to build it, what's different, honest limitations. This seeds discussion in a good direction.

**Death factors:**

1. **Nobody upvotes in the first hour.** HN's ranking algorithm is time-weighted. Posts need early velocity — 10+ upvotes in 60 minutes to have front-page chances. Without network seeding, most posts die.
2. **Marketing speak in the description.** Technical community pattern-matches sales language in milliseconds and closes the tab.
3. **No working demo.** Linking to a landing page instead of the actual product.
4. **Posting alone without a network.** Your first ~10 upvotes have to come from somewhere.

### 4. Comment Patterns — What Gets Asked and What Triggers Negative Reactions

**Standard questions on any dev tool launch:**
- "How does this compare to [existing tool]?" — must have an honest answer ready
- "Is there a self-hosted / open-source version?"
- "What's the pricing / business model?"
- "Does this work for [specific edge case]?"
- "Why did you choose [tech stack]?"

**Triggers for negative reactions:**
- "Vibe coded in 3 weeks" — top concern: "this is not serious or battle-tested" (188-point post on AI-built social tool)
- Missing license (Claudraband got hit on this immediately — they fixed it in real time and it helped)
- Unclear differentiation from existing tools
- Promotional tone in comments
- Founder getting defensive about criticism

**How good founders handle criticism:** The InstantDB founders' pattern is the gold standard — acknowledge limitations honestly, cite relevant essays or code examples, invite deeper conversation via email. "Answer objections by first finding something to agree with."

### 5. AI Tool Posts — Is There AI Fatigue on HN?

**Yes, with nuance.**

General sentiment (April 2026): 57% of surveyed Americans say AI risks outweigh benefits. 71% of office workers say new AI tools appear faster than they can learn them. HN reflects this — but unevenly.

**What still does well on HN:**
- AI tools that are **local-first / privacy-first** (no cloud, no data collection) — Clippy (1,122 pts), Kitten TTS (1,003 pts)
- AI that does something **concretely demonstrable** (before/after, specific output)
- AI tools with **open-source code** and technical depth in the post
- AI tools positioned around a **specific workflow problem**, not "AI for everything"
- Personal stories about AI impact (Claude Code passion thread: 1,086 pts, 989 comments)

**What gets buried:**
- "AI-powered X" without specifics
- Another wrapper around OpenAI/Claude API with no differentiation
- Claims like "better than [existing tool]" without proof
- Rapid-build bragging — "3 weeks with AI" signals low quality to HN readers
- Generic "productivity" positioning

**Key pattern:** The highest-performing AI posts either (a) have nostalgia/wit as a hook alongside the AI angle, or (b) are deeply technical with measurable benchmarks. Pure AI angle alone is no longer sufficient.

### 6. Pricing Discussion — HN Reaction to Paid Dev Tools

**HN's default is OSS-or-bust, but paid is acceptable with conditions:**

- **Transparency is non-negotiable.** Hiding pricing until signup is flagged as a red flag immediately.
- **Explain the business model in the first comment.** Founders who proactively say "here's how we make money and why it's sustainable" get respect.
- **Free tier must exist.** HN users want to try before they consider paying. No free tier = high churn on Show HN traffic.
- **"OSS alternative to X"** framing wins upvotes over paid products at comparable quality.
- **Pricing comparisons will happen.** A $100/mo search API got publicly benchmarked against SerpAPI and Tavily in the comments within hours.
- **SaaS is accepted if the pricing is simple and honest.** Freemium with clear paid tiers does fine. Opaque "contact us for enterprise pricing" triggers skepticism.

**For a marketplace product like ClaudeFlows:** HN will ask "why not just GitHub?" or "why not just share a CLAUDE.md?" Must have ready answers that are honest about the value-add.

### 7. Follow-up Strategy — Do Founders Comment on Their Own Posts?

**Yes, and it's critical.** The pattern across all high-performing launches:

1. **Post a founder comment within 5 minutes of submission.** Explain: who you are, why you built this, what's genuinely different, known limitations. Don't wait for others to define the narrative.
2. **Reply to every substantive comment in the first 4 hours.** This is when HN traffic peaks. Unresponded comments signal abandonment.
3. **Go deep on technical questions.** HN is curious, not hostile. Answer precisely.
4. **When criticized, agree first.** "You're right that X is a limitation — here's why we made that tradeoff." This wins the audience observing the thread.
5. **Never be defensive about business model.** Honesty about revenue model is received well; evasion is not.
6. **Share limitations you didn't mention in the post.** Self-awareness builds trust. Claudraband added an MIT license in real-time based on comments — the community noticed and appreciated it.

### 8. Best Time to Post

**Data from 157,000+ Show HN posts (Myriade analysis):**

| Timing | Breakout Rate (30+ votes) |
|--------|--------------------------|
| Weekday average | 9.45–9.90% |
| Saturday | 11.08% |
| Sunday | 11.75% |
| **Sunday 0–2 UTC** | **15.7%** (peak) |
| Sunday 11–16 UTC | 12–14% |
| Saturday 14–20 UTC | 12–14% |
| 3–7 UTC (any day) | 8.2–8.4% (avoid) |

**The golden window is Sunday, 11:00–16:00 UTC** (7am–12pm US Eastern). Weekends are 20–30% more effective than weekdays for Show HN specifically because:
- Fewer competing submissions
- Readers browse with more leisure, engage more deeply
- Upvote-to-submission ratio is higher

Note: Some analysis (Lucas Costa) argues timing matters less because the upvote/submission ratio stays constant. Both can be true — Myriade's 15.7% Sunday peak vs 9.9% Monday rate suggests weekends still have an edge even accounting for this.

### 9. "Claude" Mentions on HN — Sentiment

**Broadly positive for utility, mixed on trust and lock-in:**

**Positive reception:**
- Claude Code enthusiasm is genuine and cross-demographic (the 60-year-old developer thread: 1,086 pts, 989 comments — one of the highest-engagement threads in recent history)
- Claude is perceived as the best coding assistant by HN's technical audience
- MCP ecosystem posts get curiosity-driven engagement when technically solid

**Friction points:**
- Lock-in concerns: Claudraband's thread surfaced "only supporting Claude Code enforces vendor dependency"
- Trust concerns: Questions about whether AI-built code is production-safe
- "Vibe coding" skepticism: Mentioning Claude or Codex in a build timeline triggers quality concerns
- Anthropic's subscription restrictions (OpenClaw controversy) created negative Tell HN thread

**For ClaudeFlows positioning:** Lead with the workflow/outcome value, not "built for Claude." Claude as a first-class mention in a tool positioned as a marketplace is safe — Claude is respected. But Claude as the full identity of the product may trigger lock-in objections.

---

## Detailed Analysis

### Case Study: Claudraband — "Claude Code for the Power User" (119 pts, 44 comments)

**Why it reached ~120 points while similar tools got 1–5:**
- Title anchored to *identity* ("Power User") not mechanism ("workflow plugin")
- Creator responded quickly to the missing-license criticism and fixed it publicly — turned a negative into a trust signal
- Technical depth: explained xterm.js vs tmux tradeoffs, ToS implications
- Acknowledged limitations rather than deflecting

**Criticisms that surfaced (useful for ClaudeFlows to anticipate):**
- "Why not just use tmux manually?"
- Anthropic lock-in concerns
- License status (resolved)
- ToS compliance questions

### Case Study: Real-Time Dashboard for Claude Code Agent Teams (77 pts, 28 comments)

**Notable technical insight shared in thread:**
- Claude Code hooks are blocking — performance degrades with many plugins
- This level of specificity (50-60ms → 3-5ms improvement) is exactly what HN wants

**Pattern:** Shared a genuine performance insight with numbers. HN rewards showing your work.

### Case Study: InstantDB — 1,145 pts, 297 comments (the gold standard)

**What the founders did right:**
- OSS framing prominent in the title
- Founders (stopachka, nezaj) responded to virtually every comment thread
- Honest about missing features, but with roadmap context
- Invited enterprise conversations via email (not a CTA, a genuine offer)
- Acknowledged tradeoffs in API design without being defensive

**Questions they fielded (relevant to any dev tool):**
- Schema evolution and long-term maintainability
- Self-hosting and escape hatches
- Performance at scale
- Missing features (recursive queries, COUNT aggregates)

### Case Study: "I built an AI that turns GitHub codebases into easy tutorials" — 923 pts, 172 comments

**Observations:**
- "I built" framing over product launch framing
- Concrete, demonstrable output
- Community still pushed back on: tone of generated content, accuracy concerns, "I built an AI" vs "I wrapped an API"
- The "wrapping APIs isn't building AI" criticism is predictable and worth pre-empting

---

## Actionable Takeaways

### Draft Show HN Titles for ClaudeFlows

**Option 1 — Marketplace framing:**
> Show HN: ClaudeFlows – Open-source marketplace for Claude Code workflows and skills

**Option 2 — Problem-first:**
> Show HN: I got tired of rebuilding the same Claude Code setups – so I built a marketplace

**Option 3 — Utility-forward:**
> Show HN: Browse, install, and share Claude Code skills like npm packages

**Option 4 — Curiosity hook (if you have a compelling demo):**
> Show HN: What if Claude Code's /commands were community-built and installable

**Recommended title:** Option 3. It's concrete, uses an analogy HN immediately understands (npm), and leads with the user action (browse/install/share) rather than the product description. No superlatives, no "AI-powered," no hype.

### Launch Strategy

**Pre-launch:**
- Ensure a working demo with no signup required (or minimal friction)
- GitHub repo must exist and be linked — include a CLAUDE.md and solid README
- Have 10+ real users ready to upvote on day of posting (seeding matters for early velocity)
- Draft your founder comment before posting — post it within 2 minutes of submission

**Title constraints:**
- No "AI-powered" — obvious, sounds like marketing
- No "revolutionary" or "seamless"
- Do include "open-source" if true — triggers positive priors immediately
- Do include a concrete analogy (npm, VS Code extension marketplace, etc.)

**First comment template (post immediately after submitting):**

> Hey HN — I'm [name], I built ClaudeFlows because I kept rebuilding the same Claude Code workflows from scratch across every project, and sharing them with teammates was messy. 
> 
> What it is: a browse-and-install marketplace for Claude Code skills (.md files + SKILL.md convention), plus a CLI to install them into any project. Think npm for Claude Code workflows.
> 
> What it isn't: it doesn't touch your code, it doesn't collect your prompts, it's not a SaaS wrapper — it's just a community registry.
> 
> Known limitations: [honest list — small catalog initially, CLI is early, no Windows support yet, etc.]
> 
> Happy to go deep on anything — architecture, the SKILL.md format, how we handle versioning, or why we didn't just use GitHub. Ask away.

**Pricing/business model stance:**
- Lead with free. The registry/catalog must be free.
- Be explicit about how you make money if you monetize (premium skills, pro features, hosted registry for teams)
- Don't hide it — HN will ask within 5 comments

**Post timing:** Sunday, 12:00 UTC (8am US Eastern). Targets the 11-16 UTC golden window with modest US morning presence.

**During the thread:**
- Respond to every comment in the first 4 hours
- When compared to alternatives ("why not GitHub?"), agree with the overlap, then distinguish precisely
- If criticized for being "just a file convention," show the workflow it enables — before/after
- Add an MIT or Apache 2 license and make it visible before posting

**Key objections to anticipate and pre-empt:**
1. "Why not just use GitHub?" → ClaudeFlows provides discovery, versioning, compatibility metadata, and a standard convention that GitHub repos don't enforce
2. "This only works if Claude keeps the SKILL.md format stable" → Address directly with how it handles version drift
3. "Anthropic lock-in" → Position as format-agnostic if possible; emphasize the convention is portable
4. "Vibe coded?" → Do not mention how fast you built it. Ever.

---

## Sources

- [bestofshowhn.com — Top AI Show HN posts](https://bestofshowhn.com/search?q=%5Bai%5D)
- [markepear.dev — How to launch a dev tool on HN](https://www.markepear.dev/blog/dev-tool-hacker-news-launch)
- [myriade.ai — Best time to post on Show HN (157k post analysis)](https://www.myriade.ai/blogs/when-is-it-the-best-time-to-post-on-show-hn)
- [lucasfcosta.com — How to do a successful HN launch](https://www.lucasfcosta.com/blog/hn-launch)
- [HN Show HN Guidelines](https://news.ycombinator.com/showhn.html)
- [Ask HN: Tips for a good Show HN (thread)](https://news.ycombinator.com/item?id=40563762)
- [Indie Hackers — Launched on HackerNews: What Happened](https://www.indiehackers.com/post/launched-on-hackernews-what-happened-and-what-i-learned-nflqqZoHttex6HhKkKTH)
- [HN: Claudraband – Claude Code for the Power User (119 pts)](https://news.ycombinator.com/item?id=47741889)
- [HN: Real-time dashboard for Claude Code agent teams (77 pts)](https://news.ycombinator.com/item?id=47602986)
- [HN: I built a social media management tool in 3 weeks with Claude and Codex (188 pts)](https://news.ycombinator.com/item?id=47749674)
- [HN: Tell HN: I'm 60 years old. Claude Code has re-ignited a passion (1,086 pts)](https://news.ycombinator.com/item?id=47282777)
- [HN: MCP Isn't Dead. You're Just Using It Wrong (6 pts)](https://news.ycombinator.com/item?id=47412133)
- [HN: InstantDB – A Modern Firebase (1,145 pts)](https://news.ycombinator.com/item?id=41322281)
- [HN: I built an AI that turns GitHub codebases into easy tutorials (923 pts)](https://news.ycombinator.com/item?id=43739456)
- [HN Algolia API — Show HN posts with 100+ points since May 2024](https://hn.algolia.com/api/v1/search?query=Show%20HN&tags=show_hn&numericFilters=created_at_i%3E1714521600,points%3E100)
- [devto — How to Post on HN Without Getting Flagged](https://dev.to/developuls/how-to-post-on-hacker-news-without-getting-flagged-or-ignored-2eaf)
