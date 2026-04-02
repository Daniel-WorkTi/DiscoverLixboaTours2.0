"use client";

import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  return (
    <form
      action="/api/admin/logout"
      method="post"
      onSubmit={(e) => {
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
  );
}
