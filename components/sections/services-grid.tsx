import Link from "next/link";
import {
  PiArrowUpRight,
  PiDrop,
  PiShower,
  PiFire,
  PiPipe,
  PiStorefront,
  PiWrench,
} from "react-icons/pi";
import type { ComponentType } from "react";
import { getTranslator } from "@/lib/i18n/server";

const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  drains: PiDrop,
  heaters: PiFire,
  leaks: PiPipe,
  fixtures: PiShower,
  gas: PiWrench,
  commercial: PiStorefront,
};

type ServicesGridProps = {
  headingKey?: string;
  eyebrowKey?: string;
  showCta?: boolean;
};

export async function ServicesGrid({
  headingKey = "services.heading",
  eyebrowKey = "services.eyebrow",
  showCta = true,
}: ServicesGridProps) {
  const { t, messages } = await getTranslator();

  return (
    <section className="section">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">{t(eyebrowKey)}</span>
          <h2 className="heading-section">{t(headingKey)}</h2>
          <p className="text-pretty text-ink-muted">{t("services.lead")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {messages.services.groups.map((group) => {
            const Icon = ICONS[group.id] ?? PiWrench;
            return (
              <article
                key={group.id}
                className="card-tilt group flex flex-col gap-4 rounded-2xl border border-accent/15 bg-surface-card p-6 sm:p-7"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-warm-tint text-accent-warm transition group-hover:bg-accent-warm group-hover:text-white">
                  <Icon size={28} />
                </span>
                <h3 className="text-xl font-bold text-ink-deep">{group.title}</h3>
                <ul className="flex flex-col gap-1.5 text-sm text-ink-muted">
                  {group.items.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-warm"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {showCta ? (
                  <Link
                    href="/contact"
                    className="mt-auto inline-flex items-center gap-1 self-start text-sm font-bold uppercase tracking-wider text-accent-deep transition hover:gap-2 hover:text-accent-warm"
                  >
                    <span>{t("services.cardCta")}</span>
                    <PiArrowUpRight aria-hidden size={16} />
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
