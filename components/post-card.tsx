import Link from 'next/link';
import { useFormatter } from 'next-intl';

import type { PostMeta } from '@/lib/blog';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: PostMeta;
  /** Position in the grid; drives the staggered reveal delay. */
  index?: number;
  className?: string;
}

/**
 * Text-only preview: date, title, opening idea, tags. There is no cover
 * image by design — the writing has to earn the click on its own.
 */
export function PostCard({ post, index = 0, className }: PostCardProps) {
  const format = useFormatter();

  return (
    <article
      style={{ '--reveal-index': index }}
      className={cn(
        'relative flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-md dark:shadow-lg dark:shadow-black/25',
        className,
      )}
    >
      {post.date && (
        <time dateTime={post.date} className="text-xs text-muted-foreground">
          {format.dateTime(new Date(post.date), 'long')}
        </time>
      )}
      <h3 className="mt-1.5 font-semibold text-foreground">
        {/* Stretched link keeps the whole card clickable with one tab stop. */}
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>
      {post.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
