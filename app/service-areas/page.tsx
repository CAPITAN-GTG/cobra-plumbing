import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/main-container";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const linkClass =
  "font-medium text-accent-deep underline-offset-2 hover:text-accent hover:underline";

/** Representative 818 / SFV-adjacent cities; replace with your dispatch list. */
const CITIES = [
  "Burbank",
  "Glendale",
  "North Hollywood",
  "Sherman Oaks",
  "Studio City",
  "Van Nuys",
  "Woodland Hills",
  "Encino",
  "Reseda",
  "Panorama City",
  "Sun Valley",
  "La Crescenta",
  "Sunland",
  "Tujunga",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslator();
  return {
    title: t("meta.serviceAreas.title"),
    description: t("meta.serviceAreas.description", {
      business: BUSINESS_NAME,
      phone: PHONE_DISPLAY,
    }),
    alternates: { canonical: "/service-areas" },
  };
}

export default async function ServiceAreasPage() {
  const { t } = await getTranslator();

  return (
    <MainContainer>
      <article className="flex flex-col gap-10">
        <header className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {t("serviceAreas.heading")}
          </h1>
          <p className="text-pretty text-lg text-ink-muted sm:text-xl">{t("serviceAreas.lead")}</p>
          <p>
            <a href={`tel:${PHONE_TEL}`} className={linkClass}>
              {PHONE_DISPLAY}
            </a>
          </p>
        </header>

        <section
          aria-labelledby="cities-heading"
          className="flex flex-col gap-5 rounded-2xl border border-accent/15 bg-surface-card p-6 sm:p-8"
        >
          <h2 id="cities-heading" className="text-xl font-semibold tracking-tight text-ink">
            {t("serviceAreas.citiesHeading")}
          </h2>
          <ul className="columns-1 gap-x-8 text-ink sm:columns-2 lg:columns-3">
            {CITIES.map((city) => (
              <li key={city} className="break-inside-avoid py-1.5 text-sm sm:text-base">
                {city}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl text-pretty text-sm text-ink-muted">
            {t("serviceAreas.citiesNote")}
          </p>
        </section>

        <p>
          <Link href="/contact" className={linkClass}>
            {t("serviceAreas.sendAddress")}
          </Link>
        </p>
      </article>
    </MainContainer>
  );
}
