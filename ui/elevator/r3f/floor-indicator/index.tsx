"use client";

import { INDICATOR_COLORS } from "@/ui/elevator/r3f/constants/indicator-colors";
import { TriangleIndicator } from "../elevator-indicator";
import { DebugTriangle } from "../elevator-indicator/debug-triangle";

export const FloorIndicator = ({ activated }: { activated: boolean }) => {
  return (
    <group position={[0, 1.5, 0.275]} renderOrder={20}>
      {/* Curved panel base */}
      <mesh castShadow>
        <bentPlaneGeometry args={[0.55, 0.3, 32, 1]} radius={1.25} />
        <meshStandardMaterial
          color={INDICATOR_COLORS.PANEL_HOUSING}
          metalness={0.3}
          roughness={0.7}
          toneMapped={false}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh>

      {/* glowing background */}
      <mesh position={[0, 0, 0.025]}>
        <bentPlaneGeometry args={[0.45, 0.22, 32, 1]} radius={1.25} />
        <meshStandardMaterial
          color="#111"
          emissive="#222"
          emissiveIntensity={0.35}
          metalness={0.1}
          roughness={0.9}
          toneMapped={false}
        />
      </mesh>
      <TriangleIndicator activated={activated} />
      <DebugTriangle
        width={0.18}
        height={0.18}
        depth={0.075}
        showHelper={true}
      />
    </group>
  );
};
/* Down triangle indicator */
/* <mesh position={[0, 0, 0.075]}>

        <downTriangleGeometry args={[0.18, 0.18]} />
        <meshStandardMaterial
          color={
            activated
              ? INDICATOR_COLORS.ACTIVE_EMISSIVE
              : INDICATOR_COLORS.INACTIVE_BASE
          }
          emissive={activated ? INDICATOR_COLORS.ACTIVE_EMISSIVE : "black"}
          emissiveIntensity={
            activated
              ? INDICATOR_COLORS.ACTIVE_INTENSITY
              : INDICATOR_COLORS.INACTIVE_INTENSITY
          }
          toneMapped={false}
          transparent
          depthTest={false}
          depthWrite={false}
        />
      </mesh> */
