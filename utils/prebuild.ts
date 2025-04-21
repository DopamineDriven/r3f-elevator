import { PBR_TEXTURES, PBRTextureSet, TextureKey } from "@/lib/texture-handler";
import { Fs } from "@d0paminedriven/fs";

const fs = new Fs(process.cwd());

const ORIGIN = "https://asrosscloud.com/";
const LOCAL_ROOT = "public/r3f/";

function toLocalPath(url: string) {
  if (!url.startsWith(ORIGIN)) {
    throw new Error(`Unexpected texture URL format: ${url}`);
  }
  return url.replace(ORIGIN, LOCAL_ROOT);
}

async function downloadAllPBRTextures() {
  const textureSets = Object.entries(PBR_TEXTURES) as [
    TextureKey,
    PBRTextureSet
  ][];

  for (const [textureKey, textureMap] of textureSets) {
    for (const [type, url] of Object.entries(textureMap)) {
      if (typeof url !== "string") continue;

      const localPath = toLocalPath(url).replace(/\.[^.]+$/, ""); // strip extension
      console.log(`⬇️  Downloading ${textureKey}.${type} → ${localPath}`);

      await fs.fetchRemoteWriteLocalLargeFiles(url, localPath);
    }
  }
}

(async () => await downloadAllPBRTextures())();
