import { Jimp } from 'jimp';

async function analyzeLeft() {
  try {
    const image = await Jimp.read('public/images/logo2.jpg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Analyzing logo2.jpg left side (${width}x${height})...`);
    
    // Sample a region on the far left side, where the logo is NOT present
    // Let's sample x from 0 to 150, y from 100 to 600
    const colors = {};
    let nonBgCount = 0;
    
    for (let y = 100; y < 600; y += 10) {
      for (let x = 0; x < 150; x += 10) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
        
        colors[hex] = (colors[hex] || 0) + 1;
        
        // If it falls in our feathering range (r < 216 and r >= 195)
        if (r < 216 && r >= 170) {
          nonBgCount++;
        }
      }
    }
    
    console.log(`Found ${nonBgCount} pixels in feather/shadow range (170-215) in far-left sample.`);
    console.log('Top colors in far-left area:');
    const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]);
    sorted.slice(0, 15).forEach(([color, count]) => {
      console.log(`  ${color} => ${count} times`);
    });
  } catch (error) {
    console.error(error);
  }
}

analyzeLeft();
