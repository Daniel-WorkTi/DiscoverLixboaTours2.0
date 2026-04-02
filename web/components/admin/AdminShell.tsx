import Image from "next/image";
import Link from "next/link";

type AdminShellProps = {
  children: React.ReactNode;
};

/**
 * Fundo e marca Discover Lixboa (laranja · branco · preto) para /admin.
 * Usa tokens shadcn em globals.css (--primary, --background, etc.).
 */
export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(var(--background))]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,hsl(24_95%_53%/0.14),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-32 h-[28rem] w-[28rem] rounded-full bg-[hsl(24_95%_53%/0.09)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-32 h-[22rem] w-[22rem] rounded-full bg-black/[0.04] blur-3xl"
      />

      <div className="h-1.5 w-full bg-[hsl(var(--primary))]" />

      <header className="relative z-20 border-b border-black/[0.06] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-4 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-3 text-black transition-opacity hover:opacity-85"
          >
            <Image
              src="/assets/images/hero/logo.png.webp"
              alt="Discover Lixboa Tours"
              width={160}
              height={64}
              className="h-12 w-auto object-contain"
              priority
            />
            <span className="hidden text-left sm:block">
              <span className="block text-xs font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
                Admin
              </span>
              <span className="text-sm font-extrabold text-black">Discover Lixboa Tours</span>
            </span>
          </Link>
          <p className="text-center text-xs text-black/50 sm:text-right">
            Laranja · branco · preto
          </p>
        </div>
      </header>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
