import fs from 'fs';
import jpeg from 'jpeg-js';
import { PNG } from 'pngjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'LOGO.png');
const backupPath = path.join(__dirname, '..', 'public', 'images', 'LOGO_backup_jpeg.png');

async function main() {
  // 1. Backup the original file if not already backed up
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(imgPath, backupPath);
    console.log('Backed up original logo to:', backupPath);
  }

  // 2. Decode original JPEG
  const fileBuffer = fs.readFileSync(backupPath); // Read from backup to be safe
  const rawImageData = jpeg.decode(fileBuffer);
  const width = rawImageData.width;
  const height = rawImageData.height;
  
  console.log(`Decoding image: ${width}x${height}`);

  // 3. Create a new PNG with alpha channel
  const png = new PNG({ width, height });

  let transparentCount = 0;
  let semiTransparentCount = 0;
  let opaqueCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const r = rawImageData.data[idx];
      const g = rawImageData.data[idx+1];
      const b = rawImageData.data[idx+2];
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      // Is it a neutral grayscale/black/gray pixel?
      if (diff < 15) {
        if (max <= 48) {
          // Fully transparent background pixel
          png.data[idx] = 0;
          png.data[idx+1] = 0;
          png.data[idx+2] = 0;
          png.data[idx+3] = 0;
          transparentCount++;
        } else if (max >= 96) {
          // Fully opaque neutral foreground pixel (like white text)
          png.data[idx] = r;
          png.data[idx+1] = g;
          png.data[idx+2] = b;
          png.data[idx+3] = 255;
          opaqueCount++;
        } else {
          // Semi-transparent feathered edge
          const alpha = Math.round(((max - 48) / 48) * 255);
          png.data[idx] = r;
          png.data[idx+1] = g;
          png.data[idx+2] = b;
          png.data[idx+3] = alpha;
          semiTransparentCount++;
        }
      } else {
        // Saturated pixel (like the blue building logo) - keep fully opaque
        png.data[idx] = r;
        png.data[idx+1] = g;
        png.data[idx+2] = b;
        png.data[idx+3] = 255;
        opaqueCount++;
      }
    }
  }

  console.log(`Processing summary:`);
  console.log(`  Transparent: ${transparentCount}`);
  console.log(`  Semi-transparent: ${semiTransparentCount}`);
  console.log(`  Opaque: ${opaqueCount}`);

  // 4. Save PNG to public/images/LOGO.png
  const writeStream = fs.createWriteStream(imgPath);
  png.pack().pipe(writeStream);

  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  console.log('Successfully saved transparent PNG logo to:', imgPath);
}

main().catch(console.error);
