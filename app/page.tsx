import type { Metadata } from "next";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { CountersSection } from "@/components/sections/counters-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HeroParallax } from "@/components/sections/hero-parallax";
import { ProcessStrip } from "@/components/sections/process-strip";
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
      <HeroParallax imageSrc="/photos/New Photos/20250801_151125.jpg" />
      <CountersSection />
      <ProcessStrip />
      <BeforeAfterSection />
      <TestimonialsSection />
      <CtaBanner />
    </>
  );
}
