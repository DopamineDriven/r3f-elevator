import type { PBRTextureSet } from "@/ui/elevator/r3f/types";

export const brushedMetal = {
  ao: "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-ao.jpg",
  albedo:
    "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-diffuse.jpg",
  metalness:
    "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-metalness.jpg",
  normal:
    "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-normal.jpg",
  roughness:
    "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-roughness.jpg"
};

export const elegantStoneTiles = {
    albedo:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-albedo.png",
    ao: "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-ao.png",
    metallic:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-metallic.png",
    normal:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-normal-ogl.png",
    roughness:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-roughness.png"
  },
  stuccoWall = {
    albedo:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-albedo.png",
    ao: "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-ao.png",
    metalness:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-Metallic.png",
    normal:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-Normal-ogl.png",
    roughness:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-Roughness.png"
  };

// Texture definitions
export const TEXTURES = {
  brushedMetal: {
    albedo:
      "https://asrosscloud.com/textures/brushed-metal/brushed-metal-albedo.png",
    ao: "https://asrosscloud.com/textures/brushed-metal/brushed-metal-ao.png",
    metalness:
      "https://asrosscloud.com/textures/brushed-metal/brushed-metal-metallic.png",
    normal:
      "https://asrosscloud.com/textures/brushed-metal/brushed-metal-normal-ogl.png",
    roughness:
      "https://asrosscloud.com/textures/brushed-metal/brushed-metal-roughness.png"
  } satisfies PBRTextureSet,
  elegantStoneTiles: {
    ao: "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-ao.png",
    albedo:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-albedo.png",
    metalness:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-metallic.png",
    normal:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-normal-ogl.png",
    roughness:
      "https://asrosscloud.com/textures/elegant-stone-tiles/elegant-stone-tiles-roughness.png"
  } satisfies PBRTextureSet,
  enhancedBrushedMetal: {
    ao: "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-ao.jpg",
    albedo:
      "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-diffuse.jpg",
    metalness:
      "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-metalness.jpg",
    normal:
      "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-normal.jpg",
    roughness:
      "https://asrosscloud.com/textures/enhanced/brushed-metal/brushed-metal-26-94-roughness.jpg"
  } satisfies PBRTextureSet,
  paintedPlaster: {
    ao: "https://asrosscloud.com/textures/painted-plaster/painted_plaster_wall_ao_8k.jpg",
    metalness:
      "https://asrosscloud.com/textures/painted-plaster/painted_plaster_wall_arm_8k.jpg",
    albedo:
      "https://asrosscloud.com/textures/painted-plaster/painted_plaster_wall_diff_8k.jpg",
    normal:
      "https://asrosscloud.com/textures/painted-plaster/painted_plaster_wall_nor_gl_8k.jpg",
    roughness:
      "https://asrosscloud.com/textures/painted-plaster/painted_plaster_wall_rough_8k.jpg"
  } satisfies PBRTextureSet,
  stuccoWall: {
    albedo:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-albedo.png",
    ao: "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-ao.png",
    metalness:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-Metallic.png",
    normal:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-Normal-ogl.png",
    roughness:
      "https://asrosscloud.com/textures/smooth-stucco/smooth-stucco-Roughness.png"
  } satisfies PBRTextureSet,
  subtleBlackGranite: {
    albedo:
      "https://asrosscloud.com/textures/subtle-black-granite/subtle-black-granite-albedo.png",
    ao: "https://asrosscloud.com/textures/subtle-black-granite/subtle-black-granite-ao.png",
    metalness:
      "https://asrosscloud.com/textures/subtle-black-granite/subtle-black-granite-metallic.png",
    normal:
      "https://asrosscloud.com/textures/subtle-black-granite/subtle-black-granite-normal-ogl.png",
    roughness:
      "https://asrosscloud.com/textures/subtle-black-granite/subtle-black-granite-roughness.png"
  } satisfies PBRTextureSet,
  whiteMarble: {
    albedo:
      "https://asrosscloud.com/textures/white-marble/white-marble-albedo.png",
    ao: "https://asrosscloud.com/textures/white-marble/white-marble-ao.png",
    metalness:
      "https://asrosscloud.com/textures/white-marble/white-marble-metallic.png",
    normal:
      "https://asrosscloud.com/textures/white-marble/white-marble-normal-ogl.png",
    roughness:
      "https://asrosscloud.com/textures/white-marble/white-marble-roughness.png"
  } satisfies PBRTextureSet
} as const;

const getIt = <const T extends keyof typeof TEXTURES>(target: T) => {
  return [target, TEXTURES[target]] as const;
};

function mp() {
  const newMap = new Map<
    keyof typeof TEXTURES,
    (typeof TEXTURES)[keyof typeof TEXTURES]
  >();

  try {
    Object.entries(TEXTURES).forEach(function ([k, _v]) {
      newMap.set(...getIt(k as keyof typeof TEXTURES));
    });
  } catch (err) {
    console.error(err);
  } finally {
    return newMap satisfies Map<keyof typeof TEXTURES, PBRTextureSet>;
  }
}

export const getTextureMap = () => mp();

export const ANIMATION_TIMING = {
  BUTTON_PRESS: 391.813,
  DOOR_OPEN: 1848,
  ELEVATOR_SOUND: 1619.592,
  TRANSITION: 2768.98
};
