import { isArray, isObject } from "typesafe-utils";
import type { MergeOptions, MergeResult } from "./types";
import mergeObjects from "./utils/mergeObjects";

export default function mergeWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return objects.reduce((a, b) => {
    if (!isObject(a) || isArray(a)) {
      if (options.debug) {
        console.error("Cannot merge non-objects", { a });
      }

      return b;
    }

    if (!isObject(b) || isArray(b)) {
      if (options.debug) {
        console.error("Cannot merge non-objects", { b });
      }

      return a;
    }

    mergeObjects(options, a, b);

    return a;
  }, {} as MergeResult<Objects>);
}
