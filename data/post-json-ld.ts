import type { Locale } from '@/i18n/config';
import type { Post } from '@/lib/blog';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';

/**
 * `BlogPosting` for a single post, rendered as `application/ld+json` in
 * app/blog/[slug]/page.tsx. The author points at the `Person` node the
 * homepage declares, so the posts and the profile read as one entity.
 */
export function createPostJsonLd(post: Post, locale: Locale) {
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.title,
    description: post.description,
    inLanguage: locale,
    keywords: post.tags,
    ...(post.date && { datePublished: post.date, dateModified: post.date }),
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL },
  };
}
