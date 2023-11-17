import { isObject } from "typesafe-utils";
import type { MergeOptions, MergeResult } from "./types";
import mergeObjects from "./utils/mergeObjects";

export default function mergeWith<Objects extends any[]>(
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
