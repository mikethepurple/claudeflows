# Last Session — 2026-04-18

## Done
- Reviewed all unpushed rebrand diffs (2 commits + unstaged file moves)
- Fixed broken links: GitHub URLs and npm install command pointed to non-existent `curatedflows` repo/package — reverted to `claudeflows`
- Fixed voice inconsistency: blog "the team behind" → "the maker of", homepage "people who ship" → "someone who ships", consulting "skills" → "flows"
- Removed old `claudeflows` Vercel project, created new `curatedflows` project
- Deployed to production at curatedflows.vercel.app
- Added curatedflows.com + www.curatedflows.com domains on Vercel
- Configured Cloudflare DNS via API (A records: @ + www → 76.76.21.21, proxied off)
- Standardized brand name: "CuratedFlows" (one word) across all site copy and OG images
- Pushed 3 commits to GitHub, deployed twice to Vercel

## Open threads
- Supabase migration 003 still not applied (email_subscribers + consulting_leads tables)
- npm package is still `claudeflows` — may want to publish `curatedflows` later
- GitHub repo is still `mikethepurple/claudeflows` — rename optional
- Cloudflare API token (Edit zone DNS) saved in .env as CLOUDFLARE_API_TOKEN

## Possible next
- Apply Supabase migration 003
- Build /vibecheck landing page (lead magnet)
- Build /sprint landing page (Sprint booking)
- Launch Google Ads + Reddit promoted posts
