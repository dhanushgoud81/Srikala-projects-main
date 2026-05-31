import { Jimp } from 'jimp';

async function sampleLogo() {
  try {
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Sampling logo 3 .jpeg center region (${width}x${height})...`);
    
    // The logo is centered. Let's sample a region in the middle: x from 300 to 580, y from 150 to 450
    const colors = [];
    
    for (let y = 150; y < 450; y += 5) {
      for (let x = 300; x < 580; x += 5) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        // If it's not a background-like gray
        const isBgGray = (diff < 10) && (r >= 120 && r <= 180);
        if (!isBgGray) {
          colors.push({ x, y, r, g, b, diff });
        }
      }
    }
    
    console.log(`Found ${colors.length} non-bg pixels in center sample.`);
    // Print some interesting colors (e.g. blues, highly saturated, and non-bg grays)
    console.log('Sample of non-background colors in the logo area:');
    const sampled = colors.filter((c, idx) => idx % 50 === 0);
    sampled.slice(0, 30).forEach(c => {
      console.log(`At (${c.x}, ${c.y}): R:${c.r}, G:${c.g}, B:${c.b} (diff: ${c.diff})`);
    });
    
    // Let's find if there are any gray pixels in the logo that have diff < 10 and values in 120-180
    // These would be hard to distinguish from background!
    let overlapCount = 0;
    for (let y = 150; y < 450; y++) {
      for (let x = 300; x < 580; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        const isBgGray = (diff < 8) && (r >= 122 && r <= 178);
        if (isBgGray) {
          overlapCount++;
        }
      }
    }
    console.log(`\nOverlap count (pixels in center that look exactly like background grays): ${overlapCount}`);
  } catch (error) {
    console.error(error);
  }
}

sampleLogo();
