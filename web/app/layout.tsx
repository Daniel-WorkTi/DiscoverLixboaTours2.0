import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Outfit } from "next/font/google";
import { getRequestLocale } from "@/lib/i18n/server";
import { htmlLang } from "@/lib/i18n/types";
import "./globals.css";
import "./styles/booking-reservar.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

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
    icon: "/assets/images/hero/logo.png.webp",
    apple: "/assets/images/hero/logo.png.webp",
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
    <html lang={htmlLang(locale)} className={`${hanken.variable} ${outfit.variable}`} data-lang={locale}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
