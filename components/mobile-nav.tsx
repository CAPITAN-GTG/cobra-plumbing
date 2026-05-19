"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { PiList, PiPhoneCallFill, PiX } from "react-icons/pi";

const DRAWER_MS = 320;

/** Above header (z-30) and page overlays; below skip-link focus ring (9999). */
const MENU_LAYER_CLASS = "z-[100]";

type NavItem = {
  href: string;
  label: string;
};

type MobileNavProps = {
  navLabel: string;
  menuTitle: string;
  openLabel: string;
  closeLabel: string;
  items: NavItem[];
  phoneDisplay: string;
  phoneTel: string;
  callCta: string;
  languageLabel: string;
  languageSwitcher: ReactNode;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav({
  navLabel,
  menuTitle,
  openLabel,
  closeLabel,
  items,
  phoneDisplay,
  phoneTel,
  callCta,
  languageLabel,
  languageSwitcher,
}: MobileNavProps) {
  const pathname = usePathname();
  const dialogId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setVisible(false);
      let outer = 0;
      let inner = 0;
      outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), DRAWER_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      openButtonRef.current?.focus();
    };
  }, [mounted, close]);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        aria-controls={dialogId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-surface text-ink shadow-sm transition hover:border-accent/40 hover:bg-accent/8 active:scale-[0.98] md:hidden"
      >
        {open ? <PiX size={22} aria-hidden /> : <PiList size={22} aria-hidden />}
      </button>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 md:hidden ${MENU_LAYER_CLASS} ${
                visible ? "pointer-events-auto" : "pointer-events-none"
              }`}
              role="presentation"
            >
              <div
                data-state={visible ? "open" : "closed"}
                className="mobile-menu-backdrop absolute inset-0 bg-ink-deep/55 backdrop-blur-[2px]"
                aria-hidden
                onClick={close}
              />

              <div
                id={dialogId}
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${dialogId}-title`}
                data-state={visible ? "open" : "closed"}
                className="mobile-menu-panel absolute inset-y-0 right-0 flex w-full max-w-[min(100%,20rem)] flex-col border-l border-accent/15 bg-surface-card shadow-2xl pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
              >
            <div className="flex items-center justify-between gap-3 border-b border-accent/12 px-5 py-4">
              <p
                id={`${dialogId}-title`}
                className="text-sm font-bold uppercase tracking-[0.14em] text-ink-muted"
              >
                {menuTitle}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label={closeLabel}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/20 text-ink transition hover:border-accent/40 hover:bg-accent/8 active:scale-[0.98]"
              >
                <PiX size={22} aria-hidden />
              </button>
            </div>

            <nav
              aria-label={navLabel}
              className="flex-1 overflow-y-auto overscroll-contain px-3 py-3"
            >
              <ul className="flex flex-col gap-0.5">
                {items.map(({ href, label }) => {
                  const active = isActivePath(pathname, href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-[52px] items-center rounded-lg px-4 text-[1.05rem] font-semibold tracking-wide transition ${
                          active
                            ? "border-l-[3px] border-accent-warm bg-accent/10 pl-[calc(1rem-3px)] text-accent-deep"
                            : "border-l-[3px] border-transparent text-ink hover:bg-accent/6 hover:text-accent-deep"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-4 border-t border-accent/12 px-5 py-5">
              <a
                href={`tel:${phoneTel}`}
                className="btn btn-warm w-full justify-center text-base"
              >
                <PiPhoneCallFill aria-hidden size={20} />
                <span>{callCta}</span>
                <span className="sr-only"> — {phoneDisplay}</span>
              </a>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink-muted">
                  {languageLabel}
                </span>
                {languageSwitcher}
              </div>
            </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
