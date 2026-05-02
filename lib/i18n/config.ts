/** Supported UI locales — add codes here when expanding languages. */
export const LOCALES = ["en", "es"] as const;

export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

/** Cookie read by `getLocale()`; any future i18n SDK can sync to the same name. */
export const LOCALE_COOKIE = "cobra-locale";

export function isAppLocale(value: string): value is AppLocale {
  return (LOCALES as readonly string[]).includes(value);
}
