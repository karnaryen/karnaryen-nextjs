import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFormatter, getLocale, getTranslations } from 'next-intl/server';

import { MdxContent } from '@/components/mdx/mdx-content';
import { buttonVariants } from '@/components/ui/button';
import { getPost } from '@/lib/blog';
import { cn } from '@/lib/utils';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug, await getLocale());

  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug, await getLocale());

  if (!post) notFound();

  const t = await getTranslations('BlogPage');
  const format = await getFormatter();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <Link href="/blog" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
        <ArrowLeft data-icon="inline-start" className="size-4" />
        {t('backToBlog')}
      </Link>

      <article className="mt-8">
        <header>
          <h1 className="text-3xl font-semibold text-foreground">{post.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {post.date && (
              <time dateTime={post.date}>{format.dateTime(new Date(post.date), 'long')}</time>
            )}
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-8">
          <MdxContent source={post.body} />
        </div>
      </article>
    </main>
  );
}
