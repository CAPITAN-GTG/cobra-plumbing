import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/main-container";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const linkClass =
  "font-medium text-accent-deep underline-offset-2 hover:text-accent hover:underline";

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
    <MainContainer>
      <article className="flex max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t("about.heading")}
          </h1>
          <p className="text-pretty text-lg text-ink-muted sm:text-xl">
            {t("about.intro", { business: BUSINESS_NAME })}
          </p>
        </header>

        <section
          aria-labelledby="about-values"
          className="flex flex-col gap-4 rounded-2xl border border-accent/15 bg-surface-card p-6 sm:p-8"
        >
          <h2 id="about-values" className="text-xl font-semibold tracking-tight text-ink">
            {t("about.valuesHeading")}
          </h2>
          <ul className="list-disc space-y-2.5 pl-5 text-ink-muted marker:text-accent">
            {messages.about.values.map((line) => (
              <li key={line} className="text-ink">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="about-credentials" className="flex flex-col gap-3">
          <h2 id="about-credentials" className="text-xl font-semibold tracking-tight text-ink">
            {t("about.credentialsHeading")}
          </h2>
          <p className="text-pretty text-ink-muted">{t("about.credentialsBody")}</p>
        </section>

        <p className="border-t border-accent/15 pt-8 text-ink-muted">
          <a href={`tel:${PHONE_TEL}`} className={linkClass}>
            {PHONE_DISPLAY}
          </a>
          <span className="mx-2 text-accent/40" aria-hidden="true">
            ·
          </span>
          <Link href="/contact" className={linkClass}>
            {t("about.contactLink")}
          </Link>
        </p>
      </article>
    </MainContainer>
  );
}
