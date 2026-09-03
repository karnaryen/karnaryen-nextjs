'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { LocaleSwitcher } from '@/components/shared/locale-switcher';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { key: 'about', href: '/' },
  { key: 'projects', href: '/projects' },
  { key: 'blog', href: '/blog' },
  { key: 'experience', href: '/experience' },
  { key: 'education', href: '/education' },
  { key: 'contacts', href: '/contacts' },
] as const;

export function Header() {
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-4xl outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/logo192.webp"
            alt=""
            width={36}
            height={36}
            priority
            className="size-9 shrink-0 rounded-full"
          />
          <span className="truncate font-semibold text-foreground">{t('name')}</span>
        </Link>

        <nav aria-label={t('navLabel')} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                isActive(item.href) && 'bg-muted text-foreground',
              )}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label={t('navLabel')} className="border-t border-border lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'w-full justify-start text-base',
                    isActive(item.href) && 'bg-muted text-foreground',
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
