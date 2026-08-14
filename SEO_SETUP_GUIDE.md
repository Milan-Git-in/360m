# 360 EVENTS - Complete Google Search Console & SEO Setup Guide

## 🚀 SEO Optimization Complete! Here's Your Step-by-Step Deployment Plan

### PHASE 1: Pre-Deployment Setup (DO THIS FIRST - Before Pushing to Production)

#### 1.1 Google Search Console Verification

1. **Go to Google Search Console**: https://search.google.com/search-console
2. **Add property** → Choose **URL prefix** method
3. **Enter your domain**: `https://360events.in`
4. **Choose verification method**:
   - **Recommended: HTML tag method**
     - Copy the meta tag from Google
     - Replace `YOUR_GOOGLE_SITE_VERIFICATION_CODE` in `/app/layout.tsx` (line ~52)
     - Also update in `/app/layout.tsx` verification.google field
   - **Alternative: DNS record method** (if you have access to domain registrar)
     - Add the TXT record to your domain DNS settings

5. **Verify ownership** by clicking "Verify"

#### 1.2 Update Domain Information

**Files to update with your actual information:**

1. **In `/app/layout.tsx`**:
   - Replace `YOUR_GOOGLE_SITE_VERIFICATION_CODE` with your actual verification code
   - Update phone numbers in company address schema
   - Update email address
   - Update social media URLs (Facebook, Instagram, LinkedIn)

2. **In `/public/robots.txt`**:
   - Already optimized ✅
   - Ensure sitemap URLs point to your domain

3. **In `/app/lib/seo-config.ts`**:
   - Update `company` object with correct details
   - Update `social` links
   - Verify all area served information

#### 1.3 Create Favicon & Apple Touch Icon

**Create these image files:**

- `/public/favicon.ico` (32x32 pixels)
- `/public/apple-touch-icon.png` (192x192 pixels)

**Quick favicon creation**:

- Use an online tool like favicon.io or generate from your logo

---

### PHASE 2: Deployment to Production

#### 2.1 Build & Deploy

```bash
npm run build
npm run start
# OR deploy to your hosting platform (Vercel, AWS, etc.)
```

#### 2.2 Verify All Files Are Live

Check these URLs are accessible:

- `https://360events.in/robots.txt`
- `https://360events.in/sitemap.xml`
- `https://360events.in/site.webmanifest`

#### 2.3 Test SEO Implementation

**Use these free tools**:

- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Page Speed Insights**: https://pagespeed.web.dev/
- **Schema Validator**: https://validator.schema.org/

---

### PHASE 3: Google Search Console Configuration (After Deployment)

#### 3.1 Initial Setup (First Week)

1. **Log in to Google Search Console**
2. **Sitemaps section**:
   - Click "Sitemaps" in left sidebar
   - Add: `https://360events.in/sitemap.xml`
   - Click "Submit"
   - Wait for "Success" status (24-48 hours)

3. **Coverage report**:
   - Check "Coverage" section
   - Monitor for any errors
   - Should show all pages indexed

4. **Enhancements**:
   - Check for structured data errors
   - Fix any warnings

#### 3.2 Core Web Vitals Monitoring

1. Go to **Core Web Vitals** report
2. Monitor monthly:
   - **LCP (Largest Contentful Paint)**: Target < 2.5s
   - **FID (First Input Delay)**: Target < 100ms
   - **CLS (Cumulative Layout Shift)**: Target < 0.1

**If issues found**, implement performance optimizations:

- Optimize images (use WebP format)
- Implement lazy loading
- Minimize CSS/JS
- Use CDN for static assets

#### 3.3 Mobile Usability

1. Check **Mobile Usability** report
2. Fix any issues related to:
   - Clickable elements too close
   - Viewport configuration
   - Font size issues

#### 3.4 Security Issues

1. Check **Security & Manual Actions** section
2. Should show "No issues detected"
3. If malware detected, fix immediately

---

### PHASE 4: Ongoing Optimization (Monthly Tasks)

#### 4.1 Monthly Search Console Review

