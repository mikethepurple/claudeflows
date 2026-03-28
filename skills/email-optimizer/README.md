# Email Sequence Optimizer

Audit and fix your email sequences

## What it does

Your welcome sequence has a 12% open rate and you don't know why. This skill takes your existing emails, runs a line-by-line audit identifying what is killing your opens and where you are losing readers, then produces rewritten versions that fix each issue along with a prioritized A/B test plan.

## Install

```bash
claudeflows install email-optimizer
```

## Usage

```
claude
> /optimize
```

Paste your email sequence (1-7 emails), describe your product and audience, and optionally share current metrics. You get back a per-email audit plus a sequence-level analysis.

## What you get

- Per-email audit: subject line score, opening line verdict, body analysis, CTA review
- Full rewrite of each email preserving your voice
- Sequence-level narrative flow analysis
- Prioritized A/B test plan ordered by expected lift
- Predicted impact range for each fix

## Requirements

- Claude Code

## Example

> /optimize
> [pastes 4-email onboarding sequence] Product: project management SaaS. Audience: team leads. Open rate: 14%, click rate: 1.2%.

Returns a diagnosis showing the subject lines are too generic and Email 3 has competing CTAs, rewrites all four emails, and recommends testing subject line personalization first (estimated +4-6% open rate) before reworking the CTA structure.
