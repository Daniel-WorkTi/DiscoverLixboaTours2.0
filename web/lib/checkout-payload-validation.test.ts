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

  it("aceita 8 passageiros em todos os tours bookable e rejeita 9 (clamp)", () => {
    const lisboa8 = validateCheckoutPayload({ ...baseGood, quantity: 8 });
    expect(lisboa8.ok).toBe(true);
    if (lisboa8.ok) expect(lisboa8.data.quantity).toBe(8);

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

  it("rejeita quantidade abaixo do mínimo bookable (Aveiro/Monsanto/Alentejo = 2)", () => {
    for (const tourId of ["aveiro", "monsanto", "alentejo"] as const) {
      const solo = validateCheckoutPayload({
        ...baseGood,
        tourId,
        quantity: 1,
      });
      expect(solo.ok).toBe(false);
      if (!solo.ok) {
        expect(solo.failure.body.code).toBe("UNSUPPORTED_QUANTITY");
      }

      const pair = validateCheckoutPayload({
        ...baseGood,
        tourId,
        quantity: 2,
      });
      expect(pair.ok).toBe(true);
      if (pair.ok) expect(pair.data.quantity).toBe(2);
    }

    const aveiro8 = validateCheckoutPayload({
      ...baseGood,
      tourId: "aveiro",
      quantity: 8,
    });
    expect(aveiro8.ok).toBe(true);
    if (aveiro8.ok) expect(aveiro8.data.quantity).toBe(8);
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
