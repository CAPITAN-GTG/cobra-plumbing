import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/sections/page-header";
import { ServiceAreaMap } from "@/components/service-area-map";
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
        eyebrowKey="serviceAreas.heading"
        titleKey="hero.areasTitle"
        subKey="serviceAreas.lead"
      />

      <section className="section-narrow pt-6 md:pt-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <ServiceAreaMap
              cities={CITIES}
              defaultLabel={t("serviceAreas.allAreas")}
              citiesNote={t("serviceAreas.citiesNote")}
            />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
