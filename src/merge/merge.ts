import { MergeResult, mergeWith } from ".";

export function merge<Objects extends any[]>(
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({}, ...objects);
}
