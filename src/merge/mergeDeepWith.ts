import mergeWith from "./mergeWith";
import type { MergeOptions, MergeResult } from "./types";

/**
 * Merges deeply multiple objects into a single object with customizable options.
 * @group merge
 *
 * @param options The merge options.
 * @param objects The objects to merge.
 * @returns The merged object.
 */
export default function mergeDeepWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({ ...options, deep: true }, ...objects);
}
