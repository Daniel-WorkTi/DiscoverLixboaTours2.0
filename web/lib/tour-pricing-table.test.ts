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

describe("Sintra & Cascais (0,50 €/pessoa — testes)", () => {
  it("regra de checkout: 50 ¢ por pessoa para quantidades 1–7", () => {
    for (let q = 1; q <= 7; q++) {
      const r = getPricingRuleFromTable("sintra-cascais", q);
      expect(r).toEqual({ kind: "per_person", centsPerPerson: 50 });
    }
  });

  it("estimativa no formulário: 50 ¢ × quantidade", () => {
    for (let q = 1; q <= 7; q++) {
      const e = estimateFromTable("sintra-cascais", q);
      expect(e).not.toBeNull();
      if (e?.kind === "per_person") {
        expect(e.centsPerPerson).toBe(50);
        expect(e.totalCents).toBe(50 * q);
      }
    }
  });
});

describe("Outros destinos (amostras)", () => {
  it("Lisboa 1 pessoa = 90 €", () => {
    expect(getPricingRuleFromTable("lisboa", 1)).toEqual({
      kind: "per_person",
      centsPerPerson: 9000,
    });
  });

  it("Monsanto 2 pessoas = 130 € / pessoa", () => {
    expect(getPricingRuleFromTable("monsanto", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 13000,
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
