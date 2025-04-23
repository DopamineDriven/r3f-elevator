import { PBR_TEXTURES_RAW } from "@/utils/__out__/pbr/pbr-textures-raw";
import { Fs } from "@d0paminedriven/fs";

export type TextureKey = keyof typeof PBR_TEXTURES_RAW;
export type PBRTextureMap = typeof PBR_TEXTURES_RAW;
export type PBRTextureSet = PBRTextureMap[TextureKey];

// type ObjUnion = | {
//   readonly albedo: string
//   readonly ao: string
//   readonly metalness: string
//   readonly normal: string
//   readonly roughness: string
// }
// | {
//   readonly ao: string
//   readonly albedo: string
//   readonly normal: string
//   readonly roughness: string
// }

// type PBRTextureMapped<T extends keyof typeof PBR_TEXTURES_RAW> = {
//   [P in T]: (typeof PBR_TEXTURES_RAW)[P];
// }[T];

// const test = (
//   props: PBRTextureMapped<keyof typeof PBR_TEXTURES_RAW>
// ) => {
//   if ("metalness" in props) {
//     return props satisfies ObjUnion;
//   } else return props satisfies ObjUnion;
// };

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
  const textureSets = Object.entries(PBR_TEXTURES_RAW) as [
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
