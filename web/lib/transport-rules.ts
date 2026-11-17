/**
 * Regras comerciais de pickup / drop-off.
 * Fonte única para UI de reserva e validação no checkout.
 * Nunca inventa preços — "sob consulta" = aviso + pedido, extraCents = 0.
 */

export const SINTRA_CASCAIS_TOUR_ID = "sintra-cascais" as const;

export const TRANSPORT_ZONES = [
  "lisboa",
  "sintra",
  "cascais",
  "portela_sintra",
  "other",
] as const;

export type TransportZone = (typeof TRANSPORT_ZONES)[number];

export type TransportStatus =
  | "included"
  | "free"
  | "on_request"
  | "outside_policy";

export type TransportSummaryKey =
  | "pickupIncluded"
  | "pickupFree"
  | "pickupOnRequest"
  | "dropOffOnRequest"
  | "pickupOutside";

export type TransportPolicy = {
  status: TransportStatus;
  /** Sempre 0 — não calcular taxas no Stripe. */
  extraCents: 0;
  summaryKey: TransportSummaryKey;
  /** Pedido de transporte que precisa de orçamento. */
  requiresQuote: boolean;
};

export type TransportRequestInput = {
  pickupZone: TransportZone;
  /** Só relevante no tour Sintra & Cascais. */
  dropOffLisbonHotel?: boolean;
};

const ZONE_SET = new Set<string>(TRANSPORT_ZONES);

export function isTransportZone(value: unknown): value is TransportZone {
  return typeof value === "string" && ZONE_SET.has(value);
}

export function isSintraCascaisTour(tourId: string): boolean {
  return tourId === SINTRA_CASCAIS_TOUR_ID;
}

/** Zonas disponíveis no seletor do formulário (Portela só no tour Sintra). */
export function pickupZonesForTour(tourId: string): TransportZone[] {
  if (isSintraCascaisTour(tourId)) {
    return ["sintra", "portela_sintra", "lisboa", "cascais", "other"];
  }
  return ["lisboa", "sintra", "cascais", "other"];
}

export function defaultPickupZone(tourId: string): TransportZone {
  return isSintraCascaisTour(tourId) ? "sintra" : "lisboa";
}

function foldText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Infere a zona a partir de campos geográficos estruturados (Photon)
 * e, se necessário, coordenadas — nunca só pela palavra "Lisboa" no texto livre.
 */
export function inferPickupZoneFromPlace(input: {
  city?: string | null;
  locality?: string | null;
  district?: string | null;
  county?: string | null;
  state?: string | null;
  name?: string | null;
  lat?: number | null;
  lon?: number | null;
}): TransportZone {
  const muni = foldText(
    [input.city, input.locality, input.district, input.county, input.state]
      .filter((s): s is string => Boolean(s && String(s).trim()))
      .join(" | "),
  );
  const name = foldText(input.name ?? "");

  if (
    (muni.includes("portela") && muni.includes("sintra")) ||
    (name.includes("portela") && (name.includes("sintra") || muni.includes("sintra")))
  ) {
    return "portela_sintra";
  }

  if (/\bsintra\b/.test(muni) || (/\bsintra\b/.test(name) && !/\blisboa\b|\blisbon\b/.test(muni))) {
    return "sintra";
  }
  if (/\bcascais\b|\bestoril\b/.test(muni) || /\bcascais\b|\bestoril\b/.test(name)) {
    return "cascais";
  }
  if (/\blisboa\b|\blisbon\b/.test(muni)) {
    return "lisboa";
  }

  const lat = input.lat;
  const lon = input.lon;
  if (
    typeof lat === "number" &&
    typeof lon === "number" &&
    Number.isFinite(lat) &&
    Number.isFinite(lon)
  ) {
    return zoneFromCoords(lat, lon);
  }

  return "other";
}

/** Bounding boxes aproximadas dos municípios (WGS84). */
function zoneFromCoords(lat: number, lon: number): TransportZone {
  // Cascais / Estoril (costa oeste)
  if (lat >= 38.66 && lat <= 38.76 && lon >= -9.5 && lon <= -9.35) {
    return "cascais";
  }
  // Sintra
  if (lat >= 38.75 && lat <= 38.9 && lon >= -9.48 && lon <= -9.28) {
    return "sintra";
  }
  // Lisboa (cidade / concelho)
  if (lat >= 38.69 && lat <= 38.8 && lon >= -9.23 && lon <= -9.08) {
    return "lisboa";
  }
  return "other";
}

/**
 * Resolve a política comercial para um tour + zona.
 * Identifica Sintra & Cascais pelo slug estável, nunca pelo label UI.
 */
