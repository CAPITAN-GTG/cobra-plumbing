import {
  PiPhoneCallBold,
  PiMagnifyingGlassBold,
  PiWrenchBold,
  PiShieldCheckBold,
} from "react-icons/pi";
import type { ComponentType } from "react";
import { getTranslator } from "@/lib/i18n/server";

const STEPS: Array<{ key: string; Icon: ComponentType<{ size?: number }> }> = [
  { key: "call", Icon: PiPhoneCallBold },
  { key: "diagnose", Icon: PiMagnifyingGlassBold },
  { key: "fix", Icon: PiWrenchBold },
  { key: "guarantee", Icon: PiShieldCheckBold },
];

export async function ProcessStrip() {
  const { t } = await getTranslator();

  return (
    <section className="section bg-surface-tint">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">{t("process.eyebrow")}</span>
          <h2 className="heading-section">{t("process.heading")}</h2>
          <p className="text-pretty text-ink-muted">{t("process.lead")}</p>
        </div>

        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block"
          />
          {STEPS.map(({ key, Icon }, idx) => (
            <li
              key={key}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-surface-card text-accent-warm shadow-md ring-1 ring-accent/20">
                <Icon size={26} />
                <span className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-warm text-xs font-bold text-white shadow">
                  {idx + 1}
                </span>
              </div>
              <h3 className="mt-1 text-lg font-bold text-ink-deep">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="max-w-[18rem] text-sm text-ink-muted">
                {t(`process.steps.${key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
