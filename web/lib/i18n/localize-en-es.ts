/**
 * Localização EN → ES para UI e conteúdo de tours.
 * 1) Mapa exacto de strings completas
 * 2) Frases multi-palavra / termos seguros (nunca partículas curtas tipo "or"/"a ")
 */

import enToEsExact from "./en-to-es-exact.json";

const EXACT = enToEsExact as Record<string, string>;

/** Só expressões com limite de palavra; sem partículas ("or", "a ", "the"…) que partem nomes próprios. */
const PHRASES = [
  ["private tour", "tour privado"],
  ["Private Tour", "Tour Privado"],
  ["Private Tours", "Tours Privados"],
  ["day trip", "excursión de un día"],
  ["Day Trip", "Excursión de un día"],
  ["full-day", "día completo"],
  ["Full-day", "Día completo"],
  ["Full day", "Día completo"],
  ["driver-guide", "conductor-guía"],
  ["local guide", "guía local"],
  ["Local Guide", "Guía local"],
  ["hotel pickup", "recogida en hotel"],
  ["airport pickup", "recogida en aeropuerto"],
  ["pick-up", "recogida"],
  ["Pick-up", "Recogida"],
  ["Pickup", "Recogida"],
  ["pickup", "recogida"],
  ["drop-off", "dejada"],
  ["Drop-off", "Dejada"],
  ["meeting point", "punto de encuentro"],
  ["Book Now", "Reservar ahora"],
  ["Book online", "Reservar online"],
  ["Learn more", "Saber más"],
  ["View on map", "Ver en el mapa"],
  ["What's included", "Qué está incluido"],
  ["Not included", "No incluido"],
  ["Free cancellation", "Cancelación gratuita"],
  ["Instant confirmation", "Confirmación inmediata"],
  ["Secure payment", "Pago seguro"],
  ["per person", "por persona"],
  ["per group", "por grupo"],
  ["Starting from", "Desde"],
  ["No extra cost", "Sin coste adicional"],
  ["extra fee on request", "coste adicional bajo consulta"],
  ["on request", "bajo consulta"],
  ["Quiet meeting point", "Punto de encuentro tranquilo"],
  ["Return to a Lisbon hotel", "Regreso a un hotel en Lisboa"],
  ["at the end of the tour", "al final del tour"],
  ["All rights reserved", "Todos los derechos reservados"],
  ["Terms of Use", "Términos de Uso"],
  ["Privacy Policy", "Política de Privacidad"],
  ["About Us", "Sobre nosotros"],
  ["Thank you", "Gracias"],
  ["Destinations", "Destinos"],
  ["Experience", "Experiencia"],
  ["Itinerary", "Itinerario"],
  ["Highlights", "Destacados"],
  ["Gallery", "Galería"],
  ["Services", "Servicios"],
  ["Contact", "Contacto"],
  ["Booking", "Reserva"],
  ["Reservation", "Reserva"],
  ["Payment", "Pago"],
  ["Summary", "Resumen"],
  ["Optional", "Opcional"],
  ["optional", "opcional"],
  ["Included", "Incluido"],
  ["included", "incluido"],
  ["Exclusive", "Exclusivo"],
  ["exclusive", "exclusivo"],
  ["Comfort", "Comodidad"],
  ["comfort", "comodidad"],
  ["Adventure", "Aventura"],
  ["adventure", "aventura"],
  ["Privacy", "Privacidad"],
  ["privacy", "privacidad"],
  ["Continue", "Continuar"],
  ["Previous", "Anterior"],
  ["Required", "Obligatorio"],
  ["Loading", "Cargando"],
  ["Success", "Éxito"],
  ["Preferences", "Preferencias"],
  ["Address", "Dirección"],
  ["Phone", "Teléfono"],
  ["Email", "Correo electrónico"],
  ["guests", "personas"],
  ["guest", "persona"],
  ["hours", "horas"],
  ["hour", "hora"],
  ["Station", "Estación"],
  ["Airport", "Aeropuerto"],
  ["Hotel", "Hotel"],
  ["Lisbon", "Lisboa"],
  ["Porto", "Oporto"],
] as [string, string][];

PHRASES.sort((a, b) => b[0].length - a[0].length);

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Substitui só com limites de palavra (evita "or" dentro de Portela, etc.). */
function replacePhrase(haystack: string, en: string, es: string): string {
  const startsWord = /^\w/.test(en);
  const endsWord = /\w$/.test(en);
  const left = startsWord ? "\\b" : "";
  const right = endsWord ? "\\b" : "";
  const re = new RegExp(`${left}${escapeRegExp(en)}${right}`, "g");
  return haystack.replace(re, es);
}

export function localizeEnToEs(text: string): string {
  if (!text) return text;
  const exact = EXACT[text];
  if (exact) return exact;

  let out = text;
  for (const [en, es] of PHRASES) {
    if (out.includes(en)) out = replacePhrase(out, en, es);
  }
  return out;
}

export function localizeDeepEnToEs<T>(value: T): T {
  if (typeof value === "string") return localizeEnToEs(value) as T;
  if (typeof value === "function") {
    const fn = value as (...args: unknown[]) => unknown;
    return ((...args: unknown[]) => {
      const result = fn(...args);
      return typeof result === "string"
        ? localizeEnToEs(result)
        : localizeDeepEnToEs(result);
    }) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizeDeepEnToEs(item)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(
      value as Record<string, unknown>,
    )) {
      out[key] = localizeDeepEnToEs(nested);
    }
    return out as T;
  }
  return value;
}
