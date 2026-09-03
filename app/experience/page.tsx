import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

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

export default function ExperiencePage() {
  const t = useTranslations('ExperiencePage');

  const entries: ExperienceTimelineEntry[] = experienceItems.map((item) => ({
    ...item,
    title: t(`timeline.${item.id}.title`),
    period: t(`timeline.${item.id}.period`),
    description: t(`timeline.${item.id}.description`).split('\n'),
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
