# Sales Outreach Sequence Generator

Cold outreach sequences that actually get replies

## What it does

You need a multi-step cold email sequence but writing one from scratch takes hours and most templates sound robotic. This skill takes your target persona and value prop and generates a complete 5-7 step outreach sequence with subject lines, personalization hooks, follow-up timing, and A/B variants.

## Install

```bash
claudeflows install sales-outreach
```

## Usage

```
claude
> /generate-sequence
```

It asks for your target persona, value proposition, and preferred tone. You get back a complete sequence with `{{variable}}` personalization syntax compatible with Instantly, Lemlist, Apollo, and Smartlead.

## What you get

- 5-7 step email sequence with send timing
- A/B subject line variants for each step
- Personalization variables in `{{variable}}` format
- A breakup email that maximizes final reply rate

## Requirements

- Claude Code

## Example

> /generate-sequence
> Target: VP Engineering at Series B SaaS companies. Value prop: cut CI/CD build times by 60%.

Generates a 6-step sequence starting with a personalized cold open referencing their tech stack, followed by a case study touch, a "quick question" angle, a social proof email, a value-add forward, and a graceful breakup — each with two subject line variants and 2-4 day spacing.
