import type { Metadata } from "next";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY } from "@/lib/site";

const PHOTOS = "/photos/New Photos";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslator();
  return {
    title: t("meta.about.title"),
    description: t("meta.about.description", {
      business: BUSINESS_NAME,
      phone: PHONE_DISPLAY,
    }),
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const { t, messages } = await getTranslator();

  return (
    <>
      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="eyebrow">{t("about.whyHeading")}</span>
            <h2 className="heading-section">{t("about.whyLead")}</h2>
            <p className="text-pretty text-ink-muted">
              {t("about.galleryBody")}
            </p>
          </div>
          <ol className="relative mx-auto max-w-6xl">
            <span
              aria-hidden
              className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-accent/20 lg:left-1/2 lg:block"
            />
            {messages.about.whyItems.map((item, i) => {
              const isLeft = i % 2 === 0;
              const media = [
                {
                  type: "image" as const,
                  src: `${PHOTOS}/Rough Job.jpg`,
                  width: 4000,
                  height: 2252,
                  portrait: false,
                  caption: t("about.galleryCaptions.rough"),
                },
                {
                  type: "image" as const,
                  src: `${PHOTOS}/Clean Work Example.jpg`,
                  width: 2252,
                  height: 4000,
                  portrait: true,
                  caption: t("about.galleryCaptions.clean"),
                },
                {
                  type: "image" as const,
                  src: `${PHOTOS}/Complex Work.jpg`,
                  width: 2252,
                  height: 4000,
                  portrait: true,
                  caption: t("about.galleryCaptions.complex"),
                },
                {
                  type: "video" as const,
                  src: `${PHOTOS}/Blow Torch Clip.mp4`,
                  width: 0,
                  height: 0,
                  portrait: true,
                  caption: t("about.galleryCaptions.torch"),
                },
              ][i];
              return (
                <li
                  key={item.title}
                  className="relative grid gap-6 py-10 lg:grid-cols-2 lg:gap-12 lg:py-14"
                >
                  <span
                    aria-hidden
                    className="absolute left-[18px] top-12 hidden h-3 w-3 -translate-x-1/2 bg-accent-warm lg:left-1/2 lg:block"
                  />
                  <div
                    className={`flex flex-col gap-3 ${
                      isLeft
                        ? "lg:col-start-1 lg:pr-6"
                        : "lg:col-start-2 lg:row-start-1 lg:items-end lg:pl-6 lg:text-right"
                    }`}
                  >
                    <span className="font-mono text-xs tabular-nums uppercase tracking-widest text-accent-warm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl font-bold leading-tight tracking-tight text-ink-deep sm:text-4xl">
                      {item.title}
                    </h3>
                    <p className="max-w-md text-pretty text-base text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                  <figure
                    className={`relative w-full overflow-hidden shadow-md ${
                      media.portrait
                        ? "mx-auto max-w-[260px] sm:max-w-xs"
                        : ""
                    } ${
                      isLeft
                        ? "lg:col-start-2 lg:row-start-1"
                        : "lg:col-start-1 lg:row-start-1"
                    }`}
                  >
                    {media.type === "image" ? (
                      <Image
                        src={media.src}
                        alt={media.caption}
                        width={media.width}
                        height={media.height}
                        sizes="(min-width: 1024px) 45vw, 100vw"
                        className="block h-auto w-full"
                      />
                    ) : (
                      <video
                        src={media.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="block h-auto w-full"
                        aria-label={media.caption}
                      />
                    )}
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/40 to-transparent p-4">
                      <p className="text-sm font-bold text-white">
                        {media.caption}
                      </p>
                    </figcaption>
                  </figure>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
