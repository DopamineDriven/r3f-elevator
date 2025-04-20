"use client";

import type { PBRTextureSet } from "@/ui/elevator/r3f/types";
import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { TEXTURES } from "@/ui/elevator/r3f/constants";

export function PBRMaterial<const Target extends keyof typeof TEXTURES>({
  target,
  repeat = [1, 1],
  color = "#ffffff",
  metalness,
  roughness
}: {
  target: Target;
  repeat?: [number, number];
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  const textureSet: PBRTextureSet = useMemo(() => TEXTURES[target], [target]);

  const textureProps = useTexture({
    map: textureSet.albedo,
    aoMap: textureSet.ao,
    metalnessMap: textureSet.metalness,
    normalMap: textureSet.normal,
    roughnessMap: textureSet.roughness
  });

  useEffect(() => {
    Object.values(textureProps).forEach((tex) => {
      if (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(...repeat);
        tex.flipY = false;
      }
    });

    return () => {
      Object.values(textureProps).forEach((tex) => tex?.dispose());
    };
  }, [textureProps, repeat]);

  const isPhysical = target === "brushedMetal" || target === "enhancedBrushedMetal";

  const MaterialComponent = isPhysical ? "meshPhysicalMaterial" : "meshStandardMaterial";

  return (
    <MaterialComponent
      attach="material"
      {...textureProps}
      color={color}
      metalness={metalness}
      roughness={roughness}
    />
  );
}
