import { Jimp } from 'jimp';

async function checkLOGO() {
  try {
    const image = await Jimp.read('public/images/LOGO.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Checking LOGO.png (${width}x${height}) for checkerboard...`);
    
    // Sample the top-left 100x100 region of LOGO.png.
    // If it is checkerboard, it will have alternating gray/white or gray/black pixels.
    // If it is properly transparent, it will be 100% transparent (alpha = 0).
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
    
    console.log(`Top-left 100x100 corner: ${transparentCount} transparent, ${opaqueCount} opaque.`);
    
    // Check if the logo is indeed "Srikala"
    // Let's print some pixels that are opaque in the center region
    let centerOpaqueCount = 0;
    for (let y = height/3; y < 2*height/3; y += 10) {
      for (let x = width/3; x < 2*width/3; x += 10) {
        const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
        const a = image.bitmap.data[idx + 3];
        if (a > 0) {
          centerOpaqueCount++;
        }
      }
    }
    console.log(`Center region sampled: ${centerOpaqueCount} opaque pixels.`);
    
  } catch (error) {
    console.error(error);
  }
}

checkLOGO();
