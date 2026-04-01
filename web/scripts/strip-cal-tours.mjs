/**
 * Lê os tour-*.html de `git show HEAD:` (raiz do repo), remove Cal.com e
 * deixa o botão "Verificar disponibilidade" sem data-cal / embed.
 * Escreve em tour-sources/. Depois: npm run patch-tours
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");
const tourDir = path.join(__dirname, "..", "tour-sources");

const TOURS = [
  "tour-sintra-cascais.html",
  "tour-3-destinos.html",
  "tour-lisboa.html",
  "tour-porto.html",
  "tour-arraabida.html",
  "tour-aveiro.html",
  "tour-alentejo.html",
  "tour-algarve.html",
];

function stripCal(html) {
  let s = html;
  s = s.replace(
    /<!-- Cal element-click embed code begins -->[\s\S]*?<!-- Cal element-click embed code ends -->/g,
    "",
  );
  s = s.replace(
    /<!-- Cal\.com Script -->\s*<script[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  s = s.replace(
    /<!-- Cal\.com Embed -->\s*<script[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  s = s.replace(
    /<script[^>]*>[\s\S]*?https:\/\/app\.cal\.com\/embed[\s\S]*?<\/script>/gi,
    "",
  );
  s = s.replace(/\n{3,}/g, "\n\n");
  return s;
}

function normalizeBookingButtons(html) {
  return html.replace(
    /<button class="btn-reservar(?: cal-button)?" type="button" data-cal-link="[^"]*" data-cal-namespace="[^"]*" data-cal-config='[^']*'>/g,
    '<button class="btn-reservar" type="button">',
  );
}

function cleanHeadComments(html) {
  return html
    .replace(
      /<!-- Stripe configurado via Cal\.com[^]*?-->/g,
      "<!-- Pagamento: Stripe Checkout (site) -->",
    )
    .replace(
      /<!-- Stripe - Configurado via Cal\.com[^]*?-->/g,
      "<!-- Pagamento: Stripe Checkout (site) -->",
    );
}

for (const name of TOURS) {
  const html = execSync(`git show HEAD:${name}`, {
    cwd: repoRoot,
    encoding: "utf8",
    maxBuffer: 12 * 1024 * 1024,
  });
  let out = stripCal(html);
  out = normalizeBookingButtons(out);
  out = cleanHeadComments(out);
  const dest = path.join(tourDir, name);
  fs.writeFileSync(dest, out, "utf8");
  console.log("Atualizado:", dest);
}

console.log("Concluído. Corre na pasta web: npm run patch-tours");
