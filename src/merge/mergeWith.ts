import { isArray, isObject } from "typesafe-utils";
import type { MergeOptions, MergeResult } from "./types";
import mergeObjects from "./utils/mergeObjects";

/**
 * Merges multiple objects with customizable options.
 *
 * @param options The merge options.
 * @param objects The objects to merge.
 * @returns The merged object.
 */
export default function mergeWith<MergeInput extends any[]>(
  options: MergeOptions,
  ...objects: MergeInput
): MergeResult<MergeInput> {
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
  }, {} as MergeResult<MergeInput>);
}
