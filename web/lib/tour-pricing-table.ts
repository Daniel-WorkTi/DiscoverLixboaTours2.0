/**
 * Tabela única de preços (UI + API checkout).
 * Valores em cêntimos EUR; faixas alinhadas com preçário 2026 (revisão comercial).
 */

import { MAX_TOUR_PASSENGERS } from "@/lib/vehicle-capacity";

export type PricingRule =
  | { kind: "per_person"; centsPerPerson: number }
  | { kind: "per_group"; centsTotal: number };

export type PriceEstimate =
  | {
      kind: "per_person";
      centsPerPerson: number;
      totalCents: number;
      label: string;
    }
  | {
      kind: "per_group";
      totalCents: number;
      label: string;
    }
  | null;

function parseGuestQty(qty: number): number | null {
  const q = Math.floor(Number(qty));
  if (!Number.isFinite(q) || q < 1 || q > MAX_TOUR_PASSENGERS) return null;
  return q;
}

/**
 * Máximo de passageiros com preço comercial definido.
 * Capacidade física do van = MAX_TOUR_PASSENGERS (8) em todos os tours.
 */
export function getMaxBookablePassengers(_tourId: string): number {
  return MAX_TOUR_PASSENGERS;
}

/** Mínimo comercialmente reservável (tabelas que começam em 2 convidados). */
export function getMinBookablePassengers(tourId: string): number {
  switch (tourId) {
    case "aveiro":
    case "alentejo":
    case "monsanto":
      return 2;
    default:
      return 1;
  }
}

/** Tour com regra na tabela dinâmica (sem fallback Stripe legado). */
export function tourHasDynamicPricingTable(tourId: string): boolean {
  return getPricingRuleFromTable(tourId, getMinBookablePassengers(tourId)) !== null;
}

/** Totais exactos Aveiro (billing). Display €/pessoa pode ser arredondado. */
const AVEIRO_EXACT_TOTALS: Record<number, number> = {
  2: 50000,
  3: 55000,
  4: 60000,
  5: 65000,
  6: 70000,
  7: 75000,
  8: 80000,
};
const AVEIRO_DISPLAY_CPP: Record<number, number> = {
  2: 25000,
  3: 18300,
  4: 15000,
  5: 13000,
  6: 11700,
  7: 10800,
  8: 10000,
};

/** Totais exactos Monsanto (billing). Display €/pessoa pode ser arredondado. */
const MONSANTO_EXACT_TOTALS: Record<number, number> = {
  2: 60000,
  3: 65000,
  4: 70000,
  5: 75000,
  6: 80000,
  7: 85000,
  8: 90000,
};
const MONSANTO_DISPLAY_CPP: Record<number, number> = {
  2: 30000,
  3: 21700,
  4: 17500,
  5: 15000,
  6: 13300,
  7: 12100,
  8: 11300,
};

