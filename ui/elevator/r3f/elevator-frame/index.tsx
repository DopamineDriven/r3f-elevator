"use client";

import { ElevatorFrameLight } from "@/ui/elevator/r3f/elevator-frame-light";

/**
 architectural x-section

 ```txt
[Camera]
|
|  z = 0       ← Wall + Doors (flush)
|  z = -0.05   ← Metal Frame Reveal (Recess Frame)
|  z = -0.15   ← Shaft Void
|
 ```
 */

export const ElevatorFrame = () => {
  return (
    <group>
      {/* wall panel — flush with elevator face */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 3, 0.1]} />
        <meshStandardMaterial color="#444" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* architectural bounce light inside frame cavity */}
      <ElevatorFrameLight />

      {/* recess frame — revealed as doors slide open */}
      <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 2.6, 0.05]} />
        <meshStandardMaterial color="#555" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* ⚫ shaft void — deep black interior cavity for doors to occupy on open */}
      <mesh position={[0, 0, -0.15]} receiveShadow>
        <boxGeometry args={[1.05, 2.6, 0.2]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* 🧱 header panel — flush above door frame */}
      <mesh position={[0, 1.4, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.2, 0.1]} />
        <meshStandardMaterial color="#444" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
};
