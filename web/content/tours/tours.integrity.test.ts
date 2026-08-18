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
    });
  }

  it("lists all migrated tours", () => {
    expect(listMigratedTours().length).toBe(MIGRATED_TOUR_SLUGS.length);
  });
});
