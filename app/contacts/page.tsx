import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ContactCard } from '@/components/contact-card';
import { RevealGrid } from '@/components/reveal-grid';
import { contacts } from '@/data/contacts';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ContactsPage');
  return pageMetadata({
    path: '/contacts',
    title: t('title'),
    description: t('metaDescription'),
  });
}

export default function ContactsPage() {
  const t = useTranslations('ContactsPage');

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-semibold text-foreground">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-muted-foreground">{t('intro')}</p>
      <RevealGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => (
          <ContactCard key={contact.id} contact={contact} index={index} />
        ))}
      </RevealGrid>
    </main>
  );
}
