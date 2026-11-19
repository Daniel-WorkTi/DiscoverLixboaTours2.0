/**
 * Regenera app/favicon.ico + app/icon.png a partir do logo de marca.
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
  "public/assets/images/brand/favicon-512.png",
);

async function resizePng(size) {
  return sharp(source)
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
}

const [png16, png32, png48, png180] = await Promise.all([
  resizePng(16),
  resizePng(32),
  resizePng(48),
  resizePng(180),
]);

const ico = await pngToIco([png16, png32, png48]);
fs.writeFileSync(path.join(root, "app/favicon.ico"), ico);
fs.writeFileSync(path.join(root, "app/icon.png"), png48);
fs.writeFileSync(path.join(root, "app/apple-icon.png"), png180);
fs.writeFileSync(
  path.join(root, "public/favicon.ico"),
  ico,
);

console.log("favicon.ico + icon.png + apple-icon.png regenerados");
