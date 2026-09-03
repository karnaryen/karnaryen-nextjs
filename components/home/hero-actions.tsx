import { Download } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { contactsById } from '@/data/contacts';
import { cn } from '@/lib/utils';

const CV_PATH = '/Natalia_Karaseva_Frontend_Developer.pdf';

const { github, linkedin } = contactsById;

/**
 * Primary calls to action of the homepage hero: case studies, CV download, and
 * the two profiles recruiters look for. Labels come from `AboutPage`.
 */
export function HeroActions({ className }: { className?: string }) {
  const t = useTranslations('AboutPage');

  return (
    <div className={cn('flex flex-wrap justify-center gap-3 lg:justify-start', className)}>
      <Link href="/projects" className={cn(buttonVariants({ size: 'lg' }))}>
        {t('ctaCaseStudies')}
      </Link>
      <a href={CV_PATH} download className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
        <Download data-icon="inline-start" className="size-4" />
        {t('ctaCv')}
      </a>
      <a
        href={linkedin.href}
        target="_blank"
        rel="noreferrer"
        className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
      >
        <linkedin.icon data-icon="inline-start" className="size-4" />
        LinkedIn
      </a>
      <a
        href={github.href}
        target="_blank"
        rel="noreferrer"
        className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }))}
      >
        <github.icon data-icon="inline-start" className="size-4" />
        GitHub
      </a>
    </div>
  );
}
