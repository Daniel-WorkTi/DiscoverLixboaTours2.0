import { describe, expect, it } from "vitest";
import {
  stripLocalePrefix,
  withLocalePrefix,
  localeFromPathname,
  isAppLocale,
} from "./locale";
import { localizeEnToEs } from "./localize-en-es";

describe("i18n locale helpers", () => {
  it("strips /en and /es prefixes", () => {
    expect(stripLocalePrefix("/en")).toBe("/");
    expect(stripLocalePrefix("/en/reservar")).toBe("/reservar");
    expect(stripLocalePrefix("/es")).toBe("/");
    expect(stripLocalePrefix("/es/tours/lisboa")).toBe("/tours/lisboa");
    expect(stripLocalePrefix("/tours/lisboa")).toBe("/tours/lisboa");
  });

  it("detects locale from pathname", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/tours/lisboa")).toBe("en");
    expect(localeFromPathname("/es")).toBe("es");
    expect(localeFromPathname("/es/reservar")).toBe("es");
    expect(localeFromPathname("/reservar")).toBe("pt");
  });

  it("prefixes paths by locale", () => {
    expect(withLocalePrefix("/", "en")).toBe("/en");
    expect(withLocalePrefix("/reservar", "en")).toBe("/en/reservar");
    expect(withLocalePrefix("/", "es")).toBe("/es");
    expect(withLocalePrefix("/tours/lisboa", "es")).toBe("/es/tours/lisboa");
    expect(withLocalePrefix("/en/reservar", "pt")).toBe("/reservar");
    expect(withLocalePrefix("/es/reservar", "pt")).toBe("/reservar");
    expect(withLocalePrefix("/tours/lisboa", "pt")).toBe("/tours/lisboa");
    expect(withLocalePrefix("/reservar?tour=lisboa", "en")).toBe(
      "/en/reservar?tour=lisboa",
    );
    expect(withLocalePrefix("/reservar?tour=lisboa", "es")).toBe(
      "/es/reservar?tour=lisboa",
    );
  });

  it("validates app locales", () => {
    expect(isAppLocale("pt")).toBe(true);
    expect(isAppLocale("en")).toBe(true);
    expect(isAppLocale("es")).toBe(true);
    expect(isAppLocale("fr")).toBe(false);
  });

  it("localizes EN→ES without mangling Portela / Lisbon", () => {
    expect(localizeEnToEs("Portela Sintra Station")).toBe(
      "Estación Portela Sintra",
    );
    expect(localizeEnToEs("Lisbon / Airport / Hotel")).toBe(
      "Lisboa / Aeropuerto / Hotel",
    );
    expect(localizeEnToEs("Portela")).toBe("Portela");
  });
});
