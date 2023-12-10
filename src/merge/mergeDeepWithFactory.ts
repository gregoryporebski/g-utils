import mergeDeepWith from "./mergeDeepWith";
import type { MergeFactory } from "./types";

const mergeDeepWithFactory: MergeFactory =
  (options) =>
  <Objects extends any[]>(...objects: Objects) =>
    mergeDeepWith(options, ...objects);

export default mergeDeepWithFactory;
