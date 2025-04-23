"use client";

import { useMobile } from "@/hooks/use-mobile";
import { dispatchElevatorTransition } from "@/ui/elevator/r3f/custom-event";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 🎬 Smoothing factor
const DAMP_ELEVATOR = 4.5;

export function CombinedCameraController({
  isTransitioning,
  onProgress
}: {
  isTransitioning: boolean;
  onProgress: (progress: number) => void;
}) {
  const { size, camera: defaultCamera } = useThree();
  const isMobile = useMobile();
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [desiredPosition, setDesiredPosition] = useState({ y: 0, z: 5 });
  const [desiredFov, setDesiredFov] = useState(42);

  const assignCamera = useCallback((cam: THREE.Camera | null) => {
    if (cam instanceof THREE.PerspectiveCamera) {
      cameraRef.current = cam;
    }
  }, []);

  // Set target camera values based on screen
  useLayoutEffect(() => {
    if (!cameraRef.current) return;

    const aspect = size.width / size.height;
    let newZ = 5;
    let newY = 0;
    let newFov = 30;

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

    setDesiredPosition({ y: newY, z: newZ });
    setDesiredFov(newFov);

    // Immediately snap to new position
    const cam = cameraRef.current;
    cam.position.set(0, newY, newZ);
    cam.fov = newFov;
    cam.aspect = aspect;
    cam.updateProjectionMatrix();
  }, [size, isMobile]);

  // When transition starts, update camera targets
  useEffect(() => {
    setDesiredPosition(prev => ({
      ...prev,
      z: isTransitioning ? prev.z - 1.5 : prev.z + 1.5
    }));
    setDesiredFov(prev => (isTransitioning ? prev - 2 : prev + 2));
  }, [isTransitioning]);

  // Smooth camera motion every frame
  useFrame((_, delta) => {
    const cam = cameraRef.current;
    if (!cam) return;

    // Damped camera transition
    cam.position.y = THREE.MathUtils.damp(cam.position.y, desiredPosition.y, DAMP_ELEVATOR, delta);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, desiredPosition.z, DAMP_ELEVATOR, delta);
    cam.fov = THREE.MathUtils.damp(cam.fov, desiredFov, DAMP_ELEVATOR, delta);
    cam.updateProjectionMatrix();

    // Calculate progress from camera Z position
    const zDistance = 1.5;
    const startZ = isTransitioning ? desiredPosition.z + zDistance : desiredPosition.z;
    const endZ = isTransitioning ? desiredPosition.z : desiredPosition.z + zDistance;

    const progress = Math.max(0, Math.min(1, Math.abs(cam.position.z - startZ) / Math.abs(endZ - startZ)));

    if (isTransitioning || progress < 0.01) {
      onProgress(isTransitioning ? progress : 0);
      dispatchElevatorTransition(isTransitioning ? progress : 0);
    }
  });

  useEffect(() => {
    assignCamera(defaultCamera);
  }, [defaultCamera, assignCamera]);

  return null;
}
