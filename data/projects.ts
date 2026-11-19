import type { StaticImageData } from 'next/image';

import type { BrowserId } from '@/data/browsers';
import type { TechId } from '@/data/tech-stack';
import designSystem from '@/public/projects/design-system.webp';
import earlyMoves from '@/public/projects/early-moves.webp';
import mmcFlyer from '@/public/projects/mmc-flyer.webp';
import remikidsMobile from '@/public/projects/remikids/after-mobile-home.webp';
import remikids from '@/public/projects/remikids/remikids.webp';
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

/**
 * How the project links out. The link kind decides which `href` is allowed:
 * - `caseStudy` → a page under `/projects/` with the full write-up.
 * - `readMore` / `open` → an external site, opened in a new tab. `open` names
 *   the site's host in the button ("Open remikids.nl").
 */
export type ProjectLink =
  | { link: 'caseStudy'; href: `/projects/${string}` }
  | { link: 'readMore' | 'open'; href: `https://${string}` };

export type ProjectInfo = ProjectLink & {
  id: string;
  image: StaticImageData;
  /** Extra device images stacked on top of the main image. */
  overlays?: readonly ProjectOverlay[];
  /** Shows the translated ProjectsPage.demoNote line above the image. */
  demoNote?: boolean;
  confidential: boolean;
  /** Omit when the work was not built with a stack from data/tech-stack.ts. */
  tech?: readonly TechId[];
  /** Omit for work that is not tied to specific browser targets. */
  browsers?: readonly BrowserId[];
};

/**
 * Work projects shown on /projects, in display order. To add one: append an
 * entry here, add its texts to messages/en.json and messages/nl.json under
 * ProjectsPage.projects.<id>, and drop its screenshot(s) in public/projects/
 * (a subfolder per project is fine when it has several images).
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

/**
 * Personal projects that get the same full-width treatment as work projects
 * (image, write-up, link), shown above the personal project cards.
 * Texts live under ProjectsPage.projects.<id>, like the work projects.
 */
export const featuredPersonalProjects = [
  {
    id: 'remikids',
    image: remikids,
    overlays: [
      {
        image: remikidsMobile,
        framed: true,
        className: '-right-3 -bottom-3 max-h-[70%] sm:-right-5',
      },
    ],
    href: 'https://remikids.nl',
    link: 'open',
    confidential: false,
    tech: ['claudeCode', 'claudeDesign', 'hostnet', 'css'],
  },
] as const satisfies readonly ProjectInfo[];

export type ProjectId =
  (typeof projects)[number]['id'] | (typeof featuredPersonalProjects)[number]['id'];

export type Project = ProjectInfo & { id: ProjectId };
