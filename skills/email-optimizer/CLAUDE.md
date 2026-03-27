# Email Sequence Optimizer

This skill audits existing email sequences and produces optimized rewrites with actionable diagnostics.

## Usage

Run the `optimize` skill. Paste your email sequence (1-7 emails), describe your product/audience, and optionally share current metrics (open rate, click rate, conversion rate). The skill returns a detailed per-email audit plus an overall sequence analysis.

## Input

- **Email sequence**: 1-7 emails, pasted in order. Clearly separate each email (e.g., "Email 1:", "Email 2:").
- **Product/audience context**: What you sell, who receives the sequence, where in the funnel these emails sit (welcome, onboarding, nurture, win-back, etc.).
- **Current metrics** (optional): Open rate, click-through rate, reply rate, unsubscribe rate, conversion rate. Even partial data helps calibrate recommendations.

## Output

A single document with two sections:

1. **Per-email audit** — subject line score, opening line verdict, body analysis, CTA audit, and a full rewrite for each email.
2. **Sequence-level analysis** — narrative flow, timing/frequency recommendations, a prioritized A/B test plan, and predicted impact range.

## Design Principles

- Diagnose before prescribing: every recommendation traces back to a specific problem in the original copy
- Rewrites preserve the sender's voice — they fix mechanics, not personality
- Subject lines optimize for genuine curiosity, never misleading clickbait
- CTAs are singular and unambiguous — one email, one ask
- A/B test suggestions are ordered by expected lift so teams with limited traffic test what matters first
