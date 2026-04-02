import { describe, expect, it } from "vitest";
import { digitsForWhatsApp, whatsappUrlForCustomerPhone } from "./whatsapp";

describe("digitsForWhatsApp", () => {
  it("normalizes PT 9 digits to 351…", () => {
    expect(digitsForWhatsApp("912 345 678")).toBe("351912345678");
  });

  it("keeps full E.164 digits", () => {
    expect(digitsForWhatsApp("+351 912 345 678")).toBe("351912345678");
  });
});

describe("whatsappUrlForCustomerPhone", () => {
  it("returns wa.me when phone ok", () => {
    const u = whatsappUrlForCustomerPhone("912345678", {
      customerName: "Ana Costa",
      tourLabel: "Sintra",
      preferredDate: "2026-06-01",
    });
    expect(u).toContain("https://wa.me/351912345678");
    expect(u).toContain("text=");
  });

  it("returns null without digits", () => {
    expect(whatsappUrlForCustomerPhone("")).toBeNull();
  });
});
