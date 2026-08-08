import Image from 'next/image';

import { tech, type TechId, type TechInfo, techStackIds } from '@/data/tech-stack';
import { cn } from '@/lib/utils';

interface TechBadgeProps {
  id: TechId;
  size?: 'sm' | 'md';
  className?: string;
}

export function TechBadge({ id, size = 'md', className }: TechBadgeProps) {
  const { name, icon, invertOnDark }: TechInfo = tech[id];

  return (
    <span
      className={cn(
        'flex flex-col items-center text-foreground',
        size === 'md' ? 'gap-3 text-base sm:text-lg' : 'gap-1.5 text-sm',
        className,
      )}
    >
      <Image
        src={icon}
        alt=""
        width={64}
        height={64}
        className={cn(
          'w-auto',
          size === 'md' ? 'h-12 sm:h-16' : 'h-8 sm:h-10',
          invertOnDark && 'dark:invert',
        )}
      />
      {name}
    </span>
  );
}

interface TechStackProps {
  ids?: readonly TechId[];
  size?: 'sm' | 'md';
  className?: string;
}

export function TechStack({ ids = techStackIds, size = 'md', className }: TechStackProps) {
  return (
    <ul
      className={cn(
        'flex flex-wrap items-end justify-center',
        size === 'md' ? 'gap-x-8 gap-y-6 sm:gap-x-12' : 'gap-x-5 gap-y-3',
        className,
      )}
    >
      {ids.map((id) => (
        <li key={id}>
          <TechBadge id={id} size={size} />
        </li>
      ))}
    </ul>
  );
}
