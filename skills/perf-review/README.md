# Performance Review Writer

Write thoughtful reviews in minutes, not hours

## What it does

Review season means staring at blank forms for 8 direct reports. You know what you want to say but can't get it out of bullet-point form. This skill takes your rough notes and produces a complete, nuanced performance review that sounds like you wrote it carefully.

## Install

```bash
claudeflows install perf-review
```

## Usage

```
claude
> /write-review
```

Provide the employee's name, role, review period, and your rough notes. Run it once per person -- do all your reports in one sitting if you want.

## What you get

- Overall performance summary
- Key accomplishments fleshed out with impact
- Strengths with specific examples from your notes
- Development areas with actionable suggestions
- SMART goals for the next period
- Rating recommendation with justification

## Requirements

- Claude Code

## Example

> /write-review
> Name: Sarah Chen, Senior Engineer, Q3-Q4 2025. Notes: led the auth migration, mentored two juniors, sometimes misses deadlines on smaller tasks, great at system design.

Produces a structured review that highlights the auth migration's impact on security posture, credits her mentorship with the juniors' growth metrics, addresses the deadline pattern with a concrete suggestion around task prioritization, and recommends a "strong performer" rating.
