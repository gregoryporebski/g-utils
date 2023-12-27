import mergeWith from "./mergeWith";
import type { MergeFactory } from "./types";

/**
 * Creates a function that merges multiple objects
 * into a single object with customizable options.
 * @group merge
 *
 * @param options The merge options.
 * @returns The merge function.
 */
const mergeWithFactory: MergeFactory =
  (options) =>
  (...objects) =>
    mergeWith(options, ...objects);

export default mergeWithFactory;
