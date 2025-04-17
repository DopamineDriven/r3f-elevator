"use client";

import type * as THREE from "three";
import { useEffect, useRef } from "react";

export const FluorescentLight = ({ intensity = 1 }: { intensity?: number }) => {
  const lightRef = useRef<THREE.MeshStandardMaterial>(null);

  useEffect(() => {
    const mat = lightRef.current;
    if (!mat) return;

    // emissive pulse
    mat.emissiveIntensity = intensity;
    mat.needsUpdate = true;
  }, [intensity]);

  return (
    <group>
      {/* light fixture frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.05, 0.4]} />
        <meshStandardMaterial
          color="#333"
          roughness={0.9}
          metalness={0.1}
          emissive="#101010"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* light fixture panel */}
      <mesh position={[0, -0.01, 0]}>
        <boxGeometry args={[0.85, 0.025, 0.35]} />
        <meshStandardMaterial
          ref={lightRef}
          color="#fff"
          emissive="#f5f5ff"
          emissiveIntensity={intensity * 1.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
