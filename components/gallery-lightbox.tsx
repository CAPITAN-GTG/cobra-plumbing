"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiMagnifyingGlassPlusBold,
  PiXBold,
} from "react-icons/pi";

type Photo = { src: string; alt: string };
type Props = { photos: Photo[] };

const ZOOM_SCALE = 2.5;
const ZOOM_DURATION = 320;

export function GalleryLightbox({ photos }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const transitioning = useRef(false);

  const setOrigin = (x: number, y: number) => {
    if (innerRef.current) {
      innerRef.current.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  const resetZoom = useCallback(() => {
    setZoomed(false);
    transitioning.current = false;
  }, []);

  const close = useCallback(() => {
    setActive(null);
    resetZoom();
  }, [resetZoom]);

  const prev = useCallback(() => {
    setActive((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
    resetZoom();
  }, [photos.length, resetZoom]);

  const next = useCallback(() => {
    setActive((i) => (i !== null ? (i + 1) % photos.length : null));
    resetZoom();
  }, [photos.length, resetZoom]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (zoomed) resetZoom(); else close(); }
      if (!zoomed && e.key === "ArrowLeft") prev();
      if (!zoomed && e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, zoomed, close, prev, next, resetZoom]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed || transitioning.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin(
      ((e.clientX - rect.left) / rect.width) * 100,
      ((e.clientY - rect.top) / rect.height) * 100,
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!zoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      setOrigin(
        ((e.clientX - rect.left) / rect.width) * 100,
        ((e.clientY - rect.top) / rect.height) * 100,
      );
      transitioning.current = true;
      setTimeout(() => { transitioning.current = false; }, ZOOM_DURATION);
      setZoomed(true);
    } else {
      resetZoom();
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => { setActive(i); resetZoom(); }}
            className="group relative aspect-[4/3] overflow-hidden bg-surface-tint cursor-zoom-in"
            aria-label={`View photo ${i + 1} of ${photos.length}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink-deep/0 transition-colors duration-200 group-hover:bg-ink-deep/35">
              <PiMagnifyingGlassPlusBold
                size={28}
                className="text-white opacity-0 drop-shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden
              />
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal={true}
          aria-label={`Photo ${active + 1} of ${photos.length}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          onClick={close}
        >
          <div className="absolute inset-0 bg-ink-deep/95 backdrop-blur-sm" />

          <div
            className="relative z-10 flex w-full max-w-6xl flex-col items-center px-16 py-8"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "min(85vh, 960px)", cursor: zoomed ? "zoom-out" : "zoom-in" }}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
            >
              <div
                ref={innerRef}
                className="absolute inset-0"
                style={{
                  transform: zoomed ? `scale(${ZOOM_SCALE})` : "scale(1)",
                  transformOrigin: "50% 50%",
                  transition: `transform ${ZOOM_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
                }}
              >
                <Image
                  src={photos[active].src}
                  alt={photos[active].alt}
                  fill
                  sizes="(min-width: 1280px) 1200px, 90vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            aria-label="Close lightbox"
          >
            <PiXBold size={18} />
          </button>

          {!zoomed && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:left-6"
              aria-label="Previous photo"
            >
              <PiArrowLeftBold size={20} />
            </button>
          )}

          {!zoomed && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/25 sm:right-6"
              aria-label="Next photo"
            >
              <PiArrowRightBold size={20} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
