"use client";

import { Baseboard } from "@/ui/elevator/r3f/baseboard";
import { PBRMaterial } from "@/ui/elevator/r3f/pbr-material";
import { folder, useControls } from "leva";

export const Wall = ({
  wallTexture = "trueStuccoWhiteVaried",
  metalness = 0,
  roughness = 1.0
}: {
  wallTexture?:
    | "trueStuccoWhiteUniform"
    | "smoothStucco"
    | "trueStuccoWhiteVaried"
    | "trueStuccoWhite"
    | "paintedStuccoWhite";
  metalness?: number;
  roughness?: number;
}) => {
  const {
    wallTexture: levaWallTexture,
    metalness: levaMetalness,
    roughness: levaRoughness
  } = useControls({
    Wall: folder(
      {
        wallTexture: {
          value: wallTexture,
          label: "Wall Texture"
        } as const,
        metalness: {
          value: metalness,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Wall Metalness"
        },
        roughness: {
          value: roughness,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Wall Roughness"
        }
      },
      { collapsed: true }
    )
  });
  return (
    <group>
      {/* wall - made wider to fill more of the view */}
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <PBRMaterial
          target={levaWallTexture as typeof wallTexture}
          repeat={[10, 5]}
          fallbackColor="#b8b8b8"
          metalness={levaMetalness}
          roughness={levaRoughness}
        />
      </mesh>

      {/* floor - made wider to fill more of the view */}
      <mesh
        position={[0, -2, 0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#222" roughness={0.9} metalness={0.1} />
      </mesh>
      <Baseboard />
    </group>
  );
};
