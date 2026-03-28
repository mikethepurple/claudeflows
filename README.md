# Claude Flows

Ready-made AI skills for Claude Code. Research industries, validate startup ideas, write outreach sequences, generate documentation — install one and tell it what you need.

**Website:** [claudeflows.vercel.app](https://claudeflows.vercel.app)
**Install:** `npm i -g claudeflows`

## Skills

| Skill | What it does | Time |
|-------|-------------|------|
| [Sales Outreach](skills/sales-outreach) | Generate cold email sequences with A/B variants | 5-10 min |
| [Content Repurposing](skills/content-repurpose) | Turn one blog post into LinkedIn, Twitter, newsletter, email | 3-5 min |
| [Lead Research](skills/lead-research) | Prospect briefing with company intel + talk tracks | 2-3 min |
| [Hiring Kit](skills/hiring-kit) | Job description + interview questions + scorecard | 5 min |
| [Performance Review](skills/perf-review) | Structured review from rough notes | 5 min |
| [SOP Generator](skills/sop-generator) | Process documentation from plain English | 5-10 min |
| [Email Optimizer](skills/email-optimizer) | Audit + rewrite email sequences | 5-10 min |
| [API Docs](skills/api-docs) | Generate developer docs from your codebase | 10-20 min |
| [Vendor Compare](skills/vendor-compare) | Structured vendor comparison with scoring | 5-10 min |
| [Brand Voice](skills/brand-voice) | Extract brand voice guide from content samples | 5-10 min |

## Quick Start

```bash
# Install the CLI
npm i -g claudeflows

# Install a skill
claudeflows install sales-outreach

# Use it in Claude Code
claude
> /generate-sequence
```

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) (requires Claude Pro subscription)
- Node.js 18+
- Some skills need [Brave Search API](https://brave.com/search/api/) (free tier works)

## For Creators

Want to list your own skill? See the [publishing guide](https://claudeflows.vercel.app/publish).

## License

MIT
