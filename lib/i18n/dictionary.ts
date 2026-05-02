import es from "@/messages/es.json";
import en from "@/messages/en.json";
import type { AppLocale } from "./config";

export type Messages = typeof en;

const catalogs: Record<AppLocale, Messages> = { en, es };

export function getMessages(locale: AppLocale): Messages {
  return catalogs[locale];
}

function readPath(dict: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc !== null && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

/** Dot-path string lookup with `{var}` interpolation — same pattern many Next.js i18n libraries use. */
export function createTranslator(messages: Messages) {
  return function t(key: string, vars?: Record<string, string | number>): string {
    const raw = readPath(messages as unknown as Record<string, unknown>, key);
    let out = typeof raw === "string" ? raw : key;
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        out = out.replaceAll(`{${name}}`, String(value));
      }
    }
    return out;
  };
}
