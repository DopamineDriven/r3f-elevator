"use client";

import { ElevatorFrameLight } from "@/ui/elevator/r3f/elevator-frame-light";
import { PBRMaterial } from "@/ui/elevator/r3f/pbr-material";

export const ElevatorFrame = () => {
  return (
    <group>
      <rectAreaLightImpl
        position={[0, 1.51, 0.8]} // Just above the header
        width={1.2}
        height={0.2}
        intensity={0.45}
        color="#ffffff"
        lookAt={[0, 1.4, 0]}
        castShadow={false}
      />
      
      {/* 🧱 Wall panel — flush with elevator face */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 3, 0.1]} />
        <PBRMaterial
          target="brushedStainlessSteelSatin"
          repeat={[2.25, 3]}
          metalness={0.9}
          roughness={0.4}
        />
      </mesh>
      <ElevatorFrameLight />

      {/* 🛗 Recessed brushed metal frame (door reveal) */}
      <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 2.6, 0.05]} />
        <PBRMaterial
          target="brushedStainlessSteelSatin"
          repeat={[2.5, 3]}
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* 🔳 Header panel — top reveal */}
      <mesh position={[0, 1.4, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.2, 0.1]} />
        <PBRMaterial
          target="brushedStainlessSteelSatin"
          repeat={[2, 1]}
          metalness={0.8}
          roughness={0.35}
        />
      </mesh>

      {/* 🟫 Frame lip - left */}
      <mesh position={[-0.275, 0, 0.01]}>
        <boxGeometry args={[0.005, 2.5, 0.06]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* 🟫 Frame lip - right */}
      <mesh position={[0.275, 0, 0.01]}>
        <boxGeometry args={[0.005, 2.5, 0.06]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};

/* ⚫ Shaft void — deep black cavity behind doors */
/* <mesh position={[0, 0, -0.15]} receiveShadow>
  <boxGeometry args={[1.05, 2.6, 0.2]} />
  <meshStandardMaterial
    color="#0a0a0a"
    roughness={0.9}
    metalness={0}
    toneMapped={false}
  />
</mesh> */

/* 🕳️ Door cavity - left */
/* <mesh position={[-0.55, 0, -0.12]} receiveShadow>
  <boxGeometry args={[0.5, 2.5, 0.05]} />
  <meshStandardMaterial
    color="#0a0a0a"
    roughness={0.95}
    metalness={0}
    toneMapped={false}
  />
</mesh> */

/* 🕳️ Door cavity - right */
/* <mesh position={[0.55, 0, -0.12]} receiveShadow>
  <boxGeometry args={[0.5, 2.5, 0.05]} />
  <meshStandardMaterial
    color="#0a0a0a"
    roughness={0.95}
    metalness={0}
    toneMapped={false}
  />
</mesh> */
