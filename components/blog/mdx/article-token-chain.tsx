/**
 * The three design-token layers, as a left-to-right chain.
 *
 * This is article content, not a shared UI piece: it illustrates one specific
 * point in one post. Article visuals like this belong here, next to the MDX
 * renderer that registers them — not in the general component set.
 *
 * Props are plain strings on purpose: next-mdx-remote strips JavaScript
 * expressions from MDX by default (`blockJS`), so object/array props would
 * arrive empty. Each locale passes its own notes from its `.mdx` file, which
 * keeps this component translation-free.
 */
interface ArticleTokenChainProps {
  primitive: string;
  theme: string;
  semantic: string;
}

export function ArticleTokenChain({ primitive, theme, semantic }: ArticleTokenChainProps) {
  const layers = [
    { name: 'primitive', note: primitive },
    { name: 'theme', note: theme },
    { name: 'semantic', note: semantic },
  ];

  return (
    <ol className="my-6 flex flex-wrap items-stretch gap-2 p-0">
      {layers.map((layer, index) => (
        <li key={layer.name} className="flex list-none items-stretch gap-2">
          {index > 0 && (
            <span aria-hidden className="self-center text-muted-foreground/60">
              &rarr;
            </span>
          )}
          <span className="flex flex-col rounded-xl border border-border bg-card px-3 py-2">
            <span className="font-mono text-xs text-foreground">{layer.name}</span>
            <span className="text-xs text-muted-foreground">{layer.note}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
