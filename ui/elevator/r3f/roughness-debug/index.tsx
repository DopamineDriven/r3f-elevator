"use client";

import { useKTX2Texture } from "@/ui/elevator/r3f/hooks/use-ktx2-texture";
import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

type MaterialKey = keyof typeof PBR_TEXTURES_KTX2;

export function RoughnessDebug({
  target,
  size = 2,
  wireframe = false
}: {
  target: MaterialKey;
  size?: number;
  wireframe?: boolean;
}) {
  const textures = useKTX2Texture(target);
  const reff = useRef(textures?.roughness ?? null);
  // Dynamically force update material if texture changes

  useFrame(() => {
    if (reff.current) reff.current.needsUpdate = true;
  });

  return (
    <mesh position={[0, 0, 0.5]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial
        attach="material"
        map={reff.current}
        wireframe={wireframe}
      />
    </mesh>
  );
}
