"use client";

import { TEXTURES } from "@/ui/elevator/r3f/constants";
import { useSpringySplit } from "@/ui/elevator/r3f/hooks/use-springy-split";
import { PBRMaterial } from "@/ui/elevator/r3f/pbr-material";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DOOR_CLOSED_X = 0.25;
const DOOR_OPEN_X = 0.6;

export const ElevatorDoor = ({ activated }: { activated: boolean }) => {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  // Animate between 0 (closed) and 1 (fully open)
  const spring = useSpringySplit(activated, {
    ease: "easeInOut",
    visualDuration: 0.8
  });

  useFrame(() => {
    const progress = spring.get();
    console.log(progress);

    const leftX = -THREE.MathUtils.lerp(DOOR_CLOSED_X, DOOR_OPEN_X, progress);
    const rightX = THREE.MathUtils.lerp(DOOR_CLOSED_X, DOOR_OPEN_X, progress);

    if (leftRef.current) {
      leftRef.current.position.set(leftX, 0, 0.05);
    }

    if (rightRef.current) {
      rightRef.current.position.set(rightX, 0, 0.05);
    }
  });

  return (
    <group position={[0, 0, 0.01]}>
      {/* Left Door */}
      <mesh ref={leftRef} castShadow>
        <boxGeometry args={[0.5, 2.5, 0.05]} />
        <PBRMaterial<"enhancedBrushedMetal">
          target="enhancedBrushedMetal"
          textures={TEXTURES.enhancedBrushedMetal}
          repeat={[2, 2]}
          metalness={0}
          roughness={1}
        />
      </mesh>

      {/* Right Door */}
      <mesh ref={rightRef} castShadow>
        <boxGeometry args={[0.5, 2.5, 0.05]} />
        <PBRMaterial
          target="enhancedBrushedMetal"
          textures={TEXTURES.enhancedBrushedMetal}
          repeat={[2, 2]}
          metalness={1}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
};
