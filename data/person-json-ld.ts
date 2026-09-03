import { contactsById } from '@/data/contacts';

/**
 * Person schema for the homepage, so search engines tie the role and the
 * location together. Rendered as a `application/ld+json` script in app/page.tsx.
 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Natalia Karaseva',
  jobTitle: 'Frontend Developer',
  url: 'https://karnaryen.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Enschede',
    addressCountry: 'NL',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'Angular',
    'TypeScript',
    'Design systems',
    'Web accessibility',
    'Frontend development',
  ],
  sameAs: [contactsById.linkedin.href, contactsById.github.href],
};
