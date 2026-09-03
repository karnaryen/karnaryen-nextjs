'use client';

import { type ReactNode,useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface RevealGridProps {
  className?: string;
  children: ReactNode;
}

/**
 * Staggers its direct children in with a fade/rise animation the first time
 * the grid scrolls into view. Children set `--reveal-index` to control their
 * delay; styles live in globals.css under `.reveal-grid`. Without JavaScript
 * the children simply render visible.
 */
export function RevealGrid({ className, children }: RevealGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-armed={armed || undefined}
      data-revealed={revealed || undefined}
      className={cn('reveal-grid', className)}
    >
      {children}
    </div>
  );
}
