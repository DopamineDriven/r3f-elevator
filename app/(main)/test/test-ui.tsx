"use client";

import { useSpringySplit } from "@/ui/elevator/r3f/hooks/use-springy-split";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function SpringySplitTestPage() {
  const [activated, setActivated] = useState(false);

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-bold">Springy Split Test</h1>

      <button
        onClick={() => setActivated((prev) => !prev)}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded">
        Toggle Animation
      </button>

      <Canvas
        camera={{ position: [0, 0, 5] }}
        className="rounded-md border border-indigo-500 w-[400px] h-[300px] bg-black">
        <SpringyBox activated={activated} />
      </Canvas>
    </div>
  );
}

function SpringyBox({ activated }: { activated: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const spring = useSpringySplit(activated, {
    ease: "easeInOut",
    visualDuration: 0.8
  });

  useFrame(() => {
    const x = THREE.MathUtils.lerp(0, 2, spring.get());
    if (meshRef.current) {
      meshRef.current.position.x = x;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="lime" />
    </mesh>
  );
}
