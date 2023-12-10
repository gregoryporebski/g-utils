import mergeWith from "./mergeWith";
import type { MergeFactory } from "./types";

const mergeWithFactory: MergeFactory =
  (options) =>
  <Objects extends any[]>(...objects: Objects) =>
    mergeWith(options, ...objects);

export default mergeWithFactory;
