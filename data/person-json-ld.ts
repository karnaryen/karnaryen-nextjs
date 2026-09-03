import { contactsById } from '@/data/contacts';
import { defaultLocale } from '@/i18n/config';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';

const ENSCHEDE = {
  '@type': 'Place',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Enschede',
    addressRegion: 'Overijssel',
    addressCountry: 'NL',
  },
} as const;

const SKILLS = [
  'React',
  'Next.js',
  'Angular',
  'TypeScript',
  'Design systems',
  'Web accessibility',
  'Frontend development',
];

/** Languages Natalia speaks. Edit freely — this list drives nothing but the graph. */
const SPOKEN_LANGUAGES = ['English', 'Dutch'];

/**
 * Structured data for the homepage, rendered as `application/ld+json` in
 * app/page.tsx. Two nodes in one graph: the person, so search engines tie the
 * role and the city together, and the website itself, so the domain resolves
 * to a named entity rather than a bare host.
 *
 * `description` is passed in so the graph reads in the language the visitor
 * is served, matching the page's own meta description.
 */
export function createHomeJsonLd({ description }: { description: string }) {
  const personId = `${SITE_URL}/#person`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE_NAME,
        jobTitle: 'Frontend Developer',
        description,
        url: SITE_URL,
        image: absoluteUrl('/me.webp'),
        email: contactsById.email.value,
        address: ENSCHEDE.address,
        homeLocation: ENSCHEDE,
        workLocation: ENSCHEDE,
        // The occupation node is what carries the role-plus-city pairing that
        // a search like "frontend developer enschede" is asking for.
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Frontend Developer',
          occupationLocation: {
            '@type': 'City',
            name: 'Enschede',
            address: ENSCHEDE.address,
          },
          skills: SKILLS.join(', '),
        },
        knowsAbout: SKILLS,
        // A claim about Natalia, not about the site's translations — worth
        // stating separately now that the two no longer coincide.
        knowsLanguage: SPOKEN_LANGUAGES.map((name) => ({ '@type': 'Language', name })),
        sameAs: [contactsById.linkedin.href, contactsById.github.href],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        // The site is indexed in one language: the Dutch translation lives
        // behind a cookie on the same URLs, so it is not a version a crawler
        // can reach or should be told about.
        inLanguage: defaultLocale,
        author: { '@id': personId },
        publisher: { '@id': personId },
      },
    ],
  };
}
