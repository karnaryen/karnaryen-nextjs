import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { isExternal, type SelfStudyProject } from '@/data/self-study-projects';
import { cn } from '@/lib/utils';

interface SelfStudyProjectCardProps {
  project: SelfStudyProject;
  /** Position in the grid; drives the staggered reveal delay. */
  index?: number;
}

export function SelfStudyProjectCard({ project, index = 0 }: SelfStudyProjectCardProps) {
  const t = useTranslations('ProjectsPage');
  const external = isExternal(project);
  const caption = t(`selfStudy.${project.id}.caption`);

  const image = <Image src={project.image} alt={caption} className="size-28 rounded-xl object-contain" />;

  return (
    <article
      style={{ '--reveal-index': index }}
      className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-md dark:shadow-lg dark:shadow-black/25"
    >
      {external ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={caption}>
          {image}
        </a>
      ) : (
        <Link href={project.href} aria-label={caption}>
          {image}
        </Link>
      )}

      <h3 className="mt-4 font-semibold text-foreground">{caption}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t(`selfStudy.${project.id}.description`)}
      </p>
      <p className="mt-2 text-xs font-medium text-muted-foreground">{project.tech}</p>

      <div className="mt-4 flex grow items-end">
        {external ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            {t('open')}
            <ExternalLink data-icon="inline-end" className="size-4" />
          </a>
        ) : (
          <Link
            href={project.href}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            {t('open')}
            <ArrowRight data-icon="inline-end" className="size-4" />
          </Link>
        )}
      </div>
    </article>
  );
}
