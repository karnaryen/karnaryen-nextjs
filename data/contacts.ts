import { Mail } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

import { GithubIcon, LinkedinIcon } from '@/components/brand-icons';

/**
 * How to add a contact: append an entry below (icon from lucide-react or
 * `components/brand-icons.tsx`) and add its label under
 * `ContactsPage.links.<id>` in `messages/en.json` and `messages/nl.json`.
 */
export interface ContactInfo {
  id: string;
  /** Language-neutral handle or address shown on the card. */
  value: string;
  /** External URL or `mailto:` address. */
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const contacts = [
  { id: 'github', value: 'karnaryen', href: 'https://github.com/karnaryen', icon: GithubIcon },
  {
    id: 'email',
    value: 'natalia.kutina13@gmail.com',
    href: 'mailto:natalia.kutina13@gmail.com',
    icon: Mail,
  },
  {
    id: 'linkedin',
    value: 'karnaryen',
    href: 'https://www.linkedin.com/in/karnaryen/',
    icon: LinkedinIcon,
  },
] as const satisfies readonly ContactInfo[];

export type ContactId = (typeof contacts)[number]['id'];
export type Contact = ContactInfo & { id: ContactId };
