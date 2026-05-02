import type { Metadata } from "next";
import { MainContainer } from "@/components/main-container";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const linkClass =
  "font-medium text-accent-deep underline-offset-2 hover:text-accent hover:underline";

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
  const { t } = await getTranslator();

  return (
    <MainContainer>
      <article className="flex flex-col gap-10 lg:flex-row lg:gap-14">
        <div className="flex flex-1 flex-col gap-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {t("contact.heading")}
            </h1>
            <p className="text-pretty text-lg text-ink-muted sm:text-xl">{t("contact.intro")}</p>
          </header>

          <section
            aria-labelledby="contact-phone"
            className="flex flex-col gap-3 rounded-2xl border border-accent/15 bg-surface-card p-6 sm:p-7"
          >
            <h2 id="contact-phone" className="text-lg font-semibold text-ink">
              {t("contact.phoneHeading")}
            </h2>
            <p>
              <a
                href={`tel:${PHONE_TEL}`}
                className={`inline-flex min-h-[44px] items-center text-lg ${linkClass} sm:min-h-0`}
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </section>

          <section aria-labelledby="contact-hours" className="flex flex-col gap-3">
            <h2 id="contact-hours" className="text-lg font-semibold text-ink">
              {t("contact.hoursHeading")}
            </h2>
            <p className="max-w-xl text-pretty text-ink-muted">{t("contact.hoursBody")}</p>
          </section>
        </div>

        <section
          aria-labelledby="contact-mail"
          className="flex flex-1 flex-col gap-4 rounded-2xl border border-accent/15 bg-surface-card p-6 sm:p-8 lg:max-w-md"
        >
          <h2 id="contact-mail" className="text-lg font-semibold text-ink">
            {t("contact.mailHeading")}
          </h2>
          <p className="text-pretty text-ink-muted">{t("contact.mailBody")}</p>
          <p className="text-pretty text-sm text-ink-muted">
            {t("contact.note", { business: BUSINESS_NAME })}
          </p>
        </section>
      </article>
    </MainContainer>
  );
}
