import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imgDir = path.resolve("src/assets/img");

const files = await fs.readdir(imgDir);
let savedBytes = 0;

for (const file of files) {
  const filePath = path.join(imgDir, file);
  const ext = path.extname(file).toLowerCase();

  if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;

  const before = (await fs.stat(filePath)).size;

  const pipeline = sharp(filePath).rotate();

  if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline
      .resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(`${filePath}.tmp`);
  } else {
    await pipeline
      .resize({ width: 1280, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true, quality: 80 })
      .toFile(`${filePath}.tmp`);
  }

  await fs.rename(`${filePath}.tmp`, filePath);
  const after = (await fs.stat(filePath)).size;
  savedBytes += before - after;
  console.log(`${file}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`);
}

console.log(`Total poupado: ~${Math.round(savedBytes / 1024)}KB`);
