import { Jimp } from 'jimp';

async function findRemaining() {
  try {
    const image = await Jimp.read('public/images/logo_3_transparent.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    let count = 0;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];
        
        if (a > 0) {
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          const isCheckeredColor = (diff < 8) && (r >= 122 && r <= 180);
          if (isCheckeredColor) {
            count++;
          }
        }
      }
    }
    
    console.log(`Remaining non-transparent checkered pixels in the entire image: ${count}`);
  } catch (error) {
    console.error(error);
  }
}

findRemaining();
