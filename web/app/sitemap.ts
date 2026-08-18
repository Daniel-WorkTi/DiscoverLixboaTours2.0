import type { MetadataRoute } from "next";
import { BRAND_SITE_URL } from "@/lib/brand";

const origin = BRAND_SITE_URL.replace(/\/$/, "");

const TOUR_SLUGS = [
  "sintra-cascais",
  "3-destinos",
  "lisboa",
  "porto",
  "arraabida",
  "aveiro",
  "monsanto",
  "fatima-tomar",
  "alentejo",
  "algarve",
] as const;

const STATIC = [
  "",
  "/reservar",
  "/executive",
  "/privacidade",
  "/cookies",
  "/termos",
  "/sgpd",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC) {
    const bare = path || "/";
    entries.push({
      url: `${origin}${bare === "/" ? "/" : bare}`,
      lastModified: now,
      changeFrequency: bare === "/" ? "weekly" : "monthly",
      priority: bare === "/" ? 1 : 0.7,
      alternates: {
        languages: {
          "pt-PT": `${origin}${bare === "/" ? "/" : bare}`,
          en: bare === "/" ? `${origin}/en` : `${origin}/en${bare}`,
          "x-default": bare === "/" ? `${origin}/en` : `${origin}/en${bare}`,
        },
      },
    });
  }

  for (const slug of TOUR_SLUGS) {
    const bare = `/tours/${slug}`;
    entries.push({
      url: `${origin}${bare}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: {
          "pt-PT": `${origin}${bare}`,
          en: `${origin}/en${bare}`,
          "x-default": `${origin}/en${bare}`,
        },
      },
    });
  }

  return entries;
}
