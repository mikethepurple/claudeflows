# Hiring Kit Skill

Generates a complete hiring kit from a role title and seniority level.

## Usage

```
claudeflows use hiring-kit
```

Then ask Claude to create a hiring kit:

```
Create a hiring kit for a Senior Backend Engineer at Acme Corp, remote, on the Platform team.
```

## What It Produces

1. **Job Description** — SEO-optimized, inclusive language, clear requirements vs nice-to-haves
2. **Interview Scorecard** — Structured 1-5 scoring across 6-8 dimensions with behavioral anchors
3. **Behavioral Questions** (8-10) — Each with competency mapping, strong/weak answer indicators, follow-up probes
4. **Take-Home Assignment** — Role-appropriate, time-boxed 2-4 hours, with evaluation rubric
5. **Offer Talking Points** — Key selling points for closing candidates

## Inputs

Required: role title, seniority level, team/department, company name, work model (remote/hybrid/onsite).

Optional: company values, salary range, location, specific requirements.

## Skills

- `create-kit` — The main (and only) skill. Generates all five sections in a single pass.
