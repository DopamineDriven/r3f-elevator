"use client";

import { PBRMaterial } from "@/ui/elevator/r3f/pbr-material";
import { PBR_TEXTURES_KTX2 } from "@/utils/__out__/pbr/pbr-textures-ktx2";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { animate, useSpring } from "motion/react";
import * as THREE from "three";

const DOOR_OPEN_X = 0.6;
const DOOR_CLOSED_X = 0.25;

export function ElevatorDoor({
  isLeft =true,
  activated=false,
  positionZ = 0.05,
  elevatorTexture = "brushedStainlessSteelSatin",
  metalness = 1.34,
  roughness = 1.0
}: {
  isLeft?: boolean;
  activated?: boolean;
  positionZ?: number;
  elevatorTexture?: Exclude<
    keyof typeof PBR_TEXTURES_KTX2,
    | "trueStuccoWhite"
    | "trueStuccoWhiteUniform"
    | "trueStuccoWhiteVaried"
    | "paintedStuccoWhite"
    | "elegantStoneTiles"
    | "subtleBlackGranite"
    | "smoothStucco"
  >;
  metalness?: number;
  roughness?: number;
}) {
  const doorRef = useRef<THREE.Mesh>(null);
  const metalnessRef = useRef(metalness);
  const roughnessRef = useRef(roughness);
  const textureRef = useRef(elevatorTexture);
  const {
    elevatorTexture: levaElevatorTexture,
    metalness: levaMetalness,
    roughness: levaRoughness
  } = useControls({
    ElevatorDoor: folder(
      {
        elevatorTexture: {
          value: "brushedStainlessSteelSatin",
          options: [
            "brushedStainlessSteelSatin",
            "brushedSteelVerticalFine",
            "brushedSteelVerticalGlossy",
            "diamondPlatedBlackened",
            "diamondPlatedPolished"
          ] satisfies (typeof elevatorTexture)[],
          label: "Elevator Door Texture"
        } as const,
        metalness: {
          value: 1.34,
          min: 0,
          max: 3,
          step: 0.01,
          label: "Elevator Door Metalness"
        },
        roughness: {
          value: 0.85,
          min: 0,
          max: 3,
          step: 0.01,
          label: "Elevator Door Roughness"
        }
      },
      { collapsed: true }
    )
  });

  // Create spring motion value for X position
  const initialX = isLeft ? -DOOR_CLOSED_X : DOOR_CLOSED_X;
  const doorX = useSpring(initialX, {
    stiffness: 80,
    damping: 50
  });

  // Animate when state changes
  useEffect(() => {
    const target = isLeft
      ? activated
        ? -DOOR_OPEN_X
        : -DOOR_CLOSED_X
      : activated
        ? DOOR_OPEN_X
        : DOOR_CLOSED_X;

    animate(doorX, target, {
      stiffness: 80,
      damping: 20
    });
  }, [activated, isLeft, doorX]);

  useFrame(() => {
    const x = doorX.get();
    if (doorRef.current) {
      doorRef.current.position.set(x, 0, positionZ);
    }
  });

  useEffect(() => {
    if (metalnessRef.current) metalnessRef.current = levaMetalness;
    if (roughnessRef.current) roughnessRef.current = levaRoughness;
    if (textureRef.current) textureRef.current = levaElevatorTexture;
  }, [levaMetalness, levaRoughness, levaElevatorTexture]);

  return (
    <mesh ref={doorRef} castShadow>
      <boxGeometry args={[0.5, 2.75, 0.05]} />
      <PBRMaterial
        fallbackColor="#777c83"
        target={textureRef.current}
        repeat={[2, 2]}
        metalness={metalnessRef.current}
        roughness={roughnessRef.current}
      />
    </mesh>
  );
}
