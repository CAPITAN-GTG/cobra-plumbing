import { PiPhoneCallFill } from "react-icons/pi";
import { getTranslator } from "@/lib/i18n/server";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

type CtaBannerProps = {
  variant?: "warm" | "deep";
};

export async function CtaBanner({ variant = "warm" }: CtaBannerProps) {
  const { t } = await getTranslator();

  const isWarm = variant === "warm";

  return (
    <section className="relative overflow-hidden">
      <div
        className={`relative ${
          isWarm
            ? "bg-gradient-to-r from-accent-warm to-accent-warm-deep"
            : "bg-gradient-to-r from-ink-deep to-accent-deep"
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0 28px, rgba(255,255,255,0.18) 28px 30px)",
          }}
        />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between md:py-16 lg:px-8">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">
              {t("cta.eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
              {t("cta.heading")}
            </h2>
            <p className="mt-3 text-white/85">{t("cta.body")}</p>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className={`btn shrink-0 ${
              isWarm
                ? "bg-white text-accent-warm hover:bg-ink-deep hover:text-white"
                : "btn-warm"
            }`}
          >
            <PiPhoneCallFill aria-hidden size={20} />
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
