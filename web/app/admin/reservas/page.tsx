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
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="default" className="whitespace-nowrap px-4 py-1.5 text-[13px]">
                Ao vivo
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap px-4 py-1.5 text-[13px]">
                Stripe + Calendar
              </Badge>
            </div>
            <div>
              <h1 className="admin-page-title">Reservas</h1>
              <p className="admin-page-lead">
                Lista sincronizada com o Google Calendar (pagamentos confirmados no Stripe).
              </p>
            </div>
          </div>

          <div className="admin-actions shrink-0 pt-1">
            <Button asChild variant="outline" size="lg" className="rounded-full px-6 whitespace-nowrap">
              <Link href="/">Voltar ao site</Link>
            </Button>
            <AdminLogoutButton />
          </div>
        </div>

        <div className="admin-divider" role="presentation" />

        <section className="admin-surface">
          <div className="admin-surface__head text-left">
            <h2 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#333] sm:text-[1.05rem]">
              Pagamentos recentes
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#666] sm:text-[0.98rem]">
              Confirma ou recusa cada viagem; contacta clientes por WhatsApp ou email. Atualização
              automática a cada 10 s.
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
