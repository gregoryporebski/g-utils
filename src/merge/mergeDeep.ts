import mergeWith from "./mergeWith";
import type { MergeResult } from "./types";

export default function mergeDeep<Objects extends any[]>(
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({ deep: true }, ...objects);
}
