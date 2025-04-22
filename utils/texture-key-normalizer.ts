export const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];

export const ALLOWED_TEXTURE_KEYS = [
  "ao",
  "albedo",
  "normal",
  "metalness",
  "roughness"
] as const;

type CanonicalTextureKey = (typeof ALLOWED_TEXTURE_KEYS)[number];

export const mapKeyNormalizer = {
  diffuse: "albedo",
  BaseColor: "albedo",
  albedo: "albedo",
  AmbientOcclusion: "ao",
  ao: "ao",
  ogl: "normal",
  Normal: "normal",
  "Normal-ogl": "normal",
  normal: "normal",
  metalness: "metalness",
  Metallic: "metalness",
  metallic: "metalness",
  roughness: "roughness",
  Roughness: "roughness"
} as const satisfies Record<string, CanonicalTextureKey>;
