import fs from 'fs';
import { PNG } from 'pngjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'LOGO.png');

const fileBuffer = fs.readFileSync(imgPath);

new PNG().parse(fileBuffer, function (error, png) {
  if (error) {
    console.error('Error parsing PNG:', error);
    return;
  }
  
  console.log(`Image dimensions: ${png.width}x${png.height}`);
  
  const uniqueColors = new Map();
  for (let y = 0; y < 30; y++) {
    for (let x = 0; x < 30; x++) {
      const idx = (png.width * y + x) << 2;
      const r = png.data[idx];
      const g = png.data[idx+1];
      const b = png.data[idx+2];
      const a = png.data[idx+3];
      const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')} (${a})`;
      uniqueColors.set(hex, (uniqueColors.get(hex) || 0) + 1);
    }
  }
  
  console.log('Unique colors in top-left 30x30 region (hex (alpha) -> count):');
  for (const [color, count] of uniqueColors.entries()) {
    console.log(`  ${color}: ${count}`);
  }
});
