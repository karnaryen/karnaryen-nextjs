import type { StaticImageData } from 'next/image';

import angularUdemy from '@/public/education/angular-udemy.webp';
import claudeCodeUdemy from '@/public/education/claude-code-udemy.webp';
import coursera from '@/public/education/coursera.webp';
import duo from '@/public/education/duo.webp';
import freeCodeCamp from '@/public/education/freecodecamp.webp';
import istqb from '@/public/education/istqb.webp';
import maiSvg from '@/public/education/mai.svg';
import reduxSagaUdemy from '@/public/education/redux-saga-udemy.webp';
import yandex from '@/public/education/yandex.webp';

// Next.js types .svg static imports as `any`, unlike bitmap formats.
const mai = maiSvg as StaticImageData;

/**
 * How to add a course/certificate:
 * 1. Drop the logo in `public/education/` and import it above.
 * 2. Append an entry to `courses` (newest first). `href` is optional —
 *    external URL or a file in `public/` (e.g. a PDF); omit it for entries
 *    without a certificate link.
 * 3. Add `org` and `name` under `EducationPage.courses.<id>` in
 *    `messages/en.json` and `messages/nl.json`.
 */
export interface CourseInfo {
  id: string;
  /** Language-neutral year (or range) shown on the card. */
  year: string;
  image: StaticImageData;
  href?: string;
}

export const mainEducation = {
  id: 'mai',
  years: '2006 — 2012',
  image: mai,
} as const;

export const courses = [
  {
    id: 'udemyReduxSaga',
    year: '2026',
    image: reduxSagaUdemy,
    href: 'https://www.udemy.com/certificate/UC-b0136fb9-b670-44b6-b44d-bb96580099b0/',
  },
  {
    id: 'udemyClaudeCode',
    year: '2026',
    image: claudeCodeUdemy,
    href: 'https://www.udemy.com/certificate/UC-976b46bd-e0dc-4ad5-9efd-3e25437854ba/',
  },
  {
    id: 'udemyAngular',
    year: '2025',
    image: angularUdemy,
    href: 'https://www.udemy.com/certificate/UC-daae9ae8-71aa-4c12-90cb-d195c81c7700/',
  },
  { id: 'duo', year: '2025', image: duo, href: '/inburgering-a2.pdf' },
  { id: 'yandex', year: '2019', image: yandex },
  {
    id: 'freeCodeCamp',
    year: '2019',
    image: freeCodeCamp,
    href: 'https://www.freecodecamp.org/fcc3ad6e5ae-7fed-4b67-ad44-2c42570b0bc3',
  },
  {
    id: 'mipt',
    year: '2018',
    image: coursera,
    href: 'https://www.coursera.org/account/accomplishments/specialization/certificate/PWMDB5J9ESS8',
  },
  { id: 'gasq', year: '2017', image: istqb, href: '/ISTQB_certificate.pdf' },
] as const satisfies readonly CourseInfo[];

export type CourseId = (typeof courses)[number]['id'];
export type Course = CourseInfo & { id: CourseId };
