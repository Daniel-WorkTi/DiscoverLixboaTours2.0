/**
 * Tabela única de preços (UI + API checkout).
 * Valores em cêntimos EUR; faixas alinhadas com preçário 2026 (revisão comercial).
 */

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

  // Sintra & Cascais — por pessoa por faixa
  if (tourId === "sintra-cascais") {
    if (q <= 2) return { kind: "per_person", centsPerPerson: 12000 };
    if (q <= 4) return { kind: "per_person", centsPerPerson: 11000 };
    if (q <= MAX_Q) return { kind: "per_person", centsPerPerson: 10000 };
    return null;
  }

  // Fátima, Nazaré, Óbidos — 2 p.: 280 € total (140 €/p.); 3–5 / 6–7 por pessoa
  if (tourId === "3-destinos") {
    if (q === 1) return { kind: "per_group", centsTotal: 28000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 14000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 13000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 12000 };
    return null;
  }

  // Lisboa — 2 p.: 240 € total; 3–5: 100 €/p.; 6–7: 90 €/p.; 1 p.: 240 € (grupo)
  if (tourId === "lisboa") {
    if (q === 1) return { kind: "per_group", centsTotal: 24000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 12000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 10000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 9000 };
    return null;
  }

  // Arrábida, Setúbal, Sesimbra — 2 p.: 260 € total; depois por pessoa
  if (tourId === "arraabida") {
    if (q === 1) return { kind: "per_group", centsTotal: 26000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 13000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 12000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 11000 };
    return null;
  }

  if (tourId === "aveiro") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 14000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 14000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 12000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 11000 };
    return null;
  }

  if (tourId === "monsanto" || tourId === "fatima-tomar") {
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
    let cpp: number;
    let label: string;
    if (q <= 2) {
      cpp = 12000;
      label = q === 1 ? "1 pessoa" : "2 pessoas";
    } else if (q <= 4) {
      cpp = 11000;
      label = "3–4 pessoas";
    } else {
      cpp = 10000;
      label = "5–7 pessoas";
    }
    return {
      kind: "per_person",
      centsPerPerson: cpp,
      totalCents: cpp * q,
      label,
    };
  }

  if (tourId === "3-destinos") {
    if (q === 1) {
      return {
        kind: "per_group",
        totalCents: 28000,
        label: "1 pessoa (280 €)",
      };
    }
    if (q === 2) {
      return {
        kind: "per_person",
        centsPerPerson: 14000,
        totalCents: 28000,
        label: "2 pessoas (280 € total)",
      };
    }
    if (q >= 3 && q <= 5) {
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 13000 * q,
        label: "3–5 pessoas",
      };
    }
    return {
      kind: "per_person",
      centsPerPerson: 12000,
      totalCents: 12000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "lisboa") {
    if (q === 1) {
      return {
        kind: "per_group",
        totalCents: 24000,
        label: "1 pessoa (240 €)",
      };
    }
    if (q === 2) {
      return {
        kind: "per_person",
        centsPerPerson: 12000,
        totalCents: 24000,
        label: "2 pessoas (240 € total)",
      };
    }
    if (q >= 3 && q <= 5) {
      return {
        kind: "per_person",
        centsPerPerson: 10000,
        totalCents: 10000 * q,
        label: "3–5 pessoas",
      };
    }
    return {
      kind: "per_person",
      centsPerPerson: 9000,
      totalCents: 9000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "arraabida") {
    if (q === 1) {
      return {
        kind: "per_group",
        totalCents: 26000,
        label: "1 pessoa (260 €)",
      };
    }
    if (q === 2) {
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 26000,
        label: "2 pessoas (260 € total)",
      };
    }
    if (q >= 3 && q <= 5) {
      return {
        kind: "per_person",
        centsPerPerson: 12000,
        totalCents: 12000 * q,
        label: "3–5 pessoas",
      };
    }
    return {
      kind: "per_person",
      centsPerPerson: 11000,
      totalCents: 11000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "aveiro") {
    if (q === 1) {
      return {
        kind: "per_person",
        centsPerPerson: 14000,
        totalCents: 14000,
        label: "1 pessoa",
      };
    }
    if (q === 2) {
      return {
        kind: "per_person",
        centsPerPerson: 14000,
        totalCents: 28000,
        label: "2 pessoas",
      };
    }
    if (q >= 3 && q <= 5) {
      return {
        kind: "per_person",
        centsPerPerson: 12000,
        totalCents: 12000 * q,
        label: "3–5 pessoas",
      };
    }
    return {
      kind: "per_person",
      centsPerPerson: 11000,
      totalCents: 11000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "monsanto" || tourId === "fatima-tomar") {
    if (q === 1) {
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 13000,
        label: "1 pessoa",
      };
    }
    if (q === 2) {
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 26000,
        label: "2 pessoas",
      };
    }
    if (q >= 3 && q <= 5) {
      return {
        kind: "per_person",
        centsPerPerson: 11500,
        totalCents: 11500 * q,
        label: "3–5 pessoas",
      };
    }
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
      label: q <= 3 ? "até 3 pessoas (600 €)" : "4–7 pessoas (700 €)",
    };
  }

  if (tourId === "porto") {
    const cents = q <= 3 ? 80000 : 90000;
    return {
      kind: "per_group",
      totalCents: cents,
      label: q <= 3 ? "até 3 pessoas (800 €)" : "4–7 pessoas (900 €)",
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
