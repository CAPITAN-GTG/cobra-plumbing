import { setLocale } from "@/app/actions/locale";
import { FlagMx, FlagUs } from "@/components/flag-icons";
import { getTranslator } from "@/lib/i18n/server";

const btnClass =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 border border-accent/25 px-2 py-1.5 text-sm font-medium text-ink transition hover:border-accent/50 hover:bg-accent/10 sm:min-h-0 sm:min-w-0 sm:px-2.5 sm:py-1.5";

const activeClass = "border-accent-deep bg-accent/15 text-accent-deep";

export async function LanguageSwitcher() {
  const { locale, t } = await getTranslator();

  return (
    <div
      className="flex items-center gap-1 border border-accent/20 bg-surface-card/80 p-0.5"
      role="group"
      aria-label={t("aria.language")}
    >
      <form action={setLocale}>
        <input type="hidden" name="locale" value="en" />
        <button
          type="submit"
          className={`${btnClass} ${locale === "en" ? activeClass : ""}`}
          aria-current={locale === "en" ? "true" : undefined}
          disabled={locale === "en"}
        >
          <FlagUs className="h-3.5 w-auto sm:h-4" />
          <span className="sr-only">{t("languageSwitcher.english")}</span>
          <span aria-hidden className="hidden sm:inline">
            EN
          </span>
        </button>
      </form>
      <form action={setLocale}>
        <input type="hidden" name="locale" value="es" />
        <button
          type="submit"
          className={`${btnClass} ${locale === "es" ? activeClass : ""}`}
          aria-current={locale === "es" ? "true" : undefined}
          disabled={locale === "es"}
        >
          <FlagMx className="h-3.5 w-auto sm:h-4" />
          <span className="sr-only">{t("languageSwitcher.spanish")}</span>
          <span aria-hidden className="hidden sm:inline">
            ES
          </span>
        </button>
      </form>
    </div>
  );
}
