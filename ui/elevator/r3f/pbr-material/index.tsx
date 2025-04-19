"use client";

import type { PBRTextureSet } from "@/ui/elevator/r3f/types";
import { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function PBRMaterial({
  textures,
  repeat = [1, 1],
  color = "#ffffff",
  metalness = undefined,
  roughness = undefined
}: {
  textures: PBRTextureSet;
  repeat?: [number, number];
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  // TODO utilize onload callback (second optional arg in useTexture...maybe?)
  const textureProps = useTexture({
    map: textures.albedo,
    aoMap: textures.ao,
    metalnessMap: textures.metalness,
    normalMap: textures.normal,
    roughnessMap: textures.roughness
  });

  useEffect(() => {
    Object.values(textureProps).forEach(tex => {
      if (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(...repeat);
        tex.flipY = false;
      }
    });

    return () => {
      Object.values(textureProps).forEach(tex => tex?.dispose());
    };
  }, [textureProps, repeat]);

  return (
    <meshStandardMaterial
      {...textureProps}
      color={color}
      metalness={metalness}
      roughness={roughness}
    />
  );
}
/**
 "use client";

import type { PBRTextureSet } from "@/ui/elevator/r3f/types";
import { useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

THREE.Texture;
export function PBRMaterial({
  textures,
  repeat = [1, 1],
  color = "#ffffff",
  metalness = 0,
  roughness = 1.0
}: {
  textures: PBRTextureSet;
  repeat?: [number, number];
  color?: string;
  metalness?: number;
  roughness?: number;
}) {
  const [map, aoMap, metalnessMap, normalMap, roughnessMap] = useLoader(
    THREE.TextureLoader,
    [
      textures.albedo,
      textures.ao,
      textures.metalness,
      textures.normal,
      textures.roughness
    ],
    load => load,
    onProg => onProg
  );
  // TODO utilize onload callback (second optional arg in useTexture...maybe?)

  function helper(target: THREE.Texture | null) {
    try {
      if (!target) return;
      target.wrapS = target.wrapT = THREE.RepeatWrapping;
      target.repeat.set(...repeat);
      target.flipY = false;
    } catch (err) {
      console.error(err);
    } finally {
      return () => {
        if (!target) return;
        target.dispose();
      };
    }
  }
  const textureProps = useTexture(
    {
      map: textures.albedo,
      aoMap: textures.ao,
      metalnessMap: textures.metalness,
      normalMap: textures.normal,
      roughnessMap: textures.roughness
    },
    ({ ...s }) => {
      try {
        Object.entries(s).forEach(([_, tex]) => {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(...repeat);
          tex.flipY = false;
        });
      } catch (err) {
        console.error(err);
      } finally {
        return () => {
          Object.entries(s).forEach(([_, tex]) => {
            if (!tex) return;
            tex.dispose();
          });
        };
      }
    }
  );

  useEffect(() => {
    Object.values(textureProps).forEach(tex => {
      if (tex) {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(...repeat);
        tex.flipY = false;
      }
    });

    return () => {
      Object.values(textureProps).forEach(tex => {
        if (tex) tex.dispose();
      });
    };
  }, [textureProps, repeat]);

  return (
    <meshStandardMaterial
      {...textureProps}
      color={color}
      metalness={metalness}
      roughness={roughness}
    />
  );
}

 */
