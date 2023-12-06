import mergeWith from "./mergeWith";
import type { MergeResult } from "./types";

/**
 * Merges multiple objects into a single object.
 * @group merge
 *
 * @param objects The objects to merge.
 * @returns The merged object.
 */
export default function merge<MergeInput extends any[]>(
  ...objects: MergeInput
): MergeResult<MergeInput> {
  return mergeWith({}, ...objects);
}