- **Traffic analysis**: Monitor clicks, impressions, CTR
- **Query analysis**: See which keywords drive traffic
- **Performance trends**: Track ranking improvements
- **Index coverage**: Ensure no new errors

**Action Items**:

- Identify top performing pages
- Identify keywords with high impressions but low CTR → Optimize title/description
- Fix any new crawl errors

#### 4.2 Local SEO Optimization

**Add to Google My Business** (HIGHEST PRIORITY FOR LOCAL RANKING):

1. Go to https://www.google.com/business/
2. Create/claim your business
3. **Fill out completely**:
   - Business name: "360 EVENTS"
   - Category: "Event Planning Service"
   - Address: Your actual office address
   - Phone: Your actual phone number
   - Website: https://360events.in
   - Hours: Your business hours
   - Add high-quality photos
4. **Get verified** (Google will send postcard/verify by phone)

#### 4.3 Link Building Strategy

**High-Priority Links to Build** (for Ahmedabad local ranking):

1. **Local directories**:
   - Justdial (search "Event Management Ahmedabad")
   - IndiaMART
   - LocalOye
   - Add your business listing

2. **Industry associations**:
   - Association of Event Professionals India
   - Hospitality & Tourism associations

3. **Guest posting**:
   - Write for event/lifestyle blogs
   - Include link to 360events.in

4. **Local partnerships**:
   - Partner with hotels, venues, decorators
   - Get mention/link from their websites

5. **Social signals**:
   - Regular posts on Instagram, Facebook
   - Link back to your website
   - Engagement signals help ranking

#### 4.4 Content Optimization

**Content to Add/Improve**:

1. **Blog section** (Create `/app/blog` folder):
   - "Top Navratri Celebrations in Ahmedabad 2024"
   - "How to Plan a Corporate Event in Gujarat"
   - "Premium Event Packages Comparison"
   - Include internal links to `/passes`

2. **FAQ section** (Add to homepage):
   - "How do I book event passes?"
   - "What's included in premium packages?"
   - "Can I get group discounts?"
   - Use schema markup for FAQs

3. **Update metadata** for each:
   - Compelling title tag (60 chars)
   - Meta description (155 chars)
   - H1 with target keyword
   - Add internal links

#### 4.5 Keyword Rankings Monitoring

**Use Google Search Console to track**:

- Every page's keyword rankings
- Track top keywords monthly
- Identify opportunities to improve CTR
- Monitor ranking trends

---

### PHASE 5: Ranking Timeline & Expectations

#### Initial Indexing (Week 1-2)

- ✅ **Week 1**: All pages indexed
- ✅ **Week 2**: Structured data recognized

#### Ranking Phase (Week 3-8)

- **Week 3-4**: Start ranking for branded keywords
  - "360 events Ahmedabad" → Top 10 (expected)
  - "360 events" → Top 50 (expected)
- **Week 5-8**: Rank for local intent keywords
  - "event management Ahmedabad" → Position 15-30
  - "event passes booking Ahmedabad" → Position 20-40

#### Growth Phase (Month 2-3)

- **Month 2**:
  - Pages rank in Top 20 for local keywords
  - Build more links + content
- **Month 3**:
  - "Event management Ahmedabad" → Top 10 (possible)
  - Build momentum with consistent content

#### Competitive Phase (Month 3-6)

- Target #1 ranking requires:
  - High-quality backlinks from local sites
  - Strong Google My Business presence
  - Regular content updates
  - E-A-T signals (Expertise, Authority, Trustworthiness)
  - User engagement signals

---

### PHASE 6: Quick Wins for Faster Ranking

#### 6.1 High-Impact Tasks (Do Immediately)

1. **✅ Google My Business Setup** - Estimated +30% traffic potential
2. **✅ Get 10 local directory listings** - Estimated +15% traffic
3. **✅ Create FAQ content** - Rich results eligibility
4. **✅ Add customer testimonials/reviews** - Trust signals

#### 6.2 Medium-Impact Tasks (Week 1-2)

1. **Get Google site: reviews** (collect 10+ reviews)
2. **Optimize image alt text** for all images
3. **Add internal linking strategy** (link to /passes from homepage)
4. **Create Contact Us section** with schema markup

