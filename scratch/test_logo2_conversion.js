import fs from 'fs';
import jpeg from 'jpeg-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'logo2.jpg');
const fileBuffer = fs.readFileSync(imgPath);
const rawImageData = jpeg.decode(fileBuffer);
const width = rawImageData.width;
const height = rawImageData.height;

let bgCount = 0;
let darkGrayCount = 0;
let blueCount = 0;
let silverCount = 0;
let otherCount = 0;

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (width * y + x) << 2;
    const r = rawImageData.data[idx];
    const g = rawImageData.data[idx+1];
    const b = rawImageData.data[idx+2];
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    // Background threshold
    const isBg = min > 200 && diff < 15;
    
    if (isBg) {
      bgCount++;
    } else {
      // Classify foreground
      const isBlue = b > r + 15 && b > g + 5;
      const isDarkGray = max < 90 && diff < 20;
      const isSilver = max >= 90 && diff < 20;
      
      if (isBlue) blueCount++;
      else if (isDarkGray) darkGrayCount++;
      else if (isSilver) silverCount++;
      else otherCount++;
    }
  }
}

console.log(`Total pixels: ${width * height}`);
console.log(`  Background (Transparent): ${bgCount} (${(bgCount / (width * height) * 100).toFixed(2)}%)`);
console.log(`  Blue elements (Kept/Brightened): ${blueCount} (${(blueCount / (width * height) * 100).toFixed(2)}%)`);
console.log(`  Dark Gray/Text (Inverted to Light): ${darkGrayCount} (${(darkGrayCount / (width * height) * 100).toFixed(2)}%)`);
console.log(`  Silver metal (Kept): ${silverCount} (${(silverCount / (width * height) * 100).toFixed(2)}%)`);
console.log(`  Other: ${otherCount} (${(otherCount / (width * height) * 100).toFixed(2)}%)`);
