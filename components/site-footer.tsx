import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS } from "@/lib/i18n/nav";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, LOGO_SRC, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export async function SiteFooter() {
  const { t } = await getTranslator();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-accent/20 bg-surface-card">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:gap-10 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <Image
              src={LOGO_SRC}
              alt=""
              width={120}
              height={40}
              className="mt-0.5 h-10 w-auto shrink-0 opacity-95"
            />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-ink">{BUSINESS_NAME}</p>
              <p>
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="font-medium text-accent-deep underline-offset-2 hover:text-accent hover:underline"
                >
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </div>
        <nav aria-label={t("aria.footerNav")}>
          <ul className="flex flex-col gap-1.5 sm:items-end md:items-end">
            {NAV_ITEMS.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-block rounded-md py-0.5 text-ink underline-offset-2 hover:bg-accent/10 hover:text-accent-deep hover:underline sm:px-1"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-ink-muted md:col-span-2">
          {t("footer.copyright", { year, business: BUSINESS_NAME })}
        </p>
      </div>
    </footer>
  );
}
