import { PBR_TEXTURES_RAW as PBR_TEXTURES } from "@/utils/__out__/pbr/pbr-textures-raw";

export { PBR_TEXTURES };
export type TextureKey = keyof typeof PBR_TEXTURES;
export type PBRTextureMap = typeof PBR_TEXTURES;
export type PBRTextureSet = PBRTextureMap[TextureKey];

export function getPBRTexture<const T extends TextureKey>(target: T) {
  return PBR_TEXTURES[target] satisfies PBRTextureSet;
}
const ORIGIN = "https://asrosscloud.com/";
const LOCAL_ROOT = "/r3f/"; // browser-visible path (omit "public")

function toLocal<const T extends string>(url: T) {
  return url.replace(ORIGIN, LOCAL_ROOT);
}

export function handleUnknown(textureSet: PBRTextureSet):
  | {
      map: string;
      aoMap: string;
      metalnessMap: string;
      normalMap: string;
      roughnessMap: string;
    }
  | {
      map: string;
      aoMap: string;
      normalMap: string;
      roughnessMap: string;
    } {
  const map = textureSet.albedo && toLocal(textureSet.albedo);
  const aoMap = textureSet.ao && toLocal(textureSet.ao);
  const normalMap = textureSet.normal && toLocal(textureSet.normal);
  const roughnessMap = textureSet.roughness && toLocal(textureSet.roughness);

  if ("metalness" in textureSet) {
    const metalnessMap = toLocal(textureSet.metalness);
    return { map, aoMap, metalnessMap, normalMap, roughnessMap };
  } else {
    return { map, aoMap, normalMap, roughnessMap };
  }
}
