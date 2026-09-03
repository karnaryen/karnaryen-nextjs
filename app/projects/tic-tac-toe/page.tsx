import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { Caprasimo } from 'next/font/google';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { TicTacToeGame } from '@/components/projects/tic-tac-toe/tic-tac-toe-game';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Display font of the legacy game, used for the board and the game-over card. */
const caprasimo = Caprasimo({ subsets: ['latin'], weight: '400', variable: '--font-display' });

/**
 * A toy that is on its way out of the portfolio, so it gets no canonical URL
 * and no place in the sitemap — only a directive to keep it out of the index.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function TicTacToePage() {
  const t = useTranslations('ProjectsPage');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  return (
    <main className={cn('mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16', caprasimo.variable)}>
      <h1 className="mb-8 text-center text-3xl font-semibold text-foreground">
        {t('experiments.ticTacToe.caption')}
      </h1>
      {/* Remount on locale change so the default player names follow the language. */}
      <TicTacToeGame key={locale} />
      <div className="mt-12 text-center">
        <Link href="/projects" className={cn(buttonVariants({ variant: 'outline' }))}>
          <ArrowLeft data-icon="inline-start" className="size-4" />
          {tCommon('goBack')}
        </Link>
      </div>
    </main>
  );
}
