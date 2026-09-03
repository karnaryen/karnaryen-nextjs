import { useTranslations } from 'next-intl';

import type { Contact } from '@/data/contacts';

interface ContactCardProps {
  contact: Contact;
  /** Position in the grid; drives the staggered reveal delay. */
  index?: number;
}

export function ContactCard({ contact, index = 0 }: ContactCardProps) {
  const t = useTranslations('ContactsPage');
  const external = !contact.href.startsWith('mailto:');
  const Icon = contact.icon;

  return (
    <a
      href={contact.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{ '--reveal-index': index }}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-md dark:shadow-lg dark:shadow-black/25"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold text-foreground">
          {t(`links.${contact.id}.label`)}
        </span>
        <span className="block truncate text-sm text-muted-foreground">{contact.value}</span>
      </span>
    </a>
  );
}
