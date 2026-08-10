import { describe, expect, it } from "vitest";
import {
  estimateFromTable,
  getMaxBookablePassengers,
  getPricingRuleFromTable,
} from "./tour-pricing-table";
import { toursBooking } from "./tours-booking";
import { MAX_TOUR_PASSENGERS } from "./vehicle-capacity";

function totalFromRule(tourId: string, qty: number): number | null {
  const r = getPricingRuleFromTable(tourId, qty);
  if (!r) return null;
  if (r.kind === "per_person") {
    const q = Math.max(1, Math.min(getMaxBookablePassengers(tourId), qty));
    return r.centsPerPerson * q;
  }
  return r.centsTotal;
}

const SINTRA_TOTALS: Record<number, number> = {
  1: 25000,
  2: 25000,
  3: 30000,
  4: 34000,
  5: 39000,
  6: 44000,
  7: 49000,
  8: 54000,
};

const ALGARVE_TOTALS: Record<number, number> = {
  1: 60000,
  2: 60000,
  3: 60000,
  4: 64000,
  5: 68000,
  6: 72000,
  7: 76000,
  8: 80000,
};

const PORTO_TOTALS: Record<number, number> = {
  1: 70000,
  2: 70000,
  3: 70000,
  4: 70000,
  5: 75000,
  6: 75000,
  7: 80000,
  8: 80000,
};

describe("Sintra & Cascais — preço total por grupo (privado)", () => {
  it("checkout: totais 1–8 convidados em cêntimos", () => {
    for (let q = 1; q <= 8; q++) {
      expect(getPricingRuleFromTable("sintra-cascais", q)).toEqual({
        kind: "per_group",
        centsTotal: SINTRA_TOTALS[q],
      });
    }
  });

  it("8 passageiros não usam o preço de 7", () => {
    expect(getPricingRuleFromTable("sintra-cascais", 7)).toEqual({
      kind: "per_group",
      centsTotal: 49000,
    });
    expect(getPricingRuleFromTable("sintra-cascais", 8)).toEqual({
      kind: "per_group",
      centsTotal: 54000,
    });
  });

  it("estimativa coerente com a regra (sem multiplicar por pessoa)", () => {
    for (let q = 1; q <= 8; q++) {
      const e = estimateFromTable("sintra-cascais", q);
      const tot = totalFromRule("sintra-cascais", q);
      expect(e).not.toBeNull();
      expect(e?.kind).toBe("per_group");
      expect(e?.totalCents).toBe(tot);
      expect(e?.totalCents).toBe(SINTRA_TOTALS[q]);
    }
  });
});

describe("Algarve — preço total por grupo", () => {
  it("checkout: totais 1–8 convidados em cêntimos", () => {
    for (let q = 1; q <= 8; q++) {
      expect(getPricingRuleFromTable("algarve", q)).toEqual({
        kind: "per_group",
        centsTotal: ALGARVE_TOTALS[q],
      });
    }
  });

  it("8 passageiros não usam o preço de 7", () => {
    expect(getPricingRuleFromTable("algarve", 7)?.kind).toBe("per_group");
    expect(getPricingRuleFromTable("algarve", 7)).toMatchObject({
      centsTotal: 76000,
    });
    expect(getPricingRuleFromTable("algarve", 8)).toMatchObject({
      centsTotal: 80000,
    });
  });

  it("estimativa = total do grupo (não × quantidade)", () => {
    for (let q = 1; q <= 8; q++) {
      const e = estimateFromTable("algarve", q);
      expect(e?.kind).toBe("per_group");
      expect(e?.totalCents).toBe(ALGARVE_TOTALS[q]);
      expect(totalFromRule("algarve", q)).toBe(ALGARVE_TOTALS[q]);
    }
  });
});

describe("Porto — preço total por grupo", () => {
  it("checkout: totais 1–8 convidados em cêntimos", () => {
    for (let q = 1; q <= 8; q++) {
      expect(getPricingRuleFromTable("porto", q)).toEqual({
        kind: "per_group",
        centsTotal: PORTO_TOTALS[q],
      });
    }
  });

  it("8 passageiros não usam o preço de 7 (ambos €800, mas 6 ≠ 7)", () => {
    expect(getPricingRuleFromTable("porto", 6)).toMatchObject({
      centsTotal: 75000,
    });
    expect(getPricingRuleFromTable("porto", 7)).toMatchObject({
      centsTotal: 80000,
    });
    expect(getPricingRuleFromTable("porto", 8)).toMatchObject({
      centsTotal: 80000,
    });
  });

  it("estimativa = total do grupo", () => {
    for (let q = 1; q <= 8; q++) {
      const e = estimateFromTable("porto", q);
      expect(e?.kind).toBe("per_group");
      expect(e?.totalCents).toBe(PORTO_TOTALS[q]);
    }
  });
});

