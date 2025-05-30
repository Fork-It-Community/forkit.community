import { isEmpty, isNonNullish, mapValues } from "remeda";

type WithPath<T, P extends string = ""> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? WithPath<T[K], `${P}/${K & string}`>
    : never;
} & { __path: P };

export function assignPaths<T extends object>(
  obj: T,
  parentPath: string = "",
  withoutFirstSlash: boolean = false,
): WithPath<T> {
  const transformed = mapValues(obj, (value, key) => {
    const currentPath =
      isEmpty(parentPath) && withoutFirstSlash ? key : `${parentPath}/${key}`;

    if (
      typeof value === "object" &&
      isNonNullish(value) &&
      Object.keys(value).length > 0
    ) {
      return {
        ...assignPaths(value, currentPath),
        __path: currentPath,
      };
    }

    return { __path: currentPath };
  });

  return {
    ...transformed,
    __path: parentPath || "/", // Ensures the root has __path
  } as WithPath<T>;
}
