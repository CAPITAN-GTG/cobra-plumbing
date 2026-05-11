import Image from "next/image";
import Link from "next/link";
import { PiPhoneCallFill } from "react-icons/pi";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { NAV_ITEMS } from "@/lib/i18n/nav";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, LOGO_SRC, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export async function SiteHeader() {
  const { t } = await getTranslator();

  const navList = (
    <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
      {NAV_ITEMS.map(({ href, key }) => (
        <li key={href}>
          <Link
            href={href}
            className="inline-flex min-h-[44px] items-center px-3 py-2 text-sm font-semibold uppercase tracking-wider text-ink hover:text-accent-warm md:py-1.5"
          >
            {t(key)}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-accent/15 bg-surface-card/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${BUSINESS_NAME} — ${t("nav.home")}`}
          className="inline-flex shrink-0 items-center gap-3"
        >
          <Image
            src={LOGO_SRC}
            alt=""
            width={120}
            height={120}
            className="h-11 w-11 rounded-lg sm:h-14 sm:w-14"
            priority
          />
          <span className="hidden text-lg font-bold leading-tight tracking-tight text-ink-deep sm:inline-flex sm:flex-col">
            <span>{BUSINESS_NAME}</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-deep">
              Sewer &amp; Drain
            </span>
          </span>
        </Link>

        <nav aria-label={t("aria.primaryNav")} className="ml-6 hidden md:block">
          {navList}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="btn btn-warm hidden sm:inline-flex"
          >
            <PiPhoneCallFill aria-hidden size={18} />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a
            href={`tel:${PHONE_TEL}`}
            aria-label={t("home.callCta", { phone: PHONE_DISPLAY })}
            className="btn btn-warm sm:hidden h-11 w-11 px-0 py-0"
          >
            <PiPhoneCallFill aria-hidden size={18} />
          </a>
          <MobileNav label={t("aria.primaryNav")}>
            <div className="flex flex-col gap-4">
              <nav aria-label={t("aria.primaryNav")}>{navList}</nav>
              <div className="border-t border-accent/15 pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
