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
  const data = rawImageData.data;
  
  console.log(`Running BFS Flood Fill on logo2.jpg (${width}x${height})...`);
  
  // Create output PNG
  const png = new PNG({ width, height });
  
  // Visited map for BFS
  const visited = new Uint8Array(width * height);
  const isBackground = new Uint8Array(width * height);
  const queue = [];
  
  function enqueue(x, y) {
    const pos = y * width + x;
    if (!visited[pos]) {
      visited[pos] = 1;
      queue.push(pos);
    }
  }
  
  // Enqueue all border pixels (outer 3 pixels to ensure we catch everything)
  const borderSize = 3;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x < borderSize || x >= width - borderSize || y < borderSize || y >= height - borderSize) {
        enqueue(x, y);
      }
    }
  }
  
  let backgroundCount = 0;
  
  let head = 0;
  while (head < queue.length) {
    const pos = queue[head++];
    const x = pos % width;
    const y = Math.floor(pos / width);
    
    const idx = pos << 2;
    const r = data[idx + 0];
    const g = data[idx + 1];
    const b = data[idx + 2];
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    
    // Background criteria for logo2.jpg:
    // 1. Grayscale/Neutral gradient (diff < 12)
    // 2. Fits within the background vignette range (min >= 170)
    // 3. Or extremely bright light source near the logo edges
    const isBgColor = (diff < 12) && (min >= 170);
    const isWhiteNoise = (r >= 235 && g >= 235 && b >= 235);
    
    if (isBgColor || isWhiteNoise) {
      isBackground[pos] = 1;
      backgroundCount++;
      
      // Propagate BFS to 4-way neighbors
      if (x > 0) enqueue(x - 1, y);
      if (x < width - 1) enqueue(x + 1, y);
      if (y > 0) enqueue(x, y - 1);
      if (y < height - 1) enqueue(x, y + 1);
    }
  }
  
  console.log(`BFS finished. Detected ${backgroundCount} background gradient pixels.`);
  
  // Process and build the final PNG
  let blueCount = 0;
  let silverCount = 0;
  let darkTextCount = 0;
  let featheredCount = 0;
  
  // Pre-calculate background map for feathering
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pos = y * width + x;
      const idx = pos << 2;
      
      const r = data[idx + 0];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      if (isBackground[pos]) {
        // Make 100% transparent
        png.data[idx + 0] = 0;
        png.data[idx + 1] = 0;
        png.data[idx + 2] = 0;
        png.data[idx + 3] = 0;
      } else {
        // Check if it is an edge pixel (has a background neighbor) for smooth feathering
        let hasBgNeighbor = false;
        if (x > 0 && isBackground[pos - 1]) hasBgNeighbor = true;
        if (x < width - 1 && isBackground[pos + 1]) hasBgNeighbor = true;
        if (y > 0 && isBackground[pos - width]) hasBgNeighbor = true;
        if (y < height - 1 && isBackground[pos + width]) hasBgNeighbor = true;
        
        if (hasBgNeighbor && (diff < 12) && (min >= 165)) {
          // Feather edge pixel
          const alpha = Math.round(((224 - min) / 59) * 200); // Smooth alpha ramp
          png.data[idx + 0] = r;
          png.data[idx + 1] = g;
          png.data[idx + 2] = b;
          png.data[idx + 3] = Math.max(0, Math.min(255, alpha));
          featheredCount++;
        }
        // Blue metallic elements
        else if (b > r + 5 && b > g + 5) {
          png.data[idx + 0] = Math.min(255, Math.round(r * 1.1));
          png.data[idx + 1] = Math.min(255, Math.round(g * 1.1));
          png.data[idx + 2] = Math.min(255, Math.round(b * 1.3));
          png.data[idx + 3] = 255;
          blueCount++;
        }
        // Invert and brighten dark text, gear, and tagline to striking silver-white
        else if (max < 110) {
          const silverVal = Math.min(255, Math.round((255 - min) * 1.1));
          png.data[idx + 0] = silverVal;
          png.data[idx + 1] = silverVal;
          png.data[idx + 2] = silverVal;
          png.data[idx + 3] = 255;
          darkTextCount++;
        }
        // Silver-gray metallic elements
        else {
          png.data[idx + 0] = Math.min(255, Math.round(r * 1.15));
          png.data[idx + 1] = Math.min(255, Math.round(g * 1.15));
          png.data[idx + 2] = Math.min(255, Math.round(b * 1.15));
          png.data[idx + 3] = 255;
          silverCount++;
        }
      }
    }
  }
  
  console.log('Final Image Stats:');
  console.log(`  Transparent Background: ${backgroundCount}`);
  console.log(`  Feathered Edges: ${featheredCount}`);
  console.log(`  Vibrant Blue elements: ${blueCount}`);
  console.log(`  Silver-White Text/Gear: ${darkTextCount}`);
  console.log(`  Brightened Silver: ${silverCount}`);
  
  const writeStream = fs.createWriteStream(outPath);
  png.pack().pipe(writeStream);
  
  await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
  
  console.log(`Successfully saved perfect transparent logo to: ${outPath}`);
}

main().catch(console.error);
