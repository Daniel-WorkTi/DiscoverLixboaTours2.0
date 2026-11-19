/**
 * Regenera favicon.ico + icon.png + apple-icon a partir do logo-mark-source.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(
  root,
  "public/assets/images/brand/logo-mark-source.png",
);

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let minX = info.width;
let minY = info.height;
let maxX = 0;
let maxY = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 180 && g > 40 && g < 200 && b < 100) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const side = Math.max(maxX - minX + 1, maxY - minY + 1);
const pad = Math.round(side * 0.04);
const cx = Math.round((minX + maxX) / 2);
const cy = Math.round((minY + maxY) / 2);
const half = Math.ceil(side / 2) + pad;
const left = Math.max(0, cx - half);
const top = Math.max(0, cy - half);
const size = Math.min(info.width - left, info.height - top, half * 2);

const cropped = sharp(source).extract({ left, top, width: size, height: size });

async function pngAt(px) {
  return cropped
    .clone()
    .resize(px, px, { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
}

const [png16, png32, png48, png180, png256, png512] = await Promise.all(
  [16, 32, 48, 180, 256, 512].map(pngAt),
);

const ico = await pngToIco([png16, png32, png48]);
fs.writeFileSync(path.join(root, "app/favicon.ico"), ico);
fs.writeFileSync(path.join(root, "public/favicon.ico"), ico);
fs.writeFileSync(path.join(root, "app/icon.png"), png48);
fs.writeFileSync(path.join(root, "app/apple-icon.png"), png180);
fs.writeFileSync(
  path.join(root, "public/assets/images/brand/logo-mark.png"),
  png256,
);
fs.writeFileSync(
  path.join(root, "public/assets/images/brand/favicon-512.png"),
  png512,
);

console.log("favicon + logo-mark regenerados (centrados, HQ)");
