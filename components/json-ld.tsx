import { BUSINESS_NAME, PHONE_TEL, SITE_URL } from "@/lib/site";

/** LocalBusiness / Plumber schema for search visibility; extend when address is finalized. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: BUSINESS_NAME,
    telephone: PHONE_TEL,
    url: SITE_URL,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "San Fernando Valley and greater Los Angeles County",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
