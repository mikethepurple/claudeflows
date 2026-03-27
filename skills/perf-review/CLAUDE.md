# Performance Review Writer

A Claude Code skill that turns rough bullet points about your direct reports into complete, nuanced performance reviews.

## Usage

```
claudeflows use perf-review
```

Then in Claude Code:

```
/write-review
```

Provide the employee's name, role, review period, and your rough notes. The skill handles the rest.

## What It Does

Takes your unstructured thoughts about an employee's performance and produces a structured review with:

- Overall summary
- Key accomplishments (fleshed out with impact)
- Strengths with specific examples
- Development areas with actionable suggestions
- SMART goals for next period
- Rating recommendation with justification

## Design Principles

- **Your voice, not AI voice.** The output should sound like you sat down and wrote it carefully. No corporate buzzwords, no empty phrases.
- **Honest, not inflated.** Solid work gets a solid review. Not everything is "exceptional."
- **Specific, always.** Every claim traces back to your notes. Nothing fabricated.
- **Batch-friendly.** Run it once per person. Do all 8 reports in one sitting if you want.

## No MCP Required

This skill uses no external tools — just the prompt. Works anywhere Claude Code runs.
