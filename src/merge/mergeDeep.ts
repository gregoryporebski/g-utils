import mergeWith from "./mergeWith";
import type { MergeResult } from "./types";

/**
 * Merges deeply multiple objects into a single object.
 * @group merge
 *
 * @param objects The objects to merge.
 * @returns The merged object.
 */
export default function mergeDeep<MergeInput extends any[]>(
  ...objects: MergeInput
): MergeResult<MergeInput> {
  return mergeWith({ deep: true }, ...objects);
}
