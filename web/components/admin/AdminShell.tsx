import Image from "next/image";
import Link from "next/link";

type AdminShellProps = {
  children: React.ReactNode;
};

/**
 * Cabeçalho alinhado ao .main-header / .header-content do site (max-width 1400px, padding clamp).
 * O fundo da página usa #f9f9f9 via .admin-main (admin.css), como .reservar-main.
 */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <header className="sticky top-0 z-30 border-b border-[#eee] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-3 px-[clamp(1.5rem,4vw,3rem)] py-4 sm:flex-row sm:py-5">
          <Link
            href="/"
            className="flex items-center gap-3 text-[#333] no-underline transition-opacity hover:opacity-85"
          >
            <Image
              src="/assets/images/hero/logo.png.webp"
              alt="Discover Lixboa Tours"
              width={200}
              height={80}
              className="h-[72px] w-auto object-contain sm:h-20"
              priority
            />
            <span className="hidden text-left sm:block">
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#ff6600]">
                Admin
              </span>
              <span className="text-sm font-bold text-[#333]">Discover Lixboa Tours</span>
            </span>
          </Link>
          <nav className="text-center text-sm font-semibold text-[#555] sm:text-right">
            <span className="text-[#ff6600]">Painel de reservas</span>
          </nav>
        </div>
        {/* Mesma ideia do .main-header::after em site.css */}
        <div
          aria-hidden
          className="h-0.5 w-full bg-[linear-gradient(90deg,rgba(255,102,0,0.25)_0%,rgba(255,102,0,0.08)_25%,transparent_50%,rgba(255,102,0,0.08)_75%,rgba(255,102,0,0.25)_100%)]"
        />
      </header>

      <div>{children}</div>
    </div>
  );
}
