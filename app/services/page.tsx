import type { Metadata } from "next";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

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
  const { t } = await getTranslator();

  return (
    <>
      <PageHeader
        eyebrowKey="services.eyebrow"
        titleKey="hero.servicesTitle"
        subKey="hero.servicesSub"
      />
      <ServicesGrid headingKey="services.heading" eyebrowKey="services.eyebrow" />
      <section className="bg-surface-tint">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 text-center text-sm text-ink-muted sm:px-6 lg:px-8">
          {t("services.footnote")}
        </div>
      </section>
      <BeforeAfterSection />
      <CtaBanner variant="deep" />
    </>
  );
}
