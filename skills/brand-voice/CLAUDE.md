# Brand Voice Skill

A Claude Code skill that analyzes 5-10 content samples and produces a complete, actionable brand voice guide — tone dimensions, vocabulary rules, do's and don'ts, before/after rewrites, and platform-specific adaptations.

## Usage

```
claudeflows use brand-voice
```

Then ask Claude to extract your brand voice:

```
/extract-voice [paste your content samples or provide file paths]
```

### Options

- **Paste directly:** Paste 5-10 pieces of your best content (blog posts, emails, social posts, landing page copy)
- **Provide file paths:** "Analyze the voice in ./content/post-1.md, ./content/post-2.md, ..."
- **Specify audience:** "Our audience is B2B SaaS founders, seed to Series A"
- **Focus areas:** "Pay special attention to how we handle technical topics"

## What It Produces

| Section | What You Get |
|---------|-------------|
| Voice Summary | 2-3 sentence distillation of your brand's voice identity |
| Tone Dimensions | 4-5 scored spectrums with evidence from your content |
| Vocabulary Guide | Words to use and avoid, with alternatives |
| Sentence Style | Length, complexity, punctuation, and structural patterns |
| Do's and Don'ts | 5-7 specific rules per column, derived from your samples |
| Before/After Examples | 3 generic sentences rewritten in your voice |
| Platform Adaptations | How the voice adjusts for email, social, docs, and landing pages |

## Structure

```
skills/brand-voice/
  workflow.json              # Skill metadata and registry info
  skills/extract-voice.md    # Core voice extraction prompt
  CLAUDE.md                  # This file
```

## Tips for Best Results

- **More samples = better guide.** 5 is the minimum; 8-10 gives a much richer analysis.
- **Mix content types.** Include different formats (a blog post, an email, a social post) so the guide can identify how your voice already flexes across channels.
- **Include your best work.** These samples define the target — choose content you'd want every future piece to sound like.
- **Flag outliers.** If one sample is intentionally different (e.g., a formal press release vs. your usual casual tone), mention it so the analysis can account for context.
