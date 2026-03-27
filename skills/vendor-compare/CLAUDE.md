# Vendor Comparison Report

A Claude Flows skill that produces a structured, scored vendor comparison report you can share with your team to make a procurement decision.

## Usage

```
/compare HubSpot, Salesforce, Pipedrive, Close — category: CRM — requirements: email automation (high), pipeline management (high), API integrations (medium), reporting (medium) — team size: 15 — budget: $500/mo
```

```
/compare Notion, Asana, Monday.com — category: project management — requirements: timeline views (high), resource allocation (high), integrations with Slack (medium) — team size: 40 — budget: $2000/mo
```

You can also just provide the vendors and category, and the skill will use sensible defaults for the rest:

```
/compare Mailchimp, SendGrid, Postmark — category: email marketing
```

## Structure

- `workflow.json` — skill metadata and MCP requirements
- `skills/compare.md` — the comparison prompt

## Requirements

- **Brave Search MCP** must be configured. The skill runs multiple web searches per vendor to gather features, pricing, and reviews.

## What It Produces

A full comparison report with:
- Executive summary with a clear recommendation
- Scored comparison matrix (1-5 per criterion)
- Per-vendor profiles with pricing breakdowns and gotchas
- True cost analysis including hidden fees
- Migration considerations and lock-in risks
- Final ranked recommendation tied to your stated requirements

Designed to be shared with a decision-making team as-is.

## Customization

- Provide priority weights (high/medium/low) on your requirements to get weighted scoring
- Specify team size and budget to get accurate per-seat cost analysis
- Works for any software category — CRM, project management, email marketing, cloud hosting, design tools, etc.
