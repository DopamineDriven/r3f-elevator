"use client";

import { TriangleIndicator } from "@/ui/elevator/r3f/elevator-indicator";

export const FloorIndicator = ({ activated }: { activated: boolean }) => {
  return (
    <group position={[0, 1.505, 0.275]} renderOrder={20}>
      {/* Outer housing (light metallic bezel) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.28, 0.02]} />
        <meshStandardMaterial
          color="#777c83" // lighter metallic tone
          metalness={0.6}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Inner inset panel (dark, curved) */}
      <mesh position={[0, 0, 0.012]}>
        <bentPlaneGeometry args={[0.55, 0.3, 32, 1]} radius={1.25} />
        <meshStandardMaterial
          color="#222"
          metalness={0.2}
          roughness={0.7}
          emissive="#222"
          emissiveIntensity={0.35}
          toneMapped={false}
        />
      </mesh>

      {/* Downward triangle */}
      <TriangleIndicator activated={activated} />
    </group>
  );
};
