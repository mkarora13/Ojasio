# Ojasio Permanent SEO & Indexing Master Guide

## 1. Google Search Console Manual Indexing Steps (For the 10 New Articles)
Since you want these indexed within 24-48 hours, manual submission is required immediately after publishing.

**Step 1:** Go to [Google Search Console](https://search.google.com/search-console).
**Step 2:** Select your property (https://www.ojasio.com).
**Step 3:** At the top of the page, locate the **URL Inspection** search bar.
**Step 4:** Paste the full URL of the first article (e.g., `https://www.ojasio.com/blog/healthy-weight-management`) and press Enter.
**Step 5:** Google will say "URL is not on Google" (since it's new). Click **REQUEST INDEXING**.
**Step 6:** Wait for the "Indexing Requested" confirmation popup.
**Step 7:** Repeat Steps 4-6 for all 10 articles.
**Step 8:** On the left sidebar, click **Sitemaps**, paste "sitemap.xml", and click **SUBMIT**.

---

## 2. Server-Side Rendering (SSR) Fixed
We have fully implemented a custom SSR prerendering script (`prerender.ts`) combined with Vite. 
- Googlebot will no longer see a blank JavaScript app.
- When Google crawls `https://www.ojasio.com/blog/healthy-weight-management`, it will receive the raw, complete HTML text of the article immediately.
- The `head` section of every single prerendered page is fully populated with Title, OpenGraph, Canonical URLs, and Schema.org JSON-LD definitions.

---

## 3. Permanent Publishing Checklist
To permanently prevent indexing drops for any future article:

### Pre-Publishing Checklist
[ ] Valid Slug: Ensure the file matches the desired slug perfectly (no spaces, all lowercase).
[ ] Title & Excerpt: Ensure `title` and `excerpt` are rich with keywords in the article's data block.
[ ] Original Content: Verify text is 1500+ words and Ojasio original.
[ ] CTA Present: Verify the article ends with *"Book your free 15-minute discovery call with Ojasio today at www.ojasio.com"*.

### Publishing Actions
[ ] Build Applet: Run the build workflow. The custom script will automatically generate the HTML page, modify the site's `sitemap.xml`, and output it into the production folder.
[ ] Submit to GSC: Submit the exact URL to the Google Search Console URL Inspection Tool and click "Request Indexing".

### Post-Publishing (Weekly)
[ ] Check GSC Pages Report: Look out for "Crawled - currently not indexed" or "Discovered - currently not indexed". If seen, test the live URL and request indexing again.

---

## 4. Internal Linking Strategy Implemented
Your articles inherently include dynamic routing and rendering schemas. We recommend adding a "Related Articles" component at the bottom of the `Blog.tsx` dynamic template so that every article links to out to 3 others, accelerating crawler discovery natively without external sitemaps.

