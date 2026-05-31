import { Jimp } from 'jimp';

async function floodFillRemoveBackground() {
  try {
    console.log('Reading logo 3 .jpeg...');
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const data = image.bitmap.data;
    
    console.log(`Dimensions: ${width}x${height}`);
    
    // Visited map
    const visited = new Uint8Array(width * height);
    
    // Queue for BFS
    const queue = [];
    
    // Helper to push to queue
    function enqueue(x, y) {
      const pos = y * width + x;
      if (!visited[pos]) {
        visited[pos] = 1;
        queue.push(pos);
      }
    }
    
    // Enqueue all border pixels
    for (let x = 0; x < width; x++) {
      enqueue(x, 0);
      enqueue(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      enqueue(0, y);
      enqueue(width - 1, y);
    }
    
    let transparentCount = 0;
    
    console.log('Running BFS flood fill to find background...');
    
    let head = 0;
    while (head < queue.length) {
      const pos = queue[head++];
      const x = pos % width;
      const y = Math.floor(pos / width);
      
      const idx = pos * 4;
      const r = data[idx + 0];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      // Background checkerboard grays:
      // Neutral grays (diff < 15) and brightness between 110 and 195
      const isBgColor = (diff < 15) && (r >= 110 && r <= 195);
      
      // Also allow extremely bright/white pixels near the borders (like edge noise or white grid lines)
      const isWhite = (r >= 235 && g >= 235 && b >= 235);
      
      if (isBgColor || isWhite) {
        // Set alpha to 0
        data[idx + 3] = 0;
        transparentCount++;
        
        // Add 4-way neighbors
        if (x > 0) enqueue(x - 1, y);
        if (x < width - 1) enqueue(x + 1, y);
        if (y > 0) enqueue(x, y - 1);
        if (y < height - 1) enqueue(x, y + 1);
      }
    }
    
    console.log(`BFS finished. Made ${transparentCount} background pixels transparent.`);
    
    // Now let's feather the edges of the logo to make it look extremely clean!
    // A pixel is an edge if it is NOT transparent but has a transparent neighbor.
    let featheredCount = 0;
    const tempAlpha = new Uint8Array(width * height);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pos = y * width + x;
        const idx = pos * 4;
        tempAlpha[pos] = data[idx + 3];
      }
    }
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const pos = y * width + x;
        const idx = pos * 4;
        
        if (tempAlpha[pos] > 0) {
          // Check neighbors
          const aLeft  = tempAlpha[pos - 1];
          const aRight = tempAlpha[pos + 1];
          const aUp    = tempAlpha[pos - width];
          const aDown  = tempAlpha[pos + width];
          
          if (aLeft === 0 || aRight === 0 || aUp === 0 || aDown === 0) {
            // It is an edge pixel! Let's feather it.
            const r = data[idx + 0];
            const g = data[idx + 1];
            const b = data[idx + 2];
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const diff = max - min;
            
            // If it looks like a background color, make it semi-transparent
            if (diff < 15 && r >= 110 && r <= 195) {
              data[idx + 3] = 80; // 30% opacity
              featheredCount++;
            }
          }
        }
      }
    }
    
    console.log(`Feathered ${featheredCount} edge pixels.`);
    
    console.log('Writing clean logo to public/images/logo_3_transparent.png...');
    await image.write('public/images/logo_3_transparent.png');
    console.log('Success!');
  } catch (error) {
    console.error(error);
  }
}

floodFillRemoveBackground();
