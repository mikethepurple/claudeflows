# Last Session — 2026-04-18

## Done
- Reviewed all unpushed rebrand diffs (2 commits + unstaged file moves)
- Fixed broken links: GitHub URLs and npm install command pointed to non-existent `curatedflows` repo/package — reverted to `claudeflows`
- Fixed voice inconsistency: blog "the team behind" → "the maker of", homepage "people who ship" → "someone who ships", consulting process step "skills" → "flows"
- Removed old `claudeflows` Vercel project
- Created new `curatedflows` Vercel project, deployed to production
- Added curatedflows.com + www.curatedflows.com domains on Vercel
- Pushed all commits to GitHub (3 total: /save, rebrand, fix)

## Open threads
- Cloudflare DNS not configured yet — A records needed (@ + www → 76.76.21.21, grey cloud not orange)
- Supabase migration 003 still not applied (email_subscribers + consulting_leads tables)
- npm package is still `claudeflows` — may want to publish `curatedflows` later
- GitHub repo is still `mikethepurple/claudeflows` — rename optional

## Possible next
- Configure Cloudflare DNS for curatedflows.com
- Apply Supabase migration 003
- Build /vibecheck landing page (lead magnet)
- Build /sprint landing page (Sprint booking)
- Launch Google Ads + Reddit promoted posts
