import Link from "next/link";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdminLogoutButton } from "./AdminLogoutButton";
import { BookingsClient } from "./ui";

export const dynamic = "force-dynamic";

export default async function AdminReservasPage() {
  if (!(await isAdminRequestAuthenticated())) {
    redirect("/admin/login?next=/admin/reservas");
  }

  return (
    <main className="admin-main">
      <div className="admin-shell admin-shell--dashboard admin-stack">
        <div className="admin-header-row">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">Ao vivo</Badge>
              <Badge variant="outline">Stripe + Calendar</Badge>
            </div>
            <div>
              <h1 className="admin-hero-title">Reservas</h1>
              <p className="admin-lead">
                Lista atualizada a partir do Google Calendar (eventos criados pelo webhook após
                pagamento).
              </p>
            </div>
          </div>

          <div className="admin-actions shrink-0">
            <Button asChild variant="outline" size="lg">
              <Link href="/">Voltar ao site</Link>
            </Button>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="admin-divider" role="presentation" />

        <section className="admin-surface">
          <div className="admin-surface__head text-left">
            <h2 className="font-[family-name:var(--font-outfit)] text-[1.05rem] font-extrabold text-[#333] sm:text-lg">
              Pagamentos recentes
            </h2>
              <p className="mt-2 text-base leading-relaxed text-[#666]">
              Aceita ou recusa cada viagem paga. Contacta clientes por WhatsApp ou email com um clique.
              Atualização automática a cada 10 s.
            </p>
          </div>
          <div className="admin-divider" role="presentation" />
          <div className="admin-surface__body">
            <BookingsClient />
          </div>
        </section>
      </div>
    </main>
  );
}
