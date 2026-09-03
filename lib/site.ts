/**
 * Canonical origin of the deployed site. Everything that needs an absolute
 * URL — `metadataBase`, the sitemap, robots.txt, JSON-LD — reads it from
 * here, so a domain change is a one-line edit.
 */
export const SITE_URL = 'https://karnaryen.com';

/** Site name as it appears in Open Graph and in the title template. */
export const SITE_NAME = 'Natalia Karaseva';

/** Absolute URL for `path`, which is expected to start with a slash. */
export function absoluteUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * The shared social card, drawn by `app/opengraph-image.tsx` — which reads
 * its own `alt` and `size` exports from here, so the file and the meta tags
 * cannot describe different images.
 *
 * Every page repeats it through `pageMetadata` rather than inheriting it:
 * Next replaces a parent segment's `openGraph` object wholesale as soon as a
 * child defines one, so an unset image is a missing image, not a inherited one.
 */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Natalia Karaseva — Frontend Developer in Enschede, the Netherlands',
} as const;
