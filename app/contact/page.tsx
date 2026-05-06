import type { Metadata } from "next";
import {
  PiClockFill,
  PiEnvelopeSimpleFill,
  PiMapPinFill,
  PiPhoneCallFill,
} from "react-icons/pi";
import { ContactForm } from "@/components/contact-form";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/sections/page-header";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslator();
  return {
    title: t("meta.contact.title"),
    description: t("meta.contact.description", {
      business: BUSINESS_NAME,
      phone: PHONE_DISPLAY,
    }),
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage() {
  const { t, messages } = await getTranslator();

  return (
    <>
      <PageHeader
        eyebrowKey="hero.eyebrow"
        titleKey="hero.contactTitle"
        subKey="hero.contactSub"
      />

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:px-8">
          <div className="flex flex-col gap-6">
            <p className="text-pretty text-ink-muted">{t("contact.intro")}</p>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-4 rounded-2xl border border-accent/15 bg-surface-card p-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-tint text-accent-warm">
                  <PiPhoneCallFill size={22} aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    {t("contact.phoneHeading")}
                  </p>
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="text-lg font-bold text-ink-deep hover:text-accent-warm"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-accent/15 bg-surface-card p-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-tint text-accent-warm">
                  <PiClockFill size={22} aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    {t("contact.hoursHeading")}
                  </p>
                  <p className="text-sm text-ink">{t("contact.hoursBody")}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-accent/15 bg-surface-card p-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-tint text-accent-warm">
                  <PiMapPinFill size={22} aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    {t("contact.mailHeading")}
                  </p>
                  <p className="text-sm text-ink">{t("contact.mailBody")}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 rounded-2xl border border-accent/15 bg-surface-card p-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-warm-tint text-accent-warm">
                  <PiEnvelopeSimpleFill size={22} aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    {BUSINESS_NAME}
                  </p>
                  <p className="text-sm text-ink-muted">
                    {t("contact.note", { business: BUSINESS_NAME })}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <ContactForm labels={messages.contact.form} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
