import { Jimp } from 'jimp';

async function sampleLOGO() {
  try {
    const image = await Jimp.read('public/images/LOGO.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Sampling LOGO.png (${width}x${height})...`);
    
    const colors = [];
    
    for (let y = height / 4; y < (3 * height) / 4; y += height / 40) {
      for (let x = width / 4; x < (3 * width) / 4; x += width / 40) {
        const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];
        
        if (a > 0) {
          colors.push({ x: Math.floor(x), y: Math.floor(y), r, g, b, a });
        }
      }
    }
    
    console.log(`Found ${colors.length} non-transparent pixels in central sample.`);
    console.log('Sample of colors in LOGO.png:');
    colors.slice(0, 20).forEach(c => {
      console.log(`At (${c.x}, ${c.y}): R:${c.r}, G:${c.g}, B:${c.b}, A:${c.a}`);
    });
  } catch (error) {
    console.error(error);
  }
}

sampleLOGO();
