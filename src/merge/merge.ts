import mergeWith from "./mergeWith";
import type { MergeResult } from "./types";

export default function merge<Objects extends any[]>(
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({}, ...objects);
}
