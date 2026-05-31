import fs from 'fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'logo2.jpg');
const outPath = path.join(__dirname, '..', 'public', 'images', 'logo2.png');

async function main() {
  const fileBuffer = fs.readFileSync(imgPath);
  const rawImageData = jpeg.decode(fileBuffer);
  const width = rawImageData.width;
  const height = rawImageData.height;
  
  console.log(`Processing logo2.jpg (${width}x${height}) into transparent PNG...`);
  
  const png = new PNG({ width, height });
  
  let bgCount = 0;
  let shadowCount = 0;
  let blueCount = 0;
  let darkTextCount = 0;
  let silverCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const r = rawImageData.data[idx];
      const g = rawImageData.data[idx+1];
      const b = rawImageData.data[idx+2];
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      // Check if pixel is neutral/grayscale
      if (diff < 20) {
        if (min >= 224) {
          // Pure light background -> completely transparent
          png.data[idx] = 0;
          png.data[idx+1] = 0;
          png.data[idx+2] = 0;
          png.data[idx+3] = 0;
          bgCount++;
        } else if (min >= 190) {
          // Soft transition or drop shadow -> make it a black shadow with alpha!
          const alpha = Math.round(((224 - min) / (224 - 190)) * 255);
          png.data[idx] = 0;
          png.data[idx+1] = 0;
          png.data[idx+2] = 0;
          png.data[idx+3] = alpha;
          shadowCount++;
        } else if (min < 90) {
          // Dark metallic text/elements -> invert to light silver/white!
          // We invert so they stand out beautifully on dark backgrounds
          const invR = Math.min(255, Math.round((255 - r) * 1.15));
          const invG = Math.min(255, Math.round((255 - g) * 1.15));
          const invB = Math.min(255, Math.round((255 - b) * 1.15));
          png.data[idx] = invR;
          png.data[idx+1] = invG;
          png.data[idx+2] = invB;
          png.data[idx+3] = 255;
          darkTextCount++;
        } else {
          // Silver metal -> keep and slightly brighten
          png.data[idx] = Math.min(255, Math.round(r * 1.1));
          png.data[idx+1] = Math.min(255, Math.round(g * 1.1));
          png.data[idx+2] = Math.min(255, Math.round(b * 1.1));
          png.data[idx+3] = 255;
          silverCount++;
        }
      } else {
        // Saturated blue elements -> keep original color, slightly brighten
        if (b > r && b > g) {
          png.data[idx] = Math.min(255, Math.round(r * 1.3));
          png.data[idx+1] = Math.min(255, Math.round(g * 1.3));
          png.data[idx+2] = Math.min(255, Math.round(b * 1.3));
          png.data[idx+3] = 255;
          blueCount++;
        } else {
          // Other colorful pixels
          png.data[idx] = r;
          png.data[idx+1] = g;
          png.data[idx+2] = b;
          png.data[idx+3] = 255;
        }
      }
    }
  }
  
  console.log('Conversion Summary:');
  console.log(`  Pure Background: ${bgCount}`);
  console.log(`  Drop Shadows: ${shadowCount}`);
  console.log(`  Inverted Text/Metal: ${darkTextCount}`);
  console.log(`  Brightened Silver: ${silverCount}`);
  console.log(`  Brightened Blue: ${blueCount}`);
  
  const writeStream = fs.createWriteStream(outPath);
  png.pack().pipe(writeStream);
  
  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
  
  console.log(`Successfully written transparent logo to: ${outPath}`);
}

main().catch(console.error);
