/** Edit NEXT_PUBLIC_SITE_URL in production for correct canonical URLs and JSON-LD. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cobraplumbing.com";

export const BUSINESS_NAME = "Cobra Plumbing";

/** Public path to the site logo (see `public/logo.jpg`). Square 1:1 aspect ratio. */
export const LOGO_SRC = "/logo.jpg";

export const PHONE_DISPLAY = "(818) 373-9407";

export const PHONE_TEL = "+18183739407";

/** Primary nav labels live in `messages/*.json` under `nav.*`; paths in `lib/i18n/nav.ts`. */
