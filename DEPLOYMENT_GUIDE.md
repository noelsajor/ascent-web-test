# 🚀 Migration & Deployment Guide (React to Astro + Sanity)

This guide will help you replace your existing React/Vite website on GitHub with this new Astro + Sanity version and deploy it to Vercel.

## Step 1: Clean Up & Replace Files

1.  **Backup**: Ensure you have a backup of your current project (though GitHub history will keep it).
2.  **Delete Old Files**: In your local folder, delete the old React-related files that are no longer needed:
    *   `src/App.jsx`, `src/main.jsx`, `src/App.css`
    *   `src/components/*.jsx` (if any remain)
    *   `vite.config.js`
    *   `index.html` (the root one)
3.  **Ensure New Files are Present**: Make sure all the new Astro files are in place:
    *   `astro.config.mjs`
    *   `src/pages/`, `src/components/`, `src/layouts/`, `src/lib/`, `src/scripts/`, `src/styles/`
    *   `studio/` (Sanity Studio folder)
    *   Updated `package.json`

## Step 2: Push to GitHub

Run these commands to update your repository:

```bash
git add .
git commit -m "Migrate project to Astro + Sanity"
git push origin dev
```

## Step 2.5: Preview on Vercel (Testing the Dev Branch)

Vercel automatically creates a **Preview Deployment** for every branch you push. 

1.  Go to your Vercel Dashboard.
2.  Select your project.
3.  Look for the latest deployment from the `dev` branch.
4.  **Crucial**: Even for Previews, you must add the **Environment Variables** (Step 3) in Vercel settings and ensure they are available for "Preview" environments.
5.  Open the Preview URL to test everything before merging to `main`.

## Step 3: Configure Vercel

If your project is already on Vercel, you need to update the settings:

1.  **Framework Preset**: Go to Project Settings → Build & Development. Vercel should automatically detect **Astro**. If not, manually select it.
2.  **Environment Variables**: Go to Settings → Environment Variables. Add the following from your `.env` file:
    *   `PUBLIC_SANITY_PROJECT_ID="f0v0tp4d"`
    *   `PUBLIC_SANITY_DATASET="production"`
    *   `PUBLIC_SANITY_API_VERSION="2024-03-01"`
    *   `PUBLIC_SANITY_USE_CDN="true"`
3.  **Redeploy**: Go to the "Deployments" tab and click "Redeploy" on the latest commit.

## Step 4: Sanity CORS Settings

To ensure your new website can fetch data from Sanity:

1.  Go to the [Sanity Management Console](https://www.sanity.io/manage).
2.  Select your project (`f0v0tp4d`).
3.  Go to **API** → **CORS Origins**.
4.  Add your new Vercel production URL (e.g., `https://your-project.vercel.app`) and check **Allow credentials**.

## Step 5: Sanity Studio Deployment

You can deploy your Sanity Studio so you can edit content from the web. You have two options:

### Option A: Vercel (Recommended)
1.  **New Vercel Project**: Create a new project in Vercel.
2.  **Connect Repo**: Select the same GitHub repository.
3.  **Root Directory**: Set the "Root Directory" to **`studio`**.
4.  **Build Settings**:
    *   Framework Preset: **Vite**.
    *   Build Command: `npm run build`
    *   Output Directory: `dist`
5.  **Environment Variables**: Add these variables in Vercel for the Studio project:
    *   `SANITY_STUDIO_PROJECT_ID`: `f0v0tp4d`
    *   `SANITY_STUDIO_DATASET`: `production`
6.  **Deploy**: Hit "Deploy". I've added a `studio/vercel.json` already to handle SPA routing.

### Option B: Sanity Hosting
1.  Open your terminal in the `studio` folder:
    ```bash
    cd studio
    npx sanity deploy
    ```
2.  Follow the prompts to choose a URL (e.g., `ascent-mgnt.sanity.studio`).

---

### Verifying the Migration
- Checked: **Home Page** is correctly rendering all sections.
- Checked: **Blog Section** is fetching posts (if they exist).
- Checked: **Navigation** includes the new Blog link.
- Checked: **Sitemap** is generated at `/sitemap-index.xml`.
- Checked: **RSS Feed** is available at `/rss.xml`.

Your site is now a high-performance, SEO-optimized Static Site! 🚀
