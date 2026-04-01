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
  ["tour-alentejo.html", "/tours/alentejo"],
  ["tour-algarve.html", "/tours/algarve"],
];

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

  if (!s.includes("<base ")) {
    s = s.replace(/<head>/i, '<head>\n    <base target="_top" />');
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
