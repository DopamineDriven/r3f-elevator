"use client";

import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";
import { useMemo } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { KTX2Loader } from "three-stdlib";

type PBRTexturesKTX2 = typeof PBR_TEXTURES_KTX2;
type MaterialName = keyof PBRTexturesKTX2;
type MapKey = keyof {
  [K in keyof typeof PBR_TEXTURES_KTX2]: typeof PBR_TEXTURES_KTX2[K]
}[keyof typeof PBR_TEXTURES_KTX2];

export function useKTX2Texture<T extends MaterialName>(material: T) {
  const { gl } = useThree();
  const mapPaths = PBR_TEXTURES_KTX2[material];

  const keys = useMemo(() => {
    return Object.keys(mapPaths).filter(k => {
      const path = mapPaths[k as MapKey];
      return typeof path === "string" && path.trim().length > 0;
    });
  }, [mapPaths]);

  const urls = useMemo(() => {
    if ("metalness" in mapPaths) {
      return keys.map(k => mapPaths[k as MapKey | "metalness"]);
    } else {
      return keys.map(k => mapPaths[k as MapKey]);
    }
  }, [keys, mapPaths]);

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
