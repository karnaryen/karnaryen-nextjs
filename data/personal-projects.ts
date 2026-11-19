import type { ProjectCardInfo } from '@/data/project-card-info';
import dutchipedia from '@/public/projects/self-study/dutchipedia.webp';
import schoolLibrary from '@/public/projects/self-study/school-library.webp';

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
] as const satisfies readonly ProjectCardInfo[];

export type PersonalProjectId = (typeof personalProjects)[number]['id'];

export type PersonalProject = ProjectCardInfo & { id: PersonalProjectId };
