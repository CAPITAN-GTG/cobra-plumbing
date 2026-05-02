/** Primary nav routes; labels live under `nav.*` in locale JSON. */
export const NAV_ITEMS = [
  { href: "/", key: "nav.home" as const },
  { href: "/services", key: "nav.services" as const },
  { href: "/service-areas", key: "nav.serviceAreas" as const },
  { href: "/about", key: "nav.about" as const },
  { href: "/contact", key: "nav.contact" as const },
] as const;

/** Href-only list for sitemap and static discovery. */
export const SITE_NAV_HREFS = NAV_ITEMS.map((item) => item.href);
