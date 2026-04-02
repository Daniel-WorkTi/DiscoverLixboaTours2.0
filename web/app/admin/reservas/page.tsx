import Link from "next/link";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AdminLogoutButton } from "./AdminLogoutButton";
import { BookingsClient } from "./ui";

export const dynamic = "force-dynamic";

export default async function AdminReservasPage() {
  if (!(await isAdminRequestAuthenticated())) {
    redirect("/admin/login?next=/admin/reservas");
  }

  return (
    <main className="px-5 pb-20 pt-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">Ao vivo</Badge>
              <Badge variant="outline">Stripe + Calendar</Badge>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-black">Reservas</h1>
              <p className="mt-1 max-w-xl text-sm text-[hsl(var(--muted-foreground))]">
                Lista atualizada a partir do Google Calendar (eventos criados pelo webhook após
                pagamento).
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/">Voltar ao site</Link>
            </Button>
            <AdminLogoutButton />
          </div>
        </header>

        <Separator className="bg-black/10" />

        <Card className="overflow-hidden border-black/[0.08] shadow-md shadow-black/[0.05]">
          <CardHeader className="space-y-1 bg-gradient-to-br from-white via-white to-orange-50/30 pb-2">
            <CardTitle className="text-xl">Pagamentos recentes</CardTitle>
            <CardDescription>
              Pesquisa, atualização automática a cada 10 s e alertas do browser (opcional).
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <BookingsClient />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
