/**
 * Defaults PT nos meta do hero dos tours (duração / guests / subtitle keys comuns).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../tour-sources");

const reps = [
  [
    'data-translate="tour_lisboa_hero_subtitle">Discover the magic of Lisbon, Portugal\'s sun-kissed capital, on a private tour that combines millennial history, stunning views and authentic Lisbon character',
    'data-translate="tour_lisboa_hero_subtitle">Descubra a magia de Lisboa, a capital portuguesa banhada pelo sol, num tour privado que combina história milenar, vistas deslumbrantes e caráter lisboeta autêntico',
  ],
  [
    'data-translate="tour_lisboa_duration">Full Day · Approx. 8 Hours<',
    'data-translate="tour_lisboa_duration">Dia completo · Aprox. 8 horas<',
  ],
  [
    'data-translate="tour_lisboa_passengers">Max. 8 Guests<',
    'data-translate="tour_lisboa_passengers">Máx. 8 passageiros<',
  ],
  [
    'data-translate="tour_sintra_duration">Full Day · Approx. 8 Hours<',
    'data-translate="tour_sintra_duration">Dia completo · Aprox. 8 horas<',
  ],
  [
    'data-translate="tour_sintra_passengers">Max. 8 Guests<',
    'data-translate="tour_sintra_passengers">Máx. 8 passageiros<',
  ],
  [
    'data-translate="tour_sintra_passengers">Max. 8 people<',
    'data-translate="tour_sintra_passengers">Máx. 8 passageiros<',
  ],
  [
    'data-translate="booking_check_availability">Check Availability<',
    'data-translate="booking_check_availability">Verificar Disponibilidade<',
  ],
];

// Generic Full Day / Max patterns for any tour_*_duration / passengers still EN
const generic = [
  [
    />Full Day · Approx\. 8 Hours</g,
    ">Dia completo · Aprox. 8 horas<",
  ],
  [/>Max\. 8 Guests</g, ">Máx. 8 passageiros<"],
  [/>Max\. 8 people</g, ">Máx. 8 passageiros<"],
];

let n = 0;
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith(".html")) continue;
  const f = path.join(dir, name);
  let s = fs.readFileSync(f, "utf8");
  const before = s;
  for (const [a, b] of reps) s = s.split(a).join(b);
  for (const [re, b] of generic) s = s.replace(re, b);
  // Fix mojibake en-dash leftovers
  s = s.replace(/\u00c2\u0096/g, "–");
  s = s.replace(//g, "–");
  if (s !== before) {
    fs.writeFileSync(f, s, "utf8");
    console.log("updated", name);
    n += 1;
  }
}
console.log("done", n);
