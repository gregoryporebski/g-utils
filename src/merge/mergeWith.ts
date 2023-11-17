import { isArray, isObject } from "typesafe-utils";
import { mergeResolverFactory } from "./mergeResolver";
import type { MergeOptions, MergeResult, MergeStrategy } from "./types";

export function mergeWithFactory(options: MergeOptions) {
  return <Objects extends any[]>(...objects: Objects) =>
    mergeWith(options, ...objects);
}

export function mergeWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return objects.reduce((a, b) => {
    Object.keys(b).forEach((key: keyof any) => {
      const resolve = mergeResolverFactory(a, b, key);

      if (b[key] === undefined || typeof b[key] === "undefined") {
        a[key] = resolve(options.undefined);
        return;
      }

      if (b[key] === null) {
        a[key] = resolve(options.null);
        return;
      }

      if (typeof a[key] !== typeof b[key]) {
        a[key] = resolve(options.mismatch);
        return;
      }

      if (isArray(b[key])) {
        a[key] = resolve(options.array);
        return;
      }

      if (isObject(b[key])) {
        a[key] = resolve(options.object);
        return;
      }

      if (
        ["function", "string", "number", "boolean", "symbol"].includes(
          typeof b[key]
        )
      ) {
        a[key] = resolve(options[typeof b[key] as keyof MergeStrategy]);
        return;
      }

      console.warn("Unhandled entity", { key, value: b[key] });
    });

    return a;
  }, {} as MergeResult<Objects>);
}
