import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  adminSessionValue,
  isCookieValueAuthenticated,
  verifyAdminPassword,
} from "./admin-auth";

describe("admin-auth", () => {
  const prevSecret = process.env.ADMIN_AUTH_SECRET;
  const prevPass = process.env.ADMIN_PASSWORD;

  beforeEach(() => {
    process.env.ADMIN_AUTH_SECRET = "test-secret-at-least-16-chars!!";
    process.env.ADMIN_PASSWORD = "correct-horse-battery";
  });

  afterEach(() => {
    process.env.ADMIN_AUTH_SECRET = prevSecret;
    process.env.ADMIN_PASSWORD = prevPass;
  });

  it("verifyAdminPassword rejects wrong password", () => {
    expect(verifyAdminPassword("wrong")).toBe(false);
  });

  it("verifyAdminPassword accepts exact password", () => {
    expect(verifyAdminPassword("correct-horse-battery")).toBe(true);
  });

  it("round-trip: cookie value validates with isCookieValueAuthenticated", () => {
    const v = adminSessionValue();
    expect(isCookieValueAuthenticated(v)).toBe(true);
  });

  it("rejects tampered cookie", () => {
    const v = adminSessionValue();
    const tampered = v.replace(/.$/, "x");
    expect(isCookieValueAuthenticated(tampered)).toBe(false);
  });
});
