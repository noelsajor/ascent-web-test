import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-03-01';
const useCdn = import.meta.env.PUBLIC_SANITY_USE_CDN === 'true';

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export async function getAllPosts() {
  const query = `*[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc, _createdAt desc) {
    title,
    slug,
    mainImage,
    publishedAt,
    _createdAt,
    body,
    excerpt,
    author->{name, image},
    categories[]->{title}
  }`;
  if (!client) return [];
  return await client.fetch(query);
}

export async function getPostBySlug(slug) {
  const query = `*[_type == "post" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
    title,
    slug,
    mainImage,
    publishedAt,
    _createdAt,
    body,
    author->{name, image},
    categories[]->{title}
  }`;
  if (!client) return null;
  return await client.fetch(query, { slug });
}

export async function getLatestPosts(count = 3) {
  const query = `*[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc, _createdAt desc) [0...${count}] {
    title,
    slug,
    mainImage,
    publishedAt,
    _createdAt,
    excerpt
  }`;
  if (!client) return [];
  return await client.fetch(query);
}

export async function getRelatedPosts(slug, categoryTitle = '') {
  const query = `*[_type == "post" && slug.current != $slug && $categoryTitle in categories[]->title && !(_id in path('drafts.**'))] [0...3] {
    title,
    slug,
    mainImage,
    publishedAt,
    _createdAt,
    excerpt
  }`;
  if (!client) return [];
  return await client.fetch(query, { slug, categoryTitle });
}