#### 6.3 Long-Term Strategy (Month 1-6)

1. **Monthly blog posts** (2-4 per month)
2. **Build partnerships** with local venues
3. **Guest posting** on event blogs
4. **Video content** - Add YouTube videos of events
5. **Email newsletter** - Build email list for user engagement signals

---

### PHASE 7: Monitoring & Maintenance Checklist

#### Daily Checks

- ✅ Site is live and accessible
- ✅ No server errors (5XX status codes)

#### Weekly Checks

- ✅ Google Search Console - No new errors
- ✅ Mobile usability - No new issues
- ✅ Page speed - No degradation

#### Monthly Checks (CRITICAL - Every 1st of month)

- ✅ Traffic analysis in GSC
- ✅ Core Web Vitals report
- ✅ Mobile usability report
- ✅ Rich results report
- ✅ Google My Business reviews
- ✅ Competitor tracking

#### Quarterly Checks (Every 3 months)

- ✅ Backlink profile analysis
- ✅ Keyword ranking positions
- ✅ Content quality review
- ✅ Technical SEO audit
- ✅ Duplicate content check

---

### FINAL CHECKLIST BEFORE GOING LIVE

- [ ] Domain purchased and verified
- [ ] SSL certificate installed (https://)
- [ ] `/public/robots.txt` is live
- [ ] `/app/sitemap.ts` is generating XML
- [ ] `/public/site.webmanifest` is live
- [ ] Favicon and apple-touch-icon created
- [ ] `layout.tsx` verification code added
- [ ] All links in `seo-config.ts` are correct
- [ ] Site tested on mobile (Google Mobile Friendly Test)
- [ ] Rich results tested (Schema Validator)
- [ ] Core Web Vitals acceptable
- [ ] No 404 errors on key pages
- [ ] Google Search Console property created
- [ ] Ready to submit sitemap to GSC
- [ ] Google My Business listing prepared
- [ ] Local directory listings prepared

---

### WHEN TO PUSH TO SEARCH CONSOLE

**AFTER all of the above are complete:**

1. **Wait for DNS propagation** (12-48 hours after domain setup)
2. **Verify site is live** at https://360events.in
3. **Test robots.txt** at https://360events.in/robots.txt
4. **Test sitemap** at https://360events.in/sitemap.xml
5. **Only then** add to Google Search Console

---

### EXPECTED RANKING PROGRESSION

```
Timeline          Keyword                              Expected Position
Week 1-2          "360 events Ahmedabad"               1-5 ✅
Week 3-4          "360 events"                         50-100
Month 1           "event management Ahmedabad"         50-100 (build links)
Month 2           "event passes booking"               30-50 (add content)
Month 3-4         "event management Ahmedabad"         20-40 (momentum)
Month 4-6         "event management Ahmedabad"         10-20 (high quality links)
Month 6+          "event management Ahmedabad"         1-5 (consistent effort)
```

**Note**: #1 ranking requires sustained effort over 6+ months with:

- High-quality backlinks
- Regular content updates
- Strong local SEO signals
- User engagement metrics

---

### IMPORTANT NOTES

⚠️ **Avoid these common mistakes**:

1. Don't change domain after ranking starts
2. Don't use cloaking or black-hat SEO
3. Don't buy backlinks
4. Don't stuff keywords
5. Don't have duplicate content
6. Don't ignore Google Search Console messages

✅ **Do these**:

1. Monitor Search Console weekly
2. Fix errors immediately
3. Update content regularly
4. Build quality backlinks
5. Focus on user experience
6. Be patient (ranking takes time)

---

### Support Resources

- **Google Search Console Help**: https://support.google.com/webmasters
- **SEO Starter Guide**: https://developers.google.com/search/docs/beginner/seo-starter-guide
- **Core Web Vitals Guide**: https://web.dev/vitals/
- **Schema.org Documentation**: https://schema.org/
- **Google My Business Help**: https://support.google.com/business

---

**Generated**: 2024
**Target Domain**: 360events.in
**Target Keywords**: Event Management in Ahmedabad, Event Passes Booking, Premium Events Ahmedabad
**Target Rank**: #1 for primary keywords within 6 months
