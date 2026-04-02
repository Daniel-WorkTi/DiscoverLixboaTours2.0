import Link from "next/link";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingsClient } from "./ui";

export const dynamic = "force-dynamic";

export default async function AdminReservasPage() {
  if (!(await isAdminRequestAuthenticated())) {
    redirect("/admin/login?next=/admin/reservas");
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] px-5 py-10">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-extrabold text-white">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
              Live
            </div>
            <h1 className="mt-3 text-3xl font-extrabold text-black">Bookings</h1>
            <p className="mt-1 text-sm text-black/60">
              Orange / white / black dashboard. Simple and fast.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/">Back to site</Link>
            </Button>
            <form
              action="/api/admin/logout"
              method="post"
              onSubmit={(e) => {
                // allow normal post; client navigation after
                e.preventDefault();
                fetch("/api/admin/logout", { method: "POST" }).finally(() => {
                  window.location.href = "/admin/login";
                });
              }}
            >
              <Button type="submit" variant="secondary">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Recent paid bookings</CardTitle>
            <CardDescription>
              Pulled from Google Calendar events created by the Stripe webhook.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookingsClient />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

