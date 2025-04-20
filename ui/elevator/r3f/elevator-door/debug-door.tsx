"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import * as THREE from "three";

class DebugDoorHelper extends THREE.Object3D {
  update() {}
  dispose() {}
}

const useMeshHelperImpl = (
  ref: RefObject<THREE.Mesh>,
  showHelper: boolean,
  color?: THREE.ColorRepresentation
) => {
  const helperConstructor = (
    process.env.NODE_ENV !== "production" && showHelper
      ? BoxHelper
      : DebugDoorHelper
  ) satisfies typeof DebugDoorHelper | typeof BoxHelper;

  return useHelper(ref, helperConstructor, color);
};
export function DebugDoor({
  position = [0, 0, 0],
  showHelper = false,
  width = 0.5,
  height = 2.5,
  depth = 0.05,
  color = "magenta"
}: {
  position?: [number, number, number];
  showHelper?: boolean;
  width?: number;
  height?: number;
  depth?: number;
  color?: THREE.ColorRepresentation;
}) {
  const meshRef = useRef<THREE.Mesh>(new THREE.Mesh());

  useMeshHelperImpl(meshRef, showHelper, color);

  useEffect(() => {
    if (!meshRef.current) return;
    const bounds = new THREE.Box3().setFromObject(meshRef.current);
    console.log(`[DEBUG] Door bounds:`, bounds.getSize(new THREE.Vector3()));
    console.log(`[DEBUG] Door position:`, meshRef.current.position);
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshBasicMaterial color={color} wireframe opacity={0.8} transparent />
    </mesh>
  );
}
