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
 * Capacidade física do van = MAX_TOUR_PASSENGERS (8); preço 8 pode faltar em alguns tours.
 */
export function getMaxBookablePassengers(tourId: string): number {
  // Tours com taxa explícita (ou flat group) para 8 convidados
  switch (tourId) {
    case "sintra-cascais":
    case "algarve":
    case "porto":
    case "arraabida":
    case "3-destinos":
    case "monsanto":
      return MAX_TOUR_PASSENGERS;
    // Sem taxa comercial confirmada para o 8.º — não inventar nem tratar como 7
    case "lisboa":
    case "aveiro":
    case "fatima-tomar":
    case "alentejo":
      return 7;
    default:
      return MAX_TOUR_PASSENGERS;
  }
}

/** Tour com regra na tabela dinâmica para pelo menos 1 pessoa (sem fallback Stripe legado). */
export function tourHasDynamicPricingTable(tourId: string): boolean {
  return getPricingRuleFromTable(tourId, 1) !== null;
}

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

  // Lisboa — preçário confirmado só até 7 (não inventar preço para 8)
  if (tourId === "lisboa") {
    if (q === 1) return { kind: "per_group", centsTotal: 24000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 12000 };
    if (q === 3) return { kind: "per_person", centsPerPerson: 11000 };
    if (q >= 4 && q <= 5) return { kind: "per_person", centsPerPerson: 10000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 9000 };
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
    if (q === 1) return { kind: "per_person", centsPerPerson: 14000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 14000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 12000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 11000 };
    return null;
  }

  if (tourId === "monsanto") {
    return { kind: "per_group", centsTotal: 80000 };
  }

  if (tourId === "fatima-tomar") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 13000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 13000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 11500 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 10000 };
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

  // Évora & Alentejo Premium — por pessoa (preço 8 ainda não confirmado)
  if (tourId === "alentejo") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 16000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 16000 };
    if (q === 3) return { kind: "per_person", centsPerPerson: 14000 };
    if (q === 4) return { kind: "per_person", centsPerPerson: 12500 };
    if (q === 5) return { kind: "per_person", centsPerPerson: 11500 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 10500 };
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
    if (rule.kind === "per_group") {
      return { kind: "per_group", totalCents: rule.centsTotal, label: "1 pessoa (240 €)" };
    }
    return {
      kind: "per_person",
      centsPerPerson: rule.centsPerPerson,
      totalCents: rule.centsPerPerson * q,
      label: q === 2 ? "2 pessoas (240 € total)" : `${q} pessoas`,
    };
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

  if (tourId === "aveiro" || tourId === "fatima-tomar" || tourId === "alentejo") {
    if (rule.kind !== "per_person") return null;
    return {
      kind: "per_person",
      centsPerPerson: rule.centsPerPerson,
      totalCents: rule.centsPerPerson * q,
      label: `${q} pessoas`,
    };
  }

  if (tourId === "monsanto") {
    return { kind: "per_group", totalCents: 80000, label: "grupo (800 €)" };
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
      q <= 4 ? "1–4 pessoas" : q <= 6 ? "5–6 pessoas" : "7–8 pessoas";
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
