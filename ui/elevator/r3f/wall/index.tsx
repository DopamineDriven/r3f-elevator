"use client";

import { Baseboard } from "@/ui/elevator/r3f/baseboard";
import { PBRMaterial } from "@/ui/elevator/r3f/pbr-material";
import { useEffect, useRef } from "react";
import { folder, useControls } from "leva";

export const Wall = ({
  wallTexture = "smoothStucco",
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
  const metalnessRef = useRef(metalness);
  const roughnessRef = useRef(roughness);
  const textureRef = useRef(wallTexture);

  const {
    wallTexture: levaWallTexture,
    metalness: levaMetalness,
    roughness: levaRoughness
  } = useControls({
    Wall: folder(
      {
        wallTexture: {
          value: "smoothStucco",
          options: [
            "trueStuccoWhiteUniform",
            "smoothStucco",
            "trueStuccoWhiteVaried",
            "trueStuccoWhite",
            "paintedStuccoWhite"
          ] satisfies (typeof wallTexture)[],
          label: "Wall Texture"
        } as const,
        metalness: {
          value: 0,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Wall Metalness"
        },
        roughness: {
          value: 1.0,
          min: 0,
          max: 5,
          step: 0.1,
          label: "Wall Roughness"
        }
      },
      { collapsed: true }
    )
  });

  useEffect(() => {
    if (metalnessRef.current) metalnessRef.current = levaMetalness;
    if (roughnessRef.current) roughnessRef.current = levaRoughness;
    if (textureRef.current) textureRef.current = levaWallTexture;
  }, [levaMetalness, levaRoughness, levaWallTexture]);
  return (
    <group>
      {/* wall - made wider to fill more of the view */}
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <PBRMaterial
          target={textureRef.current}
          repeat={[10, 5]}
          fallbackColor="#b8b8b8"
          metalness={metalnessRef.current}
          roughness={roughnessRef.current}
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
