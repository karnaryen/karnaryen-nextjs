import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="mt-auto border-t border-border py-6">
      <p className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
        {t('copyright')}
      </p>
    </footer>
  );
}
