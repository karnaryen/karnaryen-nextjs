import type { Metadata } from 'next';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { CourseCard } from '@/components/course-card';
import { RevealGrid } from '@/components/reveal-grid';
import { courses, mainEducation } from '@/data/education';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('EducationPage');
  return { title: t('title') };
}

export default function EducationPage() {
  const t = useTranslations('EducationPage');

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-3xl font-semibold text-foreground">{t('title')}</h1>

      <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:flex-row sm:text-left dark:shadow-lg dark:shadow-black/25">
        <Image
          src={mainEducation.image}
          alt=""
          className="size-24 shrink-0 object-contain p-1"
        />
        <div>
          <p className="text-sm font-medium text-muted-foreground">{mainEducation.years}</p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">
            {t(`main.${mainEducation.id}.institution`)}
          </h2>
          <p className="mt-1 text-muted-foreground">{t(`main.${mainEducation.id}.degree`)}</p>
        </div>
      </div>

      <h2 className="mt-16 text-2xl font-semibold text-foreground">{t('coursesTitle')}</h2>
      <RevealGrid className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </RevealGrid>
    </main>
  );
}
