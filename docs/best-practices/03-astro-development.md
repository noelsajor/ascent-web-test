# Astro Development Best Practices

Astro is chosen as the frontend framework because of its "Zero-JS by Default" architecture (`Islands Architecture`) and extreme performance capabilities. When editing or building new `.astro` components, follow these strict development patterns.

## 1. Asset Optimization

### Astro Images (`<Image />` vs `<img>`)
- **Use `<Image />` (`astro:assets`)** for all local static images (e.g. logos, hero images stored in `src/assets/`). Astro will automatically process them into lossless `.webp` or `.avif`, resize them, and generate appropriate `srcset` and `sizes` attributes.
- **Use standard HTML `<img>`** for SVGs or remote images (from CMS where the CMS acts as the CDN). If rendering CMS images via Sanity, use `@sanity/image-url` to generate optimized query dimensions before passing to an `<img>` tag.

### Preloading Critical Assets
For above-the-fold content (like the Hero image or primary fonts), establish preloads in the `<head>` to prevent LCP (Largest Contentful Paint) delays.

## 2. CSS & Styling Methodology

### Scoped CSS Defaults
The `<style>` tag inside any `.astro` file is automatically scoped to that specific component. **Embrace this.**
- Do not attempt to use long BEM classes (e.g., `brand-hero-section-card-title`). Just write clean CSS (`.title`) within the scoped tag.
- Use `<style is:global>` sparsely. Global styles should generally remain in `src/styles/global.css`.

### Layout Shifts (CLS Prevention)
NEVER inject layout-defining CSS via JavaScript. Write out fallback HTML and CSS. Every image and skeleton component must have a defined `height` or `aspect-ratio` in its CSS to ensure the document flow doesn't jump when images load.

## 3. Hydration Guidelines (Astro Islands)

By default, an Astro component strips all Javascript. If you migrate a React, Vue, or Svelte component into the tree that requires interactivity (e.g., an interactive form or a product carousel), you **must opt-in to hydration**.

- `client:load` - Use for immediately visible, high-priority interactive features (Header Mobile Menu).
- `client:visible` - Use for low-priority interactivity below the fold (e.g., a complex footer widget).
- `client:idle` - Use for features that don't need to block initial interaction (e.g., tracking scripts, complex logic).

## 4. Data Fetching & Static Generation

### SSG by Default
The project is configured for **Static Site Generation (`output: 'static'`)**. 
This means all pages in the `src/pages` matrix are compiled to static HTML at build-time.
- Fetch data specifically inside the frontmatter `---` fenced area of the `.astro` component.
- The build will fetch from Sanity CMS and render the HTML. 

### Dynamic Routes (`getStaticPaths`)
When generating pages dynamically, like blog posts (`/blog/[slug].astro`), you must export a `getStaticPaths` function to tell Astro exactly which pages to build at compile time.
```javascript
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    params: { slug: post.slug.current },
    props: { post },
  }));
}
```

## 5. Security & Environment Variables

- Only prefix variables with `PUBLIC_` if they must be exposed to the client (e.g., `PUBLIC_SANITY_PROJECT_ID`).
- Any sensitive API keys must remain strictly private and do not prefix them with `PUBLIC_`. Astro handles them securely on the server side at build time.
