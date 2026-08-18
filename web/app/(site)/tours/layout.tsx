import type { ReactNode } from "react";
import "@/app/styles/destino-tour.css";

export default function ToursLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* CSS legado do layout de destino — preserva o visual das páginas de tour */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/assets/css/destino.css" />
      {children}
    </>
  );
}
