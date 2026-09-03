import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { PostCard } from '@/components/blog/post-card';
import { RevealGrid } from '@/components/shared/reveal-grid';
import { getPosts } from '@/lib/blog';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('BlogPage');
  return pageMetadata({ path: '/blog', title: t('title'), description: t('intro') });
}

export default async function BlogPage() {
  const t = await getTranslations('BlogPage');
  const posts = await getPosts(await getLocale());

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-semibold text-foreground">{t('title')}</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{t('intro')}</p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted-foreground">{t('empty')}</p>
      ) : (
        <RevealGrid className="mt-10 grid gap-5 sm:grid-cols-2">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </RevealGrid>
      )}
    </main>
  );
}
