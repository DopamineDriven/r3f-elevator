type PbrTextureShape = {
  albedo: string;
  ao: string;
  metalness?: string;
  normal: string;
  roughness: string;
};

type R2Obj = Record<
  | "brushedMetal"
  | "brushedStainlessSteelSatin"
  | "brushedSteelDarkScuffed"
  | "brushedSteelVerticalFine"
  | "brushedSteelVerticalGlossy"
  | "diamondPlatedBlackened"
  | "diamondPlatedPolished"
  | "elegantStoneTiles"
  | "enhancedBrushedMetal"
  | "paintedStuccoWhite"
  | "rubberFlooring"
  | "smoothStucco"
  | "subtleBlackGranite"
  | "trueStuccoWhite",
  PbrTextureShape
>;

type PbrTexturePrimed = {
  [K in keyof PbrTextureShape]: PbrTextureShape[K] extends undefined
    ? undefined
    : `https://asrosscloud.com/textures/${PbrTextureShape[K]}`;
};

class _TextureHandler {
  constructor() {}
  private obj = {
    /** 2K */
    brushedMetal: {
      albedo: "brushed-metal/brushed-metal-albedo.png",
      ao: "brushed-metal/brushed-metal-ao.png",
      metalness: "brushed-metal/brushed-metal-metallic.png",
      normal: "brushed-metal/brushed-metal-normal-ogl.png",
      roughness: "brushed-metal/brushed-metal-roughness.png"
    } satisfies PbrTextureShape,
    /** 8K; same as `enhancedBrushedMetal` but higher quality */
    brushedStainlessSteelSatin: {
      albedo: "brushed-stainless-steel-satin/brushed_metal_26_94_diffuse.jpg",
      ao: "brushed-stainless-steel-satin/brushed_metal_26_94_ao.jpg",
      metalness:
        "brushed-stainless-steel-satin/brushed_metal_26_94_metalness.jpg",
      normal: "brushed-stainless-steel-satin/brushed_metal_26_94_normal.jpg",
      roughness:
        "brushed-stainless-steel-satin/brushed_metal_26_94_roughness.jpg"
    } satisfies PbrTextureShape,
    /** 8K; quasi-ao asset (uses displacement asset) */
    brushedSteelDarkScuffed: {
      albedo: "brushed-steel-dark-scuffed/Metal010_8K-JPG_Color.jpg",
      ao: "brushed-steel-dark-scuffed/Metal010_8K-JPG_Displacement.jpg",
      metalness: "brushed-steel-dark-scuffed/Metal010_8K-JPG_Metalness.jpg",
      normal: "brushed-steel-dark-scuffed/Metal010_8K-JPG_NormalGL.jpg",
      roughness: "brushed-steel-dark-scuffed/Metal010_8K-JPG_Roughness.jpg"
    } satisfies PbrTextureShape,
    /** 8K */
    brushedSteelVerticalFine: {
      albedo: "brushed-steel-vertical-fine/metal_ledges_26_52_diffuse.jpg",
      ao: "brushed-steel-vertical-fine/metal_ledges_26_52_ao.jpg",
      metalness: "brushed-steel-vertical-fine/metal_ledges_26_52_metalness.jpg",
      normal: "brushed-steel-vertical-fine/metal_ledges_26_52_normal.jpg",
      roughness: "brushed-steel-vertical-fine/metal_ledges_26_52_roughness.jpg"
    } satisfies PbrTextureShape,
    /** 8K */
    brushedSteelVerticalGlossy: {
      albedo: "brushed-steel-vertical-glossy/metal_ledges_26_53_diffuse.jpg",
      ao: "brushed-steel-vertical-glossy/metal_ledges_26_53_ao.jpg",
      metalness:
        "brushed-steel-vertical-glossy/metal_ledges_26_53_metalness.jpg",
      normal: "brushed-steel-vertical-glossy/metal_ledges_26_53_normal.jpg",
      roughness:
        "brushed-steel-vertical-glossy/metal_ledges_26_53_roughness.jpg"
    } satisfies PbrTextureShape,
    /** 8K */
    diamondPlatedBlackened: {
      albedo: "diamond-plate-blackened/patterned_metal_26_25_diffuse.jpg",
      ao: "diamond-plate-blackened/patterned_metal_26_25_ao.jpg",
      metalness: "diamond-plate-blackened/patterned_metal_26_25_metalness.jpg",
      normal: "diamond-plate-blackened/patterned_metal_26_25_normal.jpg",
      roughness: "diamond-plate-blackened/patterned_metal_26_25_roughness.jpg"
    } satisfies PbrTextureShape,
    /** 8K */
    diamondPlatedPolished: {
      albedo: "diamond-plate-polished/patterned_metal_26_97_diffuse.jpg",
      ao: "diamond-plate-polished/patterned_metal_26_97_ao.jpg",
      metalness: "diamond-plate-polished/patterned_metal_26_97_metalness.jpg",
      normal: "diamond-plate-polished/patterned_metal_26_97_normal.jpg",
      roughness: "diamond-plate-polished/patterned_metal_26_97_roughness.jpg"
    } satisfies PbrTextureShape,
    /* 2K */
    elegantStoneTiles: {
      albedo: "elegant-stone-tiles/elegant-stone-tiles-albedo.png",
      ao: "elegant-stone-tiles/elegant-stone-tiles-ao.png",
      metalness: "elegant-stone-tiles/elegant-stone-tiles-metallic.png",
      normal: "elegant-stone-tiles/elegant-stone-tiles-normal-ogl.png",
      roughness: "elegant-stone-tiles/elegant-stone-tiles-roughness.png"
    } satisfies PbrTextureShape,
    /** 4K; same as `brushedStainlessSteelSatin` but lower quality */
    enhancedBrushedMetal: {
      albedo: "enhanced/brushed-metal/brushed-metal-26-94-diffuse.jpg",
      ao: "enhanced/brushed-metal/brushed-metal-26-94-ao.jpg",
      metalness: "enhanced/brushed-metal/brushed-metal-26-94-metalness.jpg",
      normal: "enhanced/brushed-metal/brushed-metal-26-94-normal.jpg",
      roughness: "enhanced/brushed-metal/brushed-metal-26-94-roughness.jpg"
    } satisfies PbrTextureShape,
    /** 8K */
    paintedStuccoWhite: {
      albedo: "painted-stucco-white/white_plaster_21_27_diffuse.jpg",
      ao: "painted-stucco-white/white_plaster_21_27_ao.jpg",
      metalness: undefined,
      normal: "painted-stucco-white/white_plaster_21_27_normal.jpg",
      roughness: "painted-stucco-white/white_plaster_21_27_roughness.jpg"
    } satisfies PbrTextureShape,
    /** 8K; quasi-ao asset (uses displacement asset) */
    rubberFlooring: {
      albedo: "rubber/Rubber001_8K-JPG_Color.jpg",
      ao: "rubber/Rubber001_8K-JPG_Displacement.jpg",
      metalness: undefined,
      normal: "rubber/Rubber001_8K-JPG_NormalGL.jpg",
      roughness: "rubber/Rubber001_8K-JPG_Roughness.jpg"
    } satisfies PbrTextureShape,
    /** 2K */
    smoothStucco: {
      albedo: "smooth-stucco/smooth-stucco-albedo.png",
      ao: "smooth-stucco/smooth-stucco-ao.png",
      metalness: "smooth-stucco/smooth-stucco-Metallic.png",
      normal: "smooth-stucco/smooth-stucco-Normal-ogl.png",
      roughness: "smooth-stucco/smooth-stucco-Roughness.png"
    } satisfies PbrTextureShape,
    /** 2K */
    subtleBlackGranite: {
      albedo: "subtle-black-granite/subtle-black-granite-albedo.png",
      ao: "subtle-black-granite/subtle-black-granite-ao.png",
      metalness: "subtle-black-granite/subtle-black-granite-metallic.png",
      normal: "subtle-black-granite/subtle-black-granite-normal-ogl.png",
      roughness: "subtle-black-granite/subtle-black-granite-roughness.png"
    } satisfies PbrTextureShape,
    /** 8K */
    trueStuccoWhite: {
      albedo: "true-stucco-white/white_stucco_wall_21_97_diffuse.jpg",
      ao: "true-stucco-white/white_stucco_wall_21_97_ao.jpg",
      metalness: undefined,
      normal: "true-stucco-white/white_stucco_wall_21_97_normal.jpg",
      roughness: "true-stucco-white/white_stucco_wall_21_97_roughness.jpg"
    } satisfies PbrTextureShape
  } satisfies R2Obj;

  private mapHelper<const T extends keyof typeof this.obj>(target: T) {
    return Object.fromEntries(
      Object.entries(this.obj[target]).map(([k, v]) => {
        return [
          k as keyof PbrTextureShape,
          typeof v !== "undefined"
            ? (`https://asrosscloud.com/textures/${v}` as const)
            : v
        ] as const;
      })
    ) as PbrTexturePrimed;
  }

  public getTexture<const T extends keyof typeof this.obj>(target: T) {
    return this.mapHelper(target);
  }
}

// can initialize with a useMemo once, then use the .getTexture("string") to get the targeted texture
// eg,
// const textureMemo = useMemo(() => new TextureHandler(), []);
// textureMemo.getTexture("brushedStainlessSteelSatin")
