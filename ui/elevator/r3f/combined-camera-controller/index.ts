"use client";

import { useMobile } from "@/hooks/use-mobile";
import { dispatchElevatorTransition } from "@/ui/elevator/r3f/custom-event";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Size } from "@react-three/fiber";

export function CombinedCameraController({
  isTransitioning,
  transitionProgress
}: {
  isTransitioning: boolean;
  transitionProgress: number;
}) {
  const { size, camera } = useThree();
  const isMobile = useMobile();
  const [defaultZ, setDefaultZ] = useState(5);
  const cameraRef = useRef<
    | ((THREE.OrthographicCamera | THREE.PerspectiveCamera) & {
        manual?: boolean;
      })
    | null
  >(null);
  const sizeRef = useRef<Size | null>(null);

  useEffect(() => {
    cameraRef.current = camera;
    sizeRef.current = size;
  }, [camera, size]);

  useLayoutEffect(() => {
    if (!cameraRef.current || !sizeRef.current) return;
    if (!(cameraRef.current instanceof THREE.PerspectiveCamera)) return;
    const aspect = sizeRef.current.width / sizeRef.current.height;
    let newZ: number;
    let newY = 0; // Default Y position
    let newFov = 30; // Default FOV

    if (isMobile) {
      // Mobile portrait mode - pull back and increase FOV
      if (aspect < 0.6) {
        newZ = 7; // extremely narrow
        newY = 0.2; // Slightly higher position to see more of the floor
        newFov = 35; // Wider FOV to see more vertically
      } else if (aspect < 1) {
        newZ = 6.5;
        newY = 0.2;
        newFov = 33;
      } else {
        // Mobile landscape - pull back less but increase FOV more
        newZ = 5.5;
        newY = 0;
        newFov = 40; // Wider FOV for landscape
      }
    } else {
      // Desktop logic - wider FOV and pulled back camera
      if (aspect < 1) {
        // e.g. small laptop or near square
        newZ = 6;
        newY = 0.2;
        newFov = 35;
      } else if (aspect < 1.6) {
        // typical ~16:10 screen
        newZ = 5.5;
        newY = 0;
        newFov = 38;
      } else {
        // super widescreen or very large monitors
        newZ = 5;
        newY = 0;
        newFov = 42; // Wider FOV for ultrawide screens
      }
    }

    setDefaultZ(newZ);
    cameraRef.current.position.z = newZ;
    cameraRef.current.position.y = newY;
    cameraRef.current.fov = newFov;
    cameraRef.current.aspect = aspect;
    cameraRef.current.updateProjectionMatrix();
  }, [size, camera, isMobile]);

  const initialPosition = useMemo(() => {
    const camera = cameraRef.current;
    return new THREE.Vector3(
      0,
      camera instanceof THREE.PerspectiveCamera ? camera.position.y : 0,
      defaultZ
    );
  }, [defaultZ]);

  const targetPosition = useMemo(() => {
    const camera = cameraRef.current;
    return new THREE.Vector3(
      0,
      camera instanceof THREE.PerspectiveCamera ? camera.position.y : 0,
      defaultZ - 1.5
    );
  }, [defaultZ]);

  useFrame(() => {
    if (!cameraRef.current) return;
    if (isTransitioning) {
      cameraRef.current.position.lerpVectors(
        initialPosition,
        targetPosition,
        transitionProgress
      );
      if (cameraRef.current instanceof THREE.PerspectiveCamera) {
        // Reduce FOV change during transition to maintain better visibility
        const baseFov = cameraRef.current.fov;
        cameraRef.current.fov = baseFov - transitionProgress * 2;
        cameraRef.current.updateProjectionMatrix();
      }
      dispatchElevatorTransition(transitionProgress);
    } else {
      cameraRef.current.position.copy(initialPosition);
      if (cameraRef.current instanceof THREE.PerspectiveCamera) {
        // Reset FOV to the calculated value based on screen size
        cameraRef.current.updateProjectionMatrix();
      }
      dispatchElevatorTransition(0);
    }
  });

  return null;
}
