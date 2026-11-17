import { describe, expect, it } from "vitest";
import {
  defaultPickupZone,
  formatTransportNotes,
  inferPickupZoneFromPlace,
  isSintraCascaisTour,
  pickupZonesForTour,
  resolveTransportPolicy,
  SINTRA_CASCAIS_TOUR_ID,
} from "./transport-rules";

describe("transport-rules", () => {
  it("identifica Sintra & Cascais pelo slug estável", () => {
    expect(isSintraCascaisTour(SINTRA_CASCAIS_TOUR_ID)).toBe(true);
    expect(isSintraCascaisTour("Sintra & Cascais")).toBe(false);
    expect(isSintraCascaisTour("lisboa")).toBe(false);
  });

  it("Sintra & Cascais: Sintra e Portela gratuitos", () => {
    for (const zone of ["sintra", "portela_sintra"] as const) {
      const p = resolveTransportPolicy(SINTRA_CASCAIS_TOUR_ID, {
        pickupZone: zone,
      });
      expect(p).toEqual({
        status: "free",
        extraCents: 0,
        summaryKey: "pickupFree",
        requiresQuote: false,
      });
    }
  });

  it("Sintra & Cascais: Cascais gratuito no território do tour", () => {
    expect(
      resolveTransportPolicy(SINTRA_CASCAIS_TOUR_ID, {
        pickupZone: "cascais",
      }),
    ).toMatchObject({ status: "free", extraCents: 0, requiresQuote: false });
  });

  it("Sintra & Cascais: Lisboa sob consulta", () => {
    const p = resolveTransportPolicy(SINTRA_CASCAIS_TOUR_ID, {
      pickupZone: "lisboa",
    });
    expect(p.status).toBe("on_request");
    expect(p.extraCents).toBe(0);
    expect(p.requiresQuote).toBe(true);
    expect(p.summaryKey).toBe("pickupOnRequest");
  });

  it("Sintra & Cascais: drop-off hotel Lisboa sob consulta", () => {
    const p = resolveTransportPolicy(SINTRA_CASCAIS_TOUR_ID, {
      pickupZone: "sintra",
      dropOffLisbonHotel: true,
    });
    expect(p.status).toBe("on_request");
    expect(p.extraCents).toBe(0);
    expect(p.requiresQuote).toBe(true);
    expect(p.summaryKey).toBe("dropOffOnRequest");
  });

  it("outros tours: Lisboa/Sintra/Cascais incluídos", () => {
    for (const tourId of [
      "lisboa",
      "3-destinos",
      "porto",
      "arraabida",
      "fatima-tomar",
      "future-cms-tour",
    ]) {
      for (const zone of ["lisboa", "sintra", "cascais"] as const) {
        const p = resolveTransportPolicy(tourId, { pickupZone: zone });
        expect(p).toEqual({
          status: "included",
          extraCents: 0,
          summaryKey: "pickupIncluded",
          requiresQuote: false,
        });
      }
    }
  });

  it("outros tours: qualquer zona incluída (pickup/drop-off free)", () => {
    const p = resolveTransportPolicy("porto", { pickupZone: "other" });
    expect(p).toEqual({
      status: "included",
      extraCents: 0,
      summaryKey: "pickupIncluded",
      requiresQuote: false,
    });
  });

  it("nunca devolve taxa > 0", () => {
    const cases = [
      { tourId: SINTRA_CASCAIS_TOUR_ID, pickupZone: "lisboa" as const },
      {
        tourId: SINTRA_CASCAIS_TOUR_ID,
        pickupZone: "sintra" as const,
        dropOffLisbonHotel: true,
      },
      { tourId: "algarve", pickupZone: "other" as const },
    ];
    for (const c of cases) {
      expect(resolveTransportPolicy(c.tourId, c).extraCents).toBe(0);
    }
  });

  it("zonas do seletor: Portela só no tour Sintra", () => {
    expect(pickupZonesForTour(SINTRA_CASCAIS_TOUR_ID)).toContain(
      "portela_sintra",
    );
    expect(pickupZonesForTour("lisboa")).not.toContain("portela_sintra");
    expect(defaultPickupZone(SINTRA_CASCAIS_TOUR_ID)).toBe("sintra");
    expect(defaultPickupZone("3-destinos")).toBe("lisboa");
  });

  it("formatTransportNotes inclui zona e estado", () => {
    const lines = formatTransportNotes(
      SINTRA_CASCAIS_TOUR_ID,
      { pickupZone: "lisboa", dropOffLisbonHotel: true },
      "pt",
    );
    expect(lines.some((l) => /Lisboa/.test(l))).toBe(true);
    expect(lines.some((l) => /sob consulta/.test(l))).toBe(true);
    expect(lines.some((l) => /Drop-off/.test(l))).toBe(true);
  });

  it("infere zona por campos geográficos, não só pelo texto livre", () => {
    expect(
      inferPickupZoneFromPlace({
        city: "Lisboa",
        county: "Lisboa",
        name: "Hotel Mundial",
      }),
    ).toBe("lisboa");
    expect(
      inferPickupZoneFromPlace({
        city: "Sintra",
        county: "Lisboa",
        name: "Palácio Nacional",
      }),
    ).toBe("sintra");
    expect(
      inferPickupZoneFromPlace({
        city: "Cascais",
        name: "Hotel Cascais",
      }),
    ).toBe("cascais");
    expect(
      inferPickupZoneFromPlace({
        name: "Estação Portela de Sintra",
        city: "Sintra",
      }),
    ).toBe("portela_sintra");
    expect(
      inferPickupZoneFromPlace({
        lat: 38.7223,
        lon: -9.1393,
      }),
    ).toBe("lisboa");
    expect(
      inferPickupZoneFromPlace({
        name: "Algo com a palavra Lisboa no nome",
      }),
    ).toBe("other");
  });
});

