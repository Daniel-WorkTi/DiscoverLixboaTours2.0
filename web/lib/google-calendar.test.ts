import { describe, expect, it } from "vitest";
import {
  MAX_BOOKINGS_PER_DAY,
  addOneDayYmd,
  buildBookingCalendarDescription,
  type BookingCalendarPayload,
} from "./google-calendar";

describe("addOneDayYmd", () => {
  it("adds one calendar day", () => {
    expect(addOneDayYmd("2026-04-02")).toBe("2026-04-03");
  });

  it("handles month rollover", () => {
    expect(addOneDayYmd("2026-04-30")).toBe("2026-05-01");
  });
});

describe("buildBookingCalendarDescription", () => {
  const base: BookingCalendarPayload = {
    tourLabel: "Lisboa",
    customerName: "Ana Silva",
    email: "ana@example.com",
    phone: "+351 912 345 678",
    notes: "Pickup Rossio",
    quantity: 2,
    preferredDate: "2026-06-10",
    stripeSessionId: "cs_test_abc",
  };

  it("includes tour, customer, Stripe session and notes", () => {
    const text = buildBookingCalendarDescription(base);
    expect(text).toContain("Lisboa");
    expect(text).toContain("Ana Silva");
    expect(text).toContain("ana@example.com");
    expect(text).toContain("Pickup Rossio");
    expect(text).toContain("cs_test_abc");
    expect(text).toContain("Pessoas: 2");
  });

  it("includes total when amount is present", () => {
    const text = buildBookingCalendarDescription({
      ...base,
      totalCents: 15050,
      currency: "eur",
    });
    expect(text).toContain("150.50");
    expect(text).toContain("EUR");
  });
});

describe("MAX_BOOKINGS_PER_DAY", () => {
  it("is 7", () => {
    expect(MAX_BOOKINGS_PER_DAY).toBe(7);
  });
});