/** Regra para o Stripe Checkout (sem labels). */
export function getPricingRuleFromTable(
  tourId: string,
  qty: number,
): PricingRule | null {
  // Nunca converter 8 → 7: qty inválida = null; qty válida usa o valor real
  const q = parseGuestQty(qty);
  if (q === null) return null;

  // Sintra & Cascais — tour privado, preço total por grupo (até 8)
  if (tourId === "sintra-cascais") {
    if (q <= 2) return { kind: "per_group", centsTotal: 25000 };
    if (q === 3) return { kind: "per_group", centsTotal: 30000 };
    if (q === 4) return { kind: "per_group", centsTotal: 34000 };
    if (q === 5) return { kind: "per_group", centsTotal: 39000 };
    if (q === 6) return { kind: "per_group", centsTotal: 44000 };
    if (q === 7) return { kind: "per_group", centsTotal: 49000 };
    if (q === 8) return { kind: "per_group", centsTotal: 54000 };
    return null;
  }

  // Fátima, Nazaré & Óbidos — 1 p.: mínimo 280 €; 2–8 por pessoa (8 ≠ 7)
  if (tourId === "3-destinos") {
    if (q === 1) return { kind: "per_group", centsTotal: 28000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 14000 };
    if (q === 3) return { kind: "per_person", centsPerPerson: 11500 };
    if (q === 4) return { kind: "per_person", centsPerPerson: 10500 };
    if (q === 5) return { kind: "per_person", centsPerPerson: 10000 };
    if (q === 6) return { kind: "per_person", centsPerPerson: 9500 };
    if (q === 7) return { kind: "per_person", centsPerPerson: 9500 };
    if (q === 8) return { kind: "per_person", centsPerPerson: 8500 };
    return null;
  }

  // Lisboa — totais por grupo privado (1–8)
  if (tourId === "lisboa") {
    if (q <= 2) return { kind: "per_group", centsTotal: 25000 };
    if (q === 3) return { kind: "per_group", centsTotal: 30000 };
    if (q === 4) return { kind: "per_group", centsTotal: 35000 };
    if (q === 5) return { kind: "per_group", centsTotal: 40000 };
    if (q === 6) return { kind: "per_group", centsTotal: 45000 };
    if (q === 7) return { kind: "per_group", centsTotal: 50000 };
    if (q === 8) return { kind: "per_group", centsTotal: 55000 };
    return null;
  }

  // Arrábida, Setúbal, Sesimbra — 1 p.: mínimo privado 260 €; 2–8 por pessoa
  if (tourId === "arraabida") {
    if (q === 1) return { kind: "per_group", centsTotal: 26000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 13000 };
    if (q === 3) return { kind: "per_person", centsPerPerson: 11000 };
    if (q === 4) return { kind: "per_person", centsPerPerson: 10000 };
    if (q === 5) return { kind: "per_person", centsPerPerson: 9000 };
    if (q === 6) return { kind: "per_person", centsPerPerson: 8500 };
    if (q === 7) return { kind: "per_person", centsPerPerson: 8000 };
    if (q === 8) return { kind: "per_person", centsPerPerson: 7500 };
    return null;
  }

  if (tourId === "aveiro") {
    // Billing = total exacto (pp display arredondado); mín. 2 convidados
    if (q < 2) return null;
    const total = AVEIRO_EXACT_TOTALS[q];
    if (!total) return null;
    return { kind: "per_group", centsTotal: total };
  }

  if (tourId === "monsanto") {
    if (q < 2) return null;
    const total = MONSANTO_EXACT_TOTALS[q];
    if (!total) return null;
    return { kind: "per_group", centsTotal: total };
  }

  // Fátima & Tomar — preço total por grupo privado
  if (tourId === "fatima-tomar") {
    if (q <= 2) return { kind: "per_group", centsTotal: 31000 };
    if (q <= 4) return { kind: "per_group", centsTotal: 40000 };
    if (q <= 6) return { kind: "per_group", centsTotal: 49000 };
    if (q <= 8) return { kind: "per_group", centsTotal: 59000 };
    return null;
  }

  // Algarve — tour privado, preço total por grupo
  if (tourId === "algarve") {
    if (q <= 3) return { kind: "per_group", centsTotal: 60000 };
    if (q === 4) return { kind: "per_group", centsTotal: 64000 };
    if (q === 5) return { kind: "per_group", centsTotal: 68000 };
    if (q === 6) return { kind: "per_group", centsTotal: 72000 };
    if (q === 7) return { kind: "per_group", centsTotal: 76000 };
    if (q === 8) return { kind: "per_group", centsTotal: 80000 };
    return null;
  }

  // Porto — tour privado, preço total por grupo
  if (tourId === "porto") {
    if (q <= 4) return { kind: "per_group", centsTotal: 70000 };
    if (q <= 6) return { kind: "per_group", centsTotal: 75000 };
    if (q <= 8) return { kind: "per_group", centsTotal: 80000 };
    return null;
  }

  // Premium Alentejo — por pessoa exacto (2–8)
  if (tourId === "alentejo") {
    if (q === 2) return { kind: "per_person", centsPerPerson: 27500 };
    if (q === 3) return { kind: "per_person", centsPerPerson: 22000 };
    if (q === 4) return { kind: "per_person", centsPerPerson: 19500 };
    if (q === 5) return { kind: "per_person", centsPerPerson: 17500 };
    if (q === 6) return { kind: "per_person", centsPerPerson: 16500 };
    if (q === 7) return { kind: "per_person", centsPerPerson: 15500 };
    if (q === 8) return { kind: "per_person", centsPerPerson: 14500 };
    return null;
  }

  return null;
}

