# SEO & GEO (Generative Engine Optimization) Guidelines

To ensure this marketing website ranks highly in traditional Google Search and Generative AI searches (ChatGPT, Perplexity, Google SGE/AI Overviews), adhere strictly to these technical implementation standards.

## 1. Technical SEO Foundation

### Canonical URLs
Every page must have a self-referencing canonical tag to prevent duplicate content penalization.
- **Implementation**: Handled by `<link rel="canonical" href={canonicalURL} />` inside `src/components/SEO.astro`. Always ensure `Astro.site` is correctly configured in `astro.config.mjs`.

### Dynamic Meta Data (Open Graph & Twitter)
Meta tags must dynamically match the page content, especially for blog posts.
- **Title**: Max 60 characters. Format: `Page Title | Brand Name`.
- **Description**: Max 155 characters. Must contain the primary keyword.
- **OG Images**: Set up a generic fallback (e.g., `brand-fallback.jpg`) but pass dynamic images from Sanity down to the `SEO.astro` prop for blog posts. Aspect ratio must be `1.91:1` (ideally `1200x630px`).

## 2. Generative Engine Optimization (GEO) Best Practices

AI engines synthesize content differently than traditional crawlers index it.
- **Quote-Worthy Data**: Highlight statistics and bold key claims. AI engines favor dense, factual data over fluff.
- **FAQ Structuring**: Implement FAQ accordions. AI models rely heavily on question-and-answer pairs to generate direct answers.
- **Authoritative Attributions**: Use the `Author` schema for blog posts. Linking authors to active LinkedIn profiles increases "EEAT" (Experience, Expertise, Authoritativeness, and Trustworthiness) signals for both Google and LLMs.

## 3. JSON-LD Structured Data

Do not rely solely on HTML for data structuring. JSON-LD must be injected into the `<head>` of relevant pages via `src/components/JSONLD.astro`.

### Required Schemas:
1. **Organization**: Who you are, URL, Logo, Contact point. Rendered globally on the `index.astro` page.
2. **WebSite**: Includes the site name and URL. Rendered globally.
3. **BreadcrumbList**: Critical for deep sites, especially e-commerce and blog listings.
4. **BlogPosting**: Must be rendered on `/blog/[slug].astro`. Requires `headline`, `image`, `datePublished`, and `author`.
5. **Product/Offer** (If applicable): Rendered for the `/packages` or `/product` pages. Specifies pricing and currency.

## 4. Core Web Vitals targets

Google explicitly uses user experience metrics as ranking factors.
- **LCP (Largest Contentful Paint)**: Must be $< 2.5s$. Ensure the Hero banner image is aggressively optimized (`loading="eager"`, `.webp` format, preloaded if necessary).
- **INP (Interaction to Next Paint)**: Must be $< 200ms$. Thanks to Astro's Zero-JS by default, INP is rarely an issue unless heavy third-party scripts block the main thread.
- **CLS (Cumulative Layout Shift)**: Must be $< 0.1$. Explicitly set `width` and `height` attributes on ALL images and layout components.

## 5. Site Architecture & Discoverability

- **Sitemap**: Utilize `@astrojs/sitemap` to dynamically generate `sitemap-index.xml`. Ensure the Vercel deploy hook pings search engines upon major content updates.
- **Robots.txt**: Ensure standard directives:
  ```txt
  User-agent: *
  Allow: /
  Sitemap: https://yourdomain.com/sitemap-index.xml
  ```
- **Heading Hierarchy**: Only **ONE** `<h1>` per page. `<h2>` tags for major sections, `<h3>` for cards/features within sections. Do not skip heading levels (e.g., jumping from H2 direct to H4).
