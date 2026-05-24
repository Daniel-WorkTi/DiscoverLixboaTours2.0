import { SiteChrome } from "@/components/SiteChrome";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
