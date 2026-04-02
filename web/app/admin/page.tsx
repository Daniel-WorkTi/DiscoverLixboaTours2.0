import { redirect } from "next/navigation";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** Evita 404 em /admin — redireciona consoante sessão. */
export default async function AdminIndexPage() {
  if (await isAdminRequestAuthenticated()) {
    redirect("/admin/reservas");
  }
  redirect("/admin/login");
}
