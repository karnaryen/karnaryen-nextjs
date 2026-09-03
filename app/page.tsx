import type { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { HeroActions } from '@/components/hero-actions';
import { LatestPosts } from '@/components/latest-posts';
import { RevealGrid } from '@/components/reveal-grid';
import { TechStack } from '@/components/tech-stack';
import { personJsonLd } from '@/data/person-json-ld';
import mePhoto from '@/public/me.webp';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('AboutPage');
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default function Home() {
  const t = useTranslations('AboutPage');

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <section className="flex flex-col items-center gap-8 lg:flex-row lg:gap-14">
        <Image
          src={mePhoto}
          alt={t('photoAlt')}
          priority
          placeholder="blur"
          sizes="(min-width: 640px) 16rem, 13rem"
          className="size-52 shrink-0 rounded-full object-cover sm:size-64"
        />
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="text-3xl font-semibold text-balance text-foreground sm:text-4xl">
            {t('role')}
          </h1>
          <p className="mt-3 text-base font-medium text-balance text-foreground/80">
            {t('heroMeta')}
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-pretty text-muted-foreground">
            {t('heroSummary')}
          </p>
          <HeroActions className="mt-7" />
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <RevealGrid className="max-w-[54rem] space-y-4">
          <h2 style={{ '--reveal-index': 0 }} className="text-2xl font-semibold text-foreground">
            {t('title')}
          </h2>
          <p style={{ '--reveal-index': 1 }} className="leading-relaxed text-muted-foreground">
            {t('intro1')}
          </p>
          <p style={{ '--reveal-index': 2 }} className="leading-relaxed text-muted-foreground">
            {t('intro2')}
          </p>
        </RevealGrid>
      </section>

      <section className="mt-14 lg:mt-20">
        <RevealGrid>
          <h2 className="text-center text-2xl font-semibold text-foreground">
            {t('techStackTitle')}
          </h2>
          <TechStack className="mt-8" />
        </RevealGrid>
      </section>

      <section className="mt-14 lg:mt-20">
        <LatestPosts />
      </section>
    </main>
  );
}
