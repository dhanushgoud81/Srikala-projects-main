import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'images', 'LOGO.png');
const fileBuffer = fs.readFileSync(imgPath);

console.log('File size:', fileBuffer.length, 'bytes');
console.log('First 16 bytes (hex):', fileBuffer.subarray(0, 16).toString('hex'));
console.log('First 16 bytes (ASCII):', fileBuffer.subarray(0, 16).toString('ascii'));
