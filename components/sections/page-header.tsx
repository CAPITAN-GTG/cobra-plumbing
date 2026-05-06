import { getTranslator } from "@/lib/i18n/server";

type PageHeaderProps = {
  eyebrowKey: string;
  titleKey: string;
  subKey: string;
};

export async function PageHeader({ eyebrowKey, titleKey, subKey }: PageHeaderProps) {
  const { t } = await getTranslator();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-surface to-surface-card">
      <div
        aria-hidden
        className="blob bg-accent/40 left-[-100px] top-[-80px] h-[260px] w-[260px]"
      />
      <div
        aria-hidden
        className="blob bg-accent-warm/30 right-[-80px] bottom-[-100px] h-[220px] w-[220px]"
      />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-3 px-4 py-10 sm:px-6 sm:py-12 md:py-14 lg:px-8">
        <span className="eyebrow">{t(eyebrowKey)}</span>
        <h1 className="heading-display max-w-3xl">{t(titleKey)}</h1>
        <p className="max-w-2xl text-pretty text-lg text-ink-muted">{t(subKey)}</p>
      </div>
    </section>
  );
}
