import { LoginForm } from "./ui";

export const dynamic = "force-dynamic";

function redirectAfterLoginFromSearchParams(next: unknown): string {
  const raw = typeof next === "string" ? next : Array.isArray(next) ? next[0] : "";
  const t = String(raw ?? "").trim();
  if (!t.startsWith("/") || t.startsWith("//")) return "/admin/reservas";
  if (!t.startsWith("/admin")) return "/admin/reservas";
  return t;
}

type PageProps = { searchParams: Promise<{ next?: string | string[] }> };

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const redirectAfterLogin = redirectAfterLoginFromSearchParams(sp.next);

  return (
    <main className="admin-main">
      <div className="admin-shell admin-shell--narrow admin-stack">
        <div className="admin-hero">
          <h1 className="admin-hero-title">Entrar</h1>
        </div>

        <div className="admin-surface">
          <div className="admin-surface__head text-left">
            <h2 className="font-[family-name:var(--font-outfit)] text-[1.05rem] font-extrabold text-[#333] sm:text-lg">
              Dashboard admin
            </h2>
            <p className="mt-2 text-base leading-relaxed text-[#666]">
              Acesso à gestão de reservas: vê pagamentos, contacta clientes (email, WhatsApp, telefone) e
              confirma ou recusa cada viagem a partir deste painel.
            </p>
          </div>
          <div className="admin-divider" role="presentation" />
          <div className="admin-surface__body">
            <LoginForm redirectAfterLogin={redirectAfterLogin} />
          </div>
        </div>
      </div>
    </main>
  );
}
