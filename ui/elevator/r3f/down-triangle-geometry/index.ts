import * as THREE from "three";

export class DownTriangleGeometry extends THREE.BufferGeometry {
  constructor(
    public width = 0.18,
    public height = 0.18
  ) {
    super();
    this.build();
  }

  setWidth(w: number) {
    this.width = w;
    this.build();
  }

  setHeight(h: number) {
    this.height = h;
    this.build();
  }

  private build() {
    // 1) If you had other attributes (uv, normal, index), you'd remove them here:
    // this.removeAttribute('uv');
    // this.removeAttribute('normal');
    // this.index = null;

    // 2) Always replace the position attribute:
    const hw = this.width / 2;
    const hh = this.height / 2;
    const verts = new Float32Array([
      0,   -hh, 0,   // tip
      hw,  hh,  0,   // bottom right
     -hw,  hh,  0,   // bottom left
    ]);
    this.setAttribute('position', new THREE.BufferAttribute(verts, 3));

    // 3) Recompute normals so lighting works:
    this.computeVertexNormals();

    // 4) If you were using draw groups:
    // this.clearGroups();
    // this.addGroup(0, 3, 0);
  }
}

