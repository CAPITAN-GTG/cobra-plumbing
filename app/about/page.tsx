import type { Metadata } from "next";
import { CountersSection } from "@/components/sections/counters-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/sections/page-header";
import { ProcessStrip } from "@/components/sections/process-strip";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslator();
  return {
    title: t("meta.about.title"),
    description: t("meta.about.description", {
      business: BUSINESS_NAME,
      phone: PHONE_DISPLAY,
    }),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const { t, messages } = await getTranslator();

  return (
    <>
      <PageHeader
        eyebrowKey="hero.eyebrow"
        titleKey="hero.aboutTitle"
        subKey="hero.aboutSub"
      />

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16 lg:px-8">
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{t("about.heading")}</span>
            <h2 className="heading-section">
              {t("about.intro", { business: BUSINESS_NAME })}
            </h2>
            <div className="flex flex-col gap-4 text-ink-muted">
              <h3 className="text-lg font-bold text-ink-deep">
                {t("about.valuesHeading")}
              </h3>
              <ul className="flex flex-col gap-2">
                {messages.about.values.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-ink">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-warm"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl border border-accent/15 bg-surface-card p-6">
                <h3 className="text-lg font-bold text-ink-deep">
                  {t("about.credentialsHeading")}
                </h3>
                <p className="mt-2 text-sm">{t("about.credentialsBody")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div
              className="photo-slot aspect-[4/5] w-full"
              data-label={t("hero.imageLabel")}
              role="img"
              aria-label={t("hero.imageAlt")}
            />
            <div className="grid grid-cols-2 gap-4">
              <div
                className="photo-slot aspect-square"
                data-label={t("gallery.bucketRough")}
                role="img"
                aria-label="Job-site placeholder"
              />
              <div
                className="photo-slot aspect-square"
                data-label={t("gallery.bucketClean")}
                role="img"
                aria-label="Job-site placeholder"
              />
            </div>
          </div>
        </div>
      </section>

      <CountersSection />
      <ProcessStrip />

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="eyebrow">{t("about.whyHeading")}</span>
            <h2 className="heading-section">{t("about.whyLead")}</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {messages.about.whyItems.map((item) => (
              <article
                key={item.title}
                className="card-tilt flex flex-col gap-3 rounded-2xl border border-accent/15 bg-surface-card p-6"
              >
                <h3 className="text-lg font-bold text-ink-deep">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
