import type { MergeOptions, MergeResult } from "./types";

export function mergeWithFactory(options: MergeOptions) {
  return <Objects extends any[]>(...objects: Objects) =>
    mergeWith(options, ...objects);
}

export function mergeWith<Objects extends any[]>(
  options: MergeOptions,
  ...objects: Objects
): MergeResult<Objects> {
  return objects.reduce((result, object) => {
    Object.keys(object).forEach((key) => {
      const value = object[key];
    });

    return result;
  }, {} as MergeResult<Objects>);
}
