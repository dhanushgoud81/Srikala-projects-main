import { Jimp } from 'jimp';

async function globalRemoval() {
  try {
    console.log('Reading logo 3 .jpeg...');
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    const data = image.bitmap.data;
    
    // Visited map for BFS
    const visited = new Uint8Array(width * height);
    const queue = [];
    
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
    
    // BFS first pass (Connected Background)
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
      
      const isBgColor = (diff < 15) && (r >= 110 && r <= 195);
      const isWhite = (r >= 235 && g >= 235 && b >= 235);
      
      if (isBgColor || isWhite) {
        data[idx + 3] = 0;
        transparentCount++;
        
        if (x > 0) enqueue(x - 1, y);
        if (x < width - 1) enqueue(x + 1, y);
        if (y > 0) enqueue(x, y - 1);
        if (y < height - 1) enqueue(x, y + 1);
      }
    }
    
    console.log(`Connected Background Pass: ${transparentCount} pixels cleared.`);
    
    // Second pass: Key out inner checkerboard pixels that might be fully enclosed
    let innerCleared = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // If not already transparent
        if (data[idx + 3] > 0) {
          const r = data[idx + 0];
          const g = data[idx + 1];
          const b = data[idx + 2];
          
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const diff = max - min;
          
          // Strict checkerboard gray definition
          const isDarkGrid = (diff < 5) && (r >= 125 && r <= 135);
          const isLightGrid = (diff < 5) && (r >= 167 && r <= 177);
          
          if (isDarkGrid || isLightGrid) {
            data[idx + 3] = 0;
            innerCleared++;
          }
        }
      }
    }
    
    console.log(`Inner Closed-Hole Pass: ${innerCleared} pixels cleared.`);
    
    // Feather edges
    let featheredCount = 0;
    const tempAlpha = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
      tempAlpha[i] = data[i * 4 + 3];
    }
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const pos = y * width + x;
        const idx = pos * 4;
        
        if (tempAlpha[pos] > 0) {
          const aLeft  = tempAlpha[pos - 1];
          const aRight = tempAlpha[pos + 1];
          const aUp    = tempAlpha[pos - width];
          const aDown  = tempAlpha[pos + width];
          
          if (aLeft === 0 || aRight === 0 || aUp === 0 || aDown === 0) {
            const r = data[idx + 0];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const diff = max - min;
            
            // Soft blend for semi-background-like pixels on edges
            if (diff < 15 && r >= 105 && r <= 200) {
              data[idx + 3] = 90; // ~35% opacity
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

globalRemoval();
