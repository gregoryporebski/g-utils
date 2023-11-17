import mergeDeepWith from "./mergeDeepWith";
import type { MergeOptions } from "./types";

export default function mergeDeepWithFactory(options: MergeOptions) {
  return <Objects extends any[]>(...objects: Objects) =>
    mergeDeepWith(options, ...objects);
}
