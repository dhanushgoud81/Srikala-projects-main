import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const texturesDir = path.join(__dirname, '..', 'public', 'images', 'textures');
console.log('Analyzing textures directory:', texturesDir);

const files = fs.readdirSync(texturesDir);
files.forEach(file => {
  if (file.startsWith('texture-aludec')) {
    const filePath = path.join(texturesDir, file);
    const stats = fs.statSync(filePath);
    console.log(`File: ${file}, Size: ${(stats.size / 1024).toFixed(2)} KB`);
  }
});
