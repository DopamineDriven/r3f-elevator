import { Fs } from "@d0paminedriven/fs";

export class GenStaticParamsObject extends Fs {
  constructor(public override cwd: string) {
    super((cwd ??= process.cwd()));
  }
  private generateStaticParamsObject<const V extends string>(target: V) {
    return this.readDir(target, {
      recursive: true,
      encoding: "utf-8",
      withFileTypes: false
    })
      .filter(v => /\./g.test(v))
      .filter(
        t =>
          !/(?:(constants|audio-controller|combined-camera-controller|custom-event|hooks|instance|roughness-debug|types|utils|scene|debug|pbr-material))/gim.test(
            t
          )
      )
      .slice(1)
      .filter(file => !/\.ts$/.test(file))
      .map(v => {
        const folderOnly = v.split(/\//g)?.[0];

        return { import: `@/ui/elevator/r3f/${v}` as const, file: folderOnly };
      });
  }

  private isolateSlugs(arr = Array.of<string>()) {
    try {
      this.generateStaticParamsObject("ui/elevator/r3f").forEach(function ({
        file
      }) {
        arr.push(file);
      });
    } catch (err) {
      console.error(err);
    } finally {
      return arr;
    }
  }

  private genFileSlugsTemplate() {
    // prettier-ignore
    return `
export const fileSlugs =${JSON.stringify(this.isolateSlugs(), null, 2)} as const;
`
  }

  private writeParams() {
    this.withWs("lib/isolate-params.ts", this.genFileSlugsTemplate());
  }

  private detectExportFile<const F extends string>(file: F) {
    return /export\s+(?:function|const)\s+(\w+)/g.exec(file);
  }
  private readIt() {
    const aggIt = this.isolateSlugs()
      .map(t => {
        const file = this.fileToBuffer(
          `ui/elevator/r3f/${t}/index.tsx`
        ).toString("utf-8");
        const testIt = this.detectExportFile(file);
        return testIt ? ([t, testIt[1]] as const) : ([t, null] as const);
      })
      .filter(([_, v]) => v != null);
    console.log(aggIt);
    return aggIt;
  }

  private genImportScaffold() {
    const scaffold = this.readIt().map(([filename, exportName]) => {
      // prettier-ignore
      return  `
"${filename}": import("@/ui/elevator/r3f/${filename}/index").then(d => d.${exportName}),`
    });
    // prettier-ignore
    return `"use client";

"use client";

import { DownTriangleGeometry } from "@/ui/elevator/r3f/down-triangle-geometry";
import { ElevatorFrameLight } from "@/ui/elevator/r3f/elevator-frame-light/instance";
import { RectAreaLightImpl } from "@/ui/elevator/r3f/elevator-frame/instance";
import { BentPlaneGeometry } from "@/ui/elevator/r3f/floor-indicator/instance";
import { SoftWallLight } from "@/ui/elevator/r3f/soft-wall-light/instance";
import { TriangleGeometry } from "@/ui/elevator/r3f/triangle-geometry";
import { LoadingSpinner } from "@/ui/loading-spinner";
import { Suspense, use } from "react";
import { extend } from "@react-three/fiber";
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

const showcaseMap = {   ${scaffold.join("")}
};

type FileProps = keyof typeof showcaseMap;

function Workup({ file }: { file: FileProps }) {
  if (file === "elevator-door") {
    const Element = use(showcaseMap[file]);
    return (
      <>
        <Element isLeft={true} />
        <Element isLeft={false} />
      </>
    );
  } else {
    const Element = use(showcaseMap[file]);
    return <Element />;
  }
}

export function HandleIsolate({ file }: { file: FileProps }) {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} shadows>
        <Suspense fallback={null}>
          <Workup file={file} />
        </Suspense>
      </Canvas>
    </div>
  );
}
`
  }

  private writeDynamicExports() {
    this.withWs("ui/elevator/dynamic-exports.tsx", this.genImportScaffold());
  }

  public exeGenIso() {
    try {
      this.writeParams();
    } catch (err) {
      console.error(err);
    } finally {
      this.writeDynamicExports();
    }
  }
}

const genIso = new GenStaticParamsObject(process.cwd());

genIso.exeGenIso();
