import mergeWith from "./mergeWith";
import type { MergeOptions } from "./types";

export default function mergeWithFactory(options: MergeOptions) {
  return <Objects extends any[]>(...objects: Objects) =>
    mergeWith(options, ...objects);
}
