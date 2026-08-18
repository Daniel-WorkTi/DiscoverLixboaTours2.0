import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Outfit } from "next/font/google";
import Script from "next/script";
import { TranslateBridge } from "@/components/TranslateBridge";
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
      <body suppressHydrationWarning>
        <Script id="dl-lang-boot" strategy="beforeInteractive">{`
(function(){
  try {
    var p = location.pathname;
    var fromPath = (p === "/en" || p.indexOf("/en/") === 0) ? "en" : null;
    var m = document.cookie.match(/(?:^|; )dl_lang=(pt|en)/);
    var fromCookie = m ? m[1] : null;
    var fromStore = null;
    try { fromStore = localStorage.getItem("language"); } catch (e) {}
    var lang = fromPath || fromStore || fromCookie || "pt";
    if (lang !== "pt" && lang !== "en") lang = "pt";
    document.documentElement.lang = lang === "en" ? "en" : "pt-PT";
    document.documentElement.setAttribute("data-lang", lang);
  } catch (e) {}
})();
        `}</Script>
        <TranslateBridge />
        {children}
        {/* Legado: ainda usado por HTML de tours não migrados e páginas com data-translate */}
        <Script src="/assets/js/translate.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
