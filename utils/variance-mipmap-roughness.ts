#!/usr/bin/env node
import { Jimp, rgbaToInt } from "jimp";

// compute next variance-preserving mip level
function mipmapVariance(inputImg: InstanceType<typeof Jimp>) {
  const w = inputImg.bitmap.width;
  const h = inputImg.bitmap.height;
  if (w <= 1 && h <= 1) return null;

  const nextW = Math.max(1, w >> 1),
    nextH = Math.max(1, h >> 1);
  const result = new Jimp({ width: nextW, height: nextH });

  for (let y = 0; y < nextH; ++y) {
    for (let x = 0; x < nextW; ++x) {
      let sumSq = 0,
        count = 0;
      for (let dy = 0; dy < 2; ++dy) {
        for (let dx = 0; dx < 2; ++dx) {
          const sx = Math.min(w - 1, x * 2 + dx);
          const sy = Math.min(h - 1, y * 2 + dy);
          const idx = (sy * w + sx) * 4;
          const v = inputImg.bitmap.data[idx] / 255; // Greyscale roughness [0..1]
          sumSq += v * v;
          count++;
        }
      }
      const resultV = Math.sqrt(sumSq / count);
      const resultByte = Math.round(resultV * 255);
      result.setPixelColor(
        rgbaToInt(resultByte, resultByte, resultByte, 255),
        x,
        y
      );
    }
  }
  return result;
}

export async function generateVarianceMipmaps(
  fileIn: string,
  outPrefix: string
) {
  const image = (await Jimp.read(fileIn)) as InstanceType<typeof Jimp>;
  image.greyscale(); // mutate in place!
  const mips: InstanceType<typeof Jimp>[] = [image];

  while (
    mips[mips.length - 1].bitmap.width > 1 ||
    mips[mips.length - 1].bitmap.height > 1
  ) {
    const next = mipmapVariance(mips[mips.length - 1]);
    if (!next) break;
    mips.push(next);
  }

  for (let i = 0; i < mips.length; ++i) {
    const outPath = `${outPrefix}_mip${i}.png` as const;
    await mips[i].write(outPath);
    console.log(` wrote ${outPath}`);
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , fileIn, outPrefix] = process.argv;
  if (!fileIn || !outPrefix) {
    console.error("Usage: tsx variance-mipmap-roughness.ts inFile outPrefix");
    process.exit(1);
  }
  await generateVarianceMipmaps(fileIn, outPrefix);
}
