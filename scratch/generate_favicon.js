import { Jimp } from 'jimp';

async function main() {
  try {
    console.log('Loading logo2.png...');
    const img = await Jimp.read('public/images/logo2.png');
    const width = img.bitmap.width;
    const height = img.bitmap.height;
    console.log(`Original dimensions: ${width}x${height}`);

    // Favicon should ideally be square. Let's crop it to square if it's not.
    let squareImg = img;
    if (width !== height) {
      const size = Math.min(width, height);
      const x = Math.floor((width - size) / 2);
      const y = Math.floor((height - size) / 2);
      console.log(`Cropping to square: size=${size}, x=${x}, y=${y}`);
      squareImg = img.crop({ x, y, w: size, h: size });
    }

    // Save as 48x48 favicon.png
    console.log('Resizing to 48x48...');
    const fav48 = squareImg.clone().resize({ w: 48, h: 48 });
    await fav48.write('public/favicon.png');
    console.log('Saved public/favicon.png (48x48)');

    // Save as 96x96 favicon-96.png
    console.log('Resizing to 96x96...');
    const fav96 = squareImg.clone().resize({ w: 96, h: 96 });
    await fav96.write('public/favicon-96.png');
    console.log('Saved public/favicon-96.png (96x96)');

    // Save as 192x192 favicon-192.png
    console.log('Resizing to 192x192...');
    const fav192 = squareImg.clone().resize({ w: 192, h: 192 });
    await fav192.write('public/favicon-192.png');
    console.log('Saved public/favicon-192.png (192x192)');

    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

main();
