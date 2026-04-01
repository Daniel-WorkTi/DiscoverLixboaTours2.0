import { describe, expect, it } from "vitest";
import {
  OBRIGADO_SECURITY_BADGES,
  formatCheckoutSessionRefForDisplay,
} from "./obrigado-display";

describe("formatCheckoutSessionRefForDisplay", () => {
  it("devolve vazio para null/undefined/branco", () => {
    expect(formatCheckoutSessionRefForDisplay(null)).toBe("");
    expect(formatCheckoutSessionRefForDisplay(undefined)).toBe("");
    expect(formatCheckoutSessionRefForDisplay("   ")).toBe("");
  });

  it("não trunca IDs curtos", () => {
    expect(formatCheckoutSessionRefForDisplay("cs_test_abc")).toBe("cs_test_abc");
  });

  it("trunca IDs longos com reticências no meio", () => {
    const long =
      "cs_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6";
    const out = formatCheckoutSessionRefForDisplay(long);
    expect(out.length).toBeLessThan(long.length);
    expect(out).toContain("…");
    expect(out.startsWith("cs_live_a1b2c3d4e5")).toBe(true);
  });
});

describe("OBRIGADO_SECURITY_BADGES", () => {
  it("tem três entradas com id único", () => {
    expect(OBRIGADO_SECURITY_BADGES.length).toBe(3);
    const ids = OBRIGADO_SECURITY_BADGES.map((b) => b.id);
    expect(new Set(ids).size).toBe(3);
  });

  it("cada badge tem label e sub não vazios", () => {
    for (const b of OBRIGADO_SECURITY_BADGES) {
      expect(b.label.length).toBeGreaterThan(0);
      expect(b.sub.length).toBeGreaterThan(0);
    }
  });
});
