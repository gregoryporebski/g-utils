import { resolveMerge } from "./resolvers/resolveMerge";
import type { MergeOptions, MergeResult } from "./types";

export function mergeWithFactory(options: MergeOptions) {
  return <Objects extends any[]>(...objects: Objects) =>
    mergeWith(options, ...objects);
}

export function mergeWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return objects.reduce((a, b) => {
    Object.keys(b).forEach((key) => {
      const input = [a, b, key] as const;

      if (
        [undefined, null].includes(b[key]) ||
        ["undefined", "symbol"].includes(typeof b[key]) ||
        typeof a[key] !== typeof b[key]
      ) {
        a[key] = resolveMerge(options.undefined, ...input);
        return;
      }
    });

    return a;
  }, {} as MergeResult<Objects>);
}
