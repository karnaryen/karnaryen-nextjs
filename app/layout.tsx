import './globals.css';

import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';

import { Analytics } from '@/components/analytics';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { OG_LOCALES } from '@/lib/metadata';
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';
import { cn } from '@/lib/utils';

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' });

/**
 * Site-wide defaults. `metadataBase` is what lets every other route express
 * its canonical URL and Open Graph URL as a plain path. Pages that set their
 * own title and description do so through `pageMetadata` in `lib/metadata.ts`.
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Meta');
  const locale = await getLocale();

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('defaultTitle'), template: `%s — ${SITE_NAME}` },
    description: t('defaultDescription'),
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: '/',
      locale: OG_LOCALES[locale],
      title: { default: t('defaultTitle'), template: `%s — ${SITE_NAME}` },
      description: t('defaultDescription'),
      images: [OG_IMAGE],
    },
    // Images are filled in from the Open Graph card above by Next.
    twitter: { card: 'summary_large_image' },
    // Only preview limits. Stating `index` here would put an indexable
    // directive on the pages Next marks `noindex` itself, such as 404s.
    robots: { googleBot: { 'max-image-preview': 'large', 'max-snippet': -1 } },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className={cn('font-sans', openSans.variable)}>
      <body className="flex min-h-svh flex-col">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
