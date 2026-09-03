import type { StaticImageData } from 'next/image';

import type { BrowserId } from '@/data/browsers';
import type { TechId } from '@/data/tech-stack';
import designSystem from '@/public/projects/design-system.webp';
import earlyMoves from '@/public/projects/early-moves.webp';
import mmcFlyer from '@/public/projects/mmc-flyer.webp';
import s2sPlatform from '@/public/projects/s2s-platform.webp';
import s2sPlatformFamily from '@/public/projects/s2s-platform-family.webp';
import s2sPlatformOverview from '@/public/projects/s2s-platform-overview-dark.webp';

export interface ProjectOverlay {
  image: StaticImageData;
  /** Adds a border + shadow frame (e.g. to make a plain screenshot read as a tablet). */
  framed?: boolean;
  /** Position of the overlay within the main image, as Tailwind classes. */
  className?: string;
}

export interface ProjectInfo {
  id: string;
  image: StaticImageData;
  /** Extra device images stacked on top of the main image. */
  overlays?: readonly ProjectOverlay[];
  /** Shows the translated ProjectsPage.demoNote line above the image. */
  demoNote?: boolean;
  href: string;
  /**
   * `readMore` and `open` point at an external site; `caseStudy` links to a
   * page under `/projects/` with the full write-up.
   */
  link: 'readMore' | 'open' | 'caseStudy';
  confidential: boolean;
  tech: readonly TechId[];
  /** Omit for work that is not tied to specific browser targets. */
  browsers?: readonly BrowserId[];
}

/**
 * Projects shown on /projects, in display order. To add one: append an entry
 * here, add its texts to messages/en.json and messages/nl.json under
 * ProjectsPage.projects.<id>, and drop its screenshot in public/projects/.
 */
export const projects = [
  {
    id: 'designSystem',
    image: designSystem,
    href: '/projects/design-system',
    link: 'caseStudy',
    confidential: true,
    tech: ['react', 'nextjs', 'figma', 'storybook', 'claudeCode'],
  },
  {
    id: 'earlyMoves',
    image: earlyMoves,
    href: 'https://zorginnovatie.nl/innovaties/neolook-early-moves',
    link: 'readMore',
    confidential: true,
    tech: ['angular', 'tailwind'],
    browsers: ['chrome', 'edge', 'safari', 'firefox'],
  },
  {
    id: 'mmcFlyer',
    image: mmcFlyer,
    href: 'https://mmc.neolook.care/',
    link: 'open',
    confidential: false,
    tech: ['angular', 'tailwind'],
    browsers: ['chrome', 'edge', 'safari', 'firefox'],
  },
  {
    id: 's2sPlatform',
    image: s2sPlatform,
    overlays: [
      { image: s2sPlatformOverview, framed: true, className: 'bottom-5 right-5' },
      { image: s2sPlatformFamily, className: '-right-3 -bottom-3' },
    ],
    demoNote: true,
    href: 'https://www.neolooksolutions.com/products',
    link: 'readMore',
    confidential: true,
    tech: ['angular', 'tailwind'],
    browsers: ['chrome', 'edge', 'safari'],
  },
] as const satisfies readonly ProjectInfo[];

export type ProjectId = (typeof projects)[number]['id'];

export type Project = ProjectInfo & { id: ProjectId };
