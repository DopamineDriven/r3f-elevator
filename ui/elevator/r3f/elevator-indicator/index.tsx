"use client";

import * as THREE from "three";

export function TriangleIndicator({
  activated = false,
  width = 0.18,
  height = 0.18,
  depth = 0.035
}) {
  return (
    <mesh position={[0, 0, depth]} renderOrder={25}>
      <downTriangleGeometry args={[width, height]} />
      <meshStandardMaterial
        color="#ff9a50"
        emissive={activated ? "#ff9a50" : "#000"}
        emissiveIntensity={1}
        metalness={0.2}
        roughness={1}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
