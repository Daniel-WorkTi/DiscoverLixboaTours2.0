import { Badge } from "@/components/ui/badge";
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
          <Badge className="mb-3 shadow-sm" variant="secondary">
            Painel · reservas
          </Badge>
          <h1 className="admin-hero-title">Entrar</h1>
          <p className="admin-lead mx-auto">
            Palavra-passe de administrador (variável{" "}
            <code className="rounded-md bg-black/[0.06] px-1.5 py-0.5 text-[0.85rem] font-semibold text-[#444]">
              ADMIN_PASSWORD
            </code>
            ).
          </p>
        </div>

        <div className="admin-surface">
          <div className="admin-surface__head text-left">
            <h2 className="font-[family-name:var(--font-outfit)] text-[1.05rem] font-extrabold text-[#333] sm:text-lg">
              Acesso ao dashboard
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#666]">
              Mesmo espaçamento e cartões que a página de reserva / obrigado.
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
