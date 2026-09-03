interface CaseStudyItem {
  title: string;
  text: string;
}

interface CaseStudyListProps {
  /** Bullets that open with a short bold lead, followed by one or two sentences. */
  items: readonly CaseStudyItem[];
}

export function CaseStudyList({ items }: CaseStudyListProps) {
  return (
    <ul className="mt-4 space-y-3 text-muted-foreground">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>
            <strong className="font-semibold text-foreground">{item.title}</strong> {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
