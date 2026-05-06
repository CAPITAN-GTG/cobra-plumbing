import { getTranslator } from "@/lib/i18n/server";

const ITEMS: Array<{
  id: string;
  bucket: "finished" | "rough" | "clean";
  span?: "wide" | "tall";
}> = [
  { id: "kitchen-rebuild", bucket: "finished", span: "wide" },
  { id: "rough-1", bucket: "rough" },
  { id: "clean-bay", bucket: "clean" },
  { id: "water-heater", bucket: "finished" },
  { id: "rough-2", bucket: "rough", span: "tall" },
  { id: "fixture-install", bucket: "clean" },
];

export async function ProjectGallery() {
  const { t } = await getTranslator();

  return (
    <section className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">{t("gallery.eyebrow")}</span>
          <h2 className="heading-section">{t("gallery.heading")}</h2>
          <p className="text-pretty text-ink-muted">{t("gallery.body")}</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <span className="tag tag-warm">{t("gallery.bucketFinished")}</span>
          <span className="tag">{t("gallery.bucketRough")}</span>
          <span className="tag tag-warm">{t("gallery.bucketClean")}</span>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-3 lg:auto-rows-[240px] lg:grid-cols-4">
          {ITEMS.map((item) => {
            const labelKey = `gallery.bucket${item.bucket
              .charAt(0)
              .toUpperCase()}${item.bucket.slice(1)}`;
            return (
              <figure
                key={item.id}
                className={`photo-slot card-tilt cursor-pointer ${
                  item.span === "wide"
                    ? "col-span-2"
                    : item.span === "tall"
                    ? "row-span-2"
                    : ""
                }`}
                data-label={t(labelKey)}
                role="img"
                aria-label={t(`gallery.items.${item.id}`)}
              />
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          {t("gallery.placeholderNote")}
        </p>
      </div>
    </section>
  );
}
