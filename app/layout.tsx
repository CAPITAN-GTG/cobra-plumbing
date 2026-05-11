import type { Metadata, Viewport } from "next";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getLocale, getTranslator } from "@/lib/i18n/server";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Zalando Sans SemiExpanded is not yet in the Next.js bundled Google Fonts
// metadata, so we load it via `<link>` tags. React 19 hoists these into
// `<head>` automatically when rendered inside a server layout.

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getTranslator();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: BUSINESS_NAME,
      template: `%s | ${BUSINESS_NAME}`,
    },
    description: t("meta.root.description"),
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const { t } = await getTranslator();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Zalando+Sans+SemiExpanded:ital,wght@0,200..900;1,200..900&display=swap"
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-surface text-ink antialiased">
        <LocalBusinessJsonLd />
        <a href="#main-content" className="sr-only">
          {t("common.skipToMain")}
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
