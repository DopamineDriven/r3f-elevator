import { PBR_TEXTURES_RAW } from "@/utils/__out__/pbr/pbr-textures-raw";
import { Fs } from "@d0paminedriven/fs";
import { Document } from "@gltf-transform/core";
import { textureCompress } from "@gltf-transform/functions";
import sharp from "sharp";

const fs = new Fs(process.cwd());

const SUPPORTED_KEYS = [
  "ao",
  "albedo",
  "normal",
  "metalness",
  "roughness"
] as const;
type SupportedKey = (typeof SUPPORTED_KEYS)[number];

const compressedOutputDir = "public/r3f-ktx2";

async function compressImageToKTX2(
  id: string,
  inputUrl: string,
  outputPath: string
) {
  const imageBuffer = await fetch(inputUrl).then(r => r.arrayBuffer());

  const mimeType = fs.getMime(fs.assetType(inputUrl));
  const doc = new Document();

  doc
    .createTexture(id)
    .setImage(new Uint8Array(imageBuffer))
    .setMimeType(mimeType);

  await doc.transform(textureCompress({ encoder: sharp }));

  const outputTex = doc.getRoot().listTextures()[0];
  fs.withWs(outputPath, outputTex.getImage() ?? new Uint8Array());
}

(async () => {
  const ktx2Registry: Record<
    string,
    Partial<Record<SupportedKey, string>>
  > = {};

  for (const [materialKey, maps] of Object.entries(PBR_TEXTURES_RAW)) {
    const ktx2Paths: Partial<Record<SupportedKey, string>> = {};

    for (const [mapKey, url] of Object.entries(maps)) {
      if (!SUPPORTED_KEYS.includes(mapKey as SupportedKey)) continue;

      const extension = "ktx2";

      const parsedPath = fs.parseUrl(url).pathname.replace(/^\/textures\//, "");
      const localKTX2Path = `${compressedOutputDir}/${parsedPath.replace(/\.[^.]+$/, `.${extension}`)}`;
      const publicPath = localKTX2Path.replace("public/", "/");

      await compressImageToKTX2(`${materialKey}-${mapKey}`, url, localKTX2Path);

      ktx2Paths[mapKey as SupportedKey] = publicPath;
    }

    ktx2Registry[materialKey] = ktx2Paths;
  }

  const registryString = `export const PBR_TEXTURES_KTX2 = ${JSON.stringify(ktx2Registry, null, 2)} as const;\n`;

  fs.withWs("utils/__out__/pbr/pbr-textures-ktx2.ts", registryString);

  console.log("✅ KTX2 compression complete.");
})();
