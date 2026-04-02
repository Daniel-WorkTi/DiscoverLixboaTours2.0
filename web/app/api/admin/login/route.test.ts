import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

describe("POST /api/admin/login", () => {
  const prevSecret = process.env.ADMIN_AUTH_SECRET;
  const prevPass = process.env.ADMIN_PASSWORD;

  beforeEach(() => {
    process.env.ADMIN_AUTH_SECRET = "unit-test-secret-key-min-length-ok";
    process.env.ADMIN_PASSWORD = "my-dashboard-pass";
  });

  afterEach(() => {
    process.env.ADMIN_AUTH_SECRET = prevSecret;
    process.env.ADMIN_PASSWORD = prevPass;
  });

  it("returns 401 for wrong password", async () => {
    const res = await POST(
      new Request("http://localhost/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "wrong" }),
      }),
    );
    expect(res.status).toBe(401);
  });

  it("returns 200 and sets cookie on success", async () => {
    const res = await POST(
      new Request("http://localhost/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: "my-dashboard-pass" }),
      }),
    );
    expect(res.status).toBe(200);
    const data = (await res.json()) as { ok?: boolean };
    expect(data.ok).toBe(true);
    const setCookie = res.headers.get("set-cookie") || "";
    expect(setCookie).toContain("dl_admin=");
  });
});
