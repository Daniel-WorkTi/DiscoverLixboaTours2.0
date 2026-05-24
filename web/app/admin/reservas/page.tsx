import Link from "next/link";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { isBookingEmailConfigured } from "@/lib/booking-notify-email";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdminLogoutButton } from "./AdminLogoutButton";
import { BookingsClient } from "./ui";

export const dynamic = "force-dynamic";

export default async function AdminReservasPage() {
  if (!(await isAdminRequestAuthenticated())) {
    redirect("/admin/login?next=/admin/reservas");
  }

  const emailConfigured = isBookingEmailConfigured();
  const notifyEmail = process.env.BOOKING_NOTIFY_EMAIL?.trim() || "";

  return (
    <main className="admin-main">
      <div className="admin-shell admin-shell--dashboard admin-stack">
        <header className="admin-header-row">
          <div className="min-w-0 space-y-3">
            <p className="admin-eyebrow">Painel admin</p>
            <h1 className="admin-page-title">Reservas</h1>
            <p className="admin-page-lead">
              Confirme ou recuse cada viagem paga. A lista atualiza automaticamente a cada 10
              segundos.
            </p>
            <p
              className={
                emailConfigured
                  ? "admin-status admin-status--ok"
                  : "admin-status admin-status--warn"
              }
              role="status"
            >
              {emailConfigured ? (
                <>
                  <strong>Email ativo:</strong> recebe um aviso em{" "}
                  <span className="font-semibold text-[#1d1d1f]">{notifyEmail}</span> quando um
                  cliente concluir o pagamento no Stripe.
                </>
              ) : (
                <>
                  <strong>Email inativo:</strong> configure{" "}
                  <code className="rounded bg-black/5 px-1.5 py-0.5 text-[0.85em]">
                    RESEND_API_KEY
                  </code>{" "}
                  e{" "}
                  <code className="rounded bg-black/5 px-1.5 py-0.5 text-[0.85em]">
                    BOOKING_NOTIFY_EMAIL
                  </code>{" "}
                  na Vercel (Resend) para receber notificações de novas reservas.
                </>
              )}
            </p>
          </div>

          <div className="admin-actions shrink-0">
            <Button asChild variant="outline" size="lg" className="rounded-full px-6">
              <Link href="/">Voltar ao site</Link>
            </Button>
            <AdminLogoutButton />
          </div>
        </header>

        <BookingsClient />
      </div>
    </main>
  );
}