describe("Fátima, Nazaré & Óbidos (3-destinos) — 1–8", () => {
  it("1 pessoa = mínimo privado 280 €", () => {
    expect(getPricingRuleFromTable("3-destinos", 1)).toEqual({
      kind: "per_group",
      centsTotal: 28000,
    });
  });

  it("2–8 por pessoa com totais corretos (8 ≠ 7)", () => {
    const cpp: Record<number, number> = {
      2: 14000,
      3: 11500,
      4: 10500,
      5: 10000,
      6: 9500,
      7: 9500,
      8: 8500,
    };
    const totals: Record<number, number> = {
      2: 28000,
      3: 34500,
      4: 42000,
      5: 50000,
      6: 57000,
      7: 66500,
      8: 68000,
    };
    for (let q = 2; q <= 8; q++) {
      expect(getPricingRuleFromTable("3-destinos", q)).toEqual({
        kind: "per_person",
        centsPerPerson: cpp[q],
      });
      expect(totalFromRule("3-destinos", q)).toBe(totals[q]);
      expect(estimateFromTable("3-destinos", q)?.totalCents).toBe(totals[q]);
    }
    expect(getPricingRuleFromTable("3-destinos", 8)).not.toEqual(
      getPricingRuleFromTable("3-destinos", 7),
    );
  });
});

describe("Capacidade partilhada", () => {
  it("MAX_TOUR_PASSENGERS = 8 e qty 9 é inválida", () => {
    expect(MAX_TOUR_PASSENGERS).toBe(8);
    expect(getPricingRuleFromTable("sintra-cascais", 0)).toBeNull();
    expect(getPricingRuleFromTable("sintra-cascais", 9)).toBeNull();
    expect(getPricingRuleFromTable("sintra-cascais", 8)).toEqual({
      kind: "per_group",
      centsTotal: 54000,
    });
  });

  it("tours sem taxa 8 não inventam preço nem usam a regra de 7", () => {
    for (const id of ["lisboa", "aveiro", "fatima-tomar", "alentejo"] as const) {
      expect(getMaxBookablePassengers(id)).toBe(7);
      expect(getPricingRuleFromTable(id, 8)).toBeNull();
      expect(estimateFromTable(id, 8)).toBeNull();
    }
  });
});

describe("Lisboa — preçário 1–7 preservado; 8 sem preço", () => {
  it("totais confirmados 1–7", () => {
    expect(getPricingRuleFromTable("lisboa", 1)).toEqual({
      kind: "per_group",
      centsTotal: 24000,
    });
    expect(getPricingRuleFromTable("lisboa", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 12000,
    });
    expect(totalFromRule("lisboa", 2)).toBe(24000);
    expect(getPricingRuleFromTable("lisboa", 3)).toEqual({
      kind: "per_person",
      centsPerPerson: 11000,
    });
    expect(totalFromRule("lisboa", 3)).toBe(33000);
    expect(getPricingRuleFromTable("lisboa", 4)).toEqual({
      kind: "per_person",
      centsPerPerson: 10000,
    });
    expect(totalFromRule("lisboa", 4)).toBe(40000);
    expect(getPricingRuleFromTable("lisboa", 5)).toEqual({
      kind: "per_person",
      centsPerPerson: 10000,
    });
    expect(totalFromRule("lisboa", 5)).toBe(50000);
    expect(getPricingRuleFromTable("lisboa", 6)).toEqual({
      kind: "per_person",
      centsPerPerson: 9000,
    });
    expect(totalFromRule("lisboa", 6)).toBe(54000);
    expect(getPricingRuleFromTable("lisboa", 7)).toEqual({
      kind: "per_person",
      centsPerPerson: 9000,
    });
    expect(totalFromRule("lisboa", 7)).toBe(63000);
  });

  it("8 pessoas não reutiliza a regra de 7 nem inventa preço", () => {
    expect(getMaxBookablePassengers("lisboa")).toBe(7);
    expect(getPricingRuleFromTable("lisboa", 8)).toBeNull();
    expect(estimateFromTable("lisboa", 8)).toBeNull();
    expect(totalFromRule("lisboa", 8)).toBeNull();
  });
});

