import { NextRequest, NextResponse } from "next/server";
import { formatPlaceLabel, type PhotonProps } from "@/lib/place-label";

export const dynamic = "force-dynamic";

type PhotonFeature = { properties?: PhotonProps };

const LISBON = { lat: "38.7223", lon: "-9.1393" };

function placesFrom(features: PhotonFeature[]): string[] {
  const inPortugal = features.filter((f) => f.properties?.countrycode === "PT");
  const ranked = inPortugal.length > 0 ? inPortugal : features;
  const labels = ranked
    .map((f) => (f.properties ? formatPlaceLabel(f.properties) : ""))
    .filter((s) => s.length >= 2);
  return [...new Set(labels)].slice(0, 6);
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
      return NextResponse.json({ places: [] }, { status: 400 });
    }
    url = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}&lang=${lang}`;
  } else {
    const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
    if (q.length < 3 || q.length > 80) return NextResponse.json({ places: [] });
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
    if (!res.ok) return NextResponse.json({ places: [] });
    const data = (await res.json()) as { features?: PhotonFeature[] };
    return NextResponse.json({ places: placesFrom(data.features ?? []) });
  } catch {
    return NextResponse.json({ places: [] });
  }
}
