# SOP & Process Documentation

Turn tribal knowledge into documented processes

## What it does

Your team runs the same process every week but it only lives in one person's head. Describe the process in plain English -- messy is fine -- and get back a clean, structured SOP with numbered steps, decision points, checklists, and role assignments. Ready to drop into Notion, Confluence, or Google Docs.

## Install

```bash
claudeflows install sop-generator
```

## Usage

```
claude
> /create-sop
```

Describe the process you want documented. A messy brain-dump works. The skill asks for anything critical it cannot infer (process name, who is involved, frequency) and then produces the full SOP.

## What you get

- Header metadata with purpose, scope, and roles
- Numbered step-by-step procedure with decision branches
- Prerequisites and completion checklists
- Troubleshooting table for common issues
- `[FILL IN]` markers where your input is needed instead of fabricated content

## Requirements

- Claude Code

## Example

> /create-sop
> Every Monday our ops team pulls last week's support tickets, tags them by category, flags anything with >3 occurrences to product, and posts a summary in #ops-weekly. Maria usually does it but when she's out nobody knows how.

Generates a structured SOP titled "Weekly Support Ticket Review," assigns the Ops Analyst role, lists Zendesk access as a prerequisite, walks through each step with decision points for escalation thresholds, and includes a troubleshooting section for common data-pull issues.
