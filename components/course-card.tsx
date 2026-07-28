import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { Course } from '@/data/education';

interface CourseCardProps {
  course: Course;
  /** Position in the grid; drives the staggered reveal delay. */
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const t = useTranslations('EducationPage');
  const name = t(`courses.${course.id}.name`);

  const content = (
    <>
      <Image
        src={course.image}
        alt=""
        className="size-12 shrink-0 rounded-full bg-white object-contain p-1"
      />
      <span className="min-w-0">
        <span className="block text-xs font-medium text-muted-foreground">
          {course.year} · {t(`courses.${course.id}.org`)}
        </span>
        <span className="mt-1 block font-semibold text-foreground">
          {name}
          {course.href && (
            <ExternalLink
              aria-hidden
              className="ml-1.5 inline size-3.5 align-baseline text-muted-foreground"
            />
          )}
        </span>
      </span>
    </>
  );

  const className =
    'flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm dark:shadow-lg dark:shadow-black/25';

  if (!course.href) {
    return (
      <div style={{ '--reveal-index': index } as React.CSSProperties} className={className}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={course.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      style={{ '--reveal-index': index } as React.CSSProperties}
      className={`${className} transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-md`}
    >
      {content}
    </a>
  );
}
