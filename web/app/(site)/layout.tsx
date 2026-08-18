import { SiteChrome } from "@/components/SiteChrome";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { getRequestLocale } from "@/lib/i18n/server";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();

  return (
    <LocaleProvider locale={locale}>
      <SiteChrome>{children}</SiteChrome>
    </LocaleProvider>
  );
}
