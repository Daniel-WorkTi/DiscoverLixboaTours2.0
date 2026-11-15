import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/seo";

const origin = SITE_ORIGIN;

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

function languageAlternates(bare: string) {
  const pt = bare === "/" ? `${origin}/` : `${origin}${bare}`;
  const en = bare === "/" ? `${origin}/en` : `${origin}/en${bare}`;
  return {
    "pt-PT": pt,
    en,
    "x-default": en,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC) {
    const bare = path || "/";
    const ptUrl = bare === "/" ? `${origin}/` : `${origin}${bare}`;
    const enUrl = bare === "/" ? `${origin}/en` : `${origin}/en${bare}`;
    const priority = bare === "/" ? 1 : bare === "/reservar" ? 0.9 : 0.55;
    const changeFrequency = bare === "/" || bare === "/reservar" ? "weekly" : "monthly";

    // PT + EN como URLs indexáveis (hreflang aponta x-default → EN para gringos)
    entries.push({
      url: ptUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(bare) },
    });
    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency,
      priority: bare === "/" ? 1 : priority,
      alternates: { languages: languageAlternates(bare) },
    });
  }

  for (const slug of TOUR_SLUGS) {
    const bare = `/tours/${slug}`;
    const alts = languageAlternates(bare);
    entries.push({
      url: `${origin}${bare}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: alts },
    });
    entries.push({
      url: `${origin}/en${bare}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: alts },
    });
  }

  return entries;
}
