import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { cache } from 'react';

import type { Locale } from '@/i18n/config';

/**
 * Posts live in `content/blog/<slug>/<locale>.mdx`. To add one: create the
 * folder, then write `en.mdx` and `nl.mdx` with `title`, `description`,
 * `date` (YYYY-MM-DD) and `tags` frontmatter, followed by the MDX body.
 *
 * A language without a file is simply not published in that language: the
 * post drops out of the listing and its URL 404s. Nothing ever falls back to
 * another language — a page is whole or it is absent.
 *
 * This is the only file that knows where posts come from; everything else
 * works with the types below, so a move to a CMS is rewritten here alone.
 */
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

/** A full post: its frontmatter plus the raw MDX body, ready to be compiled. */
export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD); empty when the frontmatter has none. */
  date: string;
  tags: string[];
  body: string;
}

/**
 * What a preview needs — no body, so list views never carry article text.
 * There is no cover image on purpose: previews lead with the title and the
 * opening idea, so the writing is what draws people in.
 */
export type PostMeta = Omit<Post, 'body'>;

/** YAML reads an unquoted `2026-08-08` as a Date, so normalise it back. */
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return typeof value === 'string' ? value : '';
}

/** Every post slug, unordered — one directory per post. */
export async function getPostSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    // No content directory yet — an empty blog is a valid state.
    return [];
  }
}

/**
 * One post in one language, or null when it is not published there.
 * Cached per request, so `generateMetadata` and the page share one read.
 */
export const getPost = cache(async (slug: string, locale: Locale): Promise<Post | null> => {
  let raw: string;
  try {
    raw = await fs.readFile(path.join(CONTENT_DIR, slug, `${locale}.mdx`), 'utf8');
  } catch {
    return null;
  }

  // Frontmatter is hand-written and untyped, so every field gets a fallback.
  const { data, content } = matter(raw);

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    description: typeof data.description === 'string' ? data.description : '',
    date: toIsoDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    body: content,
  };
});

/** Posts published in `locale`, newest first. Undated posts sort last. */
export async function getPosts(locale: Locale, limit?: number): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug, locale)));

  return posts
    .filter((post) => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
    .map(({ body, ...meta }) => meta);
}
