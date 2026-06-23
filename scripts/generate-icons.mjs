/**
 * PWA Icon Generator — pure Node.js, no dependencies
 * Generates valid PNG icons for PWA manifest.
 * 
 * Usage: node scripts/generate-icons.mjs
 */

import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/icons");

/**
 * Create a minimal valid PNG file with a solid color and optional text-like pattern.
 */
function createPNG(width, height, r, g, b) {
  // Build raw RGBA pixel data with filter byte per row
  const rowSize = width * 4 + 1; // 1 filter byte + RGBA pixels
  const rawData = Buffer.alloc(rowSize * height, 0);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;

      // Create a gradient/pattern effect based on position
      const cx = width / 2;
      const cy = height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      // Rounded square mask
      const radius = width * 0.22;
      const halfSize = width * 0.5;
      const cornerX = Math.abs(dx) - (halfSize - radius);
      const cornerY = Math.abs(dy) - (halfSize - radius);
      const cornerDist = Math.sqrt(Math.max(0, cornerX) ** 2 + Math.max(0, cornerY) ** 2);
      const mask = cornerDist <= radius ? 1 : 0;

      const alpha = mask * 255;

      // Color: Primary teal background with subtle gradient
      const brightness = 0.85 + 0.15 * (1 - dist / maxDist);
      rawData[pixelOffset] = Math.min(255, Math.round(r * brightness));     // R
      rawData[pixelOffset + 1] = Math.min(255, Math.round(g * brightness)); // G
      rawData[pixelOffset + 2] = Math.min(255, Math.round(b * brightness)); // B
      rawData[pixelOffset + 3] = alpha;                                      // A

      // Draw a simple "M" shape in white
      if (mask) {
        const relX = x / width;
        const relY = y / height;
        // Simple "M" approximation
        if (relX > 0.25 && relX < 0.75 && relY > 0.35 && relY < 0.75) {
          const leftSlope = (0.5 - 0.25) / (0.35 - 0.75);
          const rightSlope = (0.75 - 0.5) / (0.35 - 0.75);
          const leftEdge = 0.25 + leftSlope * (relY - 0.75);
          const rightEdge = 0.75 + rightSlope * (relY - 0.75);

          if (relX >= leftEdge && relX <= 0.5 && relX <= 0.5) {
            const distToLine = (relX - leftEdge) / (0.5 - leftEdge);
            if (distToLine <= 0.12) {
              // White letter
              const fade = Math.max(0, 1 - distToLine / 0.12);
              rawData[pixelOffset] = Math.min(255, rawData[pixelOffset] + Math.round(180 * fade));
              rawData[pixelOffset + 1] = Math.min(255, rawData[pixelOffset + 1] + Math.round(180 * fade));
              rawData[pixelOffset + 2] = Math.min(255, rawData[pixelOffset + 2] + Math.round(180 * fade));
            }
          }
          if (relX >= 0.5 && relX <= rightEdge) {
            const distToLine = (rightEdge - relX) / (rightEdge - 0.5);
            if (distToLine <= 0.12) {
              const fade = Math.max(0, 1 - distToLine / 0.12);
              rawData[pixelOffset] = Math.min(255, rawData[pixelOffset] + Math.round(180 * fade));
              rawData[pixelOffset + 1] = Math.min(255, rawData[pixelOffset + 1] + Math.round(180 * fade));
              rawData[pixelOffset + 2] = Math.min(255, rawData[pixelOffset + 2] + Math.round(180 * fade));
            }
          }
        }
      }
    }
  }

  // Compress raw data
  const compressed = zlib.deflateSync(rawData);

  // Build PNG file
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = createChunk("IHDR", ihdrData);

  // IDAT chunk
  const idat = createChunk("IDAT", compressed);

  // IEND chunk
  const iend = createChunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);

  const typeBuffer = Buffer.from(type, "ascii");
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);

  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function generateIcons() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  // Primary brand color: Teal (#0d9488 → rgb(13, 148, 136))
  const brandR = 13, brandG = 148, brandB = 136;

  const sizes = [
    { name: "icon-192x192.png", size: 192 },
    { name: "icon-512x512.png", size: 512 },
  ];

  for (const { name, size } of sizes) {
    const png = createPNG(size, size, brandR, brandG, brandB);
    const outPath = path.join(OUT_DIR, name);
    fs.writeFileSync(outPath, png);
    console.log(`✅ Generated ${name} (${size}x${size}) — ${png.length} bytes`);
  }

  console.log("\n🎉 All icons generated in public/icons/");
}

generateIcons();
