import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";

export type TextureKeyKtx2 = keyof typeof PBR_TEXTURES_KTX2;
export type PBRTextureMapKtx2 = typeof PBR_TEXTURES_KTX2;
export type PBRTextureSetKtx2 = PBRTextureMapKtx2[TextureKeyKtx2];

export type HandleUnknownRT = {
  map: string;
  aoMap: string;
  metalnessMap?: string;
  normalMap: string;
  roughnessMap: string;
};

export function handleUnknown(
  textureSet: (typeof PBR_TEXTURES_KTX2)[keyof typeof PBR_TEXTURES_KTX2]
): HandleUnknownRT {
  const map = textureSet.albedo;
  const aoMap = textureSet.ao;
  const normalMap = textureSet.normal;
  const roughnessMap = textureSet.roughness;
  const metalnessMap = textureSet.metalness;

  return {
    map,
    aoMap,
    normalMap,
    roughnessMap,
    metalnessMap: metalnessMap ?? undefined
  };
}
