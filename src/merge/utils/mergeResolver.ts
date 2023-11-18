import { isNonArrayObject } from "@/utils/typeGuards";
import { isPrimitiveObject, isUndefined } from "typesafe-utils";
import { concatFunctions } from "../resolvers/concatFunctions";
import { concatObjects } from "../resolvers/concatObjects";
import { MergeResolverFactory } from "../types";

const mergeResolverFactory: MergeResolverFactory =
  (a, b, key) => (strategy) => {
    if (strategy === "replace" || isUndefined(strategy)) {
      return b[key];
    }

    if (strategy === "keep") {
      return a[key];
    }

    if (strategy === "add") {
      return Object.hasOwn(a, key) ? a[key] + b[key] : b[key];
    }

    if (strategy === "subtract") {
      return Object.hasOwn(a, key) ? a[key] - b[key] : b[key];
    }

    if (strategy === "concat") {
      if (typeof a[key] === "function" && typeof b[key] === "function") {
        return concatFunctions(a[key], b[key]);
      }

      if (isNonArrayObject(a[key]) && isNonArrayObject(b[key])) {
        if (isPrimitiveObject(a[key]) && isPrimitiveObject(b[key])) {
          return concatObjects(a[key], b[key]);
        }

        if (a[key] instanceof Set && b[key] instanceof Set) {
          return new Set([...a[key], ...b[key]]);
        }

        if (a[key] instanceof Map && b[key] instanceof Map) {
          return new Map([...a[key], ...b[key]]);
        }

        return b[key];
      }

      return a?.[key]?.concat(b[key]) ?? b[key];
    }

    if (strategy === "and") {
      return Object.hasOwn(a, key) ? a[key] && b[key] : b[key];
    }

    if (strategy === "or") {
      return a[key] || b[key];
    }

    if (typeof strategy === "function") {
      return strategy(a[key], b[key], key);
    }
  };

export default mergeResolverFactory;
