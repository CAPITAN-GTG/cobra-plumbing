import Image from "next/image";
import Link from "next/link";
import {
  PiArrowRight,
  PiCertificateBold,
  PiClockCountdownBold,
  PiPhoneCallFill,
  PiShieldCheckBold,
  PiStarFill,
} from "react-icons/pi";
import { getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

type HeroParallaxProps = {
  imageSrc: string;
  eyebrowKey?: string;
  titleKey?: string;
  highlightKey?: string;
  subKey?: string;
  primaryHref?: string;
  primaryKey?: string;
};

const TRUST_ITEMS = [
  { key: "licensed", Icon: PiShieldCheckBold },
  { key: "experience", Icon: PiCertificateBold },
  { key: "sameDay", Icon: PiClockCountdownBold },
  { key: "rated", Icon: PiStarFill },
] as const;

// Keeps the text column's left edge aligned with a `max-w-7xl` container's
// content gutter, regardless of how wide the viewport gets.
const ALIGN_PAD_LEFT = "lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]";

// 56px diagonal overlap of the image into the text column at the bottom of
// the hero. The clip-path/`left`/SVG values below are kept in lockstep with
// this number — change them together. Tailwind's static class scanner means
// these have to be hardcoded literals (not derived from a JS constant).
//
//   image div: `lg:left-[-56px] lg:[clip-path:polygon(56px_0,...)]`
//   accent svg: `left-[-56px] w-[56px]`, viewBox `0 0 56 100`, line (56,0)→(0,100)

/** Split hero: editorial text on the left, a full-bleed install photo on
 *  the right. The image's left edge is a `/` diagonal that overlaps a few
 *  rem into the text column, traced by a dashed brand-blue accent line so
 *  the seam reads as an intentional design element instead of a hard cut. */
export async function HeroParallax({
  imageSrc,
  eyebrowKey = "hero.eyebrow",
  titleKey = "hero.title",
  highlightKey = "hero.highlight",
  subKey = "hero.sub",
  primaryHref = "/contact",
  primaryKey = "hero.primaryCta",
}: HeroParallaxProps) {
  const { t } = await getTranslator();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-surface-card">
      <div
        aria-hidden
        className="blob bg-accent/40 left-[-120px] top-[-80px] h-[320px] w-[320px]"
      />
      <div
        aria-hidden
        className="blob bg-accent-warm/15 left-[30%] bottom-[-200px] h-[320px] w-[320px]"
      />

      <div className="grid min-h-[78vh] grid-cols-1 lg:min-h-[86vh] lg:grid-cols-2 lg:items-stretch">
        <div
          className={`relative flex items-center px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:py-24 lg:pr-20 xl:pr-24 ${ALIGN_PAD_LEFT}`}
        >
          <div className="flex w-full max-w-xl flex-col gap-6">
            <span className="eyebrow">{t(eyebrowKey)}</span>

            <h1 className="heading-display">
              {t(titleKey, { business: BUSINESS_NAME })}{" "}
              {highlightKey ? (
                <span className="has-line text-accent-deep">
                  {t(highlightKey)}
                </span>
              ) : null}
            </h1>

            <p className="max-w-xl text-pretty text-lg text-ink-muted sm:text-xl">
              {t(subKey, { business: BUSINESS_NAME })}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Link href={primaryHref} className="btn btn-warm">
                <span>{t(primaryKey)}</span>
                <PiArrowRight aria-hidden size={18} />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="btn btn-outline">
                <PiPhoneCallFill aria-hidden size={18} />
                <span>{PHONE_DISPLAY}</span>
              </a>
            </div>

            <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-semibold text-ink sm:flex sm:flex-wrap sm:gap-x-6">
              {TRUST_ITEMS.map(({ key, Icon }) => (
                <li key={key} className="flex items-center gap-2">
                  <Icon
                    aria-hidden
                    size={20}
                    className="shrink-0 text-accent-warm"
                  />
                  <span>{t(`hero.trust.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative h-[55vh] min-h-[420px] lg:h-auto lg:min-h-full">
          {/* Clipped image card. On mobile it fills the column rectangle;
              on lg+ it extends `OVERLAP_PX` into the text column at the
              bottom-left via a `/`-shaped clip-path. */}
          <div className="absolute inset-y-0 right-0 left-0 overflow-hidden bg-ink-deep lg:left-[-56px] lg:[clip-path:polygon(56px_0,100%_0,100%_100%,0_100%)]">
            <Image
              src={imageSrc}
              alt={t("hero.imageAlt")}
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 35%" }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-surface-card/25 to-transparent lg:block"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-deep/65 via-ink-deep/15 to-transparent"
            />

            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:gap-4 sm:px-5 sm:py-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-warm text-white shadow-md">
                <PiShieldCheckBold size={22} aria-hidden />
              </span>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm font-bold text-ink-deep sm:text-base">
                  {BUSINESS_NAME}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-deep sm:text-xs">
                  {t("footer.licenseLine")}
                </span>
              </div>
            </div>
          </div>

          {/* Dashed accent line tracing the `/` clip from the upper-right
              corner of the overlap area down to its lower-left, in brand
              blue. Hidden on mobile where there's no diagonal. */}
          <svg
            aria-hidden
            className="pointer-events-none absolute top-0 left-[-56px] hidden h-full w-[56px] text-accent-warm lg:block"
            viewBox="0 0 56 100"
            preserveAspectRatio="none"
          >
            <line
              x1={56}
              y1={0}
              x2={0}
              y2={100}
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray="8 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
