type PBRTextureSet = {
  albedo: string;
  ao: string;
  metalness: string;
  normal: string;
  roughness: string;
};

// Texture definitions
export const TEXTURES = {
  // could use with elevator doors
  brushedMetal: {
    albedo:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/brushed-metal/brushed-metal-albedo.png",
    ao: "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/brushed-metal/brushed-metal-ao.png",
    metalness:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/brushed-metal/brushed-metal-metallic.png",
    normal:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/brushed-metal/brushed-metal-normal-ogl.png",
    roughness:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/brushed-metal/brushed-metal-roughness.png"
  } satisfies PBRTextureSet,
  elegantStoneTiles: {
    albedo:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/elegant-stone-tiles/elegant-stone-tiles-albedo.png",
    ao: "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/elegant-stone-tiles/elegant-stone-tiles-ao.png",
    metalness:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/elegant-stone-tiles/elegant-stone-tiles-metallic.png",
    normal:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/elegant-stone-tiles/elegant-stone-tiles-normal-ogl.png",
    roughness:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/elegant-stone-tiles/elegant-stone-tiles-roughness.png"
  } satisfies PBRTextureSet,
  enhancedBrushedMetal: {
    ao: "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/enhanced/brushed-metal/brushed-metal-26-94-ao.jpg",
    albedo:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/enhanced/brushed-metal/brushed-metal-26-94-diffuse.jpg",
    metalness:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/enhanced/brushed-metal/brushed-metal-26-94-metalness.jpg",
    normal:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/enhanced/brushed-metal/brushed-metal-26-94-normal.jpg",
    roughness:
      "https://raw.githubusercontent.com/DopamineDriven/r3f-elevator/refs/heads/master/public/textures/enhanced/brushed-metal/brushed-metal-26-94-roughness.jpg"
  } satisfies PBRTextureSet,
  stuccoWall: {
    albedo:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/smooth-stucco/smooth-stucco-albedo.png",
    ao: "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/smooth-stucco/smooth-stucco-ao.png",
    metalness:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/smooth-stucco/smooth-stucco-Metallic.png",
    normal:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/smooth-stucco/smooth-stucco-Normal-ogl.png",
    roughness:
      "https://raw.githubusercontent.com/DopamineDriven/portfolio-2025/master/apps/web/public/textures/smooth-stucco/smooth-stucco-Roughness.png"
  } satisfies PBRTextureSet
} as const;

const getIt = <const T extends keyof typeof TEXTURES>(target: T) => {
  return TEXTURES[target];
};

export function mp() {
  const newMap = new Map<
    keyof typeof TEXTURES,
    (typeof TEXTURES)[keyof typeof TEXTURES]
  >();

  try {
    Object.entries(TEXTURES).forEach(function ([k, _v]) {
      newMap.set(k as keyof typeof TEXTURES, getIt(k as keyof typeof TEXTURES));
    });
  } catch (err) {
    console.error(err);
  } finally {
    return newMap;
  }
}

/**

example:

Array.from(mp().entries()).map(([key, val]) => {
  // much stronger type preservation when inferred, string literal union of keys detected instead of a string scalar 👀
  return [key, val] as const;
});

*/
