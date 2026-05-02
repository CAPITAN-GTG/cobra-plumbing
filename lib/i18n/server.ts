import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isAppLocale,
  type AppLocale,
} from "./config";
import { createTranslator, getMessages, type Messages } from "./dictionary";

export async function getLocale(): Promise<AppLocale> {
  const jar = await cookies();
  const value = jar.get(LOCALE_COOKIE)?.value;
  if (value && isAppLocale(value)) {
    return value;
  }
  return DEFAULT_LOCALE;
}

export async function getTranslator(): Promise<{
  locale: AppLocale;
  messages: Messages;
  t: ReturnType<typeof createTranslator>;
}> {
  const locale = await getLocale();
  const messages = getMessages(locale);
  return { locale, messages, t: createTranslator(messages) };
}

export type Translator = Awaited<ReturnType<typeof getTranslator>>;
