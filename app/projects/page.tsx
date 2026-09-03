import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { ProjectCard } from '@/components/projects/project-card';
import { ProjectSection } from '@/components/projects/project-section';
import { RevealGrid } from '@/components/shared/reveal-grid';
import { earlyExperiments } from '@/data/early-experiments';
import { personalProjects } from '@/data/personal-projects';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ProjectsPage');
  return pageMetadata({
    path: '/projects',
    title: t('title'),
    description: t('metaDescription'),
  });
}

export default function ProjectsPage() {
  const t = useTranslations('ProjectsPage');

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-semibold text-foreground">{t('title')}</h1>

      <h2 className="mt-10 text-2xl font-semibold text-foreground lg:mt-14">
        {t('workProjects')}
      </h2>
      <div className="mt-8 flex flex-col gap-16 lg:gap-24">
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} imageLeft={index % 2 === 0} />
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-semibold text-foreground lg:mt-24">
        {t('personalProjects')}
      </h2>
      <RevealGrid className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {personalProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} translationNamespace="personal" index={index} />
        ))}
      </RevealGrid>

      <h2 className="mt-16 text-2xl font-semibold text-foreground lg:mt-24">
        {t('earlyExperiments')}
      </h2>
      <RevealGrid className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {earlyExperiments.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            translationNamespace="experiments"
            index={index}
          />
        ))}
      </RevealGrid>
    </main>
  );
}
