import { r2FileList } from "@/utils/__out__/r2/r2-file-list";
import { Fs } from "@d0paminedriven/fs";

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

export type ToPascalCase<S extends string> = string extends S
  ? string
  : S extends `${infer T}-${infer U}`
    ? `${Capitalize<T>}${ToPascalCase<U>}`
    : Capitalize<S>;
export type ToCamelCase<S extends string> = string extends S
  ? string
  : S extends `${infer T}-${infer U}`
    ? `${T}${ToPascalCase<U>}`
    : S;

export type InferAssetPath<T> =
  T extends `https://asrosscloud.com/textures/${infer U}.${infer X}`
    ? `${U}.${X}`
    : T;
export type InferTopLevelPath<T> = T extends `${infer U}/${string}.${string}`
  ? U
  : T;

export function kebabToCamel<const V extends string>(kebab: V) {
  return kebab
    .split(/(-)/g)
    .filter((_, i) => i % 2 === 0)
    .map((t, i) =>
      i === 0
        ? t.toLowerCase()
        : t.substring(0, 1).toUpperCase().concat(t.substring(1))
    )
    .join("") as ToCamelCase<typeof kebab>;
}

function aggregate(helper = Array.of<string>()) {
  try {
    return r2FileList.map(v => {
      const assetPath = v.replace(
        "https://asrosscloud.com/textures/",
        ""
      ) as InferAssetPath<typeof v>;

      const getTopLevel = (assetPath.split(/\//g)?.[0] ??
        "") as InferTopLevelPath<typeof assetPath>;

      const toCamel = kebabToCamel(getTopLevel);

      const camelPlusTopLevel = `${toCamel}:${getTopLevel}`;
      if (!helper.includes(camelPlusTopLevel)) helper.push(camelPlusTopLevel);
      return camelPlusTopLevel;
    });
  } catch (err) {
    console.error(err);
  } finally {
    return helper;
  }
}

function manipulate(
  arrAgg = {
    brushedStainlessSteelSatin: Array.of<[string, string]>(),
    brushedSteelVerticalFine: Array.of<[string, string]>(),
    brushedSteelVerticalGlossy: Array.of<[string, string]>(),
    diamondPlatedBlackened: Array.of<[string, string]>(),
    diamondPlatedPolished: Array.of<[string, string]>(),
    elegantStoneTiles: Array.of<[string, string]>(),
    paintedStuccoWhite: Array.of<[string, string]>(),
    smoothStucco: Array.of<[string, string]>(),
    subtleBlackGranite: Array.of<[string, string]>(),
    trueStuccoWhiteUniform: Array.of<[string, string]>(),
    trueStuccoWhiteVaried: Array.of<[string, string]>(),
    trueStuccoWhite: Array.of<[string, string]>()
  } as const
) {
  try {
    aggregate().map(v => {
      const [camel, kebab] = v.split(/:/g) as [string, string];
      const assetPaths = r2FileList.map(
        t =>
          t.replace("https://asrosscloud.com/textures/", "") as InferAssetPath<
            typeof t
          >
      );

      assetPaths.forEach(function (file) {
        const getTop = file.split(/\//g)?.[0] ?? "";
        const getBottom = file?.split(/\//g)?.reverse()[0];
        const t = getBottom.split(/\./g)?.[0]?.split(/(-|_)/g).reverse()?.[0];

        if (new RegExp(getTop).test(kebab) && getTop.length === kebab.length) {
          const ext = getBottom.split(".").pop()?.toLowerCase() ?? "";
          if (!SUPPORTED_EXTENSIONS.includes(ext)) return;

          const rawKey = getBottom.split(".")[0];
          const segments = rawKey.split(/[-_]/g);
          const mapKeyGuess = segments.reverse()[0];

          const normalized =
            mapKeyNormalizer[mapKeyGuess as keyof typeof mapKeyNormalizer] ??
            null;
          if (!normalized || !ALLOWED_TEXTURE_KEYS.includes(normalized)) return;
          arrAgg[camel as keyof typeof arrAgg].push([
            t,
            `https://asrosscloud.com/textures/${file}`
          ]);
        }
      });
    });
  } catch (err) {
    console.error(err);
  } finally {
    return arrAgg;
  }
}

const toLiteralObjectString = (obj: object) =>
  JSON.stringify(obj, null, 2)
    .replace(/"__UNDEFINED__"/g, "undefined")  // handles raw output
    .replace(/"([^"]+)":/g, "$1:");            // remove quotes from keys (optional)

export type TransformProps = NonNullable<Parameters<typeof manipulate>[0]>;
const PLACEHOLDER = "__UNDEFINED__";
const transform = (props: TransformProps) =>
  Object.fromEntries(
    Object.entries(props).map(([k, v]) => {
      const obj = Object.fromEntries(
        v.map(([mapKey, url]) => {
          const normalized =
            mapKeyNormalizer[mapKey as keyof typeof mapKeyNormalizer] ?? mapKey;
          return [normalized, url];
        })
      );
      // Inject metalness: undefined if missing
             // eslint-disable-next-line no-prototype-builtins
      if (!obj.hasOwnProperty("metalness")) (obj).metalness = PLACEHOLDER;
      return [k, obj];
    })
  );

  const normalizeToKTX2 = (input: ReturnType<typeof transform>) =>
    Object.fromEntries(
      Object.entries(input).map(([materialKey, mapSet]) => {
        const converted = Object.fromEntries(
          Object.entries(mapSet).map(([mapKey, url]) => {
            if (url === undefined) return [mapKey, null];
            const localPath = url
              .replace("https://asrosscloud.com/textures/", "/r3f-ktx2/textures/")
              .replace(/\.[^.]+$/, ".ktx2");
            return [mapKey, localPath];
          })
        );
        // Inject metalness: undefined if missing
        // eslint-disable-next-line no-prototype-builtins
        if (!converted.hasOwnProperty("metalness")) converted.metalness = PLACEHOLDER;
        return [materialKey, converted];
      })
    );

const fs = new Fs(process.cwd());

// pretier-ignore
const dataToWrite = `
export const PBR_TEXTURES_RAW = ${toLiteralObjectString(transform(manipulate()))} as const;
`;

fs.withWs("utils/__out__/pbr/pbr-textures-raw.ts", dataToWrite);
// prettier-ignore
const dataToWriteKTX2 = `
export const PBR_TEXTURES_KTX2 = ${toLiteralObjectString(normalizeToKTX2(transform(manipulate())))} as const;
`;

fs.withWs("utils/__out__/pbr/pbr-textures-ktx2.ts", dataToWriteKTX2);