export function resolveTransportPolicy(
  tourId: string,
  input: TransportRequestInput,
): TransportPolicy {
  const zone = input.pickupZone;
  const dropOffLisbon = Boolean(input.dropOffLisbonHotel);

  if (isSintraCascaisTour(tourId)) {
    if (dropOffLisbon) {
      return {
        status: "on_request",
        extraCents: 0,
        summaryKey: "dropOffOnRequest",
        requiresQuote: true,
      };
    }
    if (zone === "lisboa") {
      return {
        status: "on_request",
        extraCents: 0,
        summaryKey: "pickupOnRequest",
        requiresQuote: true,
      };
    }
    if (zone === "sintra" || zone === "portela_sintra" || zone === "cascais") {
      return {
        status: "free",
        extraCents: 0,
        summaryKey: "pickupFree",
        requiresQuote: false,
      };
    }
    return {
      status: "outside_policy",
      extraCents: 0,
      summaryKey: "pickupOutside",
      requiresQuote: true,
    };
  }

  // Restantes tours: pickup e drop-off incluídos (sem taxa), qualquer morada.
  return {
    status: "included",
    extraCents: 0,
    summaryKey: "pickupIncluded",
    requiresQuote: false,
  };
}

/** Linhas de texto para notes / metadata Stripe (PT|EN). */
export function formatTransportNotes(
  tourId: string,
  input: TransportRequestInput,
  locale: "pt" | "en" | "es",
): string[] {
  const policy = resolveTransportPolicy(tourId, input);
  const zoneLabel = zoneLabelFor(input.pickupZone, locale);
  const lines: string[] = [];

  if (locale === "en") {
    lines.push(`Pickup zone: ${zoneLabel}`);
    lines.push(`Transport status: ${statusLabelEn(policy)}`);
    if (input.dropOffLisbonHotel && isSintraCascaisTour(tourId)) {
      lines.push("Drop-off: Lisbon hotel (extra fee on request)");
    }
  } else if (locale === "es") {
    lines.push(`Zona de recogida: ${zoneLabel}`);
    lines.push(`Estado del transporte: ${statusLabelEs(policy)}`);
    if (input.dropOffLisbonHotel && isSintraCascaisTour(tourId)) {
      lines.push("Llegada: hotel en Lisboa (coste adicional bajo consulta)");
    }
  } else {
    lines.push(`Zona de recolha: ${zoneLabel}`);
    lines.push(`Estado do transporte: ${statusLabelPt(policy)}`);
    if (input.dropOffLisbonHotel && isSintraCascaisTour(tourId)) {
      lines.push("Drop-off: hotel em Lisboa (custo adicional sob consulta)");
    }
  }

  return lines;
}

function zoneLabelFor(
  zone: TransportZone,
  locale: "pt" | "en" | "es",
): string {
  const pt: Record<TransportZone, string> = {
    lisboa: "Lisboa",
    sintra: "Sintra",
    cascais: "Cascais",
    portela_sintra: "Estação Portela de Sintra",
    other: "Outra localização",
  };
  const en: Record<TransportZone, string> = {
    lisboa: "Lisbon",
    sintra: "Sintra",
    cascais: "Cascais",
    portela_sintra: "Portela Sintra station",
    other: "Other location",
  };
  const es: Record<TransportZone, string> = {
    lisboa: "Lisboa",
    sintra: "Sintra",
    cascais: "Cascais",
    portela_sintra: "Estación Portela de Sintra",
    other: "Otra ubicación",
  };
  if (locale === "en") return en[zone];
  if (locale === "es") return es[zone];
  return pt[zone];
}

function statusLabelPt(policy: TransportPolicy): string {
  switch (policy.status) {
    case "included":
      return "incluído no preço";
    case "free":
      return "sem custo adicional";
    case "on_request":
      return "custo adicional sob consulta";
    case "outside_policy":
      return "fora da política padrão — sob consulta";
  }
}

function statusLabelEn(policy: TransportPolicy): string {
  switch (policy.status) {
    case "included":
      return "included in the price";
    case "free":
      return "no extra cost";
    case "on_request":
      return "extra fee on request";
    case "outside_policy":
      return "outside standard policy — on request";
  }
}

function statusLabelEs(policy: TransportPolicy): string {
  switch (policy.status) {
    case "included":
      return "incluido en el precio";
    case "free":
      return "sin coste adicional";
    case "on_request":
      return "coste adicional bajo consulta";
    case "outside_policy":
      return "fuera de la política estándar — bajo consulta";
  }
}
