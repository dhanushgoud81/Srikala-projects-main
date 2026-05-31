import { Jimp } from 'jimp';

async function findGrid() {
  try {
    const image = await Jimp.read('public/images/logo 3 .jpeg');
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    console.log(`Analyzing logo 3 .jpeg row y=10 for grid runs...`);
    
    let lastColor = null;
    let runLength = 0;
    const runs = [];
    
    for (let x = 0; x < width; x++) {
      const idx = (10 * width + x) * 4;
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      
      // Classify as Dark Gray (around 130) or Light Gray (around 172)
      let colorType = 'UNKNOWN';
      if (r >= 120 && r <= 140) {
        colorType = 'DARK';
      } else if (r >= 160 && r <= 185) {
        colorType = 'LIGHT';
      }
      
      if (colorType === lastColor) {
        runLength++;
      } else {
        if (lastColor !== null) {
          runs.push({ color: lastColor, length: runLength, startX: x - runLength });
        }
        lastColor = colorType;
        runLength = 1;
      }
    }
    runs.push({ color: lastColor, length: runLength, startX: width - runLength });
    
    console.log('Detected color runs in top row (first 15 runs):');
    console.log(runs.slice(0, 15));
  } catch (error) {
    console.error(error);
  }
}

findGrid();
