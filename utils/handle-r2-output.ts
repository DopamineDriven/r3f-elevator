import { r2FileList } from "@/utils/__out__/r2/r2-file-list";
import {
  ALLOWED_TEXTURE_KEYS,
  mapKeyNormalizer,
  SUPPORTED_EXTENSIONS
} from "@/utils/texture-key-normalizer";
import { Fs } from "@d0paminedriven/fs";

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
    brushedSteelDarkScuffed: Array.of<[string, string]>(),
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

export type TransformProps = NonNullable<Parameters<typeof manipulate>[0]>;

const transform = (props: TransformProps) =>
  Object.fromEntries(
    Object.entries(props).map(([k, v]) => {
      return [
        k,
        Object.fromEntries(
          v.map(([mapKey, url]) => {
            const normalized =
              mapKeyNormalizer[mapKey as keyof typeof mapKeyNormalizer] ??
              mapKey;
            return [normalized, url];
          })
        )
      ] as const;
    })
  );

const fs = new Fs(process.cwd());

// pretier-ignore
const dataToWrite = `
export const PBR_TEXTURES_RAW = ${JSON.stringify(transform(manipulate()), null, 2)} as const;
`;

fs.withWs("utils/__out__/pbr/pbr-textures-raw.ts", dataToWrite);
