import { describe, expect, it } from "vitest";
import {
  WHATSAPP_E164,
  digitsForWhatsApp,
  whatsappSiteUrl,
  whatsappUrlForCustomerPhone,
} from "./whatsapp";

describe("whatsappSiteUrl", () => {
  it("usa o número oficial do site", () => {
    const u = whatsappSiteUrl("Olá!");
    expect(u).toContain(`https://wa.me/${WHATSAPP_E164}`);
    expect(u).not.toContain("351934483351");
  });

  it("usa a mensagem padrão de contacto sem argumento", () => {
    const u = whatsappSiteUrl();
    expect(u).toContain(`https://wa.me/${WHATSAPP_E164}`);
    expect(decodeURIComponent(u.split("text=")[1])).toBe(
      "Thank you for contacting us! We are at your service. Descubralixboatours",
    );
  });
});

describe("digitsForWhatsApp", () => {
  it("normalizes PT 9 digits to 351…", () => {
    expect(digitsForWhatsApp("912 345 678")).toBe("351912345678");
  });

  it("keeps full E.164 digits", () => {
    expect(digitsForWhatsApp("+351 912 345 678")).toBe("351912345678");
  });
});

describe("whatsappUrlForCustomerPhone", () => {
  it("returns wa.me when phone ok", () => {
    const u = whatsappUrlForCustomerPhone("912345678", {
      customerName: "Ana Costa",
      tourLabel: "Sintra",
      preferredDate: "2026-06-01",
    });
    expect(u).toContain("https://wa.me/351912345678");
    expect(u).toContain("text=");
  });

  it("returns null without digits", () => {
    expect(whatsappUrlForCustomerPhone("")).toBeNull();
  });
});
