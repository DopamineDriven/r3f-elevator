"use client";

import { useKTX2Texture } from "@/ui/elevator/r3f/hooks/use-ktx2-texture";
import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type MaterialKey = keyof typeof PBR_TEXTURES_KTX2;

export function PBRMaterial<const Target extends MaterialKey>({
  target,
  repeat = [1, 1],
  fallbackColor = "#ffffff",
  metalness = 0,
  roughness = 1
}: {
  target: Target;
  repeat?: [number, number];
  fallbackColor?: string; // Only applied if no albedo map
  metalness?: number;
  roughness?: number;
}) {
  const textures = useKTX2Texture(target);
  const reff = useRef(textures?.roughness ?? null);

  useEffect(() => {
    Object.values(textures).forEach(tex => {
      if (!tex) return;
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(...repeat);
      tex.flipY = false;
    });

    return () => {
      Object.values(textures).forEach(tex => tex?.dispose());
    };
  }, [textures, repeat]);

  useFrame(() => {
    if (reff.current) reff.current.needsUpdate = true;
  });

  // const hasMap = {
  //   albedo: !!textureProps.albedo,
  //   metalness: !!textureProps.metalness,
  //   roughness: !!textureProps.roughness
  // };

  return (
    <meshStandardMaterial
      attach="material"
      aoMap={textures?.ao}
      map={textures?.albedo}
      normalMap={textures?.normal}
      roughnessMap={reff.current ?? textures?.roughness}
      metalnessMap={textures?.metalness}
      color={fallbackColor}
      metalness={metalness}
      roughness={roughness}
    />
  );
}
