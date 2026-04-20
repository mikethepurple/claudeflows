# ClaudeFlows: OG Images, Meta Tags & Instagram Optimization

## Key Findings

### 1. OG Image Technical Specs
- **Universal Standard**: 1200 × 630 pixels (1.91:1 aspect ratio) works across all platforms
- **Format**: PNG preferred (lossless, crisp text edges), JPG acceptable
- **File Size**: Under 1MB for optimal performance
- **Twitter/X**: 1200 × 675 (2:1 ratio) for Summary Cards with Large Image
- **Square Fallback**: 1:1 ratio for iMessage/WhatsApp square thumbnails

### 2. Dynamic OG Image Generation
- **Best Tool**: Vercel OG (ImageResponse API) or Satori in Next.js 14+
- **Method**: JSX/CSS → SVG → PNG at edge runtime
- **Per-Route Support**: Automatically generate unique OG images per skill/page
- **Limitations**: Flexbox only (no CSS Grid), 500KB bundle max, no advanced CSS
- **Performance**: Cached at CDN edge; no runtime penalty for subsequent requests

### 3. Meta Tags (Next.js Implementation)
**Core Required Tags:**
- `og:title` — skill or product name
- `og:description` — concise value prop
- `og:image` — absolute URL (not relative)
- `og:type` — "website" for ClaudeFlows
- `og:url` — absolute canonical URL
- `og:site_name` — "ClaudeFlows"

**Twitter Card Tags:**
- `twitter:card` — "summary_large_image"
- `twitter:image` — same as og:image
- `twitter:title` — skill name
- `twitter:description` — value prop

**Technical Best Practices:**
- Set `metadataBase` in Next.js to ensure absolute URLs
- Use `generateMetadata()` function for dynamic content (blog posts, skills)
- Use static `metadata` object for fixed pages
- Verify with OG debuggers (Facebook, Twitter, LinkedIn, Discord) before launch
- Use OGraph Previewer extension during development

### 4. Instagram Link-in-Bio Strategy
**Why It Matters:**
- Instagram allows 5 bio links but only 1 is visible in bio text
- Link-in-bio tools drive traffic, capture CTAs, and track clicks

**Best Alternatives to Linktree (2026):**

| Tool | Best For | Speed | Free Tier | Key Feature |
|------|----------|-------|-----------|-------------|
| **Biotree** | Speed-focused creators | 0.4s load | Limited | 3x faster than Linktree |
| **Stan Store** | Sales/revenue | — | No ($29/mo) | Conversion-optimized checkout |
| **Later** | Multi-platform | — | Yes | Integrates Instagram scheduling |
| **Beacons** | Flexible creators | — | Yes | Analytics, customization |
| **Lnk.Bio** | Simplicity | — | Yes | Unlimited links, no paywall |
| **Tap.bio** | Visual discovery | — | Yes | Swipeable card interface |

**For ClaudeFlows Specifically:**
- **Stan Store** is best if primary goal is monetization (in-app purchases, skill licenses)
- **Biotree** if speed/UX is critical (dev audience expects fast sites)
- **Custom Solution** recommended long-term: Build a simple Next.js page at `claudeflows.app/skills` linking to all featured skills with proper OG images

### 5. Instagram → Website Conversion Flow

**Landing Page Requirements:**
- **Mobile-First**: 80-90% of Instagram traffic is mobile; target 1-3 second load time
- **Message Matching**: Color palette, visual style, and CTA must mirror Instagram content
- **Psychological Continuity**: Familiar design removes friction; unfamiliar design causes drop-off
- **Short Forms**: 3-field max; reduce friction in signup/purchase
- **Social Proof**: Reviews, user testimonials, GitHub stars (for dev tools)
- **Clear Headline**: Immediately reinforce the click's promise

**Analytics Setup:**
- Create separate Google Analytics dashboard for Instagram traffic
- Use UTM parameters: `utm_source=instagram&utm_medium=link_in_bio&utm_campaign=skillname`
- Track: bounce rate, time-on-page, conversion rate by traffic source

### 6. Examples: Developer Tools with Strong OG Images

**Vercel** (vercel.com)
- Static OG: Clean product hero + blue accent
- Dynamic OG: Per-deployment preview cards with custom metadata
- Implementation: Uses internal @vercel/og tool; serves as reference

**Supabase** (supabase.com)
- Static OG: Supabase branding + product feature callout
- Dynamic OG: Edge Function–generated images (open-source example: `supabase.com/docs/guides/functions/examples/og-image`)
- Serves OG images from `og.supabase.com` subdomain

**Next.js Docs** (nextjs.org)
- Static: Framework logo + page title
- Dynamic: Per-documentation page OG images with feature highlights
- Best practice example for developer education tools

**Prisma** (prisma.io)
- Clean minimalist OG: Logo + single value statement
- Static files; no dynamic generation (simpler approach)

**Stripe** (stripe.com)
- Dynamic: Per-feature OG images with API/product context
- Text overlay: Feature name + platform compatibility badge

---

