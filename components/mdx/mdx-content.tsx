import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { ComponentPropsWithoutRef } from 'react';

import { ArticleTokenChain } from './article-token-chain';

/**
 * Element map for MDX bodies. Article markup is styled here rather than with a
 * prose plugin, so headings and links match the rest of the design system.
 *
 * Components listed here can be used directly inside `.mdx` files.
 */
const components = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="mt-10 text-xl font-semibold text-foreground" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="mt-8 font-semibold text-foreground" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mt-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a className="text-primary underline underline-offset-4 hover:no-underline" {...props} />
  ),
  /**
   * Markdown images become optimised images. Width/height are intrinsic
   * guesses; `h-auto` keeps the real aspect ratio.
   */
  img: ({ src, alt }: ComponentPropsWithoutRef<'img'>) =>
    typeof src === 'string' ? (
      <Image
        src={src}
        alt={alt ?? ''}
        width={1600}
        height={900}
        className="mt-6 h-auto w-full rounded-2xl border border-border"
      />
    ) : null,
  ArticleTokenChain,
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
