import Image from "next/image";
import Link from "next/link";
import { PiPhoneCallFill, PiArrowRight } from "react-icons/pi";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

type HeroProps = {
  titleKey: string;
  highlightKey?: string;
  subKey: string;
  primaryHref?: string;
  primaryKey?: string;
  imageLabel?: string;
  imageSrc?: string;
  variant?: "split" | "header";
};

export async function Hero({
  titleKey,
  highlightKey,
  subKey,
  primaryHref = "/contact",
  primaryKey = "hero.primaryCta",
  imageLabel,
  imageSrc,
  variant = "split",
}: HeroProps) {
  const { t } = await getTranslator();

  const isSplit = variant === "split";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface to-surface-card">
      <div
        aria-hidden
        className="blob bg-accent/40 left-[-120px] top-[-80px] h-[320px] w-[320px]"
      />
      <div
        aria-hidden
        className="blob bg-accent-warm/30 right-[-100px] bottom-[-120px] h-[280px] w-[280px]"
      />
      <div
        className={`relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:gap-14 lg:px-8 lg:py-16 ${
          isSplit ? "lg:grid-cols-[1.05fr_1fr]" : "lg:grid-cols-1"
        }`}
      >
        <div className="flex flex-col justify-center gap-6">
          <h1 className="heading-display">
            {t(titleKey, { business: BUSINESS_NAME })}{" "}
            {highlightKey ? (
              <span className="has-line text-accent-deep">{t(highlightKey)}</span>
            ) : null}
          </h1>
          <p className="max-w-xl text-pretty text-lg text-ink-muted sm:text-xl">
            {t(subKey, { business: BUSINESS_NAME })}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link href={primaryHref} className="btn btn-warm">
              <span>{t(primaryKey)}</span>
              <PiArrowRight aria-hidden size={18} />
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">
              <PiPhoneCallFill aria-hidden size={18} />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        {isSplit ? (
          <div className="relative">
            {imageSrc ? (
              <div className="relative aspect-[5/4] w-full overflow-hidden shadow-xl lg:aspect-[4/5]">
                <Image
                  src={imageSrc}
                  alt={t("hero.imageAlt")}
                  fill
                  preload
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className="photo-slot aspect-[5/4] w-full lg:aspect-[4/5]"
                data-label={imageLabel ?? t("hero.imageLabel")}
                role="img"
                aria-label={t("hero.imageAlt")}
              />
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
