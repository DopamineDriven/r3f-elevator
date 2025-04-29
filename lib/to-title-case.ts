export type ToPascalCase<S extends string> = string extends S
  ? string
  : S extends `${infer T}-${infer U}`
    ? `${Capitalize<T>}${ToPascalCase<U>}`
    : Capitalize<S>;

export function kebabToCapital<const V extends string>(kebab: V) {
  return kebab
    .split(/(-)/g)
    .filter((_, i) => i % 2 === 0)
    .map(t => t.substring(0, 1).toUpperCase().concat(t.substring(1)))
    .join("") as ToPascalCase<typeof kebab>;
}

export function toTitleCase<const T extends string>(value: T) {
  return kebabToCapital(value);
}
