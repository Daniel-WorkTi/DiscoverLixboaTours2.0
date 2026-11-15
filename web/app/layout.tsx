import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { getRequestLocale } from "@/lib/i18n/server";
import { htmlLang } from "@/lib/i18n/types";
import {
  DEFAULT_OG_IMAGE,
  SEO_HOME,
  SITE_ORIGIN,
} from "@/lib/seo";
import "./globals.css";
import "./styles/booking-reservar.css";

/** Locale por pedido (header/cookie do middleware). */
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: SEO_HOME.en.title,
    template: "%s | DiscoverLixboaTours",
  },
  description: SEO_HOME.en.description,
  applicationName: "DiscoverLixboaTours",
  keywords: [
    "private tours Portugal",
    "private Sintra tour from Lisbon",
    "Sintra Cascais day trip",
    "private Lisbon tour",
    "Fátima day trip from Lisbon",
    "private driver guide Portugal",
    "English speaking tour guide Lisbon",
    "hotel pickup Lisbon tours",
  ],
  authors: [{ name: "DiscoverLixboaTours" }],
  creator: "DiscoverLixboaTours",
  publisher: "DiscoverLixboaTours",
  category: "travel",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/images/brand/logo-mark.png", type: "image/png", sizes: "128x128" },
    ],
    apple: "/assets/images/brand/logo-mark.png",
  },
  openGraph: {
    title: SEO_HOME.en.title,
    description: SEO_HOME.en.description,
    url: SITE_ORIGIN,
    siteName: "DiscoverLixboaTours",
    locale: "en_US",
    alternateLocale: ["pt_PT"],
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "DiscoverLixboaTours" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_HOME.en.title,
    description: SEO_HOME.en.description,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={htmlLang(locale)}
      className={GeistSans.variable}
      data-lang={locale}
    >
      <body className={GeistSans.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
