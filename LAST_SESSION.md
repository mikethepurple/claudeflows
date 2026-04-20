# Last Session — 2026-04-20

## Done
- Reviewed new "Workshop Ledger" design from zip (warm paper, Newsreader serif, ochre, newspaper-style layout)
- Merged: new design system + old stronger copy (hero, lede, section titles) + "non-coder" framing for consulting
- Fixed wordmark to "Curated & Flows" with styled ampersand
- Deployed static HTML redesign to curatedflows.com (replaced Next.js deployment)
- vercel.json updated: outputDirectory → marketing/redesign-v2, framework → null
- Old Next.js app preserved in packages/web/ but not deployed

## Open threads
- Forms are non-functional (email capture, consulting CTAs are all event.preventDefault stubs)
- /vibecheck and /sprint landing pages still not built
- Audience direction confirmed: broader than vibecoders — social media managers, founders with dev teams, operators
- Next.js app still in packages/web/ — decision pending on whether to port redesign into Next.js or stay static

## Possible next
- Wire forms to Supabase or a form service
- Build /vibecheck landing page (highest priority ad destination)
- Build /sprint landing page
- Launch first ads
