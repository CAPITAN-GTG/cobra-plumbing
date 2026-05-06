import { Testimonials } from "@/components/sections/testimonials";
import { getTranslator } from "@/lib/i18n/server";

export async function TestimonialsSection() {
  const { t, messages } = await getTranslator();
  const items = messages.testimonials.items;

  return (
    <Testimonials
      eyebrow={t("testimonials.eyebrow")}
      heading={t("testimonials.heading")}
      items={items}
    />
  );
}
