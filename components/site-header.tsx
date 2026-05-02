import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NAV_ITEMS } from "@/lib/i18n/nav";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, LOGO_SRC, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export async function SiteHeader() {
  const { t } = await getTranslator();

  return (
    <header className="border-b border-accent/20 bg-surface-card/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href="/"
            aria-label={`${BUSINESS_NAME} — ${t("nav.home")}`}
            className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center sm:min-h-0 sm:min-w-0"
          >
            <Image
              src={LOGO_SRC}
              alt=""
              width={220}
              height={70}
              className="h-14 w-auto sm:h-16"
              priority
            />
          </Link>
          <a
            href={`tel:${PHONE_TEL}`}
            className="min-h-[44px] min-w-[44px] content-center text-base font-medium text-accent-deep underline-offset-4 hover:text-accent hover:underline sm:min-h-0 sm:min-w-0"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
          <LanguageSwitcher />
          <nav aria-label={t("aria.primaryNav")}>
            <ul className="flex flex-wrap gap-x-1 gap-y-1 sm:justify-end sm:gap-x-0.5">
              {NAV_ITEMS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-[44px] items-center rounded-md px-2.5 text-ink underline-offset-4 hover:bg-accent/10 hover:text-accent-deep sm:min-h-0 sm:px-3 sm:py-1.5"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
