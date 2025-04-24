"use client";

import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";
import { useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { CompressedTexture } from "three";
import { KTX2Loader } from "three-stdlib";

type UnionOfKeys<T> = T extends any ? keyof T : never;

type MapKey = UnionOfKeys<
  (typeof PBR_TEXTURES_KTX2)[keyof typeof PBR_TEXTURES_KTX2]
>;

type MaterialKey = keyof typeof PBR_TEXTURES_KTX2;

export function useKTX2Texture<T extends MaterialKey>(material: T) {
  const { gl } = useThree();
  const mapPaths = PBR_TEXTURES_KTX2[material];

  const keys = useMemo(
    () =>
      Object.keys(mapPaths).filter((k): k is MapKey => {
        const value = mapPaths[k as MapKey];
        return typeof value === "string" && value.trim().length > 0;
      }),
    [mapPaths]
  );

  const urls = useMemo(
    () =>
      keys
        .map(k => mapPaths[k as MapKey])
        // filter out urls where -> metalness: undefined=(url)
        .filter(v => typeof v !== "undefined"),
    [keys, mapPaths]
  );
  const textures = useLoader(KTX2Loader, urls, loader =>
    loader.setTranscoderPath("/basis/").detectSupport(gl)
  );

  const mappedTextures = useMemo(() => {
    if (!textures.length) return {};
    return Object.fromEntries(keys.map((k, i) => [k, textures[i]]));
  }, [keys, textures]);

  return mappedTextures satisfies Record<string, CompressedTexture>;
}
