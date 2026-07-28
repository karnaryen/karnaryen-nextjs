import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { Caprasimo } from 'next/font/google';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { TicTacToeGame } from '@/components/tic-tac-toe/tic-tac-toe-game';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Display font of the legacy game, used for the board and the game-over card. */
const caprasimo = Caprasimo({ subsets: ['latin'], weight: '400', variable: '--font-display' });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ProjectsPage');
  return { title: t('selfStudy.ticTacToe.caption') };
}

export default function TicTacToePage() {
  const t = useTranslations('ProjectsPage');
  const tCommon = useTranslations('Common');
  const locale = useLocale();

  return (
    <main className={cn('mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16', caprasimo.variable)}>
      <h1 className="mb-8 text-center text-3xl font-semibold text-foreground">
        {t('selfStudy.ticTacToe.caption')}
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
