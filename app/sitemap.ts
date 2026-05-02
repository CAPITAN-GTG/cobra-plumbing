import type { MetadataRoute } from "next";
import { SITE_NAV_HREFS } from "@/lib/i18n/nav";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SITE_NAV_HREFS.map((href) => ({
    url: new URL(href, SITE_URL).toString(),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: href === "/" ? 1 : 0.8,
  }));
}
