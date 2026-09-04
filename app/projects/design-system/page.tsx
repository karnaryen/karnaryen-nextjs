import { ArrowLeft, Lock } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { CaseStudyList } from '@/components/projects/design-system/case-study-list';
import { CaseStudySection } from '@/components/projects/design-system/case-study-section';
import { TechStack } from '@/components/shared/tech-stack';
import { buttonVariants } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import designSystem from '@/public/projects/design-system.webp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('DesignSystemPage');
  return pageMetadata({
    path: '/projects/design-system',
    title: t('title'),
    description: t('metaDescription'),
  });
}

/**
 * Bullet ids per section, so each item's `title`/`text` pair is read from
 * messages with a typed key rather than a runtime-only array.
 */
const problemItems = ['structure', 'tokens', 'values', 'links'] as const;
const solutionItems = [
  'tokens',
  'plugin',
  'codeConnect',
  'library',
  'aiWorkflow',
  'testing',
] as const;
const impactItems = ['speed', 'errors', 'consistency', 'reuse', 'adoption'] as const;
const learnedItems = ['structure', 'investment', 'discipline', 'review'] as const;

const techIds = projects.find((entry) => entry.id === 'designSystem')?.tech ?? [];

export default function DesignSystemPage() {
  const t = useTranslations('DesignSystemPage');
  const tProjects = useTranslations('ProjectsPage');

  const paragraphs = (key: 'context.body' | 'role.body') => t(key).split('\n');
  const list = <T extends string>(prefix: string, ids: readonly T[]) =>
    ids.map((id) => ({
      title: t(`${prefix}.items.${id}.title` as Parameters<typeof t>[0]),
      text: t(`${prefix}.items.${id}.text` as Parameters<typeof t>[0]),
    }));

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Link href="/projects" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
        <ArrowLeft data-icon="inline-start" className="size-4" />
        {t('backToProjects')}
      </Link>

      <article className="mt-8">
        <header className="max-w-3xl">
          <p className="text-sm font-medium text-primary">
            {t('company')} · {t('jobTitle')}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">{t('title')}</h1>
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-4xl bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Lock className="size-3.5" />
            {tProjects('confidential')}
          </span>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Image
              src={designSystem}
              alt={t('imageAlt')}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="w-full rounded-2xl border border-border"
            />
            <p className="mt-2 ml-1 text-sm text-muted-foreground">{t('imageNote')}</p>
            <div className="mt-6 flex flex-wrap items-end gap-x-5 gap-y-2">
              <span className="font-medium text-foreground">{tProjects('techStackLabel')}</span>
              <TechStack ids={techIds} size="sm" />
            </div>
          </div>

          <div className="space-y-12">
            <CaseStudySection id="context" title={t('context.title')}>
              {paragraphs('context.body').map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </CaseStudySection>

            <CaseStudySection id="role" title={t('role.title')}>
              {paragraphs('role.body').map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
                {t('role.items')
                  .split('\n')
                  .map((line) => (
                    <li key={line}>{line}</li>
                  ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection id="problem" title={t('problem.title')}>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t('problem.body')}</p>
              <CaseStudyList items={list('problem', problemItems)} />
              <p className="mt-4 leading-relaxed text-muted-foreground">{t('problem.outro')}</p>
            </CaseStudySection>

            <CaseStudySection id="solution" title={t('solution.title')}>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t('solution.body')}</p>
              <CaseStudyList items={list('solution', solutionItems)} />
            </CaseStudySection>

            <CaseStudySection id="impact" title={t('impact.title')}>
              <CaseStudyList items={list('impact', impactItems)} />
            </CaseStudySection>

            <CaseStudySection id="learned" title={t('learned.title')}>
              <CaseStudyList items={list('learned', learnedItems)} />
            </CaseStudySection>
          </div>
        </div>
      </article>
    </main>
  );
}
