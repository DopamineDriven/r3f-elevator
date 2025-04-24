"use client";

import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";
import { useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { KTX2Loader } from "three-stdlib";

// 🔑 Union of all possible map keys used across all materials
type UnionOfKeys<T> = T extends any ? keyof T : never;
type MapKey = UnionOfKeys<
  (typeof PBR_TEXTURES_KTX2)[keyof typeof PBR_TEXTURES_KTX2]
>;

// Material key from the texture registry
type MaterialKey = keyof typeof PBR_TEXTURES_KTX2;

// Output shape: a map of texture keys to loaded THREE.Texture
export function useKTX2Texture<T extends MaterialKey>(
  material: T
): Partial<Record<MapKey, THREE.Texture>> {
  const { gl } = useThree();
  const mapPaths = PBR_TEXTURES_KTX2[material];

  // Only include keys with valid paths
  const keys = useMemo(
    () =>
      Object.keys(mapPaths).filter((k): k is MapKey => {
        const value =
          "metalness" in mapPaths
            ? mapPaths[k as MapKey]
            : mapPaths[k as Exclude<MapKey, "metalness">];
        return typeof value === "string" && value.trim().length > 0;
      }),
    [mapPaths]
  );

  const urls = useMemo(
    () =>
      keys.map(k =>
        "metalness" in mapPaths
          ? mapPaths[k as MapKey]
          : mapPaths[k as Exclude<MapKey, "metalness">]
      ),
    [keys, mapPaths]
  );

  const textures = useLoader(KTX2Loader, urls, loader =>
    loader.setTranscoderPath("/basis/").detectSupport(gl)
  );

  const mappedTextures = useMemo(() => {
    if (!textures.length) return {};
    return Object.fromEntries(keys.map((k, i) => [k, textures[i]])) as Partial<
      Record<MapKey, THREE.Texture>
    >;
  }, [keys, textures]);

  return mappedTextures;
}
