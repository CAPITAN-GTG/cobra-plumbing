import Image from "next/image";
import Link from "next/link";
import {
  PiEnvelopeSimpleFill,
  PiMapPinFill,
  PiPhoneCallFill,
} from "react-icons/pi";
import { NAV_ITEMS } from "@/lib/i18n/nav";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, LOGO_SRC, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export async function SiteFooter() {
  const { t, messages } = await getTranslator();
  const year = new Date().getFullYear();

  const services = messages.services.groups.slice(0, 4);

  return (
    <footer className="mt-auto bg-accent-deep text-white/85">
      <div className="h-1 w-full bg-accent-warm" aria-hidden />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={LOGO_SRC}
              alt={BUSINESS_NAME}
              width={120}
              height={120}
              className="h-14 w-14 rounded-lg"
            />
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-white">
                {BUSINESS_NAME}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                Sewer &amp; Drain
              </span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            {t("footer.blurb", { business: BUSINESS_NAME })}
          </p>
        </div>

        <nav aria-label={t("aria.footerNav")} className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            {t("footer.quickLinks")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            {NAV_ITEMS.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-white/70 transition hover:text-accent-warm"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            {t("footer.servicesHeading")}
          </h3>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            {services.map((g) => (
              <li key={g.id}>{g.title}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">
            {t("footer.contactHeading")}
          </h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-3">
              <PiPhoneCallFill
                aria-hidden
                size={18}
                className="mt-0.5 shrink-0 text-accent-warm"
              />
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-white/85 hover:text-accent-warm"
              >
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PiMapPinFill
                aria-hidden
                size={18}
                className="mt-0.5 shrink-0 text-accent-warm"
              />
              <span className="text-white/70">
                {t("footer.serviceAreaLine")}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PiEnvelopeSimpleFill
                aria-hidden
                size={18}
                className="mt-0.5 shrink-0 text-accent-warm"
              />
              <Link
                href="/contact"
                className="text-white/85 hover:text-accent-warm"
              >
                {t("footer.emailCta")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>{t("footer.copyright", { year, business: BUSINESS_NAME })}</p>
          <p>{t("footer.licenseLine")}</p>
        </div>
      </div>
    </footer>
  );
}
