import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/cta-banner";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

const GALLERY_PHOTOS = [
  "10c558c3-f324-4563-ba92-288de6fc5ee7.jpg",
  "20240812_133707.jpg",
  "20240903_075732.jpg",
  "20241115_132154.jpg",
  "20250406_135900.jpg",
  "20250711_172623.jpg",
  "20251209_134225.jpg",
  "20260109_141706.jpg",
  "20260204_213917.jpg",
  "20260207_141511.jpg",
  "20260326_151838.jpg",
  "20260327_093559.jpg",
  "20260327_120656.jpg",
  "20260411_104351.jpg",
  "20260411_125224.jpg",
].map((filename, i) => ({
  src: `/photos/gallery/${filename}`,
  alt: `Cobra Plumbing — job site photo ${i + 1}`,
}));

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslator();
  return {
    title: t("meta.gallery.title"),
    description: t("meta.gallery.description", {
      business: BUSINESS_NAME,
      phone: PHONE_DISPLAY,
    }),
    alternates: { canonical: "/gallery" },
  };
}

export default async function GalleryPage() {
  const { t } = await getTranslator();

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-surface-card">
        <div
          aria-hidden
          className="blob bg-accent/40 left-[-100px] top-[-80px] h-[260px] w-[260px]"
        />
        <div
          aria-hidden
          className="blob bg-accent-warm/30 right-[-80px] bottom-[-100px] h-[220px] w-[220px]"
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-14 md:py-16 lg:px-8">
          <span className="eyebrow">{t("gallery.eyebrow")}</span>
          <h1 className="heading-display mt-4">{t("gallery.heading")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-ink-muted">
            {t("gallery.body")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryLightbox photos={GALLERY_PHOTOS} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
