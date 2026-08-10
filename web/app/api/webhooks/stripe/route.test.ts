import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const stripeHoisted = vi.hoisted(() => ({
  constructEvent: vi.fn(),
}));

vi.mock("@/lib/stripe-server", () => ({
  getStripe: () => ({
    webhooks: {
      constructEvent: stripeHoisted.constructEvent,
    },
  }),
}));

const gcHoisted = vi.hoisted(() => ({
  createBookingCalendarEvent: vi.fn(),
  hasCalendarEventForStripeSession: vi.fn(),
  isGoogleCalendarConfigured: vi.fn(() => true),
}));

vi.mock("@/lib/google-calendar", () => ({
  createBookingCalendarEvent: gcHoisted.createBookingCalendarEvent,
  hasCalendarEventForStripeSession: gcHoisted.hasCalendarEventForStripeSession,
  isGoogleCalendarConfigured: () => gcHoisted.isGoogleCalendarConfigured(),
}));

const emailHoisted = vi.hoisted(() => ({
  sendOwnerBookingNotification: vi.fn(),
  isBookingEmailConfigured: vi.fn(() => false),
}));

vi.mock("@/lib/booking-notify-email", () => ({
  sendOwnerBookingNotification: emailHoisted.sendOwnerBookingNotification,
  isBookingEmailConfigured: () => emailHoisted.isBookingEmailConfigured(),
}));

import { POST } from "./route";

describe("POST /api/webhooks/stripe", () => {
  const prevWhsec = process.env.STRIPE_WEBHOOK_SECRET;

  beforeEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_123";
    stripeHoisted.constructEvent.mockReset();
    gcHoisted.createBookingCalendarEvent.mockReset();
    gcHoisted.hasCalendarEventForStripeSession.mockReset();
    gcHoisted.isGoogleCalendarConfigured.mockReturnValue(true);
    gcHoisted.hasCalendarEventForStripeSession.mockResolvedValue(false);
    emailHoisted.sendOwnerBookingNotification.mockReset();
    emailHoisted.isBookingEmailConfigured.mockReturnValue(false);
  });

  afterEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = prevWhsec;
  });

  it("returns 500 when STRIPE_WEBHOOK_SECRET is missing", async () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const res = await POST(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body: "{}",
        headers: { "stripe-signature": "sig" },
      }),
    );
    expect(res.status).toBe(500);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_123";
  });

  it("returns 400 without stripe-signature", async () => {
    const res = await POST(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body: "{}",
      }),
    );
    expect(res.status).toBe(400);
  });

  it("on checkout.session.completed (payment), creates calendar event with correct payload", async () => {
    const session = {
      id: "cs_test_booking1",
      mode: "payment" as const,
      metadata: {
        preferred_date: "2026-12-20",
        tour_label: "Lisboa tour",
        quantity: "8",
        customer_name: "Lucas",
        phone: "+351911111111",
        notes: "Hotel pickup",
      },
      customer_email: "lucas@example.com",
      amount_total: 9900,
      currency: "eur",
    };

    stripeHoisted.constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: session },
    });

    const raw = JSON.stringify({ type: "checkout.session.completed" });
    const res = await POST(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body: raw,
        headers: { "stripe-signature": "t=1,v1=abc" },
      }),
    );

    expect(res.status).toBe(200);
    const json = (await res.json()) as { received?: boolean };
    expect(json.received).toBe(true);

    expect(stripeHoisted.constructEvent).toHaveBeenCalledWith(
      raw,
      "t=1,v1=abc",
      "whsec_test_123",
    );

    expect(gcHoisted.hasCalendarEventForStripeSession).toHaveBeenCalledWith("cs_test_booking1");
    expect(gcHoisted.createBookingCalendarEvent).toHaveBeenCalledTimes(1);
    expect(gcHoisted.createBookingCalendarEvent).toHaveBeenCalledWith({
      tourLabel: "Lisboa tour",
      customerName: "Lucas",
      email: "lucas@example.com",
      phone: "+351911111111",
      notes: "Hotel pickup",
      quantity: 8,
      preferredDate: "2026-12-20",
      stripeSessionId: "cs_test_booking1",
      totalCents: 9900,
      currency: "eur",
    });
  });

  it("skips calendar insert when event already exists (idempotency)", async () => {
    const session = {
      id: "cs_test_dup",
      mode: "payment" as const,
      metadata: {
        preferred_date: "2026-12-21",
        tour_label: "Porto",
        quantity: "1",
        customer_name: "Ana",
        phone: "",
        notes: "",
      },
      customer_email: "a@b.com",
    };

    stripeHoisted.constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: session },
    });

    gcHoisted.hasCalendarEventForStripeSession.mockResolvedValue(true);

    const res = await POST(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body: "{}",
        headers: { "stripe-signature": "sig" },
      }),
    );

    expect(res.status).toBe(200);
    expect(gcHoisted.createBookingCalendarEvent).not.toHaveBeenCalled();
  });

  it("does not create calendar when preferred_date is invalid", async () => {
    const session = {
      id: "cs_test_bad",
      mode: "payment" as const,
      metadata: {
        preferred_date: "not-a-date",
        tour_label: "X",
        quantity: "1",
        customer_name: "A",
      },
      customer_email: "a@b.com",
    };

    stripeHoisted.constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: session },
    });

    await POST(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body: "{}",
        headers: { "stripe-signature": "sig" },
      }),
    );

    expect(gcHoisted.createBookingCalendarEvent).not.toHaveBeenCalled();
  });

  it("sends owner email when Resend is configured", async () => {
    emailHoisted.isBookingEmailConfigured.mockReturnValue(true);

    const session = {
      id: "cs_test_email",
      mode: "payment" as const,
      metadata: {
        preferred_date: "2026-07-01",
        tour_label: "Sintra",
        quantity: "2",
        customer_name: "B",
        phone: "",
        notes: "",
      },
      customer_email: "c@d.com",
    };

    stripeHoisted.constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: { object: session },
    });

    gcHoisted.isGoogleCalendarConfigured.mockReturnValue(false);

    await POST(
      new Request("http://localhost/api/webhooks/stripe", {
        method: "POST",
        body: "{}",
        headers: { "stripe-signature": "sig" },
      }),
    );

    expect(emailHoisted.sendOwnerBookingNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        tourLabel: "Sintra",
        email: "c@d.com",
        stripeSessionId: "cs_test_email",
      }),
    );
  });
});
