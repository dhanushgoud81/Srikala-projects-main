import fs from 'fs';
import jpeg from 'jpeg-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'logo2.jpg');
const fileBuffer = fs.readFileSync(imgPath);
const rawImageData = jpeg.decode(fileBuffer);

console.log(`Dimensions of logo2.jpg: ${rawImageData.width}x${rawImageData.height}`);

const uniqueColors = new Map();
const width = rawImageData.width;

for (let y = 0; y < 30; y++) {
  for (let x = 0; x < 30; x++) {
    const idx = (width * y + x) << 2;
    const r = rawImageData.data[idx];
    const g = rawImageData.data[idx+1];
    const b = rawImageData.data[idx+2];
    const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    uniqueColors.set(hex, (uniqueColors.get(hex) || 0) + 1);
  }
}

console.log('Unique colors in top-left 30x30 region of logo2.jpg (hex -> count):');
const sortedColors = Array.from(uniqueColors.entries()).sort((a, b) => b[1] - a[1]);
for (const [color, count] of sortedColors.slice(0, 10)) {
  console.log(`  ${color}: ${count}`);
}
