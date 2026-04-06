import { describe, expect, it } from "vitest";
import {
  estimateFromTable,
  getPricingRuleFromTable,
} from "./tour-pricing-table";
import { toursBooking } from "./tours-booking";

function totalFromRule(
  tourId: string,
  qty: number,
): number | null {
  const r = getPricingRuleFromTable(tourId, qty);
  if (!r) return null;
  if (r.kind === "per_person") return r.centsPerPerson * qty;
  return r.centsTotal;
}

describe("Sintra & Cascais — faixas por pessoa", () => {
  it("checkout: 1–2 p. 120 €; 3–4 p. 110 €; 5–7 p. 100 €", () => {
    expect(getPricingRuleFromTable("sintra-cascais", 1)).toEqual({
      kind: "per_person",
      centsPerPerson: 12000,
    });
    expect(getPricingRuleFromTable("sintra-cascais", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 12000,
    });
    expect(getPricingRuleFromTable("sintra-cascais", 4)).toEqual({
      kind: "per_person",
      centsPerPerson: 11000,
    });
    expect(getPricingRuleFromTable("sintra-cascais", 7)).toEqual({
      kind: "per_person",
      centsPerPerson: 10000,
    });
  });

  it("estimativa coerente com a regra", () => {
    for (let q = 1; q <= 7; q++) {
      const e = estimateFromTable("sintra-cascais", q);
      const tot = totalFromRule("sintra-cascais", q);
      expect(e).not.toBeNull();
      expect(e?.kind === "per_person" ? e.totalCents : 0).toBe(tot);
    }
  });
});

describe("Outros destinos (amostras)", () => {
  it("Lisboa 1 pessoa = 240 € (total grupo)", () => {
    expect(getPricingRuleFromTable("lisboa", 1)).toEqual({
      kind: "per_group",
      centsTotal: 24000,
    });
  });

  it("3 destinos 2 pessoas = 140 € / pessoa", () => {
    expect(getPricingRuleFromTable("3-destinos", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 14000,
    });
  });

  it("Monsanto 2 pessoas = 130 € / pessoa", () => {
    expect(getPricingRuleFromTable("monsanto", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 13000,
    });
  });

  it("Fátima & Tomar segue a mesma tabela que Monsanto", () => {
    expect(getPricingRuleFromTable("fatima-tomar", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 13000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 5)).toEqual({
      kind: "per_person",
      centsPerPerson: 11500,
    });
  });

  it("Algarve grupo até 3 = 600 €", () => {
    expect(getPricingRuleFromTable("algarve", 2)).toEqual({
      kind: "per_group",
      centsTotal: 60000,
    });
  });
});

describe("Cobertura: todos os tours em reserva têm preço na tabela", () => {
  it("cada tour tem regra para 1 viajante", () => {
    for (const t of toursBooking) {
      if (t.id === "alentejo") continue; // sob consulta
      expect(
        getPricingRuleFromTable(t.id, 1),
        `sem preço para ${t.id}`,
      ).not.toBeNull();
    }
  });

  it("total da regra coincide com a estimativa (quando aplicável)", () => {
    for (const t of toursBooking) {
      for (let q = 1; q <= 7; q++) {
        const est = estimateFromTable(t.id, q);
        const tot = totalFromRule(t.id, q);
        if (est === null || tot === null) continue;
        if (est.kind === "per_person") {
          expect(est.totalCents, `${t.id} q=${q}`).toBe(tot);
        } else {
          expect(est.totalCents, `${t.id} q=${q}`).toBe(tot);
        }
      }
    }
  });
});
