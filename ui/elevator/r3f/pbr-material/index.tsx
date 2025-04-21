"use client";

import type { PBRTextureSet, TextureKey } from "@/lib/texture-handler";
import { handleUnknown, PBR_TEXTURES } from "@/lib/texture-handler";
import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function PBRMaterial<const Target extends TextureKey>({
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
  const textureSet = useMemo(
    () => PBR_TEXTURES[target] as PBRTextureSet,
    [target]
  );

  const textureProps = useTexture(handleUnknown(textureSet));

  useEffect(() => {
    Object.entries(textureProps).forEach(([_k, tex]) => {
      if (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(...repeat);
        tex.flipY = false;
      }
    });

    return () => {
      Object.values(textureProps).forEach(tex => tex?.dispose());
    };
  }, [textureProps, repeat]);

  return (
    <meshStandardMaterial
      attach="material"
      {...textureProps}
      color={color}
      metalness={metalness}
      roughness={roughness}
    />
  );
}
