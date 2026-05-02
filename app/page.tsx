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
    title: t("meta.home.title"),
    description: t("meta.home.description", {
      business: BUSINESS_NAME,
      phone: PHONE_DISPLAY,
    }),
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const { t, messages } = await getTranslator();

  return (
    <MainContainer>
      <div className="flex flex-col gap-12 lg:gap-14">
        <header className="flex max-w-3xl flex-col gap-5">
          <h1 className="border-l-[3px] border-accent/50 pl-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
            {BUSINESS_NAME}
          </h1>
          <p className="max-w-2xl text-pretty text-lg text-ink-muted sm:text-xl">
            {t("home.tagline")}
          </p>
          <p className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${PHONE_TEL}`}
              className={`inline-flex min-h-[44px] items-center rounded-lg bg-accent/15 px-4 py-2 text-accent-deep ${linkClass} hover:bg-accent/20 sm:min-h-0`}
            >
              {t("home.callCta", { phone: PHONE_DISPLAY })}
            </a>
            <Link href="/contact" className={`inline-flex min-h-[44px] items-center ${linkClass} sm:min-h-0`}>
              {t("home.contactForm")}
            </Link>
          </p>
        </header>

        <section aria-labelledby="home-services-heading" className="flex flex-col gap-5">
          <h2
            id="home-services-heading"
            className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
          >
            {t("home.servicesHeading")}
          </h2>
          <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {messages.home.serviceItems.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-accent/15 bg-surface-card px-4 py-4 text-ink shadow-[0_1px_2px_rgba(30,42,58,0.04)]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p>
            <Link href="/services" className={linkClass}>
              {t("home.servicesLink")}
            </Link>
          </p>
        </section>

        <section
          aria-labelledby="home-areas-heading"
          className="rounded-2xl border border-accent/15 bg-surface-card/80 p-6 sm:p-8"
        >
          <div className="flex max-w-3xl flex-col gap-4">
            <h2
              id="home-areas-heading"
              className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
            >
              {t("home.areasHeading")}
            </h2>
            <p className="max-w-2xl text-pretty text-ink-muted">{t("home.areasBody")}</p>
            <p>
              <Link href="/service-areas" className={linkClass}>
                {t("home.areasLink")}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </MainContainer>
  );
}
