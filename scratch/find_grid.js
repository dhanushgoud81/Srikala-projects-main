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

console.log('Row y=5 colors (first 120 pixels):');
let lastColorName = '';
let count = 0;
let runLengths = [];

for (let x = 0; x < 120; x++) {
  const idx = (width * 5 + x) << 2;
  const r = rawImageData.data[idx];
  const g = rawImageData.data[idx+1];
  const b = rawImageData.data[idx+2];
  
  // Classify as BLACK or GRAY
  let colorName = 'OTHER';
  if (r < 15 && g < 15 && b < 15) {
    colorName = 'BLACK';
  } else if (r >= 45 && r <= 60 && g >= 45 && g <= 60 && b >= 45 && b <= 60) {
    colorName = 'GRAY';
  }
  
  if (colorName === lastColorName) {
    count++;
  } else {
    if (lastColorName) {
      runLengths.push({ color: lastColorName, length: count });
    }
    lastColorName = colorName;
    count = 1;
  }
}
runLengths.push({ color: lastColorName, length: count });

console.log(runLengths);
