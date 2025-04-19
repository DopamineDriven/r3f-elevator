"use client";

import { TriangleIndicator } from "@/ui/elevator/r3f/elevator-indicator";

export const FloorIndicator = ({ activated }: { activated: boolean }) => {
  return (
    <group position={[0, 1.5, 0.275]} renderOrder={20}>
      {/* Full housing frame for Severance-style indicator */}

      {/* Bezel Frame (outer housing box) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.32, 0.04]} />
        <meshStandardMaterial
          color="#4c5158"
          metalness={0.5}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Curved Display Panel (slightly inset) */}
      <mesh position={[0, 0, 0.022]}>
        <bentPlaneGeometry args={[0.55, 0.3, 32, 1]} radius={1.25} />
        <meshStandardMaterial
          color="#111"
          metalness={0.1}
          roughness={0.8}
          emissive="#222"
          emissiveIntensity={0.35}
          toneMapped={false}
        />
      </mesh>

      {/* Active Triangle Indicator */}
      <TriangleIndicator activated={activated} />
    </group>
  );
};