describe("Arrábida & Sesimbra — novo preçário por pessoa (1–8)", () => {
  it("1 pessoa = mínimo privado 260 € (grupo)", () => {
    expect(getPricingRuleFromTable("arraabida", 1)).toEqual({
      kind: "per_group",
      centsTotal: 26000,
    });
    expect(estimateFromTable("arraabida", 1)?.totalCents).toBe(26000);
  });

  it("2–8 por pessoa com totais corretos", () => {
    const expected: Record<number, number> = {
      2: 13000,
      3: 11000,
      4: 10000,
      5: 9000,
      6: 8500,
      7: 8000,
      8: 7500,
    };
    const totals: Record<number, number> = {
      2: 26000,
      3: 33000,
      4: 40000,
      5: 45000,
      6: 51000,
      7: 56000,
      8: 60000,
    };
    for (let q = 2; q <= 8; q++) {
      expect(getPricingRuleFromTable("arraabida", q)).toEqual({
        kind: "per_person",
        centsPerPerson: expected[q],
      });
      expect(totalFromRule("arraabida", q)).toBe(totals[q]);
      const est = estimateFromTable("arraabida", q);
      expect(est?.kind).toBe("per_person");
      expect(est?.totalCents).toBe(totals[q]);
    }
  });

  it("8 passageiros não usam o preço de 7", () => {
    expect(getPricingRuleFromTable("arraabida", 7)).toEqual({
      kind: "per_person",
      centsPerPerson: 8000,
    });
    expect(getPricingRuleFromTable("arraabida", 8)).toEqual({
      kind: "per_person",
      centsPerPerson: 7500,
    });
    expect(totalFromRule("arraabida", 8)).toBe(60000);
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

  it("3 destinos segue o preçário por pessoa (3–6+)", () => {
    expect(getPricingRuleFromTable("3-destinos", 3)).toEqual({
      kind: "per_person",
      centsPerPerson: 11500,
    });
    expect(getPricingRuleFromTable("3-destinos", 4)).toEqual({
      kind: "per_person",
      centsPerPerson: 10500,
    });
    expect(getPricingRuleFromTable("3-destinos", 5)).toEqual({
      kind: "per_person",
      centsPerPerson: 10000,
    });
    expect(getPricingRuleFromTable("3-destinos", 6)).toEqual({
      kind: "per_person",
      centsPerPerson: 9500,
    });
  });

  it("Monsanto grupo = 800 €", () => {
    expect(getPricingRuleFromTable("monsanto", 2)).toEqual({
      kind: "per_group",
      centsTotal: 80000,
    });
    expect(getPricingRuleFromTable("monsanto", 8)).toEqual({
      kind: "per_group",
      centsTotal: 80000,
    });
  });

  it("Fátima & Tomar tem tabela própria", () => {
    expect(getPricingRuleFromTable("fatima-tomar", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 13000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 5)).toEqual({
      kind: "per_person",
      centsPerPerson: 11500,
    });
  });

  it("Évora & Alentejo Premium — por pessoa por faixa (sem inventar 8)", () => {
    expect(getPricingRuleFromTable("alentejo", 1)).toEqual({
      kind: "per_person",
      centsPerPerson: 16000,
    });
    expect(getPricingRuleFromTable("alentejo", 2)).toEqual({
      kind: "per_person",
      centsPerPerson: 16000,
    });
    expect(getPricingRuleFromTable("alentejo", 3)).toEqual({
      kind: "per_person",
      centsPerPerson: 14000,
    });
    expect(getPricingRuleFromTable("alentejo", 4)).toEqual({
      kind: "per_person",
      centsPerPerson: 12500,
    });
    expect(getPricingRuleFromTable("alentejo", 5)).toEqual({
      kind: "per_person",
      centsPerPerson: 11500,
    });
    expect(getPricingRuleFromTable("alentejo", 6)).toEqual({
      kind: "per_person",
      centsPerPerson: 10500,
    });
    expect(getPricingRuleFromTable("alentejo", 7)).toEqual({
      kind: "per_person",
      centsPerPerson: 10500,
    });
    expect(getPricingRuleFromTable("alentejo", 8)).toBeNull();
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
      const maxQ = getMaxBookablePassengers(t.id);
      for (let q = 1; q <= maxQ; q++) {
        const est = estimateFromTable(t.id, q);
        const tot = totalFromRule(t.id, q);
        if (est === null || tot === null) continue;
        expect(est.totalCents, `${t.id} q=${q}`).toBe(tot);
      }
    }
  });
});
