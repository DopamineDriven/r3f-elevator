"use client";

import { useMobile } from "@/hooks/use-mobile";
import { dispatchElevatorTransition } from "@/ui/elevator/r3f/custom-event";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DAMPING = 5; // Between 3-8 feels smooth

export function CombinedCameraController({
  isTransitioning
}: {
  isTransitioning: boolean;
}) {
  const size = useThree(state => state.size);
  const camera = useThree(state => state.camera) as THREE.PerspectiveCamera;
  const isMobile = useMobile();
  const cameraRef = useRef(camera);
  const [targetZ, setTargetZ] = useState(5);
  const [targetY, setTargetY] = useState(0);
  const [targetFov, setTargetFov] = useState(42);

  // 📐 Setup base camera based on aspect/mobile
  useLayoutEffect(() => {
    const aspect = size.width / size.height;
    let newZ = 5,
      newY = 0,
      newFov = 42;

    if (isMobile) {
      if (aspect < 0.6) {
        newZ = 7;
        newY = 0.2;
        newFov = 35;
      } else if (aspect < 1) {
        newZ = 6.5;
        newY = 0.2;
        newFov = 33;
      } else {
        newZ = 5.5;
        newFov = 40;
      }
    } else {
      if (aspect < 1) {
        newZ = 6;
        newY = 0.2;
        newFov = 35;
      } else if (aspect < 1.6) {
        newZ = 5.5;
        newFov = 38;
      } else {
        newZ = 5;
        newFov = 42;
      }
    }

    // Set initial state
    setTargetZ(newZ);
    setTargetY(newY);
    setTargetFov(newFov);
    if (!cameraRef.current) return;
    // Snap camera immediately to starting values
    cameraRef.current.position.z = newZ;
    cameraRef.current.position.y = newY;
    cameraRef.current.fov = newFov;
    cameraRef.current.aspect = aspect;
    cameraRef.current.updateProjectionMatrix();
  }, [size, isMobile, camera]);

  // 🎯 Update target values on transition trigger
  useEffect(() => {
    setTargetZ(prev => prev + (isTransitioning ? -1.5 : 1.5));
    setTargetFov(prev => prev + (isTransitioning ? -2 : 2));
  }, [isTransitioning]);

  useFrame((_, delta) => {
    cameraRef.current.position.z = THREE.MathUtils.damp(
      camera.position.z,
      targetZ,
      DAMPING,
      delta
    );
    cameraRef.current.position.y = THREE.MathUtils.damp(
      camera.position.y,
      targetY,
      DAMPING,
      delta
    );
    cameraRef.current.fov = THREE.MathUtils.damp(
      camera.fov,
      targetFov,
      DAMPING,
      delta
    );
    camera.updateProjectionMatrix();

    // Optional: track progress of transition based on distance
    const distance = Math.abs(camera.position.z - targetZ);
    const progress = Math.min(1, 1 - distance / 1.5); // inverse damp
    dispatchElevatorTransition(isTransitioning ? progress : 0);
  });

  return null;
}
