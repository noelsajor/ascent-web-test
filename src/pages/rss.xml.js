import rss from '@astrojs/rss';
import { getAllPosts } from '../lib/sanity';

export async function GET(context) {
    const posts = await getAllPosts();
    return rss({
        title: 'Ascent Mgnt Blog',
        description: 'Insights on brand building, content systems, and commerce execution.',
        site: context.site,
        items: posts.map((post) => ({
            title: post.title,
            pubDate: post.publishedAt,
            description: post.excerpt,
            link: `/blog/${post.slug.current}/`,
        })),
    });
}
