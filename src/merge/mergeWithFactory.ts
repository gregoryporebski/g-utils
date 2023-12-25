import mergeWith from "./mergeWith";
import type { MergeFactory } from "./types";

const mergeWithFactory: MergeFactory =
  (options) =>
  (...objects) =>
    mergeWith(options, ...objects);

export default mergeWithFactory;
