import { describe, expect, it } from "vitest";
import {
  localeFromPathname,
  stripLocalePrefix,
  withLocalePrefix,
} from "@/lib/i18n/locale";

describe("i18n locale helpers", () => {
  it("strips /en prefix", () => {
    expect(stripLocalePrefix("/en")).toBe("/");
    expect(stripLocalePrefix("/en/reservar")).toBe("/reservar");
    expect(stripLocalePrefix("/tours/lisboa")).toBe("/tours/lisboa");
  });

  it("detects locale from pathname", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/tours/lisboa")).toBe("en");
    expect(localeFromPathname("/reservar")).toBe("pt");
  });

  it("builds localized paths", () => {
    expect(withLocalePrefix("/", "en")).toBe("/en");
    expect(withLocalePrefix("/reservar", "en")).toBe("/en/reservar");
    expect(withLocalePrefix("/en/reservar", "pt")).toBe("/reservar");
    expect(withLocalePrefix("/tours/lisboa", "pt")).toBe("/tours/lisboa");
  });
});
