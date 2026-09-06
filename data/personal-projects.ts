import type { StaticImageData } from 'next/image';

import dutchipedia from '@/public/projects/self-study/dutchipedia.webp';
import schoolLibrary from '@/public/projects/self-study/school-library.webp';

export interface PersonalProjectInfo {
  id: string;
  image: StaticImageData;
  /** Internal route (starts with "/") or external URL (opens in a new tab). */
  href: string;
  /** Short language-neutral tech list, e.g. "Angular, Firebase". */
  tech: string;
}

/**
 * Personal projects shown on /projects, in display order. To add one:
 * append an entry here, add its caption + description to messages/en.json
 * and messages/nl.json under ProjectsPage.personal.<id>, and drop a square
 * thumbnail in public/projects/self-study/. Internal hrefs need a page under
 * app/projects/.
 */
export const personalProjects = [
  {
    id: 'dutchipedia',
    image: dutchipedia,
    href: 'https://dutchipedia.nl',
    tech: 'Next.js, shadcn/ui',
  },
  {
    id: 'schoolLibrary',
    image: schoolLibrary,
    href: 'https://biebouders.nl/',
    tech: 'Angular, Firebase',
  },
] as const satisfies readonly PersonalProjectInfo[];

export type PersonalProjectId = (typeof personalProjects)[number]['id'];

export type PersonalProject = PersonalProjectInfo & { id: PersonalProjectId };

export function isExternal(project: PersonalProjectInfo): boolean {
  return !project.href.startsWith('/');
}
