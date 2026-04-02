import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <main className="px-5 pb-20 pt-10">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="text-center">
          <Badge className="mb-4 shadow-sm" variant="secondary">
            Painel · reservas
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-black">Entrar</h1>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
            Palavra-passe de administrador (variável{" "}
            <code className="rounded-md bg-black/[0.06] px-1.5 py-0.5 text-xs font-semibold text-black/80">
              ADMIN_PASSWORD
            </code>
            ).
          </p>
        </div>

        <Card className="overflow-hidden border-black/[0.08] shadow-lg shadow-black/[0.06]">
          <CardHeader className="space-y-1 bg-gradient-to-br from-white to-orange-50/40 pb-4">
            <CardTitle className="text-xl">Acesso ao dashboard</CardTitle>
            <CardDescription>
              Laranja, branco e preto — mesmo estilo shadcn/ui do projeto.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <LoginForm redirectAfterLogin={redirectAfterLogin} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
