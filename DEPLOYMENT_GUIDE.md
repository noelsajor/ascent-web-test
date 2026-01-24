# 🚀 Quick Deployment Guide for Vercel

## Prerequisites
- A GitHub account
- A Vercel account (free - sign up at vercel.com)

## Steps to Deploy

### Method 1: Deploy via Vercel Dashboard (Recommended - Easiest)

1. **Upload to GitHub**
   - Go to GitHub and create a new repository
   - Upload the entire `ascent-website` folder to your repo
   - Or use Git commands:
     ```bash
     cd ascent-website
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin <your-github-repo-url>
     git push -u origin main
     ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project
   - Click "Deploy"
   - Done! Your site will be live in ~2 minutes

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to project**
   ```bash
   cd ascent-website
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
4. **Follow the prompts:**
   - Set up and deploy? Yes
   - Which scope? (select your account)
   - Link to existing project? No
   - Project name? ascent-website (or your preference)
   - Directory? ./ (press Enter)
   - Detect settings? Yes

5. **Deploy to production**
   ```bash
   vercel --prod
   ```

## After Deployment

### Your site will be available at:
- `https://your-project-name.vercel.app`
- You can add a custom domain in Vercel settings

### Automatic Deployments
- Every push to your `main` branch will auto-deploy
- Pull requests get preview deployments

## Local Development

Before deploying, you can test locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (test)
npm run build

# Preview production build
npm run preview
```

## Environment Variables (if needed later)

If you need to add environment variables:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add variables like API keys, etc.

## Custom Domain

To add a custom domain:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your domain
5. Follow DNS configuration instructions

## Troubleshooting

### Build fails?
- Make sure all dependencies are in package.json
- Check the build logs in Vercel dashboard

### Blank page after deployment?
- Check browser console for errors
- Verify all file paths are correct
- Ensure build command is `vite build`

### Routes not working?
- The `vercel.json` file handles this automatically
- All routes redirect to index.html for client-side routing

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev/guide/
- React Docs: https://react.dev/

## Performance Tips

Your site is already optimized with:
✅ Vite for fast builds
✅ Code splitting
✅ CSS minification
✅ Asset optimization
✅ Caching headers configured

## What's Included

All features from your original HTML are preserved:
- Interactive bubble canvas animation
- Smooth scroll reveal animations
- Sticky header with scroll effects
- Package selection interaction
- Responsive design
- Accessibility features
- All sections and pages

Enjoy your new React website! 🎉
