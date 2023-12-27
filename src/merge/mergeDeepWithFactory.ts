import mergeDeepWith from "./mergeDeepWith";
import type { MergeFactory } from "./types";

/**
 * Creates a function that merges deeply multiple objects
 * into a single object with customizable options.
 * @group merge
 *
 * @param options The merge options.
 * @returns The merge function.
 */
const mergeDeepWithFactory: MergeFactory =
  (options) =>
  (...objects) =>
    mergeDeepWith(options, ...objects);

export default mergeDeepWithFactory;
