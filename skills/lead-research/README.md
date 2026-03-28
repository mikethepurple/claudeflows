# Lead Research & Prospect Briefing

Know everything about your prospect in 2 minutes

## What it does

Your sales call is in 30 minutes and you know nothing about the prospect. This skill researches any company via web search and builds a complete briefing: what they do, recent news, tech stack, decision makers, pain points, and exactly what to say on the call.

## Install

```bash
claudeflows install lead-research
```

## Usage

```
claude
> /research-prospect
```

Provide a company name, optionally a specific contact and your product description. The skill runs 5-6 web searches and returns a scannable briefing designed to be read in 2 minutes.

## What you get

- Company snapshot with size, funding, and industry
- Recent news and events
- Key decision makers and their backgrounds
- Likely pain points and a tailored talk track

## Requirements

- Claude Code
- Brave Search API

## Example

> /research-prospect
> Notion, prospect: Ivan Zhao (CEO), my product: sales enablement platform

Returns a briefing covering Notion's recent enterprise push, Ivan Zhao's background and priorities, their current tech stack signals, and a suggested opening that ties your sales enablement platform to their scaling challenges.
