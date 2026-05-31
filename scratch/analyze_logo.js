import { Jimp } from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const imgPath = path.join(__dirname, '..', 'public', 'images', 'LOGO.png');
  console.log('Loading image:', imgPath);
  
  const image = await Jimp.read(imgPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  console.log(`Image dimensions: ${width}x${height}`);
  
  // Let's look at a 10x10 grid of pixels at the top-left
  console.log('Top-left 10x10 pixel colors:');
  for (let y = 0; y < 10; y++) {
    let row = [];
    for (let x = 0; x < 10; x++) {
      const color = image.getPixelColor(x, y);
      // Get RGBA channels
      const r = (color >> 24) & 0xff;
      const g = (color >> 16) & 0xff;
      const b = (color >> 8) & 0xff;
      const a = color & 0xff;
      row.push(`#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')} (${a})`);
    }
    console.log(`Row ${y}:`, row.slice(0, 5).join(' | '));
  }
}

main().catch(console.error);
