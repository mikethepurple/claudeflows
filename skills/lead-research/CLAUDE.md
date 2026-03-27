# Lead Research & Prospect Briefing

A Claude Flows skill that researches any company and produces a 2-minute scannable briefing for sales calls.

## Usage

```
/research-prospect Stripe
/research-prospect Notion, prospect: Ivan Zhao (CEO), my product: sales enablement platform
```

## Structure

- `workflow.json` — skill metadata and MCP requirements
- `skills/research-prospect.md` — the research prompt

## Requirements

- **Brave Search MCP** must be configured. The skill runs 5-6 web searches to gather company intel.

## What It Produces

A structured briefing covering: company snapshot, recent news, key people, tech stack signals, likely pain points, competitive context, and a suggested talk track. Designed to be read in 2 minutes before a sales call.

## Customization

- Provide your product/service description to get a tailored talk track
- Provide a specific prospect name to get background on your contact
- Works with any company — startups, enterprises, public companies
