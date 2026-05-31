import { Jimp } from 'jimp';

async function testGrid() {
  try {
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    let total = 0;
    let correct = 0;
    
    // Sample border pixels (where we know it is ONLY checkerboard, no logo)
    // x < 100 or x > width - 100 or y < 100 or y > height - 100
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const isBorder = (x < 100 || x > width - 100 || y < 100 || y > height - 100);
        if (!isBorder) continue;
        
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        
        // Predict cell row/col using 13.75
        const col = Math.floor(x / 13.75);
        const row = Math.floor(y / 13.75);
        const isEven = (col + row) % 2 === 0; // Even should be LIGHT, odd should be DARK (or vice versa)
        
        const isLight = (r >= 160 && r <= 185);
        const isDark = (r >= 120 && r <= 140);
        
        total++;
        if (isEven && isLight) {
          correct++;
        } else if (!isEven && isDark) {
          correct++;
        }
      }
    }
    
    const accuracy1 = (correct / total) * 100;
    console.log(`Accuracy with isEven = LIGHT: ${accuracy1.toFixed(2)}%`);
    
    // Test the opposite polarity
    correct = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const isBorder = (x < 100 || x > width - 100 || y < 100 || y > height - 100);
        if (!isBorder) continue;
        
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        
        const col = Math.floor(x / 13.75);
        const row = Math.floor(y / 13.75);
        const isEven = (col + row) % 2 === 0;
        
        const isLight = (r >= 160 && r <= 185);
        const isDark = (r >= 120 && r <= 140);
        
        if (isEven && isDark) {
          correct++;
        } else if (!isEven && isLight) {
          correct++;
        }
      }
    }
    const accuracy2 = (correct / total) * 100;
    console.log(`Accuracy with isEven = DARK: ${accuracy2.toFixed(2)}%`);
    
  } catch (error) {
    console.error(error);
  }
}

testGrid();
