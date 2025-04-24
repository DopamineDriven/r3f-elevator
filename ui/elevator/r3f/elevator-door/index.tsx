"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { animate, useSpring } from "motion/react";
import * as THREE from "three";
import { PBRMaterial } from "@/ui/elevator/r3f/pbr-material";

const DOOR_OPEN_X = 0.6;
const DOOR_CLOSED_X = 0.25;

export function ElevatorDoor({
  isLeft,
  activated,
  positionZ = 0.05
}: {
  isLeft: boolean;
  activated: boolean;
  positionZ?: number;
}) {
  const doorRef = useRef<THREE.Mesh>(null);

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

  return (
    <mesh ref={doorRef} castShadow>
      <boxGeometry args={[0.5, 2.75, 0.05]} />
      <PBRMaterial
        target="brushedStainlessSteelSatin"
        repeat={[2, 2]}
        // metalness={1.34}
        // roughness={0.85}
      />
    </mesh>
  );
}
