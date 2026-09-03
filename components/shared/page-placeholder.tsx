import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PagePlaceholderProps {
  title: string;
  /** When set, shows a "Go back" button linking to this route. */
  backHref?: string;
}

export function PagePlaceholder({ title, backHref }: PagePlaceholderProps) {
  const t = useTranslations('Common');

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
      <p className="mt-4 text-muted-foreground">{t('comingSoon')}</p>
      {backHref && (
        <Link
          href={backHref}
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-8')}
        >
          <ArrowLeft data-icon="inline-start" className="size-4" />
          {t('goBack')}
        </Link>
      )}
    </main>
  );
}
