import { getTranslator } from "@/lib/i18n/server";
import { ServicesShowcase } from "./services-showcase";

const PHOTOS = "/photos/New Photos";

const PHOTO_BY_GROUP: Record<string, { src: string; portrait: boolean }> = {
  drains: { src: `${PHOTOS}/Stylish Photo.jpg`, portrait: true },
  heaters: { src: `${PHOTOS}/Complex Work.jpg`, portrait: true },
  leaks: { src: `${PHOTOS}/After 1.jpg`, portrait: true },
  fixtures: { src: `${PHOTOS}/Clean Work Example.jpg`, portrait: true },
  gas: { src: `${PHOTOS}/After 2.jpg`, portrait: true },
  commercial: { src: `${PHOTOS}/Rough Job.jpg`, portrait: false },
};

type ServicesGridProps = {
  headingKey?: string;
  showHeader?: boolean;
};

export async function ServicesGrid({
  headingKey = "services.heading",
  showHeader = true,
}: ServicesGridProps) {
  const { t, messages } = await getTranslator();

  return (
    <section className={showHeader ? "section" : "section-narrow pt-6 md:pt-10"}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeader ? (
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
            <h2 className="heading-section">{t(headingKey)}</h2>
            <p className="text-pretty text-ink-muted">{t("services.lead")}</p>
          </div>
        ) : null}

        <ServicesShowcase
          groups={messages.services.groups}
          cardCta={t("services.cardCta")}
          photoByGroup={PHOTO_BY_GROUP}
        />

        {!showHeader ? (
          <p className="mx-auto mt-12 max-w-2xl text-center text-pretty text-ink-muted">
            {t("services.lead")}
          </p>
        ) : null}
      </div>
    </section>
  );
}
