import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/sections/page-header";
import {
  ServiceAreaMap,
  type ServiceRegion,
} from "@/components/service-area-map";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

/** Cities are listed alphabetically inside each region. Tags are stable ids
 *  used for React keys and translation lookup; labels come from i18n. */
const REGION_DEFINITIONS: { id: string; cities: readonly string[] }[] = [
  {
    id: "sfv",
    cities: [
      "Burbank",
      "Calabasas",
      "Chatsworth",
      "Encino",
      "Granada Hills",
      "Mission Hills",
      "North Hollywood",
      "Northridge",
      "Pacoima",
      "Panorama City",
      "Reseda",
      "Sherman Oaks",
      "Studio City",
      "Sun Valley",
      "Sylmar",
      "Tarzana",
      "Van Nuys",
      "West Hills",
      "Winnetka",
      "Woodland Hills",
    ],
  },
  {
    id: "la",
    cities: [
      "Beverly Hills",
      "Culver City",
      "Glendale",
      "Hollywood",
      "La Crescenta",
      "Pasadena",
      "Santa Monica",
      "Sunland",
      "Tujunga",
      "West Hollywood",
      "West Los Angeles",
      "Westwood",
    ],
  },
  {
    id: "orange",
    cities: [
      "Anaheim",
      "Costa Mesa",
      "Fullerton",
      "Garden Grove",
      "Huntington Beach",
      "Irvine",
      "Newport Beach",
      "Orange",
      "Santa Ana",
      "Tustin",
    ],
  },
  {
    id: "ventura",
    cities: [
      "Camarillo",
      "Moorpark",
      "Newbury Park",
      "Oxnard",
      "Simi Valley",
      "Thousand Oaks",
      "Ventura",
      "Westlake Village",
    ],
  },
];

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

  const regions: ServiceRegion[] = REGION_DEFINITIONS.map((def) => ({
    id: def.id,
    label: t(`serviceAreas.regions.${def.id}`),
    cities: def.cities,
  }));

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
              regions={regions}
              defaultLabel={t("serviceAreas.allAreas")}
              defaultMapLabel="Southern California"
              citiesNote={t("serviceAreas.citiesNote")}
            />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
