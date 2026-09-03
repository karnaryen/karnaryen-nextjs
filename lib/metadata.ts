import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/config';
import { OG_IMAGE, SITE_NAME } from '@/lib/site';

/** Open Graph wants a territory-qualified locale, not the bare language tag. */
export const OG_LOCALES: Record<Locale, string> = { en: 'en_US', nl: 'nl_NL' };

interface PageMetadataOptions {
  /** Route path, used for both the canonical link and the Open Graph URL. */
  path: string;
  title: string;
  description: string;
  /**
   * Set when `title` already reads as a complete page title and must not get
   * the `— Natalia Karaseva` suffix from the root template.
   */
  absoluteTitle?: boolean;
  /** Present on blog posts; turns the Open Graph card into an `article`. */
  article?: { publishedTime?: string; tags?: readonly string[] };
}

/**
 * The metadata every route needs and none should have to repeat: a canonical
 * URL, and a complete Open Graph card. "Complete" is the point — Next does not
 * merge a child's `openGraph` into its parent's, so anything left out here
 * (the image, the site name, the locale) is simply absent from the page.
 *
 * Twitter card fields are filled in from Open Graph by Next, so the only
 * Twitter setting lives in the root layout.
 */
export async function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
  article,
}: PageMetadataOptions): Promise<Metadata> {
  const locale = await getLocale();
  const heading = absoluteTitle ? { absolute: title } : title;

  const openGraph = {
    url: path,
    siteName: SITE_NAME,
    locale: OG_LOCALES[locale],
    title: heading,
    description,
    images: [OG_IMAGE],
  };

  return {
    title: heading,
    description,
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...openGraph,
          type: 'article',
          publishedTime: article.publishedTime,
          authors: [SITE_NAME],
          tags: article.tags ? [...article.tags] : undefined,
        }
      : { ...openGraph, type: 'website' },
  };
}
