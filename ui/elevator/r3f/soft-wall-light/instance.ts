import * as THREE from "three";
import type { ThreeElement } from "@react-three/fiber";

type R3FSoftWhiteLight = ThreeElement<typeof SoftWallLightImpl>;

type Mapper<P extends keyof R3FSoftWhiteLight> = {
  [X in P]: R3FSoftWhiteLight[X];
};



export class SoftWallLightImpl extends THREE.RectAreaLight {
  constructor() {
    super();

  }
}
