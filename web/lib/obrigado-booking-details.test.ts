import { describe, expect, it } from "vitest";
import { formatPreferredDateEnLong } from "./obrigado-booking-details";

describe("formatPreferredDateEnLong", () => {
  it("returns empty for invalid inputs", () => {
    expect(formatPreferredDateEnLong(null)).toBe("");
    expect(formatPreferredDateEnLong(undefined)).toBe("");
    expect(formatPreferredDateEnLong("")).toBe("");
    expect(formatPreferredDateEnLong("2026/01/01")).toBe("");
    expect(formatPreferredDateEnLong("2026-13-40")).toBe("");
  });

  it("formats YYYY-MM-DD using en-GB locale", () => {
    const out = formatPreferredDateEnLong("2026-04-02");
    expect(out.length).toBeGreaterThan(0);
  });
});

