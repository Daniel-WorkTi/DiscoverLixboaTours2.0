import { describe, expect, it } from "vitest";
import {
  getMigratedTour,
  listMigratedTours,
  MIGRATED_TOUR_SLUGS,
} from "@/content/tours";
import { getPricingRuleFromTable } from "@/lib/tour-pricing-table";

describe("migrated tours content integrity", () => {
  it("has at least Lisboa migrated", () => {
    expect(MIGRATED_TOUR_SLUGS).toContain("lisboa");
  });

  for (const slug of MIGRATED_TOUR_SLUGS) {
    describe(`tour ${slug}`, () => {
      const tour = getMigratedTour(slug)!;

      it("has PT and EN content", () => {
        expect(tour.content.pt.title.length).toBeGreaterThan(3);
        expect(tour.content.en.title.length).toBeGreaterThan(3);
        expect(tour.content.pt.itinerary.length).toBeGreaterThan(0);
        expect(tour.content.en.itinerary.length).toBe(
          tour.content.pt.itinerary.length,
        );
        expect(tour.content.pt.included.length).toBeGreaterThan(0);
        expect(tour.content.en.included.length).toBe(
          tour.content.pt.included.length,
        );
      });

      it("has operational pricing and capacity", () => {
        expect(tour.maxGuests).toBe(8);
        expect(tour.minGuests).toBeGreaterThanOrEqual(1);
        expect(tour.durationHours).toBeGreaterThan(0);
        for (let g = tour.minGuests; g <= tour.maxGuests; g += 1) {
          const cents = tour.groupTotalsCents[g];
          expect(typeof cents).toBe("number");
          expect(cents).toBeGreaterThan(0);
        }
      });

      it("pricing table adapter matches content totals", () => {
        for (let g = tour.minGuests; g <= tour.maxGuests; g += 1) {
          const rule = getPricingRuleFromTable(slug, g);
          expect(rule?.kind).toBe("per_group");
          if (rule?.kind === "per_group") {
            expect(rule.centsTotal).toBe(tour.groupTotalsCents[g]);
          }
        }
      });

      it("has SEO for both locales", () => {
        expect(tour.seo.pt.title).toContain("DiscoverLixboaTours");
        expect(tour.seo.en.title).toContain("DiscoverLixboaTours");
      });

      it("has notIncluded and pickup options", () => {
        expect(tour.content.pt.notIncluded.length).toBeGreaterThan(0);
        expect(tour.content.en.notIncluded.length).toBe(
          tour.content.pt.notIncluded.length,
        );
        expect(tour.content.pt.pickupItems?.length ?? 0).toBeGreaterThan(0);
        expect(tour.content.en.pickupItems?.length).toBe(
          tour.content.pt.pickupItems?.length,
        );
      });

      it("does not reuse Sintra pickup outside sintra-cascais", () => {
        if (slug === "sintra-cascais") return;
        for (const locale of ["pt", "en"] as const) {
          const titles = (tour.content[locale].pickupItems ?? []).map((p) =>
            p.title.toLowerCase(),
          );
          expect(titles.some((t) => t === "sintra")).toBe(false);
          expect(titles.some((t) => t.includes("portela"))).toBe(false);
        }
      });
    });
  }

  it("lists all migrated tours", () => {
    expect(listMigratedTours().length).toBe(MIGRATED_TOUR_SLUGS.length);
  });

  it("TourPage UI copy is not hardcoded to Sintra", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const file = path.join(
      process.cwd(),
      "components/tours/TourPage.tsx",
    );
    const src = await fs.readFile(file, "utf8");
    expect(src).not.toMatch(/Descobre Sintra e Cascais/);
    expect(src).not.toMatch(/O melhor de Sintra e Cascais/);
    expect(src).not.toMatch(/Por grupo \(1–2 passageiros\)/);
  });
});
