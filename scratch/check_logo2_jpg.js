import { Jimp } from 'jimp';

async function checkLogo2Jpg() {
  try {
    const image = await Jimp.read('public/images/logo2.jpg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Checking logo2.jpg (${width}x${height})...`);
    
    const colors = {};
    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        colors[hex] = (colors[hex] || 0) + 1;
      }
    }
    
    console.log(`Top-left 100x100 unique colors:`);
    const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]);
    sorted.slice(0, 20).forEach(([color, count]) => {
      console.log(`  ${color} => ${count} times`);
    });
  } catch (error) {
    console.error(error);
  }
}

checkLogo2Jpg();
