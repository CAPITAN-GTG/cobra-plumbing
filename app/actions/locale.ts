"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isAppLocale, type AppLocale } from "@/lib/i18n/config";

const ONE_YEAR_SEC = 60 * 60 * 24 * 365;

export async function setLocale(formData: FormData) {
  const raw = formData.get("locale");
  const next: AppLocale =
    typeof raw === "string" && isAppLocale(raw) ? raw : DEFAULT_LOCALE;

  const jar = await cookies();
  jar.set(LOCALE_COOKIE, next, {
    path: "/",
    maxAge: ONE_YEAR_SEC,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}
