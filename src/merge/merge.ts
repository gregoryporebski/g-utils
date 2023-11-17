import { MergeResult, mergeWith } from ".";

export function merge<Objects extends any[]>(
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({}, ...objects);
}

export function mergeDeep<Objects extends any[]>(
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({ deep: true }, ...objects);
}
