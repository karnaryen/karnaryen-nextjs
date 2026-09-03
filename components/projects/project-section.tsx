import { ArrowRight, ExternalLink, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { TechStack } from '@/components/shared/tech-stack';
import { buttonVariants } from '@/components/ui/button';
import { browsers } from '@/data/browsers';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectSectionProps {
  project: Project;
  imageLeft: boolean;
}

export function ProjectSection({ project, imageLeft }: ProjectSectionProps) {
  const t = useTranslations('ProjectsPage');
  const { id } = project;

  return (
    <section className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
      <div className={cn(!imageLeft && 'lg:order-last')}>
        {project.demoNote && (
          <p className="mb-2 ml-1 text-sm text-muted-foreground">{t('demoNote')}</p>
        )}
        <div className="relative">
          <Image
            src={project.image}
            alt={t(`projects.${id}.imageAlt`)}
            sizes="(min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw"
            className="w-full rounded-2xl border border-border"
          />
          {project.overlays?.map((overlay, index) => (
            <Image
              key={index}
              src={overlay.image}
              alt=""
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={cn(
                'absolute h-auto max-h-[50%] w-auto',
                overlay.framed && 'rounded-xl border-4 border-border shadow-xl',
                overlay.className,
              )}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold text-foreground">{t(`projects.${id}.title`)}</h2>
          {project.confidential && (
            <span className="inline-flex items-center gap-1.5 rounded-4xl bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              <Lock className="size-3.5" />
              {t('confidential')}
            </span>
          )}
          {project.link === 'caseStudy' && (
            <Link
              href={project.href}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              {t('readCaseStudy')}
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Link>
          )}
          {project.link === 'open' && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              {t('open')}
              <ExternalLink data-icon="inline-end" className="size-4" />
            </a>
          )}
        </div>

        <p className="leading-relaxed text-muted-foreground">
          {t(`projects.${id}.summary`)}{' '}
          {project.link === 'readMore' && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium whitespace-nowrap text-primary underline-offset-4 hover:underline"
            >
              {t('readMore')}
            </a>
          )}
        </p>

        <p className="leading-relaxed text-muted-foreground">{t(`projects.${id}.contribution`)}</p>

        <div className="flex flex-col gap-4 pt-2">
          <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
            <span className="font-medium text-foreground">{t('techStackLabel')}</span>
            <TechStack ids={project.tech} size="sm" />
          </div>
          {project.browsers && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="font-medium text-foreground">{t('browsersLabel')}</span>
              <ul className="flex items-center gap-4">
                {project.browsers.map((browserId) => (
                  <li key={browserId}>
                    <Image
                      src={browsers[browserId].icon}
                      alt={browsers[browserId].name}
                      width={40}
                      height={40}
                      className="size-9 sm:size-10"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
