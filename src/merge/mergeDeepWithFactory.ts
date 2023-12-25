import mergeDeepWith from "./mergeDeepWith";
import type { MergeFactory } from "./types";

const mergeDeepWithFactory: MergeFactory =
  (options) =>
  (...objects) =>
    mergeDeepWith(options, ...objects);

export default mergeDeepWithFactory;
