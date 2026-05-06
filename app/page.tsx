import type { Metadata } from "next";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { CountersSection } from "@/components/sections/counters-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Hero } from "@/components/sections/hero";
import { ProcessStrip } from "@/components/sections/process-strip";
import { ProjectGallery } from "@/components/sections/project-gallery";
import { ServicesGrid } from "@/components/sections/services-grid";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

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
  return (
    <>
      <Hero
        titleKey="hero.title"
        highlightKey="hero.highlight"
        subKey="hero.sub"
      />
      <ServicesGrid />
      <CountersSection />
      <ProcessStrip />
      <BeforeAfterSection />
      <ProjectGallery />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