/** Estimativa para o formulário (labels em pt). */
export function estimateFromTable(tourId: string, quantity: number): PriceEstimate {
  const q = parseGuestQty(quantity);
  if (q === null) return null;
  const rule = getPricingRuleFromTable(tourId, q);
  if (!rule) return null;

  if (tourId === "sintra-cascais") {
    if (rule.kind !== "per_group") return null;
    const label =
      q <= 2
        ? q === 1
          ? "1 pessoa (mín. privado)"
          : "2 pessoas"
        : `${q} pessoas`;
    return { kind: "per_group", totalCents: rule.centsTotal, label };
  }

  if (tourId === "3-destinos") {
    if (rule.kind === "per_group") {
      return { kind: "per_group", totalCents: rule.centsTotal, label: "1 pessoa (280 €)" };
    }
    return {
      kind: "per_person",
      centsPerPerson: rule.centsPerPerson,
      totalCents: rule.centsPerPerson * q,
      label: `${q} pessoas`,
    };
  }

  if (tourId === "lisboa") {
    if (rule.kind !== "per_group") return null;
    const label =
      q <= 2 ? "1–2 pessoas" : q === 3 ? "3 pessoas" : `${q} pessoas`;
    return { kind: "per_group", totalCents: rule.centsTotal, label };
  }

  if (tourId === "arraabida") {
    if (rule.kind === "per_group") {
      return { kind: "per_group", totalCents: rule.centsTotal, label: "1 pessoa (260 €)" };
    }
    return {
      kind: "per_person",
      centsPerPerson: rule.centsPerPerson,
      totalCents: rule.centsPerPerson * q,
      label: `${q} pessoas`,
    };
  }

  if (tourId === "aveiro") {
    // UI: por pessoa (display) + total exacto; Stripe: per_group com total
    if (rule.kind !== "per_group") return null;
    const display = AVEIRO_DISPLAY_CPP[q];
    if (!display) return null;
    return {
      kind: "per_person",
      centsPerPerson: display,
      totalCents: rule.centsTotal,
      label: `${q} pessoas`,
    };
  }

  if (tourId === "monsanto") {
    if (rule.kind !== "per_group") return null;
    const display = MONSANTO_DISPLAY_CPP[q];
    if (!display) return null;
    return {
      kind: "per_person",
      centsPerPerson: display,
      totalCents: rule.centsTotal,
      label: `${q} pessoas`,
    };
  }

  if (tourId === "fatima-tomar") {
    if (rule.kind !== "per_group") return null;
    const label =
      q <= 2 ? "1–2 pessoas" : q <= 4 ? "3–4 pessoas" : q <= 6 ? "5–6 pessoas" : "7–8 pessoas";
    return { kind: "per_group", totalCents: rule.centsTotal, label };
  }

  if (tourId === "alentejo") {
    if (rule.kind !== "per_person") return null;
    return {
      kind: "per_person",
      centsPerPerson: rule.centsPerPerson,
      totalCents: rule.centsPerPerson * q,
      label: `${q} pessoas`,
    };
  }

  if (tourId === "algarve") {
    if (rule.kind !== "per_group") return null;
    const label =
      q <= 3 ? "1–3 pessoas" : q === 4 ? "4 pessoas" : `${q} pessoas`;
    return { kind: "per_group", totalCents: rule.centsTotal, label };
  }

  if (tourId === "porto") {
    if (rule.kind !== "per_group") return null;
    const label =
      q <= 4 ? "1–4 pessoas" : q <= 6 ? "5–6 pessoas" : "até 8 pessoas";
    return { kind: "per_group", totalCents: rule.centsTotal, label };
  }

  if (rule.kind === "per_group") {
    return { kind: "per_group", totalCents: rule.centsTotal, label: `${q} pessoas` };
  }
  return {
    kind: "per_person",
    centsPerPerson: rule.centsPerPerson,
    totalCents: rule.centsPerPerson * q,
    label: `${q} pessoas`,
  };
}
