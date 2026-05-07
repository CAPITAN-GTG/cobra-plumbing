"use client";

import { useState } from "react";
import { PiMapPinFill } from "react-icons/pi";

type Props = {
  cities: readonly string[];
  defaultLabel: string;
  citiesNote: string;
};

const DEFAULT_QUERY = "San Fernando Valley, CA";
const DEFAULT_ZOOM = 10;
const CITY_ZOOM = 13;

function buildSrc(query: string, zoom: number): string {
  const q = encodeURIComponent(query);
  return `https://maps.google.com/maps?q=${q}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}

export function ServiceAreaMap({ cities, defaultLabel, citiesNote }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const query = selected ? `${selected}, CA` : DEFAULT_QUERY;
  const zoom = selected ? CITY_ZOOM : DEFAULT_ZOOM;

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-pressed={selected === null}
            className={`border px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition ${
              selected === null
                ? "border-accent-warm bg-accent-warm text-white"
                : "border-accent/30 bg-surface-card text-ink hover:border-accent-warm hover:text-accent-warm"
            }`}
          >
            {defaultLabel}
          </button>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {cities.map((city) => {
            const active = selected === city;
            return (
              <li key={city}>
                <button
                  type="button"
                  onClick={() => setSelected(city)}
                  aria-pressed={active}
                  className={`card-tilt flex w-full items-center gap-2 border px-3 py-3 text-left text-sm transition ${
                    active
                      ? "border-accent-warm bg-warm-tint text-ink-deep"
                      : "border-accent/15 bg-surface-card text-ink hover:border-accent-warm/60"
                  }`}
                >
                  <PiMapPinFill
                    aria-hidden
                    size={16}
                    className={`shrink-0 ${
                      active ? "text-accent-warm-deep" : "text-accent-warm"
                    }`}
                  />
                  <span>{city}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="text-sm text-ink-muted">{citiesNote}</p>
      </div>
      <div className="min-h-[400px] w-full overflow-hidden border border-accent/20 shadow-md">
        <iframe
          key={query}
          title={`Cobra Plumbing coverage map — ${selected ?? "San Fernando Valley"}`}
          src={buildSrc(query, zoom)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[400px] w-full border-0"
        />
      </div>
    </>
  );
}
