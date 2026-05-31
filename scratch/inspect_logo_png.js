import { Jimp } from 'jimp';

async function inspect() {
  try {
    const image = await Jimp.read('public/images/LOGO.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Inspecting LOGO.png (${width}x${height})...`);
    
    let transparentCount = 0;
    let opaqueCount = 0;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const a = image.bitmap.data[idx + 3];
        if (a === 0) {
          transparentCount++;
        } else {
          opaqueCount++;
        }
      }
    }
    
    console.log(`Total pixels: ${width * height}`);
    console.log(`Transparent pixels: ${transparentCount} (${(transparentCount / (width * height) * 100).toFixed(2)}%)`);
    console.log(`Opaque pixels: ${opaqueCount} (${(opaqueCount / (width * height) * 100).toFixed(2)}%)`);
  } catch (error) {
    console.error(error);
  }
}

inspect();
