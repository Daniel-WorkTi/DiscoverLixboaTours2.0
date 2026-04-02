import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { getSiteBaseUrl } from "./site-url";

describe("getSiteBaseUrl", () => {
  const keys = [
    "NEXT_PUBLIC_SITE_URL",
    "VERCEL_URL",
    "URL",
    "DEPLOY_PRIME_URL",
  ] as const;
  const snapshot: Partial<Record<(typeof keys)[number], string | undefined>> = {};

  beforeEach(() => {
    for (const k of keys) {
      snapshot[k] = process.env[k];
      delete process.env[k];
    }
  });

  afterEach(() => {
    for (const k of keys) {
      if (snapshot[k] === undefined) delete process.env[k];
      else process.env[k] = snapshot[k];
    }
  });

  it("uses NEXT_PUBLIC_SITE_URL when set", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
    expect(getSiteBaseUrl()).toBe("https://example.com");
  });

  it("falls back to localhost when nothing is set", () => {
    expect(getSiteBaseUrl()).toBe("http://localhost:3000");
  });

  it("uses VERCEL_URL when explicit URL missing", () => {
    process.env.VERCEL_URL = "my-app.vercel.app";
    expect(getSiteBaseUrl()).toBe("https://my-app.vercel.app");
  });
});
