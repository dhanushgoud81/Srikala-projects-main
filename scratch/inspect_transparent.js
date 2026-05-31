import { Jimp } from 'jimp';

async function inspect() {
  try {
    const image = await Jimp.read('public/images/logo_3_transparent.png');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Inspecting logo_3_transparent.png (${width}x${height})...`);
    
    let opaqueCheckeredCount = 0;
    const colors = {};
    
    // Check some edge pixels where the checkerboard used to be
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];
        
        if (a > 0) {
          opaqueCheckeredCount++;
          const key = `R:${r}, G:${g}, B:${b}, A:${a}`;
          colors[key] = (colors[key] || 0) + 1;
        }
      }
    }
    
    console.log(`Found ${opaqueCheckeredCount} non-transparent pixels in top-left 100x100 corner.`);
    const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]);
    console.log('Top colors in top-left corner:');
    sorted.slice(0, 20).forEach(([color, count]) => {
      console.log(`${color} => ${count} times`);
    });
  } catch (error) {
    console.error(error);
  }
}

inspect();
