import { Jimp } from 'jimp';

async function analyzeBorders() {
  try {
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Analyzing logo 3 .jpeg borders (${width}x${height})...`);
    
    const colors = {};
    const maxDiffs = {};
    
    // Sample a 40-pixel border around the entire image
    const borderWidth = 40;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Only sample border pixels
        const isBorder = (x < borderWidth || x > width - borderWidth || y < borderWidth || y > height - borderWidth);
        if (!isBorder) continue;
        
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        const key = `R:${r}, G:${g}, B:${b}`;
        colors[key] = (colors[key] || 0) + 1;
        
        const diffKey = Math.floor(diff / 5) * 5;
        maxDiffs[diffKey] = (maxDiffs[diffKey] || 0) + 1;
      }
    }
    
    console.log('Top border colors:');
    const sortedColors = Object.entries(colors).sort((a, b) => b[1] - a[1]);
    sortedColors.slice(0, 30).forEach(([color, count]) => {
      console.log(`${color} => ${count} times`);
    });
    
    console.log('\nColor channel differences (max - min):');
    const sortedDiffs = Object.entries(maxDiffs).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    sortedDiffs.forEach(([diffRange, count]) => {
      console.log(`Diff range ${diffRange}-${parseInt(diffRange)+4} => ${count} times`);
    });
  } catch (error) {
    console.error(error);
  }
}

analyzeBorders();
