/**
 * Tabela única de preços (UI + API checkout).
 * Sintra a 0,50 €/pessoa: valor de teste (mínimo típico Stripe em EUR) — repõe preços reais antes do deploy final.
 */

/** Sintra: 0,50 € por pessoa (50 cêntimos) enquanto em modo teste. */
const SINTRA_TEST_CENTS_PER_PERSON = 50;

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

const MAX_Q = 7;

/** Regra para o Stripe Checkout (sem labels). */
export function getPricingRuleFromTable(
  tourId: string,
  qty: number,
): PricingRule | null {
  const q = Math.max(1, Math.min(MAX_Q, qty));

  // Sintra & Cascais — 0,50 €/pessoa (testes / mínimo Stripe)
  if (tourId === "sintra-cascais") {
    if (q >= 1 && q <= MAX_Q) {
      return {
        kind: "per_person",
        centsPerPerson: SINTRA_TEST_CENTS_PER_PERSON,
      };
    }
    return null;
  }

  if (tourId === "3-destinos") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 10000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 7000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 6500 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 6000 };
    return null;
  }

  if (tourId === "lisboa") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 9000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 6000 };
    if (q === 3) return { kind: "per_person", centsPerPerson: 5500 };
    if (q >= 4 && q <= 5) return { kind: "per_person", centsPerPerson: 5000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 4500 };
    return null;
  }

  if (tourId === "arraabida") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 13000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 6500 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 6000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 5500 };
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
    if (q === 1) return { kind: "per_person", centsPerPerson: 13000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 13000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 11500 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 10000 };
    return null;
  }

  if (tourId === "algarve") {
    if (q <= 3) return { kind: "per_group", centsTotal: 60000 };
    if (q <= 7) return { kind: "per_group", centsTotal: 70000 };
    return null;
  }

  if (tourId === "porto") {
    if (q <= 3) return { kind: "per_group", centsTotal: 80000 };
    if (q <= 7) return { kind: "per_group", centsTotal: 90000 };
    return null;
  }

  if (tourId === "alentejo") {
    if (q >= 1 && q <= 4) return { kind: "per_group", centsTotal: 40000 };
    if (q >= 5 && q <= 7) return { kind: "per_group", centsTotal: 54000 };
    return null;
  }

  return null;
}

/** Estimativa para o formulário (labels em pt). */
export function estimateFromTable(tourId: string, quantity: number): PriceEstimate {
  const q = Math.max(1, Math.min(MAX_Q, quantity));

  if (tourId === "sintra-cascais") {
    const cpp = SINTRA_TEST_CENTS_PER_PERSON;
    const label =
      q === 1
        ? "1 pessoa"
        : q === 2
          ? "2 pessoas"
          : q <= 4
            ? "3–4 pessoas"
            : "5–7 pessoas";
    return {
      kind: "per_person",
      centsPerPerson: cpp,
      totalCents: cpp * q,
      label,
    };
  }

  if (tourId === "3-destinos") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 10000,
        totalCents: 10000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 7000,
        totalCents: 7000 * q,
        label: "2 pessoas",
      };
    if (q >= 3 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 6500,
        totalCents: 6500 * q,
        label: "3–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 6000,
      totalCents: 6000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "lisboa") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 9000,
        totalCents: 9000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 6000,
        totalCents: 6000 * q,
        label: "2 pessoas",
      };
    if (q === 3)
      return {
        kind: "per_person",
        centsPerPerson: 5500,
        totalCents: 5500 * q,
        label: "3 pessoas",
      };
    if (q >= 4 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 5000,
        totalCents: 5000 * q,
        label: "4–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 4500,
      totalCents: 4500 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "arraabida") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 13000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 6500,
        totalCents: 6500 * q,
        label: "2 pessoas",
      };
    if (q >= 3 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 6000,
        totalCents: 6000 * q,
        label: "3–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 5500,
      totalCents: 5500 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "aveiro") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 14000,
        totalCents: 14000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 14000,
        totalCents: 14000 * q,
        label: "2 pessoas",
      };
    if (q >= 3 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 12000,
        totalCents: 12000 * q,
        label: "3–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 11000,
      totalCents: 11000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "monsanto") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 13000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 13000 * q,
        label: "2 pessoas",
      };
    if (q >= 3 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 11500,
        totalCents: 11500 * q,
        label: "3–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 10000,
      totalCents: 10000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "algarve") {
    const cents = q <= 3 ? 60000 : 70000;
    return {
      kind: "per_group",
      totalCents: cents,
      label: q <= 3 ? "até 3 pessoas" : "até 7 pessoas",
    };
  }

  if (tourId === "porto") {
    const cents = q <= 3 ? 80000 : 90000;
    return {
      kind: "per_group",
      totalCents: cents,
      label: q <= 3 ? "até 3 pessoas" : "até 7 pessoas",
    };
  }

  if (tourId === "alentejo") {
    if (q >= 1 && q <= 4) {
      return {
        kind: "per_group",
        totalCents: 40000,
        label: "1–4 pessoas (grupo)",
      };
    }
    return {
      kind: "per_group",
      totalCents: 54000,
      label: "5–7 pessoas (grupo)",
    };
  }

  return null;
}
