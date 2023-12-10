import { isPrimitiveObject } from "typesafe-utils";
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
    if (!isPrimitiveObject(b)) {
      if (options.debug) {
        console.error("Only primitive objects can be merged", { b });
      }

      return a;
    }

    const result = a ?? {};
    mergeObjects(options, result, b);

    Object.setPrototypeOf(result, Object.getPrototypeOf(b));

    return result;
  }, null as any);
}
