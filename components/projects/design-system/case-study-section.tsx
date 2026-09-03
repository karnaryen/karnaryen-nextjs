import type { ReactNode } from 'react';

interface CaseStudySectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function CaseStudySection({ id, title, children }: CaseStudySectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {children}
    </section>
  );
}
