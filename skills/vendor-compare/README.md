# Vendor Comparison Report

Compare vendors objectively, decide in minutes

## What it does

You are evaluating multiple tools and drowning in feature comparison tabs. This skill takes your vendor shortlist and requirements, researches each option, and produces a structured comparison report with scoring, pricing analysis, and a clear recommendation. The kind of analysis a consultant would charge $2K for.

## Install

```bash
claudeflows install vendor-compare
```

## Usage

```
claude
> /compare
```

Provide the vendors, category, and your requirements with priority weights. Optionally add team size and budget for accurate per-seat cost analysis.

## What you get

- Executive summary with a clear recommendation
- Scored comparison matrix (1-5 per criterion, weighted by your priorities)
- Per-vendor profiles with pricing breakdowns and gotchas
- True cost analysis including hidden fees
- Migration considerations and lock-in risks

## Requirements

- Claude Code
- Brave Search API

## Example

> /compare
> HubSpot, Salesforce, Pipedrive, Close -- category: CRM -- requirements: email automation (high), pipeline management (high), API integrations (medium) -- team size: 15 -- budget: $500/mo

Researches all four CRMs, scores them across your requirements, flags that Salesforce exceeds your budget at 15 seats while Pipedrive scores highest on pipeline management, and recommends Close as the best fit with a weighted score breakdown and total cost comparison.
