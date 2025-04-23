import * as THREE from "three";
import { KTX2Loader } from "three-stdlib";

// Only configure transcoder once per page-load
let _ktx2Setup = false;

export function ktx2LoaderSetup(loader: KTX2Loader, gl: THREE.WebGLRenderer) {
  if (!_ktx2Setup) {
    loader.setTranscoderPath("/basis/").detectSupport(gl);
    _ktx2Setup = true;
  }
}
