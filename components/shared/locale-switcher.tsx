'use client';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import type { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === 'en' ? 'nl' : 'en';

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      aria-label={t('switchTo', { language: t(nextLocale) })}
      onClick={() => startTransition(() => setUserLocale(nextLocale))}
    >
      <Languages className="size-4" />
      <span className="text-xs font-semibold uppercase">{locale}</span>
    </Button>
  );
}
