"use client";

import type { UseVolumetricSpotLightProps } from "@/ui/elevator/r3f/hooks/use-volumetric-spot-light";
import { useVolumetricSpotLight } from "@/ui/elevator/r3f/hooks/use-volumetric-spot-light";
import { useEffect, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";

type CeilingLightProps = {
  showHelper?: boolean;
  intensity?: number;
  color?: string;
  position?: [number, number, number];
  debug?: boolean;
};

export function CeilingLight({
  showHelper = process.env.NODE_ENV !== "production",
  intensity = 1.5,
  color = "#ffffff",
  position = [0, 4.5, 1],
  debug = false
}: CeilingLightProps) {
  const {
    coneOpacity,
    helperColor,
    targetHeight,
    lightAngle,
    lightDistance,
    lightIntensity,
    showHelper: showHelperLeva = showHelper
  } = useControls("CeilingLight", {
    showHelper: {
      value: true,
      label: "Show Helper"
    },
    helperColor: {
      value: "#ff00ff",
      label: "Helper Color"
    },
    lightIntensity: {
      value: 1.5,
      min: 0,
      max: 10,
      step: 0.1
    },
    lightDistance: {
      value: 5,
      min: 1,
      max: 20,
      step: 0.5
    },
    lightAngle: {
      value: 0.4,
      min: 0.1,
      max: Math.PI / 2,
      step: 0.01
    },
    coneOpacity: {
      value: 0.8,
      min: 0,
      max: 1,
      step: 0.05
    },
    targetHeight: {
      value: -1,
      min: -5,
      max: 0,
      step: 0.1
    }
  } as const);

  const targetRef = useRef<THREE.Object3D>(null);

  const { spotlight, spotlightRef, volumetricElement } = useVolumetricSpotLight(
    {
      opacity: coneOpacity,
      angle: lightAngle,
      showHelper: showHelperLeva,
      color,
      distance: lightDistance,
      intensity: lightIntensity ?? intensity,
      helperColor,
      debug
    } satisfies UseVolumetricSpotLightProps
  );

  useEffect(() => {
    if (targetRef.current) {
      spotlight.target = targetRef.current;
      spotlight.target.updateMatrixWorld();
    }
  }, [spotlight]);

  return (
    <group position={position}>
      {/* Fixture */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Spotlight primitive + volumetric */}
      <primitive object={spotlight} ref={spotlightRef} position={[0, 0, 0]}>
        {volumetricElement}
      </primitive>

      {/* Target */}
      <object3D ref={targetRef} position={[0, targetHeight, 0]} />
    </group>
  );
}
CeilingLight.displayName = "CeilingLight";
