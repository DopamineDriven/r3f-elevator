"use client";

import type { RefObject } from "react";
import { useEffect, useMemo, useRef } from "react";
import { useHelper } from "@react-three/drei";
import { BoxHelper } from "three";
import * as THREE from "three";

class DebugTriangleHelper extends THREE.Object3D {
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
      : DebugTriangleHelper
  ) satisfies typeof DebugTriangleHelper | typeof BoxHelper;

  return useHelper(ref, helperConstructor, color);
};

export function DebugTriangle({
  width = 0.2,
  height = 0.2,
  depth = 0.18,
  showHelper = false
}: {
  width?: number;
  height?: number;
  depth?: number;
  showHelper?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(new THREE.Mesh());

  useMeshHelperImpl(ref, showHelper, "hotpink");

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const hw = width / 2,
      hh = height / 2;
    const verts = new Float32Array([
      0,
      -hh,
      0, // tip
      hw,
      hh,
      0, // right
      -hw,
      hh,
      0 // left
    ]);

    g.setAttribute("position", new THREE.BufferAttribute(verts, 3));

    g.computeVertexNormals();

    return g;
  }, [width, height]);

  useEffect(() => {
    const r = ref.current;
    const box = new THREE.Box3().setFromObject(r);
    console.log("Triangle bounds:", box.getSize(new THREE.Vector3()));
  }, [width, height, depth]);

  return (
    <mesh ref={ref} geometry={geom} position={[0, 0, depth]}>
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
}
