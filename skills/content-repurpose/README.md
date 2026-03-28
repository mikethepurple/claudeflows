# Content Repurposing Engine

One blog post, five platforms, zero extra writing

## What it does

You wrote a blog post but now need it as a LinkedIn post, Twitter thread, newsletter section, email nurture, and Instagram caption. This skill takes one piece of content and transforms it into 5+ platform-optimized formats, matching the tone and conventions of each channel.

## Install

```bash
claudeflows install content-repurpose
```

## Usage

```
claude
> /repurpose
```

Paste your content or provide a file path. Optionally specify target platforms or brand voice. You get back all five formats ready to copy-paste.

## What you get

- LinkedIn post (1,200-1,500 chars) with hook + story + CTA
- Twitter/X thread (5-8 tweets), each standalone
- Newsletter section with subject line
- Email nurture snippet with single CTA
- Instagram caption with hashtag block

## Requirements

- Claude Code

## Example

> /repurpose
> Repurpose ./content/why-we-switched-to-rust.md for LinkedIn and Twitter

Generates a LinkedIn post leading with the surprising metric from your post, plus a 7-tweet thread that breaks down each lesson learned — both formatted for their respective platforms.
