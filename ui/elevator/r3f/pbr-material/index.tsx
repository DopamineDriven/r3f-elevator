"use client";

import { useKTX2Texture } from "@/ui/elevator/r3f/hooks/use-ktx2-texture";
import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";
import { useEffect } from "react";
import * as THREE from "three";

type MaterialKey = keyof typeof PBR_TEXTURES_KTX2;

export function PBRMaterial<const Target extends MaterialKey>({
  target,
  repeat = [1, 1],
  fallbackColor = "#ffffff",
  metalness = 0.5,
  roughness = 0.5
}: {
  target: Target;
  repeat?: [number, number];
  fallbackColor?: string; // Only applied if no albedo map
  metalness?: number;
  roughness?: number;
}) {
  const textureProps = useKTX2Texture(target);

  useEffect(() => {
    Object.values(textureProps).forEach(tex => {
      if (!tex) return;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(...repeat);
      tex.flipY = false;
    });

    return () => {
      Object.values(textureProps).forEach(tex => tex?.dispose());
    };
  }, [textureProps, repeat]);

  const hasMap = {
    albedo: !!textureProps.albedo,
    metalness: !!textureProps.metalness,
    roughness: !!textureProps.roughness
  };

  return (
    <meshStandardMaterial
      attach="material"
      {...textureProps}
      color={hasMap.albedo ? undefined : fallbackColor}
      metalness={hasMap.metalness ? undefined : metalness}
      roughness={hasMap.roughness ? undefined : roughness}
    />
  );
}
