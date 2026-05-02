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
    title: t("meta.services.title"),
    description: t("meta.services.description", {
      business: BUSINESS_NAME,
      phone: PHONE_DISPLAY,
    }),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const { t, messages } = await getTranslator();

  return (
    <MainContainer>
      <article className="flex flex-col gap-10">
        <header className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t("services.heading")}
          </h1>
          <p className="text-pretty text-lg text-ink-muted sm:text-xl">{t("services.lead")}</p>
          <p>
            <a href={`tel:${PHONE_TEL}`} className={linkClass}>
              {PHONE_DISPLAY}
            </a>
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {messages.services.groups.map((group) => (
            <section
              key={group.id}
              aria-labelledby={`svc-${group.id}`}
              className="flex flex-col gap-3 rounded-2xl border border-accent/15 bg-surface-card p-5 sm:p-6"
            >
              <h2
                id={`svc-${group.id}`}
                className="text-lg font-semibold tracking-tight text-ink"
              >
                {group.title}
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-ink-muted marker:text-accent">
                {group.items.map((item) => (
                  <li key={item} className="text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="border-t border-accent/15 pt-8">
          <p className="max-w-2xl text-pretty text-ink-muted">{t("services.footnote")}</p>
          <p className="mt-4">
            <Link href="/contact" className={linkClass}>
              {t("services.requestService")}
            </Link>
          </p>
        </footer>
      </article>
    </MainContainer>
  );
}
