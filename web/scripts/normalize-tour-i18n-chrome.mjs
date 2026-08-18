/**
 * Chrome i18n dos tours: e-mail, footer, headings partilhados, nav PT default.
 * Correr: node scripts/normalize-tour-i18n-chrome.mjs && npm run patch-tours
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "tour-sources");
const EMAIL = "websitediscoverlixboatours@gmail.com";
const TAGLINE_PT =
  "Tours Autênticos em Portugal com Veículos Históricos Portugueses";
const HELP_PT =
  "A nossa equipa está disponível para responder às suas perguntas.";

function fix(html) {
  // E-mail corrompido por replace ingénuo (websitewebsitewebsite…)
  html = html.replace(
    /(?:website)*websitediscoverlixboatours@gmail\.com/gi,
    EMAIL,
  );
  html = html.replace(
    /(?<![a-zA-Z])discoverlixboatours@gmail\.com/gi,
    EMAIL,
  );

  html = html.replace(/<html lang="pt">/g, '<html lang="pt-PT">');
  html = html.replace(/<html lang="pt-PT">/g, '<html lang="pt-PT">');
  // NÃO alterar data-lang="pt" das bandeiras

  // Nav / CTA — default PT (URL indexada)
  const nav = [
    ['menu_home">Home<', 'menu_home">Início<'],
    ['menu_about">About Us<', 'menu_about">Sobre<'],
    ['menu_about">About<', 'menu_about">Sobre<'],
    ['menu_services">Services<', 'menu_services">Serviços<'],
    ['menu_contact">Contact<', 'menu_contact">Contacto<'],
    ['book_now">Book Now<', 'book_now">Reservar Agora<'],
  ];
  for (const [a, b] of nav) html = html.split(a).join(b);

  // Headings partilhados
  const heads = [
    ['tour_about">About this Tour<', 'tour_about">Sobre este Tour<'],
    [
      'section_suggested_itinerary">Suggested Itinerary<',
      'section_suggested_itinerary">Itinerário Sugerido<',
    ],
    [
      'booking_check_availability">Check Availability<',
      'booking_check_availability">Verificar Disponibilidade<',
    ],
    ['need_help_title">Need Help?<', 'need_help_title">Precisa de ajuda?<'],
    [
      'need_help_text">Our team is available to answer your questions.<',
      `need_help_text">${HELP_PT}<`,
    ],
    [
      'feature_free_cancellation">Cancelamento gratuito at? 24h antes<',
      'feature_free_cancellation">Cancelamento gratuito até 24h antes<',
    ],
  ];
  for (const [a, b] of heads) html = html.split(a).join(b);

  // Info box sem data-translate
  html = html.replace(
    /<h3>\s*Precisa de ajuda\?\s*<\/h3>\s*<p>[^<]*<\/p>/g,
    `<h3 data-translate="need_help_title">Precisa de ajuda?</h3>\n                        <p data-translate="need_help_text">${HELP_PT}</p>`,
  );

  // Footer chrome
  html = html.replace(
    /<p class="footer-tagline">[\s\S]*?<\/p>/g,
    `<p class="footer-tagline" data-translate="footer_tagline">${TAGLINE_PT}</p>`,
  );
  html = html.replace(
    /<h3>\s*Quick Links\s*<\/h3>/g,
    '<h3 data-translate="footer_quick_links">Links Rápidos</h3>',
  );
  html = html.replace(
    /<h3>\s*Contact\s*<\/h3>/g,
    '<h3 data-translate="footer_contact">Contacto</h3>',
  );
  html = html.replace(
    /<h3>\s*Contacto\s*<\/h3>/g,
    '<h3 data-translate="footer_contact">Contacto</h3>',
  );
  html = html.replace(
    /<h3>\s*Follow Us\s*<\/h3>/g,
    '<h3 data-translate="footer_follow_us">Siga-nos</h3>',
  );
  html = html.replace(
    /<h3>\s*Siga-nos\s*<\/h3>/g,
    '<h3 data-translate="footer_follow_us">Siga-nos</h3>',
  );

  // Footer links (várias variantes)
  html = html.replace(
    /<a href="(index\.html#home|\/#home)">\s*(Home|Início)\s*<\/a>/g,
    '<a href="$1" data-translate="footer_home">Início</a>',
  );
  html = html.replace(
    /<a href="(index\.html#sobre|index\.html#About|\/#sobre)">\s*(About Us|About Nós|Sobre Nós|Sobre)\s*<\/a>/g,
    '<a href="/#sobre" data-translate="footer_about">Sobre Nós</a>',
  );
  html = html.replace(
    /<a href="(index\.html#servicos|\/#servicos)">\s*(Destinations|Destinos)\s*<\/a>/g,
    '<a href="$1" data-translate="footer_destinations">Destinos</a>',
  );
  html = html.replace(
    /<a href="(index\.html#instagram|\/#instagram)">\s*(Contact|Contacto)\s*<\/a>/g,
    '<a href="$1" data-translate="menu_contact">Contacto</a>',
  );

  // Direitos / ano
  html = html.replace(
    /Todos os direitos reservados\./g,
    '<span data-translate="footer_rights_part">Todos os direitos reservados.</span>',
  );
  // Avoid double-wrapping
  html = html.replace(
    /<span data-translate="footer_rights_part"><span data-translate="footer_rights_part">Todos os direitos reservados\.<\/span><\/span>/g,
    '<span data-translate="footer_rights_part">Todos os direitos reservados.</span>',
  );

  return html;
}

let changed = 0;
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".html")) continue;
  const file = path.join(dir, name);
  const before = fs.readFileSync(file, "utf8");
  const after = fix(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    console.log("updated", name);
    changed += 1;
  } else {
    console.log("unchanged", name);
  }
}
console.log("done", changed, "files");

// pt-PT polish in translate.js
const tj = path.join(root, "public/assets/js/translate.js");
let tr = fs.readFileSync(tj, "utf8");
const helpOld =
  'need_help_text: "Nossa equipe está disponível para responder às suas perguntas."';
const helpNew =
  'need_help_text: "A nossa equipa está disponível para responder às suas perguntas."';
if (tr.includes(helpOld)) {
  tr = tr.split(helpOld).join(helpNew);
  fs.writeFileSync(tj, tr, "utf8");
  console.log("translate.js need_help_text → pt-PT");
}
