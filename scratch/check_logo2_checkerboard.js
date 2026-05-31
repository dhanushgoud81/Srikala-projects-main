import { Jimp } from 'jimp';

async function checkLogo2() {
  try {
    const image = await Jimp.read('public/images/logo2.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Checking logo2.png (${width}x${height})...`);
    
    let transparentCount = 0;
    let opaqueCount = 0;
    
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        const idx = (y * width + x) * 4;
        const a = image.bitmap.data[idx + 3];
        if (a === 0) {
          transparentCount++;
        } else {
          opaqueCount++;
        }
      }
    }
    
    console.log(`Top-left 100x100 corner of logo2.png: ${transparentCount} transparent, ${opaqueCount} opaque.`);
  } catch (error) {
    console.error(error);
  }
}

checkLogo2();
