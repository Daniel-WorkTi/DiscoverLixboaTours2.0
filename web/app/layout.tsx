import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Outfit } from "next/font/google";
import Script from "next/script";
import { TranslateBridge } from "@/components/TranslateBridge";
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
  title: "Discover Portugal Tours - Aventuras Personalizadas em Portugal",
  description:
    "Tours autênticos em Portugal com guias locais. Sintra, Cascais, Lisboa, Porto, Algarve e mais.",
  icons: {
    icon: "/assets/images/hero/logo.png.webp",
    apple: "/assets/images/hero/logo.png.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className={`${hanken.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning>
        <TranslateBridge />
        {children}
        <Script src="/assets/js/translate.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
