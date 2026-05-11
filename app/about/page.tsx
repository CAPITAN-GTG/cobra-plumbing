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
      <section className="relative overflow-hidden bg-gradient-to-b from-surface to-surface-card">
        <div
          aria-hidden
          className="blob bg-accent/40 left-[-100px] top-[-80px] h-[260px] w-[260px]"
        />
        <div
          aria-hidden
          className="blob bg-accent-warm/30 right-[-80px] bottom-[-100px] h-[220px] w-[220px]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-12 sm:px-6 sm:py-14 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-8">
          <div className="flex flex-col gap-6">
            <span className="eyebrow">{t("hero.eyebrow")}</span>
            <h1 className="heading-display">{t("about.heading")}</h1>
            <p className="max-w-xl text-pretty text-lg text-ink-muted sm:text-xl">
              {t("about.intro", { business: BUSINESS_NAME })}
            </p>
            <div className="flex flex-col gap-4 text-ink-muted">
              <h3 className="text-lg font-bold text-ink-deep">
                {t("about.valuesHeading")}
              </h3>
              <ul className="flex flex-col gap-2">
                {messages.about.values.map((line) => (
                  <li key={line} className="flex items-start gap-2 text-ink">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-warm"
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl border border-accent/15 bg-surface-card p-6">
                <h3 className="text-lg font-bold text-ink-deep">
                  {t("about.credentialsHeading")}
                </h3>
                <p className="mt-2 text-sm">{t("about.credentialsBody")}</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={`${PHOTOS}/Stylish Photo.jpg`}
              alt="Cobra Plumbing — finished work"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="eyebrow">{t("about.whyHeading")}</span>
            <h2 className="heading-section">{t("about.whyLead")}</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {messages.about.whyItems.map((item) => (
              <article
                key={item.title}
                className="card-tilt flex flex-col gap-3 rounded-2xl border border-accent/15 bg-surface-card p-6"
              >
                <h3 className="text-lg font-bold text-ink-deep">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface-tint">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
            <span className="eyebrow">{t("about.galleryEyebrow")}</span>
            <h2 className="heading-section">{t("about.galleryHeading")}</h2>
            <p className="text-pretty text-ink-muted">
              {t("about.galleryBody")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
            <figure className="card-tilt relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md lg:col-span-2 lg:row-span-2 lg:aspect-auto">
              <Image
                src={`${PHOTOS}/Complex Work.jpg`}
                alt={t("about.galleryCaptions.complex")}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/40 to-transparent p-5">
                <span className="tag tag-warm">
                  {t("gallery.bucketFinished")}
                </span>
                <p className="mt-2 text-base font-bold text-white">
                  {t("about.galleryCaptions.complex")}
                </p>
              </figcaption>
            </figure>

            <figure className="card-tilt relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
              <Image
                src={`${PHOTOS}/Rough Job.jpg`}
                alt={t("about.galleryCaptions.rough")}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/40 to-transparent p-4">
                <span className="tag tag-warm">{t("gallery.bucketRough")}</span>
                <p className="mt-2 text-sm font-bold text-white">
                  {t("about.galleryCaptions.rough")}
                </p>
              </figcaption>
            </figure>

            <figure className="card-tilt relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md lg:row-span-2 lg:aspect-auto">
              <Image
                src={`${PHOTOS}/Clean Work Example.jpg`}
                alt={t("about.galleryCaptions.clean")}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/40 to-transparent p-4">
                <span className="tag tag-warm">
                  {t("gallery.bucketClean")}
                </span>
                <p className="mt-2 text-sm font-bold text-white">
                  {t("about.galleryCaptions.clean")}
                </p>
              </figcaption>
            </figure>

            <figure className="card-tilt relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md sm:col-span-2 lg:col-span-1">
              <video
                src={`${PHOTOS}/Blow Torch Clip.mp4`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
                aria-label={t("about.galleryCaptions.torch")}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-deep/85 via-ink-deep/40 to-transparent p-4">
                <span className="tag tag-warm">
                  {t("about.galleryVideoTag")}
                </span>
                <p className="mt-2 text-sm font-bold text-white">
                  {t("about.galleryCaptions.torch")}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
