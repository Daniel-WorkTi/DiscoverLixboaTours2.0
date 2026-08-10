import { describe, expect, it } from "vitest";
import { validateCheckoutPayload } from "./checkout-payload-validation";

const baseGood = {
  tourId: "lisboa",
  quantity: 2,
  preferredDate: "2026-06-01",
  customerName: "Maria Silva",
  email: "maria@example.com",
  phone: "+351 912 345 678",
  notes: "Janela manhã",
};

describe("validateCheckoutPayload (QA + segurança)", () => {
  it("aceita payload mínimo válido", () => {
    const r = validateCheckoutPayload(baseGood);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.tourLabel).toBe("Lisboa");
    expect(r.data.email).toBe("maria@example.com");
  });

  it("rejeita tour inexistente ou injeção em tourId", () => {
    expect(validateCheckoutPayload({ ...baseGood, tourId: "evil" }).ok).toBe(
      false,
    );
    expect(
      validateCheckoutPayload({
        ...baseGood,
        tourId: "<script>alert(1)</script>",
      }).ok,
    ).toBe(false);
  });

  it("rejeita corpo não-objeto (não vaza estrutura interna)", () => {
    const s = validateCheckoutPayload("string");
    expect(s.ok).toBe(false);
    if (s.ok) return;
    expect(s.failure.body.code).toBe("INVALID_JSON");
  });

  it("rejeita email inválido e normaliza maiúsculas", () => {
    const bad = validateCheckoutPayload({
      ...baseGood,
      email: "não-email",
    });
    expect(bad.ok).toBe(false);

    const ok = validateCheckoutPayload({
      ...baseGood,
      email: "Teste@Example.COM",
    });
    expect(ok.ok).toBe(true);
    if (ok.ok) expect(ok.data.email).toBe("teste@example.com");
  });

  it("rejeita nome curto ou data em falta", () => {
    expect(
      validateCheckoutPayload({ ...baseGood, customerName: "A" }).ok,
    ).toBe(false);
    expect(
      validateCheckoutPayload({ ...baseGood, preferredDate: "" }).ok,
    ).toBe(false);
  });

  it("rejeita quantidade acima do máximo bookable do tour (Lisboa = 7)", () => {
    const highLisboa = validateCheckoutPayload({ ...baseGood, quantity: 8 });
    expect(highLisboa.ok).toBe(false);
    if (!highLisboa.ok) {
      expect(highLisboa.failure.body.code).toBe("UNSUPPORTED_QUANTITY");
    }

    const highSintra = validateCheckoutPayload({
      ...baseGood,
      tourId: "sintra-cascais",
      quantity: 8,
    });
    expect(highSintra.ok).toBe(true);
    if (highSintra.ok) expect(highSintra.data.quantity).toBe(8);

    const overflow = validateCheckoutPayload({
      ...baseGood,
      tourId: "sintra-cascais",
      quantity: 9,
    });
    expect(overflow.ok).toBe(true);
    if (overflow.ok) expect(overflow.data.quantity).toBe(8);

    const low = validateCheckoutPayload({ ...baseGood, quantity: 0 });
    expect(low.ok).toBe(true);
    if (low.ok) expect(low.data.quantity).toBe(1);
  });

  it("trunca campos longos para metadados Stripe seguros", () => {
    const longName = "x".repeat(200);
    const longNotes = "n".repeat(2000);
    const r = validateCheckoutPayload({
      ...baseGood,
      customerName: longName,
      notes: longNotes,
      phone: "p".repeat(100),
    });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.data.customerName.length).toBe(120);
    expect(r.data.notes.length).toBe(500);
    expect(r.data.phone.length).toBe(48);
  });
});
