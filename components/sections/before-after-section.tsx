import { BeforeAfter } from "@/components/sections/before-after";
import { getTranslator } from "@/lib/i18n/server";

export async function BeforeAfterSection() {
  const { t } = await getTranslator();

  return (
    <section className="section">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-14 lg:px-8">
        <div className="flex flex-col gap-4">
          <span className="eyebrow">{t("beforeAfter.eyebrow")}</span>
          <h2 className="heading-section">{t("beforeAfter.heading")}</h2>
          <p className="text-pretty text-ink-muted">{t("beforeAfter.body")}</p>
          <ul className="flex flex-col gap-2 text-sm text-ink-muted">
            <li className="flex gap-2">
              <span className="font-bold text-ink">·</span>
              {t("beforeAfter.bullet1")}
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-ink">·</span>
              {t("beforeAfter.bullet2")}
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-ink">·</span>
              {t("beforeAfter.bullet3")}
            </li>
          </ul>
        </div>
        <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none">
          <BeforeAfter
            alt={t("beforeAfter.imageAlt")}
            beforeLabel={t("beforeAfter.beforeLabel")}
            afterLabel={t("beforeAfter.afterLabel")}
            beforeSrc="/photos/New Photos/Before 1.jpg"
            afterSrc="/photos/New Photos/After 2.jpg"
          />
        </div>
      </div>
    </section>
  );
}
