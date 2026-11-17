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
  const es = bare === "/" ? `${origin}/es` : `${origin}/es${bare}`;
  return {
    "pt-PT": pt,
    en,
    es,
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
    const esUrl = bare === "/" ? `${origin}/es` : `${origin}/es${bare}`;
    const priority = bare === "/" ? 1 : bare === "/reservar" ? 0.9 : 0.55;
    const changeFrequency =
      bare === "/" || bare === "/reservar" ? "weekly" : "monthly";
    const alts = languageAlternates(bare);

    entries.push({
      url: ptUrl,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: alts },
    });
    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency,
      priority: bare === "/" ? 1 : priority,
      alternates: { languages: alts },
    });
    entries.push({
      url: esUrl,
      lastModified: now,
      changeFrequency,
      priority: bare === "/" ? 1 : priority,
      alternates: { languages: alts },
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
    entries.push({
      url: `${origin}/es${bare}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: alts },
    });
  }

  return entries;
}
