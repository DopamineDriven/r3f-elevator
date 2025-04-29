"use client";

import { DownTriangleGeometry } from "@/ui/elevator/r3f/down-triangle-geometry";
import { ElevatorFrameLight } from "@/ui/elevator/r3f/elevator-frame-light/instance";
import { RectAreaLightImpl } from "@/ui/elevator/r3f/elevator-frame/instance";
import { BentPlaneGeometry } from "@/ui/elevator/r3f/floor-indicator/instance";
import { SoftWallLight } from "@/ui/elevator/r3f/soft-wall-light/instance";
import { TriangleGeometry } from "@/ui/elevator/r3f/triangle-geometry";
import { Suspense, use } from "react";
import { Canvas, extend } from "@react-three/fiber";
import type { ThreeElement } from "@react-three/fiber";

extend({
  BentPlaneGeometry,
  DownTriangleGeometry,
  ElevatorFrameLight,
  RectAreaLightImpl,
  SoftWallLight,
  TriangleGeometry
});
declare module "@react-three/fiber" {
  interface ThreeElements {
    triangleGeometry: ThreeElement<typeof TriangleGeometry>;
    downTriangleGeometry: ThreeElement<typeof DownTriangleGeometry>;
    softWallLight: ThreeElement<typeof SoftWallLight>;
    elevatorFrameLight: ThreeElement<typeof ElevatorFrameLight>;
    rectAreaLightImpl: ThreeElement<typeof RectAreaLightImpl>;
    bentPlaneGeometry: ThreeElement<typeof BentPlaneGeometry>;
  }
}

const showcaseMap = {
  baseboard: import("@/ui/elevator/r3f/baseboard/index").then(d => d.Baseboard),
  "ceiling-light": import("@/ui/elevator/r3f/ceiling-light/index").then(
    d => d.CeilingLight
  ),
  "elevator-button": import("@/ui/elevator/r3f/elevator-button/index").then(
    d => d.ElevatorButton
  ),
  "elevator-door": import("@/ui/elevator/r3f/elevator-door/index").then(
    d => d.ElevatorDoor
  ),
  "elevator-frame": import("@/ui/elevator/r3f/elevator-frame/index").then(
    d => d.ElevatorFrame
  ),
  "elevator-frame-light": import(
    "@/ui/elevator/r3f/elevator-frame-light/index"
  ).then(d => d.ElevatorFrameLight),
  "elevator-indicator": import(
    "@/ui/elevator/r3f/elevator-indicator/index"
  ).then(d => d.TriangleIndicator),
  "elevator-interior": import("@/ui/elevator/r3f/elevator-interior/index").then(
    d => d.ElevatorInterior
  ),
  "floor-indicator": import("@/ui/elevator/r3f/floor-indicator/index").then(
    d => d.FloorIndicator
  ),
  "fluorescent-light": import("@/ui/elevator/r3f/fluorescent-light/index").then(
    d => d.FluorescentLight
  ),
  "soft-wall-light": import("@/ui/elevator/r3f/soft-wall-light/index").then(
    d => d.SoftWallLight
  ),
  wall: import("@/ui/elevator/r3f/wall/index").then(d => d.Wall)
};

type FileProps = keyof typeof showcaseMap;

function Workup({ file }: { file: FileProps }) {
  if (file === "elevator-door") {
    const R3FElement = use(showcaseMap[file]);
    return (
      <>
        <R3FElement isLeft={true} />
        <R3FElement isLeft={false} />
      </>
    );
  } else if (file === "baseboard") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "ceiling-light") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "elevator-button") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "elevator-frame") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "elevator-frame-light") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "elevator-indicator") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "elevator-interior") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "floor-indicator") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "fluorescent-light") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else if (file === "soft-wall-light") {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  } else {
    const d = showcaseMap[file];
    const R3FElement = use(d);
    return <R3FElement />;
  }
}

export function HandleIsolate({ file }: { file: FileProps }) {
  return (
    <Canvas
      className="absolute top-0 left-0 z-20 min-h-[100dvh] min-w-screen items-center justify-center bg-black/80"
      camera={{ position: [0, 0, 5], fov: 40 }}
      shadows>
      <Suspense fallback={null}>
        <group position={[0, -0.5, 0]}>
          {file !== "wall" && <Workup file="wall" />}
          <Workup file={file} />
          <Workup file="ceiling-light" />
          <pointLight
            position={[2, 1, 3]}
            intensity={0.7}
            distance={7}
            decay={2}
            color="#ffffff"
          />
          <pointLight
            position={[-2, 1, 3]}
            intensity={0.7}
            distance={7}
            decay={2}
            color="#ffffff"
          />
          <ambientLight intensity={0.7} color="#1e222c" />
          <pointLight
            position={[2, 1, 3]}
            intensity={0.7}
            distance={7}
            decay={2}
            color="#ffffff"
            castShadow={false}
          />
          <pointLight
            position={[-2, 1, 3]}
            intensity={0.7}
            distance={7}
            decay={2}
            color="#ffffff"
            castShadow={false}
          />
          <spotLight
            position={[0, 2, -2.5]}
            angle={0.5}
            intensity={0.5}
            penumbra={0.3}
            color="#eeeeee"
            castShadow={false}
          />
          <Workup file="soft-wall-light" />
        </group>
      </Suspense>
    </Canvas>
  );
}