## Detailed Analysis

### Dynamic OG Image Architecture for ClaudeFlows

**Recommended Flow:**
```
/app/skills/[skillId]/route.ts (API route)
├─ Read skill metadata (name, description, icon, category)
├─ Generate OG image via ImageResponse (JSX/CSS)
└─ Return PNG buffer + cache headers

/app/skills/[skillId]/opengraph-image.tsx (File convention)
├─ Alternative: Auto-generated by Next.js
├─ Supports same JSX/CSS rendering
└─ Simpler than API route; less flexible for complex data
```

**Template Structure (per skill):**
```jsx
// Format: skill name (top), icon (center), category badge (bottom-right)
// Colors: Match ClaudeFlows brand palette
// Font: Inter (or Geist) with font weight 600/700 for hierarchy
// Layout: 1200×630; content inset 60px from edges
```

**Per-Skill OG Image Content:**
- **Top**: Skill name (large, bold, 48-60px)
- **Center**: Skill icon/screenshot (square, 200px)
- **Bottom-Left**: Category badge (e.g., "Research", "Design")
- **Bottom-Right**: ClaudeFlows branding (logo + tagline)
- **Background**: Gradient or solid matching brand colors

**Caching Strategy:**
- CDN cache: 7 days (skills change infrequently)
- Revalidate on skill update via ISR or manual purge
- Cloudflare or Vercel cache layers; no runtime cost per request

### Instagram Strategy: Custom vs. Linktree

**Option A: Custom Next.js Page (Recommended)**
```
claudeflows.app/skills
├─ Grid of 6-12 top featured skills
├─ Each skill: thumbnail + title + 1-line description
├─ Each skill is clickable → /skills/[skillId]
├─ OG image: Grid preview (1200×630 with 4-6 skill tiles)
└─ Analytics: UTM tracking on each skill link
```

**Pros:**
- Full brand control (no third-party watermarks)
- Fast load (single Next.js page)
- Integrated analytics
- Extensible (add featured collections, trending skills)

**Cons:**
- Requires maintenance if skill list changes frequently

**Option B: Stan Store (if selling)**
```
stanstore.com/@claudeflows/
├─ Each skill = product listing
├─ Built-in checkout
└─ Commission on sales
```

**Pros:**
- Handles payment processing
- Pre-built funnel

**Cons:**
- 10-30% commission
- Brand dilution (third-party domain)
- Limited customization

**Option C: Biotree (Speed + Simplicity)**
```
biotree.bio/claudeflows
├─ Simple list of links + icons
├─ Load time: 0.4s
└─ Minimal customization
```

**Recommendation for ClaudeFlows:** Build Option A (custom Next.js page). It's faster, more brandable, and more flexible than Linktree alternatives.

### Meta Tag Implementation Pattern

**Static Page Example (layout.tsx):**
```typescript
export const metadata: Metadata = {
  title: "ClaudeFlows | AI-Powered Workflows",
  description: "Discover and share Claude skills, workflows, and AI agents.",
  openGraph: {
    title: "ClaudeFlows | AI-Powered Workflows",
    description: "Discover and share Claude skills, workflows, and AI agents.",
    url: "https://claudeflows.app",
    type: "website",
    images: [
      {
        url: "https://claudeflows.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClaudeFlows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaudeFlows",
    description: "AI workflows marketplace",
    images: ["https://claudeflows.app/og-image.png"],
  },
};
```

