import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { RevealGrid } from '@/components/reveal-grid';
import { TechStack } from '@/components/tech-stack';
import { buttonVariants } from '@/components/ui/button';
import mePhoto from '@/public/me.webp';

export default function Home() {
  const t = useTranslations('AboutPage');

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <section className="flex flex-col items-center gap-8 lg:flex-row lg:gap-14">
        <div className="flex shrink-0 flex-col items-center gap-4">
          <Image
            src={mePhoto}
            alt={t('photoAlt')}
            priority
            placeholder="blur"
            sizes="(min-width: 640px) 16rem, 13rem"
            className="size-52 rounded-full object-cover sm:size-64"
          />
          <h1 className="text-2xl font-semibold text-foreground">{t('role')}</h1>
        </div>
        <div className="space-y-4 leading-relaxed text-muted-foreground">
          <p>{t('intro1')}</p>
          <p>{t('intro2')}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/projects" className={buttonVariants({ size: 'lg' })}>
              {t('ctaProjects')}
            </Link>
            <Link href="/contacts" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              {t('ctaContact')}
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <RevealGrid>
          <h2 className="text-center text-2xl font-semibold text-foreground">
            {t('techStackTitle')}
          </h2>
          <TechStack className="mt-8" />
        </RevealGrid>
      </section>
    </main>
  );
}
