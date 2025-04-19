"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function TriangleIndicator() {
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0,
      0.1,
      0, // Top
      -0.1,
      -0.1,
      0, // Bottom left
      0.1,
      -0.1,
      0 // Bottom right
    ]);

    const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]);

    geom.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geom.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    geom.computeBoundingSphere();
    return geom;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, 0, 0.08]} renderOrder={25}>
      <meshStandardMaterial
        color="#ff9a50"
        emissive="#ff9a50"
        emissiveIntensity={0.6}
        metalness={0.2}
        roughness={0.4}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
