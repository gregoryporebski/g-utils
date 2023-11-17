import { isUndefined } from "typesafe-utils";
import { MergeResolverFactory } from "./types";

export const mergeResolverFactory: MergeResolverFactory =
  (a, b, key) => (strategy) => {
    if (strategy === "replace" || isUndefined(strategy)) {
      return b[key];
    }

    if (strategy === "keep") {
      return a[key];
    }

    if (strategy === "add") {
      return a[key] + b[key];
    }

    if (strategy === "subtract") {
      return a[key] - b[key];
    }

    if (strategy === "concat") {
      return a[key].concat(b[key]);
    }

    if (strategy === "and") {
      return a[key] && b[key];
    }

    if (strategy === "or") {
      return a[key] || b[key];
    }

    if (typeof strategy === "function") {
      return strategy(a, b, key);
    }
  };