**Dynamic Route Example ([skillId]/page.tsx):**
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const skill = await fetchSkill(params.skillId);

  return {
    title: skill.name,
    description: skill.shortDescription,
    openGraph: {
      title: skill.name,
      description: skill.shortDescription,
      url: `https://claudeflows.app/skills/${params.skillId}`,
      images: [
        {
          url: `https://claudeflows.app/api/og?skillId=${params.skillId}`,
          width: 1200,
          height: 630,
          alt: skill.name,
        },
      ],
    },
  };
}
```

**Verification Checklist:**
- [ ] Test with Facebook Sharing Debugger (facebook.com/sharing/debugger)
- [ ] Test with Twitter Card Validator (cards-dev.twitter.com/validator)
- [ ] Test with LinkedIn Inspector (linkedin.com/inspector)
- [ ] Verify OG image URLs are absolute (https://, not /)
- [ ] Confirm images load in 1-2 seconds (use Lighthouse)
- [ ] Check mobile preview (1080px viewport)

---

## Actionable Takeaways

### Phase 1: Foundation (Week 1)
1. **Set up base meta tags** in Next.js layout.tsx
   - Add `metadataBase` configuration
   - Define default og:title, og:description, og:image
   - Add Twitter Card defaults

2. **Create static OG image** (1200×630 PNG)
   - Brand: logo + tagline
   - Use for homepage + fallback for all pages
   - Deploy to public/ or CDN

3. **Test and verify**
   - OG Preview Chrome extension
   - Facebook Sharing Debugger
   - Twitter Card Validator

### Phase 2: Dynamic Images (Week 2-3)
1. **Set up ImageResponse API**
   - Create `/app/api/og/route.tsx` endpoint
   - JSX template with skill metadata
   - Support query params: `?skillId=X&category=Y`

2. **Wire per-skill OG images**
   - Update `[skillId]/page.tsx` generateMetadata()
   - Point og:image to `/api/og?skillId=X`
   - Test 5-10 variations

3. **Optimize bundle size**
   - Keep custom fonts minimal (1-2 weights)
   - Pre-load brand colors as constants
   - Benchmark edge function execution time

### Phase 3: Instagram Strategy (Week 3-4)
1. **Build /skills landing page**
   - Grid of 6-12 featured skills
   - Clickable tiles → /skills/[skillId]
   - Generate OG image for /skills page itself

2. **Set up link-in-bio redirect**
   - Instagram bio: `claudeflows.app/skills`
   - UTM parameter: `?utm_source=instagram&utm_medium=bio`
   - Monitor analytics dashboard

3. **Optimize mobile landing**
   - Ensure <1.5s load on 4G (use Lighthouse)
   - Mobile-first layout (100vw on mobile)
   - Clear CTA: "Explore Skills" button

4. **A/B test content**
   - Image 1: Colorful skill grid
   - Image 2: Minimal monochrome
   - Image 3: With user testimonial
   - Track CTR by variant via UTM

### Phase 4: Monitoring (Ongoing)
1. **Dashboard setup**
   - Google Analytics: Instagram traffic source
   - Segment by skill page
   - Track conversion funnel: Link → Site → Signup

2. **Social listening**
   - Monitor ClaudeFlows mentions on Instagram
   - Screenshot shared OG images
   - Iterate based on engagement metrics

---

## Sources

### OG Image Specifications
- [OG Image Size Guide: Dimensions for Every Platform in 2026 | Pixola](https://www.pixola.ai/blog/og-image-size-guide)
- [Open Graph Image Sizes for Social Media: The Complete 2026 Guide | Krumzi](https://www.krumzi.com/blog/open-graph-image-sizes-for-social-media-the-complete-2026-guide)
- [OG Image Size Guide 2026 | MyOG](https://myogimage.com/blog/og-image-size-meta-tags-complete-guide)
- [Social Media Image Sizes in 2026 | Hootsuite](https://blog.hootsuite.com/social-media-image-sizes-guide/)

### Dynamic OG Image Generation
- [Open Graph Image Generation | Vercel](https://vercel.com/docs/og-image-generation)
- [Getting Started: Metadata and OG Images | Next.js](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Building Dynamic OG Images with Satori and Next.js | FAIR Data Innovations Hub](https://fairdataihub.org/blog/kalai)
- [Generate Dynamic OG Images with Next.js 16 | MakerKit](https://makerkit.dev/blog/tutorials/dynamic-og-image)
- [Complete Guide to Dynamic OG Images in Next.js | Medium](https://medium.com/@uyiosazeeirvin/complete-guide-to-dynamic-og-images-in-next-js-15-5f69fd583dbe)

### Meta Tags Implementation
- [Meta Tags & Open Graph: Implementation Guide | Vladimir Siedykh](https://vladimirsiedykh.com/blog/meta-tags-open-graph-complete-implementation-guide-nextjs-react-helmet)
- [Metadata Files: opengraph-image and twitter-image | Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
- [How to Set Up Open Graph Meta Tags in Next.js | OG Check](https://ogcheck.com/blog/nextjs-open-graph)
- [Open Graph Examples | Open Graph Examples](https://opengraphexamples.com/)

### Instagram & Link-in-Bio
- [8 Best Linktree Alternatives For 2026 | Adam Connell](https://adamconnell.me/linktree-alternatives/)
- [The 7 Best Linktree Alternatives for 2026 | Jotform](https://www.jotform.com/blog/linktree-alternatives/)
- [10 Best Instagram Link In Bio Tools | Blogging Wizard](https://bloggingwizard.com/instagram-bio-link-tools/)
- [Top Link in Bio Tool for Instagram & TikTok | Later](https://later.com/link-in-bio/)

### Instagram Landing Page Optimization
- [How to Convert More Instagram Traffic | Social Media Examiner](https://www.socialmediaexaminer.com/how-to-convert-more-instagram-traffic-3-tips/)
- [7 Tips for Creating a High-Converting Instagram Landing Page | IMarkinfotech](https://www.imarkinfotech.com/7-tips-for-creating-a-high-converting-instagram-landing-page/)
- [20 Instagram Landing Page Examples That Seal the Conversion | Instapage](https://instapage.com/blog/instagram-landing-pages)
- [Best Practices for Instagram Landing Pages | SendPulse](https://sendpulse.com/blog/instagram-landing-pages/)

### Developer Tool Examples
- [Generating OG Images | Supabase Docs](https://supabase.com/docs/guides/functions/examples/og-image)
- [OG Image Generator | Supabase](https://og.supabase.com/)
- [Inspecting OG Metadata | Vercel](https://vercel.com/docs/deployments/og-preview)

