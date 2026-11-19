'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface ProjectsTocProps {
  label: string;
  items: { id: string; title: string }[];
}

/** "On this page" nav for the projects page. Highlights the section in view. */
export function ProjectsToc({ label, items }: ProjectsTocProps) {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // Active = last heading that has scrolled above the upper third of the viewport.
    const update = () => {
      const threshold = window.innerHeight / 3;
      let current: string | undefined = headings[0]?.id;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= threshold) current = heading.id;
      }
      // At the very bottom, the last section may never reach the threshold.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = headings.at(-1)?.id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <ul className="space-y-1 border-l border-border">
        {items.map(({ id, title }) => {
          const active = id === activeId;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active ? 'location' : undefined}
                className={cn(
                  '-ml-px block border-l-2 py-1 pl-4 text-sm transition-colors outline-none focus-visible:text-foreground focus-visible:underline',
                  active
                    ? 'border-primary font-medium text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
