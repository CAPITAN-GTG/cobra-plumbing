import type { Metadata } from "next";
import { PiMapPinFill } from "react-icons/pi";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/sections/page-header";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

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
    <>
      <PageHeader
        eyebrowKey="hero.eyebrow"
        titleKey="hero.areasTitle"
        subKey="hero.areasSub"
      />

      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-8">
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{t("serviceAreas.heading")}</span>
            <h2 className="heading-section">{t("serviceAreas.citiesHeading")}</h2>
            <p className="text-pretty text-ink-muted">{t("serviceAreas.lead")}</p>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CITIES.map((city) => (
                <li
                  key={city}
                  className="card-tilt flex items-center gap-2 rounded-xl border border-accent/15 bg-surface-card px-3 py-3 text-sm text-ink"
                >
                  <PiMapPinFill
                    aria-hidden
                    size={16}
                    className="shrink-0 text-accent-warm"
                  />
                  <span>{city}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-ink-muted">{t("serviceAreas.citiesNote")}</p>
          </div>
          <div
            className="photo-slot min-h-[400px] w-full"
            data-label={t("serviceAreas.mapPlaceholder")}
            role="img"
            aria-label="Service area map placeholder"
          />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
