"use client";

import { RefObject, useEffect, useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";
import { RectAreaLightHelper } from "three-stdlib";

class ElevatorFrameLightHelper extends THREE.Object3D {
  update() {}
  dispose() {}
}

const useElevatorFrameLightHelper = (
  ref: RefObject<THREE.RectAreaLight>,
  showHelper: boolean,
  color?: THREE.ColorRepresentation
) => {
  const helperConstructor =
    process.env.NODE_ENV !== "production" && showHelper
      ? RectAreaLightHelper
      : ElevatorFrameLightHelper;

  return useHelper(ref, helperConstructor, color);
};

export function ElevatorFrameLight({
  position = [0, 2, 1.5],
  intensity = 0.5,
  width = 1.2,
  height = 1,
  color = "#ffffff"
}: {
  position?: [number, number, number];
  intensity?: number;
  width?: number;
  height?: number;
  color?: string;
}) {
  const lightRef = useRef<THREE.RectAreaLight>(
    new THREE.RectAreaLight(color, intensity, width, height)
  );

  // Optional: Dev helper
  useElevatorFrameLightHelper(
    lightRef,
    false, // can pass a "showHelper" boolean here instead of using this check
    "cyan"
  );

  useEffect(() => {
    if (!lightRef.current) return;
    lightRef.current.lookAt(0, 0, 0);
    lightRef.current.updateMatrixWorld();
  }, []);

  return (
    <elevatorFrameLight
      ref={lightRef}
      position={position}
      intensity={intensity}
      width={width}
      height={height}
      color={color}
    />
  );
}
