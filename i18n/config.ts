export const locales = ['en', 'nl'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/**
 * Named formats, so a date reads the same everywhere it appears and each
 * locale still gets its own wording. Typed through `AppConfig` in
 * `global.d.ts`, which makes the names autocomplete and typos fail the build.
 */
export const formats = {
  dateTime: {
    long: { year: 'numeric', month: 'long', day: 'numeric' },
  },
} as const;
