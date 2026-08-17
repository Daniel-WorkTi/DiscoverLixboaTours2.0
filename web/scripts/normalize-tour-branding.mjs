/**
 * Normalização FASE 1: branding, e-mail, copyright e WhatsApp de contacto
 * nos HTML de tour-sources (depois correr npm run patch-tours).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "tour-sources");
const BRAND = "DiscoverLixboaTours";
const EMAIL = "discoverlixboatours@gmail.com";
const WA =
  "https://wa.me/351934483853?text=Thank%20you%20for%20contacting%20us!%20We%20are%20at%20your%20service.%20Descubralixboatours";
const YEAR = String(new Date().getFullYear());

for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".html")) continue;
  const file = path.join(dir, name);
  let html = fs.readFileSync(file, "utf8");
  const before = html;

  html = html.replace(/Discoverlix Boatours/gi, BRAND);
  html = html.replace(/DiscoverTour/g, BRAND);
  html = html.replace(/Discoverlixboatours@gmail\.com/gi, EMAIL);
  html = html.replace(/websitediscoverlixboatours@gmail\.com/gi, EMAIL);

  html = html.replace(
    /&copy;\s*20\d{2}\s+DiscoverLixboaTours\./g,
    `&copy; ${YEAR} ${BRAND}.`,
  );
  html = html.replace(
    /©\s*20\d{2}\s+DiscoverLixboaTours\./g,
    `© ${YEAR} ${BRAND}.`,
  );

  html = html.replace(/alt="DiscoverTour Logo"/g, `alt="${BRAND} Logo"`);
  html = html.replace(/alt="DiscoverLixboaTours Logo"/g, `alt="${BRAND} Logo"`);

  // Contact WhatsApp links on tour pages
  html = html.replace(
    /https:\/\/wa\.me\/351934483853\?text=[^"'\s]*/g,
    WA,
  );

  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    console.log("normalized", name);
  } else {
    console.log("unchanged", name);
  }
}
