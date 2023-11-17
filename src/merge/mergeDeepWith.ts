import mergeWith from "./mergeWith";
import type { MergeOptions, MergeResult } from "./types";

export default function mergeDeepWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return mergeWith({ ...options, deep: true }, ...objects);
}
