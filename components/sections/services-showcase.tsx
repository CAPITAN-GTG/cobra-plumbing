"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PiArrowUpRight, PiCheckBold } from "react-icons/pi";

type ServiceGroup = {
  id: string;
  title: string;
  items: string[];
};

type PhotoMeta = { src: string; portrait: boolean };

type ServicesShowcaseProps = {
  groups: ServiceGroup[];
  cardCta: string;
  photoByGroup: Record<string, PhotoMeta>;
};

export function ServicesShowcase({
  groups,
  cardCta,
  photoByGroup,
}: ServicesShowcaseProps) {
  const [activeId, setActiveId] = useState(groups[0]?.id);
  const active = groups.find((g) => g.id === activeId) ?? groups[0];
  const photo = photoByGroup[active.id];

  return (
    <>
      {/* Desktop: split index + preview */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        <ol className="flex flex-col">
          {groups.map((g, i) => {
            const isActive = g.id === active.id;
            return (
              <li key={g.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveId(g.id)}
                  onFocus={() => setActiveId(g.id)}
                  onClick={() => setActiveId(g.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex w-full items-baseline gap-5 border-t border-accent/15 py-5 text-left transition last:border-b ${
                    isActive ? "text-ink-deep" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <span
                    className={`font-mono text-sm tabular-nums transition ${
                      isActive ? "text-accent-warm" : "text-ink-muted/70"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 text-2xl font-bold tracking-tight transition ${
                      isActive ? "translate-x-1" : ""
                    }`}
                  >
                    {g.title}
                  </span>
                  <span
                    aria-hidden
                    className={`h-px w-8 transition-all ${
                      isActive ? "w-12 bg-accent-warm" : "bg-accent/30"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-6">
          <div
            className={`relative w-full overflow-hidden ${
              photo.portrait
                ? "mx-auto aspect-[3/4] max-w-md"
                : "aspect-[4/3]"
            }`}
          >
            <Image
              key={photo.src}
              src={photo.src}
              alt={active.title}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {active.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <PiCheckBold
                  aria-hidden
                  className="mt-1 shrink-0 text-accent-warm"
                  size={16}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 self-start text-sm font-bold uppercase tracking-wider text-accent-deep transition hover:gap-2 hover:text-accent-warm"
          >
            <span>{cardCta}</span>
            <PiArrowUpRight aria-hidden size={16} />
          </Link>
        </div>
      </div>

      {/* Mobile / tablet: typographic accordion */}
      <div className="flex flex-col lg:hidden">
        {groups.map((g, i) => (
          <details
            key={g.id}
            className="group border-t border-accent/15 last:border-b"
            open={i === 0}
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-ink-deep">
              <span className="font-mono text-sm tabular-nums text-accent-warm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-xl font-bold tracking-tight">
                {g.title}
              </span>
              <span
                aria-hidden
                className="text-2xl text-ink-muted transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="flex flex-col gap-5 pb-6 pl-9">
              <div
                className={`relative w-full overflow-hidden ${
                  photoByGroup[g.id].portrait
                    ? "mx-auto aspect-[3/4] max-w-xs"
                    : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={photoByGroup[g.id].src}
                  alt={g.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <ul className="flex flex-col gap-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-ink">
                    <PiCheckBold
                      aria-hidden
                      className="mt-1 shrink-0 text-accent-warm"
                      size={14}
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 self-start text-sm font-bold uppercase tracking-wider text-accent-deep transition hover:gap-2 hover:text-accent-warm"
              >
                <span>{cardCta}</span>
                <PiArrowUpRight aria-hidden size={16} />
              </Link>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
