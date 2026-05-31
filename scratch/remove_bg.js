import { Jimp } from 'jimp';

async function removeBackground() {
  try {
    console.log('Reading logo 3 .jpeg...');
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Processing image pixels (${width}x${height})...`);
    
    let transparentCount = 0;
    
    image.scan(0, 0, width, height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // We detected the two grid colors:
      // Grid Square 1: ~130 (range 125 to 135)
      // Grid Square 2: ~172 (range 168 to 178)
      // They are perfectly neutral (r, g, b are almost identical)
      
      const isGrid1 = (r >= 124 && r <= 136) && (g >= 124 && g <= 136) && (b >= 124 && b <= 136);
      const isGrid2 = (r >= 166 && r <= 180) && (g >= 166 && g <= 180) && (b >= 166 && b <= 180);
      
      // Also key out any extremely bright white pixels (e.g. edge artifacts or pure white grid lines)
      const isWhite = (r >= 240 && g >= 240 && b >= 240);
      
      if (isGrid1 || isGrid2 || isWhite) {
        // Set alpha channel to 0 (completely transparent)
        this.bitmap.data[idx + 3] = 0;
        transparentCount++;
      }
    });
    
    console.log(`Made ${transparentCount} pixels transparent.`);
    console.log('Writing output to public/images/logo_3_transparent.png...');
    await image.write('public/images/logo_3_transparent.png');
    console.log('Success! Transparent PNG written successfully.');
  } catch (error) {
    console.error('Failed to process image:', error);
  }
}

removeBackground();
