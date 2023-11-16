import { ResolveMergeStrategy } from "../types";

export const resolveMerge: ResolveMergeStrategy<"undefined"> = (
  strategy,
  a,
  b,
  key
) => {
  if (strategy === "replace") {
    return b[key];
  }

  if (strategy === "keep") {
    return a[key];
  }

  if (typeof strategy === "function") {
    return strategy(a, b, key);
  }
};
