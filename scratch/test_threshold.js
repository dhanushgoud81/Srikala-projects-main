import fs from 'fs';
import jpeg from 'jpeg-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'LOGO.png');
const fileBuffer = fs.readFileSync(imgPath);
const rawImageData = jpeg.decode(fileBuffer);
const width = rawImageData.width;
const height = rawImageData.height;

// Count pixels classified as background vs foreground
let bgCount = 0;
let fgCount = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const r = rawImageData.data[idx];
    const g = rawImageData.data[idx+1];
    const b = rawImageData.data[idx+2];
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    // Rule: dark and grayscale
    const isBg = max < 65 && diff < 15;
    if (isBg) {
      bgCount++;
    } else {
      fgCount++;
    }
  }
}

console.log(`Total pixels: ${width * height}`);
console.log(`Classified as background (transparent): ${bgCount} (${(bgCount / (width * height) * 100).toFixed(2)}%)`);
console.log(`Classified as foreground (kept): ${fgCount} (${(fgCount / (width * height) * 100).toFixed(2)}%)`);
