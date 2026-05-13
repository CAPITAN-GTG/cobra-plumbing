"use client";

import { useState } from "react";
import { PiMapPinFill } from "react-icons/pi";
import { BUSINESS_NAME } from "@/lib/site";

export type ServiceRegion = {
  /** Stable id used for React keys */
  id: string;
  /** Translated, human-readable region label */
  label: string;
  /** Ordered list of city names displayed under the region */
  cities: readonly string[];
};

type Props = {
  regions: readonly ServiceRegion[];
  defaultLabel: string;
  defaultMapLabel: string;
  citiesNote: string;
};

const DEFAULT_QUERY = "Los Angeles, CA";
const DEFAULT_ZOOM = 9;
const CITY_ZOOM = 13;

function buildSrc(query: string, zoom: number): string {
  const q = encodeURIComponent(query);
  return `https://maps.google.com/maps?q=${q}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}

export function ServiceAreaMap({
  regions,
  defaultLabel,
  defaultMapLabel,
  citiesNote,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const query = selected ? `${selected}, CA` : DEFAULT_QUERY;
  const zoom = selected ? CITY_ZOOM : DEFAULT_ZOOM;

  return (
    <>
      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={() => setSelected(null)}
          aria-pressed={selected === null}
          className={`self-start rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition ${
            selected === null
              ? "border-accent-warm bg-accent-warm text-white"
              : "border-accent/30 bg-surface-card text-ink hover:border-accent-warm hover:text-accent-warm"
          }`}
        >
          {defaultLabel}
        </button>

        <div className="flex flex-col gap-6">
          {regions.map((region) => (
            <section
              key={region.id}
              aria-labelledby={`region-${region.id}`}
              className="flex flex-col gap-3"
            >
              <h3
                id={`region-${region.id}`}
                className="text-sm font-bold uppercase tracking-[0.18em] text-accent-deep"
              >
                {region.label}
              </h3>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {region.cities.map((city) => {
                  const active = selected === city;
                  return (
                    <li key={city}>
                      <button
                        type="button"
                        onClick={() => setSelected(city)}
                        aria-pressed={active}
                        className={`card-tilt flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                          active
                            ? "border-accent-warm bg-warm-tint text-ink-deep"
                            : "border-accent/15 bg-surface-card text-ink hover:border-accent-warm/60"
                        }`}
                      >
                        <PiMapPinFill
                          aria-hidden
                          size={14}
                          className={`shrink-0 ${
                            active
                              ? "text-accent-warm-deep"
                              : "text-accent-warm"
                          }`}
                        />
                        <span className="truncate">{city}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-sm text-ink-muted">{citiesNote}</p>
      </div>

      <div className="min-h-[400px] w-full overflow-hidden rounded-2xl border border-accent/20 shadow-md lg:sticky lg:top-24 lg:max-h-[80vh] lg:self-start">
        <iframe
          key={query}
          title={`${BUSINESS_NAME} coverage map — ${selected ?? defaultMapLabel}`}
          src={buildSrc(query, zoom)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[400px] w-full border-0"
        />
      </div>
    </>
  );
}
