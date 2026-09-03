import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { PostCard } from '@/components/blog/post-card';
import { RevealGrid } from '@/components/shared/reveal-grid';
import { getPosts } from '@/lib/blog';

/**
 * Homepage teaser. Renders nothing when there are no posts yet, so the
 * section never shows up empty.
 */
export async function LatestPosts() {
  const posts = await getPosts(await getLocale(), 2);

  if (posts.length === 0) return null;

  const t = await getTranslations('BlogPage');

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{t('latestTitle')}</h2>
        <Link
          href="/blog"
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          {t('viewAll')}
        </Link>
      </div>
      <RevealGrid className="mt-8 grid gap-5 sm:grid-cols-2">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </RevealGrid>
    </>
  );
}
