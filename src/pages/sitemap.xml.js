import { getAllPosts } from '../lib/sanity';

const site = 'https://ascentmgnt.com';

export async function GET() {
    const posts = await getAllPosts().catch(() => []);

    const staticPages = [
        '',
        '/about',
        '/work',
        '/packages',
        '/product',
        '/contact',
        '/privacy',
        '/blog'
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(page => `
        <url>
          <loc>${site}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
      ${posts.map(post => `
        <url>
          <loc>${site}/blog/${post.slug.current}</loc>
          <lastmod>${new Date(post.publishedAt || Date.now()).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>`.replace(/>\s+</g, '><').trim();

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml'
        }
    });
}
