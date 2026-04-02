import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <main className="min-h-screen bg-[hsl(var(--background))] px-5 py-10">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-11 w-11 rounded-2xl bg-[hsl(var(--primary))] shadow-sm" />
          <h1 className="text-2xl font-extrabold text-black">Dashboard</h1>
          <p className="mt-1 text-sm text-black/60">Discover Lixboa Tours</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your password to view bookings.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm redirectAfterLogin={redirectAfterLogin} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

