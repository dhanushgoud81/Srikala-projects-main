import fs from 'fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'logo2.jpg');
const outPath = path.join(__dirname, '..', 'public', 'images', 'logo_3_transparent.png');

async function main() {
  const fileBuffer = fs.readFileSync(imgPath);
  const rawImageData = jpeg.decode(fileBuffer);
  const width = rawImageData.width;
  const height = rawImageData.height;
  
  console.log(`Processing logo2.jpg (${width}x${height}) into a crystal-clear transparent logo...`);
  
  const png = new PNG({ width, height });
  
  let bgCount = 0;
  let featherCount = 0;
  let blueCount = 0;
  let silverCount = 0;
  let darkTextCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const r = rawImageData.data[idx];
      const g = rawImageData.data[idx+1];
      const b = rawImageData.data[idx+2];
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      // 1. Clean Background Keying
      // The background in logo2.jpg is highly uniform light gray around #dfdfdf to #e2e2e2 (220-226)
      if (r >= 216 && g >= 216 && b >= 216 && diff < 8) {
        png.data[idx] = 0;
        png.data[idx+1] = 0;
        png.data[idx+2] = 0;
        png.data[idx+3] = 0;
        bgCount++;
      }
      // 2. Smooth Feathered Transition Edges
      else if (r >= 195 && g >= 195 && b >= 195 && diff < 10) {
        // Linear fade transition into transparency to keep edges buttery smooth
        const alpha = Math.round(((216 - r) / 21) * 255);
        png.data[idx] = r;
        png.data[idx+1] = g;
        png.data[idx+2] = b;
        png.data[idx+3] = Math.max(0, Math.min(255, alpha));
        featherCount++;
      }
      // 3. Vibrant Blue Metallic Elements
      else if (b > r + 5 && b > g + 5) {
        // Boost the blue channel to make it pop beautifully on dark backgrounds
        png.data[idx] = Math.min(255, Math.round(r * 1.1));
        png.data[idx+1] = Math.min(255, Math.round(g * 1.1));
        png.data[idx+2] = Math.min(255, Math.round(b * 1.3));
        png.data[idx+3] = 255;
        blueCount++;
      }
      // 4. Dark Gray / Metallic Text & Gear -> Invert & Brighten to striking Silver-White!
      else if (max < 110) {
        // Dark pixels (gear, "PROJECTS" text, tagline) become bright silver/white!
        // This is key to make them highly legible on dark charcoal/black backgrounds.
        const silverVal = Math.min(255, Math.round((255 - min) * 1.1));
        png.data[idx] = silverVal;
        png.data[idx+1] = silverVal;
        png.data[idx+2] = silverVal;
        png.data[idx+3] = 255;
        darkTextCount++;
      }
      // 5. Existing Silver/Gray Metallic Details
      else {
        // Keep silver/gray and brighten slightly for high contrast
        png.data[idx] = Math.min(255, Math.round(r * 1.15));
        png.data[idx+1] = Math.min(255, Math.round(g * 1.15));
        png.data[idx+2] = Math.min(255, Math.round(b * 1.15));
        png.data[idx+3] = 255;
        silverCount++;
      }
    }
  }
  
  console.log('Conversion Results:');
  console.log(`  Background pixels: ${bgCount}`);
  console.log(`  Feathered edge pixels: ${featherCount}`);
  console.log(`  Vibrant Blue pixels: ${blueCount}`);
  console.log(`  Silver-White Text/Gear: ${darkTextCount}`);
  console.log(`  Brightened Silver: ${silverCount}`);
  
  const writeStream = fs.createWriteStream(outPath);
  png.pack().pipe(writeStream);
  
  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
  
  console.log(`Successfully written crystal-clear transparent logo to: ${outPath}`);
}

main().catch(console.error);
