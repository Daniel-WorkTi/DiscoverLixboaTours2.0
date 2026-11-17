import { NextRequest, NextResponse } from "next/server";
import { formatPlaceLabel, type PhotonProps } from "@/lib/place-label";
import { inferPickupZoneFromPlace, type TransportZone } from "@/lib/transport-rules";

export const dynamic = "force-dynamic";

type PhotonFeature = {
  properties?: PhotonProps & { state?: string };
  geometry?: { coordinates?: [number, number] };
};

export type PlaceSuggestion = {
  label: string;
  zone: TransportZone;
  city?: string;
  county?: string;
  lat?: number;
  lon?: number;
};

const LISBON = { lat: "38.7223", lon: "-9.1393" };

function suggestionFrom(feature: PhotonFeature): PlaceSuggestion | null {
  const p = feature.properties;
  if (!p) return null;
  const label = formatPlaceLabel(p);
  if (label.length < 2) return null;
  const coords = feature.geometry?.coordinates;
  const lon = Array.isArray(coords) ? coords[0] : undefined;
  const lat = Array.isArray(coords) ? coords[1] : undefined;
  const zone = inferPickupZoneFromPlace({
    city: p.city,
    locality: p.locality,
    district: p.district,
    county: p.county,
    state: p.state,
    name: p.name,
    lat,
    lon,
  });
  return {
    label,
    zone,
    city: (p.city || p.locality || undefined)?.trim() || undefined,
    county: (p.county || p.district || undefined)?.trim() || undefined,
    lat: typeof lat === "number" ? lat : undefined,
    lon: typeof lon === "number" ? lon : undefined,
  };
}

function suggestionsFrom(features: PhotonFeature[]): PlaceSuggestion[] {
  const inPortugal = features.filter((f) => f.properties?.countrycode === "PT");
  const ranked = inPortugal.length > 0 ? inPortugal : features;
  const out: PlaceSuggestion[] = [];
  const seen = new Set<string>();
  for (const feature of ranked) {
    const item = suggestionFrom(feature);
    if (!item) continue;
    const key = item.label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length >= 6) break;
  }
  return out;
}

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") === "en" ? "en" : "default";
  const latRaw = req.nextUrl.searchParams.get("lat");
  const lonRaw = req.nextUrl.searchParams.get("lon");

  let url: string;
  if (latRaw != null && lonRaw != null) {
    const lat = Number(latRaw);
    const lon = Number(lonRaw);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) {
      return NextResponse.json({ places: [], items: [] }, { status: 400 });
    }
    url = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}&lang=${lang}`;
  } else {
    const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
    if (q.length < 3 || q.length > 80) return NextResponse.json({ places: [], items: [] });
    const params = new URLSearchParams({
      q,
      lang,
      limit: "8",
      lat: LISBON.lat,
      lon: LISBON.lon,
      location_bias_scale: "0.6",
    });
    url = `https://photon.komoot.io/api/?${params}`;
  }

  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "DiscoverLixboaTours/1.0 (pickup autocomplete)",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(4500),
    });
    if (!res.ok) return NextResponse.json({ places: [], items: [] });
    const data = (await res.json()) as { features?: PhotonFeature[] };
    const items = suggestionsFrom(data.features ?? []);
    return NextResponse.json({
      items,
      /** Legado: só labels, para clientes antigos. */
      places: items.map((i) => i.label),
    });
  } catch {
    return NextResponse.json({ places: [], items: [] });
  }
}
