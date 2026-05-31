import { Jimp } from 'jimp';

async function inspect() {
  try {
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Inspecting top-left corner pixels...`);
    
    const colorCounts = {};
    
    for (let y = 0; y < 40; y++) {
      for (let x = 0; x < 40; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const key = `R:${r}, G:${g}, B:${b}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
      }
    }
    
    const sorted = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
    console.log('Top background colors detected:');
    sorted.slice(0, 15).forEach(([color, count]) => {
      console.log(`${color} => ${count} times`);
    });
  } catch (error) {
    console.error(error);
  }
}

inspect();
