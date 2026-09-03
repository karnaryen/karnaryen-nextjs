import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { MemojiGame } from '@/components/projects/memoji/memoji-game';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * A toy that is on its way out of the portfolio, so it gets no canonical URL
 * and no place in the sitemap — only a directive to keep it out of the index.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function MemojiPage() {
  const t = useTranslations('ProjectsPage');
  const tCommon = useTranslations('Common');

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-center text-3xl font-semibold text-foreground">
        {t('experiments.memoji.caption')}
      </h1>
      <MemojiGame />
      <div className="mt-12 text-center">
        <Link href="/projects" className={cn(buttonVariants({ variant: 'outline' }))}>
          <ArrowLeft data-icon="inline-start" className="size-4" />
          {tCommon('goBack')}
        </Link>
      </div>
    </main>
  );
}
