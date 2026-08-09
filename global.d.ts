import type { locales } from '@/i18n/config';
import type en from '@/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof locales)[number];
    Messages: typeof en;
  }
}

declare module 'react' {
  /**
   * Lets `style` carry CSS custom properties without a cast. Passing a runtime
   * value into CSS this way is the documented approach — Tailwind builds its
   * classes by scanning source, so it cannot generate one from a value that is
   * only known at render time.
   */
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style -- interface merging is the only way to extend React's CSSProperties; a Record cannot be merged in.
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
