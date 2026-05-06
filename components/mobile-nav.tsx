"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PiList, PiX } from "react-icons/pi";

type MobileNavProps = {
  label: string;
  children: ReactNode;
};

export function MobileNav({ label, children }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 bg-surface-card text-ink hover:bg-accent/10 md:hidden"
      >
        {open ? <PiX size={22} /> : <PiList size={22} />}
      </button>
      {open ? (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-ink-deep/40 backdrop-blur-sm" />
          <div
            className="absolute inset-x-3 top-20 rounded-2xl border border-accent/15 bg-surface-card p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
}
