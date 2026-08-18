import { describe, expect, it } from "vitest";
import {
  estimateFromTable,
  getMaxBookablePassengers,
  getMinBookablePassengers,
  getPricingRuleFromTable,
} from "./tour-pricing-table";
import { toursBooking } from "./tours-booking";
import { MAX_TOUR_PASSENGERS } from "./vehicle-capacity";

function totalFromRule(tourId: string, qty: number): number | null {
  const r = getPricingRuleFromTable(tourId, qty);
  if (!r) return null;
  if (r.kind === "per_person") {
    const q = Math.floor(Number(qty));
    if (!Number.isFinite(q) || q < 1) return null;
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

  it("2–8 totais de grupo (migrado; display UI €/pessoa)", () => {
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
        kind: "per_group",
        centsTotal: totals[q],
      });
      expect(totalFromRule("3-destinos", q)).toBe(totals[q]);
      const est = estimateFromTable("3-destinos", q);
      expect(est?.kind).toBe("per_person");
      expect(est?.totalCents).toBe(totals[q]);
      if (est?.kind === "per_person") {
        expect(est.centsPerPerson).toBe(cpp[q]);
      }
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

  it("todos os tours permitem 8 passageiros com preço definido", () => {
    for (const id of ["lisboa", "fatima-tomar"] as const) {
      expect(getMaxBookablePassengers(id)).toBe(8);
      expect(getPricingRuleFromTable(id, 8)).not.toBeNull();
      expect(estimateFromTable(id, 8)?.totalCents).toBeTruthy();
    }
  });

  it("Aveiro e Alentejo têm taxa comercial para 8", () => {
    expect(getMaxBookablePassengers("aveiro")).toBe(8);
    expect(getMaxBookablePassengers("alentejo")).toBe(8);
    expect(getPricingRuleFromTable("aveiro", 8)).toEqual({
      kind: "per_group",
      centsTotal: 80000,
    });
    expect(getPricingRuleFromTable("alentejo", 8)).toEqual({
      kind: "per_group",
      centsTotal: 116000,
    });
  });
});

describe("Lisboa — preçário 1–8", () => {
  it("totais confirmados 1–8", () => {
    expect(getPricingRuleFromTable("lisboa", 1)).toEqual({
      kind: "per_group",
      centsTotal: 25000,
    });
    expect(getPricingRuleFromTable("lisboa", 2)).toEqual({
      kind: "per_group",
      centsTotal: 25000,
    });
    expect(totalFromRule("lisboa", 2)).toBe(25000);
    expect(getPricingRuleFromTable("lisboa", 3)).toEqual({
      kind: "per_group",
      centsTotal: 30000,
    });
    expect(totalFromRule("lisboa", 3)).toBe(30000);
    expect(getPricingRuleFromTable("lisboa", 4)).toEqual({
      kind: "per_group",
      centsTotal: 35000,
    });
    expect(totalFromRule("lisboa", 4)).toBe(35000);
    expect(getPricingRuleFromTable("lisboa", 5)).toEqual({
      kind: "per_group",
      centsTotal: 40000,
    });
    expect(totalFromRule("lisboa", 5)).toBe(40000);
    expect(getPricingRuleFromTable("lisboa", 6)).toEqual({
      kind: "per_group",
      centsTotal: 45000,
    });
    expect(totalFromRule("lisboa", 6)).toBe(45000);
    expect(getPricingRuleFromTable("lisboa", 7)).toEqual({
      kind: "per_group",
      centsTotal: 50000,
    });
    expect(totalFromRule("lisboa", 7)).toBe(50000);
    expect(getPricingRuleFromTable("lisboa", 8)).toEqual({
      kind: "per_group",
      centsTotal: 55000,
    });
    expect(totalFromRule("lisboa", 8)).toBe(55000);
  });

  it("8 pessoas é bookable (€550 grupo)", () => {
    expect(getMaxBookablePassengers("lisboa")).toBe(8);
    expect(estimateFromTable("lisboa", 8)?.totalCents).toBe(55000);
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

  it("2–8 totais de grupo (migrado; display UI €/pessoa)", () => {
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
        kind: "per_group",
        centsTotal: totals[q],
      });
      expect(totalFromRule("arraabida", q)).toBe(totals[q]);
      const est = estimateFromTable("arraabida", q);
      expect(est?.kind).toBe("per_person");
      expect(est?.totalCents).toBe(totals[q]);
      if (est?.kind === "per_person") {
        expect(est.centsPerPerson).toBe(expected[q]);
      }
    }
  });

  it("8 passageiros não usam o preço de 7", () => {
    expect(getPricingRuleFromTable("arraabida", 7)).toEqual({
      kind: "per_group",
      centsTotal: 56000,
    });
    expect(getPricingRuleFromTable("arraabida", 8)).toEqual({
      kind: "per_group",
      centsTotal: 60000,
    });
    expect(totalFromRule("arraabida", 8)).toBe(60000);
  });
});

