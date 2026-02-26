import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-03-01';
const useCdn = import.meta.env.PUBLIC_SANITY_USE_CDN === 'true';

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    author->{name, image},
    categories[]->{title}
  }`;
  if (!client) return [];
  return await client.fetch(query);
}

export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    slug,
    mainImage,
    publishedAt,
    body,
    author->{name, image},
    categories[]->{title}
  }`;
  if (!client) return null;
  return await client.fetch(query, { slug });
}

export async function getLatestPosts(count = 3) {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...${count}] {
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt
  }`;
  if (!client) return [];
  return await client.fetch(query);
}

export async function getRelatedPosts(slug, categoryTitle = '') {
  const query = `*[_type == "post" && slug.current != $slug && $categoryTitle in categories[]->title] [0...3] {
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt
  }`;
  if (!client) return [];
  return await client.fetch(query, { slug, categoryTitle });
}
