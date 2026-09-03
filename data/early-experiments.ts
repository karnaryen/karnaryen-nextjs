import type { StaticImageData } from 'next/image';

import memoji from '@/public/projects/self-study/memoji.webp';
import multiLanguage from '@/public/projects/self-study/multi-language.webp';
import onlineStore from '@/public/projects/self-study/online-store.webp';
import parallaxTailwind from '@/public/projects/self-study/parallax-tailwind.webp';
import techBlogVue from '@/public/projects/self-study/tech-blog-vue.webp';
import ticTacToe from '@/public/projects/self-study/tic-tac-toe.webp';

export interface EarlyExperimentInfo {
  id: string;
  image: StaticImageData;
  /** Internal route (starts with "/") or external URL (opens in a new tab). */
  href: string;
  /** Short language-neutral tech list, e.g. "Angular, Firebase". */
  tech: string;
}

/**
 * Early experiments shown on /projects, in display order. To add one:
 * append an entry here, add its caption + description to messages/en.json
 * and messages/nl.json under ProjectsPage.earlyExperiments.<id>, and drop a
 * square thumbnail in public/projects/self-study/. Internal hrefs need a
 * page under app/projects/.
 */
export const earlyExperiments = [
  {
    id: 'techBlogVue',
    image: techBlogVue,
    href: 'https://tech-blog-vue.netlify.app/',
    tech: 'Vue.js',
  },
  {
    id: 'ticTacToe',
    image: ticTacToe,
    href: '/projects/tic-tac-toe',
    tech: 'React',
  },
  {
    id: 'onlineStore',
    image: onlineStore,
    href: 'https://cacao-bu.netlify.app/',
    tech: 'React',
  },
  {
    id: 'multiLanguage',
    image: multiLanguage,
    href: 'https://pianoles.netlify.app/',
    tech: 'React, i18next',
  },
  {
    id: 'parallaxTailwind',
    image: parallaxTailwind,
    href: 'https://play.tailwindcss.com/cdMTD7LkOb?layout=preview',
    tech: 'Tailwind CSS',
  },
  {
    id: 'memoji',
    image: memoji,
    href: '/projects/memoji',
    tech: 'React',
  },
] as const satisfies readonly EarlyExperimentInfo[];

export type EarlyExperimentId = (typeof earlyExperiments)[number]['id'];

export type EarlyExperiment = EarlyExperimentInfo & { id: EarlyExperimentId };

export function isExternal(project: EarlyExperimentInfo): boolean {
  return !project.href.startsWith('/');
}
