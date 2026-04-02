import { describe, expect, it } from "vitest";
import {
  isValidStripeCheckoutSessionId,
  STRIPE_CHECKOUT_SESSION_ID_RE,
} from "./stripe-checkout-session-id";

describe("isValidStripeCheckoutSessionId (segurança / anti-forja)", () => {
  it("aceita IDs no formato Stripe Checkout (cs_ + alfanumérico e _)", () => {
    expect(isValidStripeCheckoutSessionId("cs_test_a1B2")).toBe(true);
    expect(isValidStripeCheckoutSessionId("cs_live_xyz_123")).toBe(true);
  });

  it("rejeita vazio e só espaços", () => {
    expect(isValidStripeCheckoutSessionId("")).toBe(false);
    expect(isValidStripeCheckoutSessionId("   ")).toBe(false);
  });

  it("rejeita open-redirect / URLs (não passam à API Stripe como session id)", () => {
    expect(isValidStripeCheckoutSessionId("https://evil.example/cs_test")).toBe(
      false,
    );
    expect(isValidStripeCheckoutSessionId("//evil.example")).toBe(false);
    expect(isValidStripeCheckoutSessionId("javascript:alert(1)")).toBe(false);
  });

  it("rejeita prefixos errados e path traversal", () => {
    expect(isValidStripeCheckoutSessionId("pi_123")).toBe(false);
    expect(isValidStripeCheckoutSessionId("cs_../admin")).toBe(false);
    expect(isValidStripeCheckoutSessionId("cs_test\n")).toBe(false);
    expect(isValidStripeCheckoutSessionId("cs_test\t")).toBe(false);
  });

  it("rejeita caracteres fora do conjunto permitido (Unicode, hífens)", () => {
    expect(isValidStripeCheckoutSessionId("cs_test–unicode")).toBe(false);
    expect(isValidStripeCheckoutSessionId("cs_test-unicode")).toBe(false);
  });

  it("regex documentada: não aceita espaços no meio", () => {
    expect(STRIPE_CHECKOUT_SESSION_ID_RE.test("cs_test x")).toBe(false);
  });
});
