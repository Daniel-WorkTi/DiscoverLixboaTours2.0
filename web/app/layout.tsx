import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { getRequestLocale } from "@/lib/i18n/server";
import { htmlLang } from "@/lib/i18n/types";
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
  title: "DiscoverLixboaTours — Tours privados em Portugal",
  description:
    "Tours privados em Sintra, Lisboa e Portugal com guia local, itinerários flexíveis e veículo exclusivo.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/images/brand/logo-mark.png", type: "image/png", sizes: "128x128" },
    ],
    apple: "/assets/images/brand/logo-mark.png",
  },
  openGraph: {
    title: "DiscoverLixboaTours — Tours privados em Portugal",
    description:
      "Tours privados em Sintra, Lisboa e Portugal com guia local e veículo exclusivo.",
    locale: "pt_PT",
    alternateLocale: ["en_US"],
    type: "website",
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
