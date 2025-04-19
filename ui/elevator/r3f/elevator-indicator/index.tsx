"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function TriangleIndicator({ activated = false }) {
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
    <mesh geometry={geometry} position={[0, 0, 0.075]} renderOrder={25}>
      <meshStandardMaterial
        color="#ff9a50"
        emissive={activated === true ? "#ff9a50" : "#000"}
        emissiveIntensity={1}
        metalness={0.2}
        roughness={1}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
