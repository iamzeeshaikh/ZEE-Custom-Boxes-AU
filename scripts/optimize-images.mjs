/**
 * Generates the WebP renditions that src/utils/img.ts expects for every
 * product photo in public/images/products:
 *
 *   <name>.webp       up to 1000px  — product detail view
 *   <name>-700.webp   700px         — 2x card size on phones
 *   <name>-400.webp   400px         — cards, thumbnails, mega-menu
 *
 * Run it after adding new product photography (jpg/png/webp all work):
 *   node scripts/optimize-images.mjs
 *
 * Existing renditions are skipped unless --force is passed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public/images/products');
const force = process.argv.includes('--force');

const RENDITIONS = [
  { suffix: '', width: 1000, quality: 76 },
  { suffix: '-700', width: 700, quality: 74 },
  { suffix: '-400', width: 400, quality: 72 },
];

const entries = fs
  .readdirSync(dir)
  .filter((file) => /\.(jpe?g|png|webp)$/i.test(file) && !/-(400|700)\.webp$/i.test(file) && !file.startsWith('._'));

// A photo shipped as foo.jpg also has a generated foo.webp next to it. Always
// encode from the original raster so renditions never stack lossy passes.
const rasterBases = new Set(
  entries.filter((file) => /\.(jpe?g|png)$/i.test(file)).map((file) => file.replace(/\.(jpe?g|png)$/i, '')),
);
const sources = entries.filter(
  (file) => !(/\.webp$/i.test(file) && rasterBases.has(file.replace(/\.webp$/i, ''))),
);

let written = 0;
let skipped = 0;
const failures = [];

const queue = [...sources];

async function worker() {
  while (queue.length) {
    const file = queue.pop();
    const base = file.replace(/\.(jpe?g|png|webp)$/i, '');
    for (const { suffix, width, quality } of RENDITIONS) {
      const source = path.join(dir, file);
      const target = path.join(dir, `${base}${suffix}.webp`);

      // A photo supplied as WebP is its own full-size rendition. Shrink it once
      // if it is oversized, then leave it alone so runs never stack lossy passes.
      if (target === source) {
        const { width: sourceWidth = 0 } = await sharp(source).metadata();
        if (sourceWidth <= width) {
          skipped++;
          continue;
        }
      } else if (!force && fs.existsSync(target)) {
        skipped++;
        continue;
      }
      try {
        const buffer = await sharp(path.join(dir, file))
          .resize({ width, height: width, fit: 'inside', withoutEnlargement: true })
          .webp({ quality, effort: 5 })
          .toBuffer();
        fs.writeFileSync(target, buffer);
        written++;
      } catch (error) {
        failures.push(`${file}${suffix}: ${error.message}`);
      }
    }
  }
}

await Promise.all(Array.from({ length: 6 }, worker));

console.log(`sources: ${sources.length} · written: ${written} · skipped: ${skipped}`);
if (failures.length) {
  console.log('failed:\n' + failures.join('\n'));
  process.exitCode = 1;
}
