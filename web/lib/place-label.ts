export type PhotonProps = {
  name?: string;
  street?: string;
  housenumber?: string;
  city?: string;
  locality?: string;
  district?: string;
  county?: string;
  state?: string;
  country?: string;
  countrycode?: string;
};

/** Morada curta para o campo de pickup (máx. 140, o limite do checkout). */
export function formatPlaceLabel(p: PhotonProps): string {
  const street = [p.street, p.housenumber].filter(Boolean).join(" ").trim();
  const city = (p.city || p.locality || p.district || p.county || "").trim();
  const parts = [p.name, street, city].map((s) => s?.trim()).filter((s): s is string => Boolean(s));
  const unique: string[] = [];
  for (const part of parts) {
    if (unique.some((u) => u.toLowerCase() === part.toLowerCase())) continue;
    unique.push(part);
  }
  return unique.join(", ").slice(0, 140);
}
