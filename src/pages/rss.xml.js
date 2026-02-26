import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/sanity';

export async function GET(context) {
    const posts = await getAllPosts().catch(() => []);

    // Ensure we only include posts that have the required RSS fields
    const validPosts = posts.filter(post => post.title && post.slug?.current);

    return rss({
        title: 'Ascent Mgnt Blog',
        description: 'Insights on brand building, content systems, and commerce execution.',
        site: context.site,
        items: validPosts.map((post) => ({
            title: post.title,
            pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
            description: post.excerpt || '',
            link: `/blog/${post.slug.current}/`,
        })),
    });
}
