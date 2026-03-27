# Content Repurpose Skill

A Claude Code skill that transforms a single piece of content (blog post, article, essay) into platform-optimized formats for LinkedIn, Twitter/X, newsletters, email nurture sequences, and Instagram.

## Usage

```
claudeflows use content-repurpose
```

Then ask Claude to repurpose your content:

```
/repurpose [paste your blog post or provide a file path]
```

### Options

- **Target specific platforms:** "Repurpose this for LinkedIn and Twitter only"
- **Set brand voice:** "Repurpose this with a casual, witty tone — we're a B2C startup"
- **Provide file path:** "Repurpose the blog post at ./content/my-post.md"

## What It Produces

| Format | Length | Key Feature |
|--------|--------|-------------|
| LinkedIn post | 1,200-1,500 chars | Hook + story + insight + CTA |
| Twitter/X thread | 5-8 tweets | Each tweet stands alone |
| Newsletter section | 150-300 words | Subject line + conversational body |
| Email nurture | 75-150 words | Single CTA, plain-text energy |
| Instagram caption | Under 2,200 chars | Hook + body + hashtag block |

## Structure

```
skills/content-repurpose/
  workflow.json          # Skill metadata and registry info
  skills/repurpose.md    # Core repurposing prompt
  CLAUDE.md              # This file
```
