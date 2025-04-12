import * as THREE from "three";

export class DownTriangleGeometry extends THREE.BufferGeometry {
  constructor(width = 1, height = 1) {
    super();

    // Create vertices for a downward-pointing triangle
    // (0, height/2) is the top center
    // (-width/2, -height/2) is the bottom left
    // (width/2, -height/2) is the bottom right
    const vertices = new Float32Array([
      -width / 2,
      height / 2,
      0, // top left
      width / 2,
      height / 2,
      0, // top right
      0,
      -height / 2,
      0 // bottom center (point)
    ]);

    // UV coordinates
    const uvs = new Float32Array([
      0,
      1, // top left
      1,
      1, // top right
      0.5,
      0 // bottom center
    ]);

    // Normals - all pointing forward for a 2D triangle
    const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1]);

    this.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    this.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    this.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    // Add face
    this.setIndex([0, 1, 2]);

    this.computeBoundingSphere();
  }
}
