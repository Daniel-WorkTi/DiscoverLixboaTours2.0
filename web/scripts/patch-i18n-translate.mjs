import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const p = path.join(dir, "../public/assets/js/translate.js");
let s = fs.readFileSync(p, "utf8");

const pickBook = "Pick date " + String.fromCharCode(38) + " book";
const chooseBook = "Choose a Date " + String.fromCharCode(38) + " Book";

const reps = [
  ['hero_title_line1: "Transforme Portugal"', 'hero_title_line1: "Descubra Portugal"'],
  ['hero_title_line2: "No Seu Parque de Aventuras"', 'hero_title_line2: "como um local."'],
  [
    'hero_subtitle1: "Experiência incomparável para viagens únicas. Estamos aqui para levá-lo em suas"',
    'hero_subtitle1: "Tours privados por Sintra, Lisboa e todo o país, com guia local, itinerários personalizados e total liberdade para viajar ao seu ritmo."',
  ],
  ['hero_subtitle2: "viagens dos sonhos por Portugal."', 'hero_subtitle2: ""'],
  ['hero_cta: "Explorar Tours"', 'hero_cta: "Explorar tours"'],
  ['hero_title_line1: "Transform Portugal"', 'hero_title_line1: "Experience Portugal"'],
  ['hero_title_line2: "Into Your Adventure Park"', 'hero_title_line2: "Like a Local."'],
  [
    'hero_subtitle1: "Unparalleled experience for unique trips. We are here to take you on your"',
    'hero_subtitle1: "Private tours across Sintra, Lisbon and beyond, with a local guide, flexible itineraries and your own private vehicle."',
  ],
  ['hero_subtitle2: "dream trips through Portugal."', 'hero_subtitle2: ""'],
  ['hero_cta: "Explore Tours"', 'hero_cta: "Explore Private Tours"'],
  ["Discoverlix Boatours", "DiscoverLixboaTours"],
  ["DiscoverLixboatours", "DiscoverLixboaTours"],
  ["Patrimônio", "Património"],
  ["O Que Nossos Clientes Dizem", "O que os nossos clientes dizem"],
  [
    "Feedback real de clientes que viveram experiências únicas conosco",
    "Avaliações reais de viajantes no TripAdvisor",
  ],
  ['reservar_h1: "Reserva o teu tour"', 'reservar_h1: "Reserve o seu tour privado"'],
  ['booking_modal_title: "Reserva o teu tour"', 'booking_modal_title: "Reserve o seu tour privado"'],
  ['booking_travelers: "Viajantes"', 'booking_travelers: "Passageiros"'],
  ['booking_card_viajantes: "Viajantes"', 'booking_card_viajantes: "Passageiros"'],
  ['reservar_h1: "Book your tour"', 'reservar_h1: "Book Your Private Tour"'],
  ['booking_modal_title: "Book your tour"', 'booking_modal_title: "Book Your Private Tour"'],
  ['booking_travelers: "Travellers"', 'booking_travelers: "Guests"'],
  ['booking_card_viajantes: "Travellers"', 'booking_card_viajantes: "Guests"'],
  [`booking_cta_choose: "${pickBook}"`, `booking_cta_choose: "${chooseBook}"`],
];

let n = 0;
for (const [a, b] of reps) {
  if (s.includes(a)) {
    s = s.split(a).join(b);
    n += 1;
  } else {
    console.log("MISS:", a.slice(0, 70));
  }
}

const nl = s.includes("\r\n") ? "\r\n" : "\n";

if (!s.includes("hero_cta_secondary:")) {
  s = s.replace(
    `hero_cta: "Explorar tours",`,
    `hero_cta: "Explorar tours",${nl}        hero_cta_secondary: "Falar connosco",`,
  );
  s = s.replace(
    `hero_cta: "Explore Private Tours",`,
    `hero_cta: "Explore Private Tours",${nl}        hero_cta_secondary: "Talk to Us",`,
  );
  n += 2;
}

if (!s.includes("booking_guest_one:")) {
  s = s.replace(
    `booking_cta_choose: "Escolher data e reservar",`,
    `booking_cta_choose: "Escolher data e reservar",${nl}        booking_guest_one: "passageiro",${nl}        booking_guest_many: "passageiros",${nl}        booking_person_singular: "passageiro",${nl}        booking_person_plural: "passageiros",`,
  );
  s = s.replace(
    `booking_cta_choose: "${chooseBook}",`,
    `booking_cta_choose: "${chooseBook}",${nl}        booking_guest_one: "Guest",${nl}        booking_guest_many: "Guests",${nl}        booking_person_singular: "Guest",${nl}        booking_person_plural: "Guests",`,
  );
  n += 2;
}

s = s.replace(
  /reservar_lead:\s*[\r\n]+\s*"Escolhe destino[^"]*",/,
  `reservar_lead:${nl}            "Escolha o destino, a data e o número de passageiros.",`,
);

const marker = "// Função para definir idioma";
const idx = s.indexOf(marker);
if (idx < 0) {
  console.error("marker not found");
  process.exit(1);
}

if (!s.includes("function dlStripLocalePrefix")) {
  const tail = fs.readFileSync(path.join(dir, "_translate-tail.js"), "utf8");
  // Preserve CRLF style of original file
  const tailNorm = nl === "\r\n" ? tail.replace(/\n/g, "\r\n") : tail;
  s = s.slice(0, idx) + tailNorm;
  n += 1;
}

fs.writeFileSync(p, s);
console.log("OK patches:", n);
