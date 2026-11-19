import type { StaticImageData } from 'next/image';

/** Shape of a small project card (personal projects, early experiments). */
export interface ProjectCardInfo {
  id: string;
  image: StaticImageData;
  /** Internal route (starts with "/") or external URL (opens in a new tab). */
  href: string;
  /** Short language-neutral tech list, e.g. "Angular, Firebase". */
  tech: string;
}
