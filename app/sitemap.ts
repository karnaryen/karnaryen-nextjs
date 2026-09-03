import type { MetadataRoute } from 'next';

import { defaultLocale } from '@/i18n/config';
import { getPosts } from '@/lib/blog';
import { absoluteUrl } from '@/lib/site';

/**
 * Every route that is not generated from content. Add a page here when you
 * add it under `app/`; `priority` is the relative weight within this site,
 * which is all crawlers read it as.
 */
const STATIC_ROUTES = [
  { path: '/', priority: 1 },
  { path: '/projects', priority: 0.9 },
  { path: '/experience', priority: 0.8 },
  { path: '/blog', priority: 0.8 },
  { path: '/education', priority: 0.6 },
  { path: '/contacts', priority: 0.6 },
] as const;

/**
 * Only the posts published in `defaultLocale`. A crawler arrives without the
 * locale cookie and is therefore always served that language, so a post that
 * exists in Dutch alone has no URL a crawler could fetch — listing it would
 * point Google at a 404. Undated posts get no `lastModified` rather than a
 * made-up one.
 */
async function postEntries(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(defaultLocale);

  return posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date || undefined,
    priority: 0.7,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({ url: absoluteUrl(path), priority })),
    ...(await postEntries()),
  ];
}
