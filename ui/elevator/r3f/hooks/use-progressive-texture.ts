"use client";

import { useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

type ResolutionTier = "low" | "medium" | "high";

interface RegisteredTexture {
  base: string; // e.g., "metal/metal01"
  tierMap: Record<ResolutionTier, string>; // URL or path
}

const TextureRegistry: Record<string, RegisteredTexture> = {
  brushedSteel: {
    base: "brushed-steel/metal_26_94_diffuse",
    tierMap: {
      low: "/r3f/preview/brushed-steel-256.jpg",
      medium: "/r3f/preview/brushed-steel-1024.jpg",
      high: "/r3f/textures/brushed-steel-vertical-fine/metal_ledges_26_52_diffuse.jpg"
    }
  }
  // ...more
};

export function useProgressiveTexture(
  meshRef: React.RefObject<THREE.Object3D | null>,
  textureId: string,
  distances: Record<ResolutionTier, number>
) {
  const { camera } = useThree();
  const [tier, setTier] = useState<ResolutionTier>("low");
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const loader = useMemo(() => new TextureLoader(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    const dist = camera.position.distanceTo(meshRef.current.position);

    if (dist < distances.high && tier !== "high") {
      setTier("high");
    } else if (dist < distances.medium && tier !== "medium") {
      setTier("medium");
    }
  });

  // Load the texture for current tier
  useEffect(() => {
    const path = TextureRegistry[textureId].tierMap[tier];
    loader.load(path, tex => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      setTexture(tex);
    });
  }, [tier, textureId, loader]);

  return texture;
}

/**
 example usage:

 const meshRef = useRef<THREE.Mesh>(null);
 const texture = useProgressiveTexture(meshRef, 'brushedSteel', {
  low: 80,
  medium: 40,
  high: 10
});

<mesh ref={meshRef} geometry={...}>
  <meshStandardMaterial map={texture} />
</mesh>
 */
