import { Counters } from "@/components/sections/counters";
import { getTranslator } from "@/lib/i18n/server";

export async function CountersSection() {
  const { t } = await getTranslator();

  return (
    <Counters
      heading={t("counters.heading")}
      stats={[
        { value: 10, suffix: "+", label: t("counters.years") },
        { value: 5000, suffix: "+", label: t("counters.jobs") },
        { value: 24, suffix: "/7", label: t("counters.response") },
        { value: 100, suffix: "%", label: t("counters.licensed") },
      ]}
    />
  );
}
