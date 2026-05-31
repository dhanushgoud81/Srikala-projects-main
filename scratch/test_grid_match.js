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

// Let's test pixels in the top 100x100 corner
let total = 0;
let correct = 0;

for (let y = 0; y < 100; y++) {
  for (let x = 0; x < 100; x++) {
    const idx = (width * y + x) << 2;
    const r = rawImageData.data[idx];
    const g = rawImageData.data[idx+1];
    const b = rawImageData.data[idx+2];
    
    // Grid prediction
    const col = Math.floor(x / 25.6);
    const row = Math.floor(y / 25.6);
    const isEvenCell = (col + row) % 2 === 0; // Even cell should be BLACK, odd should be GRAY
    
    // Check actual color
    const isBlack = r < 20 && g < 20 && b < 20;
    const isGray = r >= 40 && r <= 60 && g >= 40 && g <= 60 && b >= 40 && b <= 60;
    
    total++;
    if (isEvenCell && isBlack) {
      correct++;
    } else if (!isEvenCell && isGray) {
      correct++;
    }
  }
}

console.log(`Accuracy of grid prediction in top-left 100x100: ${(correct / total * 100).toFixed(2)}%`);
