'use client';

import 'react-vertical-timeline-component/style.min.css';

import Image, { type StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

export interface ExperienceTimelineEntry {
  id: string;
  title: string;
  company?: string;
  period: string;
  /** One bullet point per array item. */
  description: ReactNode[];
  icon: StaticImageData;
}

interface ExperienceTimelineProps {
  entries: ExperienceTimelineEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <VerticalTimeline lineColor="var(--border)">
      {entries.map((entry) => (
        <VerticalTimelineElement
          key={entry.id}
          date={entry.period}
          dateClassName="text-sm font-medium text-muted-foreground"
          icon={
            <Image
              src={entry.icon}
              alt=""
              fill
              sizes="60px"
              className="rounded-full bg-white object-contain p-1.5"
            />
          }
          iconStyle={{
            background: '#fff',
            boxShadow: '0 0 0 2px var(--primary), 0 3px 8px rgb(0 0 0 / 0.15)',
          }}
          contentStyle={{
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: '0 1px 2px rgb(0 0 0 / 0.08)',
          }}
          contentArrowStyle={{ borderRight: '7px solid var(--border)' }}
        >
          <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
          {entry.company && (
            <h4 className="mt-1 text-sm font-medium text-primary">{entry.company}</h4>
          )}
          <ul className="mt-3 list-disc space-y-1.5 pl-4 !text-sm !font-normal leading-relaxed text-muted-foreground">
            {entry.description.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
}
