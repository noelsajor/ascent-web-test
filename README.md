# Ascent Management Website

A modern, responsive website built with React and Vite for Ascent Management - a done-for-you brand creation and content agency.

## Features

- ✨ Modern, clean design with smooth animations
- 🎨 Interactive bubble canvas background
- 📱 Fully responsive across all devices
- ♿ Accessibility-focused with proper ARIA labels and keyboard navigation
- 🎯 Hash-based routing for easy navigation
- 🎭 Reveal animations on scroll
- 🎨 Custom CSS with CSS variables for easy theming

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom properties
- **Intersection Observer API** - Scroll animations

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd ascent-website
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm i -g vercel
```

2. Run deployment:
```bash
vercel
```

3. Follow the prompts to link your project

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite and configure settings
6. Click "Deploy"

### Option 3: Deploy via GitHub Integration

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push to main branch

## Project Structure

```
ascent-website/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Packages.jsx
│   │   └── ...
│   ├── styles/
│   │   └── index.css    # Global styles
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## Components

- **Header** - Sticky navigation with scroll effects
- **Hero** - Hero section with animated bubble canvas
- **Portfolio** - Project showcase grid
- **Babysitter** - Value proposition section
- **Packages** - Interactive package selection
- **TikTok** - TikTok Shop differentiator
- **HowItWorks** - Process steps
- **Testimonials** - Client testimonials
- **FAQ** - Expandable FAQ section
- **Contact** - Contact form
- **About** - Team and company info
- **Product** - Product detail page
- **Privacy** - Privacy policy
- **Footer** - Site footer

## Customization

### Colors

Edit CSS variables in `src/styles/index.css`:

```css
:root {
    --bg-0: #0C0D0F;
    --accent: #E9D090;
    /* ... other variables */
}
```

### Content

Edit component files in `src/components/` to update text, links, and structure.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

All rights reserved - Ascent Management 2026

## Support

For questions or issues, please contact through the website contact form.
