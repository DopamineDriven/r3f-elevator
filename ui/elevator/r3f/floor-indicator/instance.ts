import * as THREE from "three";

export class BentPlaneGeometry extends THREE.PlaneGeometry {
  private _radius = 0.1;
  constructor(
    width?: number,
    height?: number,
    widthSegments?: number,
    heightSegments?: number
  ) {
    super(width, height, widthSegments, heightSegments);
    this.rebuild();
  }

  set radius(r: number) {
    this._radius = r;
    this.rebuild();
  }
  get radius() {
    return this._radius;
  }

  private rebuild() {
    const hw = this.parameters.width * 0.5;
    const a = new THREE.Vector2(-hw, 0);
    const b = new THREE.Vector2(0, this._radius);
    const c = new THREE.Vector2(hw, 0);
    const ab = new THREE.Vector2().subVectors(a, b);
    const bc = new THREE.Vector2().subVectors(b, c);
    const ac = new THREE.Vector2().subVectors(a, c);
    const r =
      (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
    const center = new THREE.Vector2(0, this._radius - r);
    const baseV = new THREE.Vector2().subVectors(a, center);
    const baseAngle = baseV.angle() - Math.PI * 0.5;
    const arc = baseAngle * 2;
    const mainV = new THREE.Vector2();

    for (let i = 0; i < this.attributes.uv.count; i++) {
      const uvRatio = 1 - this.attributes.uv.getX(i);
      const y = this.attributes.position.getY(i);
      mainV.copy(c).rotateAround(center, arc * uvRatio);
      this.attributes.position.setXYZ(i, mainV.x, y, -mainV.y);
    }

    this.attributes.position.needsUpdate = true;
  }
}
