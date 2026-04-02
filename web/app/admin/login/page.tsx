import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "./ui";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
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
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

