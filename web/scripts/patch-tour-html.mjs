/**
 * Gera os tour-*.html em public/ com caminhos absolutos para o Next.js.
 * Executar a partir da pasta web: node scripts/patch-tour-html.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(webRoot, "tour-sources");
const outDir = path.join(webRoot, "public");

const TOUR_FILES = [
  "tour-sintra-cascais.html",
  "tour-3-destinos.html",
  "tour-lisboa.html",
  "tour-porto.html",
  "tour-arraabida.html",
  "tour-aveiro.html",
  "tour-monsanto.html",
  "tour-fatima-tomar.html",
  "tour-alentejo.html",
  "tour-algarve.html",
];

const TOUR_TO_PATH = [
  ["tour-sintra-cascais.html", "/tours/sintra-cascais"],
  ["tour-3-destinos.html", "/tours/3-destinos"],
  ["tour-lisboa.html", "/tours/lisboa"],
  ["tour-porto.html", "/tours/porto"],
  ["tour-arraabida.html", "/tours/arraabida"],
  ["tour-aveiro.html", "/tours/aveiro"],
  ["tour-monsanto.html", "/tours/monsanto"],
  ["tour-fatima-tomar.html", "/tours/fatima-tomar"],
  ["tour-alentejo.html", "/tours/alentejo"],
  ["tour-algarve.html", "/tours/algarve"],
];

const TOUR_ASSET_V = "2";
/** Número oficial WhatsApp (E.164 sem +) — alinhado com web/lib/whatsapp.ts */
const WHATSAPP_E164 = "351934483853";

function patchContent(raw) {
  let s = raw;

  s = s.replace(
    /href="index\.html#servicos" class="header-cta"/g,
    'href="/reservar" class="header-cta"',
  );
  s = s.replace(
    /href="index\.html#servicos" class="mobile-cta"/g,
    'href="/reservar" class="mobile-cta"',
  );

  s = s.replace(/href="index\.html#About"/g, 'href="/#sobre"');
  s = s.replace(/href="index\.html#home"/g, 'href="/#home"');
  s = s.replace(/href="index\.html#servicos"/g, 'href="/#servicos"');
  s = s.replace(/href="index\.html#instagram"/g, 'href="/#instagram"');
  s = s.replace(/href="index\.html#faq"/g, 'href="/#faq"');
  s = s.replace(/href="index\.html"/g, 'href="/"');

  for (const [file, url] of TOUR_TO_PATH) {
    s = s.split(file).join(url);
  }

  s = s.replace(/href="assets\//g, 'href="/assets/');
  s = s.replace(/href='assets\//g, "href='/assets/");
  s = s.replace(/src="assets\//g, 'src="/assets/');
  s = s.replace(/src='assets\//g, "src='/assets/");
  s = s.replace(/srcset="assets\//g, 'srcset="/assets/');
  s = s.replace(/srcset='assets\//g, "srcset='/assets/");
  s = s.replace(/, assets\//g, ", /assets/");
  s = s.replace(/, assets\//g, ", /assets/");

  s = s.replace(/href="test-flags\.css"/g, 'href="/test-flags.css"');
  s = s.replace(/href='test-flags\.css'/g, "href='/test-flags.css'");

  // Cache-bust CSS dos tours (evita ver HTML/CSS antigo em CDN/mobile)
  s = s.replace(
    /href="\/assets\/css\/destino\.css(\?[^"]*)?"/g,
    `href="/assets/css/destino.css?v=${TOUR_ASSET_V}"`,
  );
  s = s.replace(
    /href='\/assets\/css\/destino\.css(\?[^']*)?'/g,
    `href='/assets/css/destino.css?v=${TOUR_ASSET_V}'`,
  );

  if (!s.includes("<base ")) {
    s = s.replace(/<head>/i, '<head>\n    <base target="_top" />');
  }

  // Garantir número WhatsApp correto em wa.me, tel: e api.whatsapp.com
  s = s.replace(/351934483351/g, WHATSAPP_E164);
  s = s.replace(/\+351934483351/g, `+${WHATSAPP_E164}`);
  s = s.replace(/\+351 934 483 351/g, "+351 934 483 853");

  // Sticky Book Now (mobile) — CSS inline para não depender do App Router
  if (!s.includes("sticky-mobile-book")) {
    const tourMatch = s.match(/href="\/reservar\?tour=([^"&]+)"/);
    const tourQ = tourMatch ? `?tour=${tourMatch[1]}` : "";
    const sticky = `
<div class="sticky-mobile-book" role="complementary" aria-label="Reservar">
  <a href="/reservar${tourQ}" class="sticky-mobile-book__btn"><span data-translate="book_now">Reservar Agora</span></a>
</div>
<style>
.sticky-mobile-book{display:none}
@media (max-width:768px){
  .sticky-mobile-book{display:block;position:fixed;left:0;right:0;bottom:0;z-index:90;padding:.75rem 1rem calc(.75rem + env(safe-area-inset-bottom,0px));background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.92) 28%,#fff 100%);pointer-events:none}
  .sticky-mobile-book__btn{pointer-events:auto;display:flex;align-items:center;justify-content:center;width:100%;min-height:48px;border-radius:12px;background:#ff6600;color:#fff;font-weight:700;font-size:1rem;text-decoration:none;box-shadow:0 8px 24px rgba(255,102,0,.35)}
  body{padding-bottom:5.5rem}
}
</style>
`;
    s = s.replace(/<\/body>/i, `${sticky}\n</body>`);
  }

  return s;
}

for (const name of TOUR_FILES) {
  const src = path.join(sourceDir, name);
  if (!fs.existsSync(src)) {
    console.warn("Ficheiro em falta:", src);
    continue;
  }
  const raw = fs.readFileSync(src, "utf8");
  const out = patchContent(raw);
  const dest = path.join(outDir, name);
  fs.writeFileSync(dest, out, "utf8");
  console.log("Gerado:", dest);
}

console.log("Concluído.");
