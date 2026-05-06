"use client";

import { useEffect, useState } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

type BeforeAfterProps = {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel: string;
  afterLabel: string;
  alt: string;
};

const PLACEHOLDER_BEFORE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
      <defs>
        <pattern id='p' width='14' height='14' patternUnits='userSpaceOnUse'>
          <path d='M0 14 L14 0' stroke='#b46a4a' stroke-width='1.2' opacity='0.5'/>
        </pattern>
      </defs>
      <rect width='800' height='600' fill='#3a2d28'/>
      <rect width='800' height='600' fill='url(#p)'/>
      <text x='50%' y='50%' fill='#f4d6b8' font-family='sans-serif' font-size='42' font-weight='700' text-anchor='middle' letter-spacing='6'>BEFORE</text>
    </svg>`,
  );

const PLACEHOLDER_AFTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'>
      <defs>
        <pattern id='p2' width='14' height='14' patternUnits='userSpaceOnUse'>
          <path d='M0 14 L14 0' stroke='#6a9fd0' stroke-width='1.2' opacity='0.6'/>
        </pattern>
      </defs>
      <rect width='800' height='600' fill='#eef5fb'/>
      <rect width='800' height='600' fill='url(#p2)'/>
      <text x='50%' y='50%' fill='#0f1a2b' font-family='sans-serif' font-size='42' font-weight='700' text-anchor='middle' letter-spacing='6'>AFTER</text>
    </svg>`,
  );

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  alt,
}: BeforeAfterProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/20 shadow-xl">
      {mounted ? (
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeSrc ?? PLACEHOLDER_BEFORE}
            alt={`${alt} — ${beforeLabel}`}
            style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterSrc ?? PLACEHOLDER_AFTER}
            alt={`${alt} — ${afterLabel}`}
            style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
          />
        }
      />
      ) : (
        <img
          src={afterSrc ?? PLACEHOLDER_AFTER}
          alt={alt}
          style={{ aspectRatio: "4 / 3", width: "100%", objectFit: "cover", display: "block" }}
        />
      )}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink-deep/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-warm px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
        {afterLabel}
      </span>
    </div>
  );
}