describe("Outros destinos (amostras)", () => {
  it("Lisboa 1 pessoa = 250 € (total grupo)", () => {
    expect(getPricingRuleFromTable("lisboa", 1)).toEqual({
      kind: "per_group",
      centsTotal: 25000,
    });
  });

  it("3 destinos 2 pessoas = 280 € grupo (140 € / pessoa na UI)", () => {
    expect(getPricingRuleFromTable("3-destinos", 2)).toEqual({
      kind: "per_group",
      centsTotal: 28000,
    });
  });

  it("3 destinos segue o preçário por totais de grupo (3–6+)", () => {
    expect(getPricingRuleFromTable("3-destinos", 3)).toEqual({
      kind: "per_group",
      centsTotal: 34500,
    });
    expect(getPricingRuleFromTable("3-destinos", 4)).toEqual({
      kind: "per_group",
      centsTotal: 42000,
    });
    expect(getPricingRuleFromTable("3-destinos", 5)).toEqual({
      kind: "per_group",
      centsTotal: 50000,
    });
    expect(getPricingRuleFromTable("3-destinos", 6)).toEqual({
      kind: "per_group",
      centsTotal: 57000,
    });
  });

  it("Monsanto — totais exactos 2–8 (não flat €800)", () => {
    const totals: Record<number, number> = {
      2: 60000,
      3: 65000,
      4: 70000,
      5: 75000,
      6: 80000,
      7: 85000,
      8: 90000,
    };
    expect(getMinBookablePassengers("monsanto")).toBe(2);
    expect(getMaxBookablePassengers("monsanto")).toBe(8);
    expect(getPricingRuleFromTable("monsanto", 1)).toBeNull();
    for (let q = 2; q <= 8; q++) {
      expect(getPricingRuleFromTable("monsanto", q)).toEqual({
        kind: "per_group",
        centsTotal: totals[q],
      });
      expect(totalFromRule("monsanto", q)).toBe(totals[q]);
      const est = estimateFromTable("monsanto", q);
      expect(est?.kind).toBe("per_person");
      if (est?.kind === "per_person") {
        expect(est.centsPerPerson).toBe(Math.round(totals[q] / q));
        expect(est.totalCents).toBe(totals[q]);
      }
    }
    // Criticos: arredondamentos de display ≠ total × pp
    expect(totalFromRule("monsanto", 2)).not.toBe(80000);
    expect(totalFromRule("monsanto", 8)).not.toBe(80000);
    expect(totalFromRule("monsanto", 6)).toBe(80000);
    expect(totalFromRule("monsanto", 3)).toBe(65000); // não 65100
    expect(totalFromRule("monsanto", 6)).toBe(80000); // não 79800
    expect(totalFromRule("monsanto", 7)).toBe(85000); // não 84700
    expect(totalFromRule("monsanto", 8)).toBe(90000); // não 90400
  });

  it("Fátima & Tomar — totais por grupo 1–8", () => {
    expect(getPricingRuleFromTable("fatima-tomar", 1)).toEqual({
      kind: "per_group",
      centsTotal: 31000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 2)).toEqual({
      kind: "per_group",
      centsTotal: 31000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 3)).toEqual({
      kind: "per_group",
      centsTotal: 40000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 4)).toEqual({
      kind: "per_group",
      centsTotal: 40000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 5)).toEqual({
      kind: "per_group",
      centsTotal: 49000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 6)).toEqual({
      kind: "per_group",
      centsTotal: 49000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 7)).toEqual({
      kind: "per_group",
      centsTotal: 59000,
    });
    expect(getPricingRuleFromTable("fatima-tomar", 8)).toEqual({
      kind: "per_group",
      centsTotal: 59000,
    });
    expect(estimateFromTable("fatima-tomar", 8)).toEqual({
      kind: "per_group",
      totalCents: 59000,
      label: "8 pessoas",
    });
  });

  it("Premium Alentejo — totais de grupo 2–8 (migrado; UI €/pessoa)", () => {
    const cpp: Record<number, number> = {
      2: 27500,
      3: 22000,
      4: 19500,
      5: 17500,
      6: 16500,
      7: 15500,
      8: 14500,
    };
    const totals: Record<number, number> = {
      2: 55000,
      3: 66000,
      4: 78000,
      5: 87500,
      6: 99000,
      7: 108500,
      8: 116000,
    };
    expect(getMinBookablePassengers("alentejo")).toBe(2);
    expect(getMaxBookablePassengers("alentejo")).toBe(8);
    expect(getPricingRuleFromTable("alentejo", 1)).toBeNull();
    for (let q = 2; q <= 8; q++) {
      expect(getPricingRuleFromTable("alentejo", q)).toEqual({
        kind: "per_group",
        centsTotal: totals[q],
      });
      expect(totalFromRule("alentejo", q)).toBe(totals[q]);
      const est = estimateFromTable("alentejo", q);
      expect(est?.totalCents).toBe(totals[q]);
      if (est?.kind === "per_person") {
        expect(est.centsPerPerson).toBe(cpp[q]);
      }
    }
    expect(getPricingRuleFromTable("alentejo", 8)).toEqual({
      kind: "per_group",
      centsTotal: 116000,
    });
  });

  it("Aveiro — totais exactos 2–8 (display pp arredondado)", () => {
    const totals: Record<number, number> = {
      2: 50000,
      3: 55000,
      4: 60000,
      5: 65000,
      6: 70000,
      7: 75000,
      8: 80000,
    };
    expect(getMinBookablePassengers("aveiro")).toBe(2);
    expect(getMaxBookablePassengers("aveiro")).toBe(8);
    expect(getPricingRuleFromTable("aveiro", 1)).toBeNull();
    for (let q = 2; q <= 8; q++) {
      expect(getPricingRuleFromTable("aveiro", q)).toEqual({
        kind: "per_group",
        centsTotal: totals[q],
      });
      expect(totalFromRule("aveiro", q)).toBe(totals[q]);
      const est = estimateFromTable("aveiro", q);
      expect(est?.kind).toBe("per_person");
      if (est?.kind === "per_person") {
        expect(est.centsPerPerson).toBe(Math.round(totals[q] / q));
        expect(est.totalCents).toBe(totals[q]);
      }
    }
    expect(totalFromRule("aveiro", 3)).toBe(55000); // não 54900
    expect(totalFromRule("aveiro", 6)).toBe(70000); // não 70200
    expect(totalFromRule("aveiro", 7)).toBe(75000); // não 75600
    expect(totalFromRule("aveiro", 8)).toBe(80000);
  });
});

describe("Cobertura: todos os tours em reserva têm preço na tabela", () => {
  it("cada tour tem regra para o mínimo bookable", () => {
    for (const t of toursBooking) {
      const minQ = getMinBookablePassengers(t.id);
      expect(
        getPricingRuleFromTable(t.id, minQ),
        `sem preço para ${t.id} q=${minQ}`,
      ).not.toBeNull();
    }
  });

  it("total da regra coincide com a estimativa (quando aplicável)", () => {
    for (const t of toursBooking) {
      const minQ = getMinBookablePassengers(t.id);
      const maxQ = getMaxBookablePassengers(t.id);
      for (let q = minQ; q <= maxQ; q++) {
        const est = estimateFromTable(t.id, q);
        const tot = totalFromRule(t.id, q);
        if (est === null || tot === null) continue;
        expect(est.totalCents, `${t.id} q=${q}`).toBe(tot);
      }
    }
  });
});
