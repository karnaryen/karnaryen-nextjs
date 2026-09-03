import type { Metadata } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import {
  ExperienceTimeline,
  type ExperienceTimelineEntry,
} from '@/components/experience/experience-timeline';
import { experienceItems } from '@/data/experience';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ExperiencePage');
  return pageMetadata({
    path: '/experience',
    title: t('title'),
    description: t('metaDescription'),
  });
}

/**
 * Bullets may wrap a phrase in `<experiments>…</experiments>` to link to the
 * early experiments on the projects page.
 */
function renderBullet(line: string): ReactNode {
  const [before, label, after] = line.split(/<\/?experiments>/);
  if (label === undefined) return line;

  return (
    <>
      {before}
      <Link
        href="/projects#early-experiments"
        className="font-medium text-primary underline-offset-4 hover:underline"
      >
        {label}
      </Link>
      {after}
    </>
  );
}

export default function ExperiencePage() {
  const t = useTranslations('ExperiencePage');

  const entries: ExperienceTimelineEntry[] = experienceItems.map((item) => ({
    ...item,
    title: t(`timeline.${item.id}.title`),
    period: t(`timeline.${item.id}.period`),
    description: (t.raw(`timeline.${item.id}.description`) as string)
      .split('\n')
      .map(renderBullet),
  }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-semibold text-foreground">{t('title')}</h1>
      <div className="mt-10">
        <ExperienceTimeline entries={entries} />
      </div>
    </main>
  );
}
