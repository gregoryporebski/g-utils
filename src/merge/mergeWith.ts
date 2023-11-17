import { isObject } from "typesafe-utils";
import { mergeObjects } from "./mergeObjects";
import type { MergeOptions, MergeResult } from "./types";

export function mergeWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return objects.reduce((a, b) => {
    if (!isObject(a)) {
      console.error("Cannot merge non-objects", { a });
      return b;
    }

    if (!isObject(b)) {
      console.error("Cannot merge non-objects", { b });
      return a;
    }

    mergeObjects(options, a, b);

    return a;
  }, {} as MergeResult<Objects>);
}

export function mergeDeepWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({ ...options, deep: true }, ...objects);
}

export function mergeWithFactory(options: MergeOptions) {
  return <Objects extends any[]>(...objects: Objects) =>
    mergeWith(options, ...objects);
}

export function mergeDeepWithFactory(options: MergeOptions) {
  return <Objects extends any[]>(...objects: Objects) =>
    mergeDeepWith(options, ...objects);
}
