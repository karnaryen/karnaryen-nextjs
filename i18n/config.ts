export const locales = ['en', 'nl'] as const;

export type Locale = (typeof locales)[number];

/**
 * Also the language the site is indexed in. Locale comes from the `NEXT_LOCALE`
 * cookie alone, so a crawler — which never sends one — is always served this
 * language, and the other translations share its URLs rather than having their
 * own. Changing this changes what Google sees on every page.
 */
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
