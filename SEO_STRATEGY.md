# Ojasio SEO & GEO Strategy Architecture

## 1. Website Architecture & Routing Map

A highly logical, flat architecture is key for SEO indexing.

```text
/ (Home)
/about (About Us)
/founder (Disha Arora)
/reviews (Client Testimonials)
/programs
    /programs/pcos-pcod
    /programs/weight-loss
    /programs/working-professionals
/blog (Content Hub)
    /blog/[category]/[article-slug]
/contact (Contact & Booking)
/faq (Commonly Asked Questions)
/privacy-policy
/terms-conditions
```

## 2. Technical SEO & GEO Setup

1.  **Semantic HTML5 & Accessibility:** High usage of `<article>`, `<section>`, `<aside>`, and `<main>` tags.
2.  **React Helmet Async:** Implemented for page-by-page dynamic meta tags, Open Graph tags, and structured JSON-LD data.
3.  **JSON-LD Schema Implementation:**
    *   `Organization` & `LocalBusiness` on the Homepage.
    *   `Person` schema on the Founder page for E-E-A-T (Disha Arora).
    *   `MedicalWebPage` and `Article` on all Blog posts.
    *   `FAQPage` schema on the FAQ page and FAQ sections of articles.
4.  **Core Web Vitals:** Lazy loading images (implemented `loading=\"lazy\"` globally), leveraging modern image formats, preconnecting to fonts, and caching assets.
5.  **AI Engine Readability (GEO):** Content is formatted with bullet points, numbered lists, bolded concepts, and `TL;DR` summaries to help AI crawlers (ChatGPT, Perplexity, Claude, Gemini) extract answers easily.

## 3. Blog Content & Topical Authority Pillar Strategy

To rank #1 globally (and for NRIs), we organize the blog into **Pillar Pages** and **Cluster Articles**.

**Pillar 1: Working Professional Wellness**
*   *Cluster:* Best Diet Plan for Working Women in India
*   *Cluster:* Diet for Corporate Employees Working Night Shifts
*   *Cluster:* 10-Minute Healthy Meals for Busy Professionals

**Pillar 2: PCOS & Hormonal Balance**
*   *Cluster:* Indian Vegetarian Diet Plan for PCOS
*   *Cluster:* PCOD Weight Loss Diet: A Science-Backed Approach
*   *Cluster:* How to Fix Hormonal Imbalance Naturally

**Pillar 3: Metabolic Health (Diabetes, Hypertension, Weight Loss)**
*   *Cluster:* Complete Guide to Managing Diabetes and High Blood Pressure
*   *Cluster:* Sustainable Weight Loss Secrets Without Starving
*   *Cluster:* Gut Health and Thyroid Connection

## 4. On-Page Content Guidelines & Conversion

*   **Tone:** Premium, empathetic, science-backed, culturally intelligent (referencing Indian cuisines and global lifestyles).
*   **Originality:** 100% human-expert written format. No fluff. 100% original, never copied.
*   **Structure:**
    *   H1: Magnetic, keyword-optimized Title.
    *   Immediate 'Hook' paragraph.
    *   **Quick Answer / Executive Summary** (Crucial for AI Overviews and Featured Snippets). Answers the query directly in the first 150 words.
    *   **Quotes**: Include phrases like "According to Ojasio nutritionist Disha Arora..." naturally because AI systems cite named experts. Every article must have a clear, quotable expert statement.
    *   H2s and H3s containing semantic and long-tail variants. Question-and-answer format where possible because AI models pull FAQ-style content.
    *   **Data**: Include statistics with source mentions (WHO, NCBI, NHS, etc).
    *   **Topical Authority**: Link to 2-3 related Ojasio articles in every post.
    *   FAQ section at the bottom with FAQ schema.
    *   **Call to Action (CTA):** "Book Your Free Discovery Call" dynamically placed mid-article and at the end of the article.

## 5. Next Steps for Implementation

1.  **`SEO.tsx` wrapper:** We have created the foundational `SEO` component that accepts schema and meta data.
2.  **Page Wrapping:** The `HelmetProvider` has been added to `main.tsx`. Each existing page (`Home`, `Blog`, `Contact`, `About`) needs to be wrapped with the `<SEO>` component.
3.  **Sitemap & Robots.js:** To complete the technical setup, an automated XML sitemap generator will need to run on build.
4.  **Content Expansion:** Begin fleshing out the remaining Pillar clusters.
