# Ascent Mgnt - Astro Migration (SSG)

This is a migrated version of the Ascent Mgnt website, now powered by [Astro](https://astro.build/) for Static Site Generation (SSG) and [Sanity](https://www.sanity.io/) as a headless CMS for the blog.

## Tech Stack
- **Framework**: Astro (SSG)
- **CMS**: Sanity (Headless)
- **Styles**: Vanilla CSS (migrated from React)
- **Interactions**: Vanilla JS (reveal-on-scroll, mobile menu, etc.)
- **Deployment**: Vercel

## Local Development

### 1. Project Requirements
- Node.js 18.x or higher
- Sanity Project ID and Dataset

### 2. Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Fill in your `PUBLIC_SANITY_PROJECT_ID` and other variables.

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
The site will be available at `http://localhost:4321`.

### 5. Sanity Studio
To access the Sanity Studio locally:
```bash
cd studio
npm install
npm run dev
```
The studio will be available at `http://localhost:3333`.

## Deployment (Vercel)

### 1. Import Repository
- Connect your GitHub/GitLab repository to Vercel.

### 2. Build Settings
- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 3. Environment Variables
Add the following environment variables in Vercel:
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`
- `PUBLIC_SANITY_USE_CDN`

### 4. Sitemap & SEO
The sitemap is automatically generated at `/sitemap-index.xml`. Ensure your `astro.config.mjs` has the correct `site` URL.

## Folder Structure
- `src/pages/`: Route definitions (Home, Work, Blog, etc.)
- `src/components/`: Reusable Astro components.
- `src/layouts/`: Base layout for pages.
- `src/lib/`: Sanity client and GROQ queries.
- `src/styles/`: Global CSS.
- `src/scripts/`: Shared vanilla JS logic.
- `studio/`: Sanity CMS schema and configuration.
- `public/`: Static assets (images, robots.txt, etc.)
