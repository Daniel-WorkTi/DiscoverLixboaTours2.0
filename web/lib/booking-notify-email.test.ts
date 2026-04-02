import { describe, expect, it } from "vitest";
import { buildBookingEmailPlainText } from "./booking-notify-email";

describe("buildBookingEmailPlainText", () => {
  it("includes all booking fields", () => {
    const text = buildBookingEmailPlainText({
      tourLabel: "Sintra",
      customerName: "João",
      email: "j@x.com",
      phone: "+351900000000",
      notes: "Sem gluten",
      quantity: 3,
      preferredDate: "2026-08-01",
      stripeSessionId: "cs_live_xyz",
    });
    expect(text).toContain("Sintra");
    expect(text).toContain("João");
    expect(text).toContain("j@x.com");
    expect(text).toContain("Sem gluten");
    expect(text).toContain("2026-08-01");
    expect(text).toContain("3");
    expect(text).toContain("cs_live_xyz");
  });
});
