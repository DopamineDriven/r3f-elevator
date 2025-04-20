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

  const leftSpring = useSpringySplit(activated, {
    ease: "easeInOut",
    visualDuration: 0.75
  });
  const rightSpring = useSpringySplit(activated, {
    ease: "easeInOut",
    visualDuration: 0.75
  });

  useFrame(() => {
    if (leftRef.current) {
      leftRef.current.position.x = -THREE.MathUtils.lerp(
        DOOR_CLOSED_X,
        DOOR_OPEN_X,
        leftSpring.get()
      );
    }
    if (rightRef.current) {
      rightRef.current.position.x = THREE.MathUtils.lerp(
        DOOR_CLOSED_X,
        DOOR_OPEN_X,
        rightSpring.get()
      );
    }
  });

  return (
    <group position={[0, 0, 0.01]}>
      {/* Left Door */}
      <mesh ref={leftRef} castShadow>
        <boxGeometry args={[0.5, 2.5, 0.05]} />
        <PBRMaterial
          textures={TEXTURES.enhancedBrushedMetal}
          repeat={[2, 2]}
          color="#a6a6a6"
          metalness={0}
          roughness={1}
        />
      </mesh>

      {/* Right Door */}
      <mesh ref={rightRef} castShadow>
        <boxGeometry args={[0.5, 2.5, 0.05]} />
        <PBRMaterial
          textures={TEXTURES.enhancedBrushedMetal}
          repeat={[2, 2]}
          color="#a6a6a6"
          metalness={0}
          roughness={1}
        />
      </mesh>
    </group>
  );
};
