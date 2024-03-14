import { isMap, isNonArrayObject, isSet } from "@/type-guards";
import { Key } from "@/types";
import { isPrimitiveObject, isUndefined } from "typesafe-utils";
import { concatFunctions } from "../resolvers/concatFunctions";
import { concatObjects } from "../resolvers/concatObjects";
import { MergeResolverFactory } from "../types";

const getDescriptor = (object: any, key: Key): PropertyDescriptor =>
  Object.getOwnPropertyDescriptor(object, key) ?? {};

const getResult = (object: any, key: Key): [keyof any, PropertyDescriptor] => [
  key,
  getDescriptor(object, key),
];

const getResultWith = (
  object: any,
  key: Key,
  modifier: any
): [keyof any, PropertyDescriptor] => [
  key,
  { ...getDescriptor(object, key), ...modifier },
];

export const mergeResolverFactory: MergeResolverFactory =
  (a, b, key) => (strategy) => {
    if (strategy === "replace" || isUndefined(strategy)) {
      return getResult(b, key);
    }

    if (strategy === "keep") {
      return getResult(a, key);
    }

    if (strategy === "add") {
      return Object.hasOwn(a, key)
        ? getResultWith(b, key, { value: a[key] + b[key] })
        : getResult(b, key);
    }

    if (strategy === "subtract") {
      return Object.hasOwn(a, key)
        ? getResultWith(b, key, { value: a[key] - b[key] })
        : getResult(b, key);
    }

    if (strategy === "concat") {
      if (typeof a[key] === "function" && typeof b[key] === "function") {
        return getResultWith(b, key, {
          value: concatFunctions(a[key], b[key]),
        });
      }

      if (isNonArrayObject(a[key]) && isNonArrayObject(b[key])) {
        if (isPrimitiveObject(a[key]) && isPrimitiveObject(b[key])) {
          return getResultWith(b, key, {
            value: concatObjects(a[key], b[key]),
          });
        }

        if (isSet(a[key]) && isSet(b[key])) {
          return getResultWith(b, key, {
            value: new Set([...a[key], ...b[key]]),
          });
        }

        if (isMap(a[key]) && isMap(b[key])) {
          return getResultWith(b, key, {
            value: new Map([...a[key], ...b[key]]),
          });
        }

        return getResult(b, key);
      }

      return Object.hasOwn(a, key)
        ? getResultWith(b, key, { value: a[key]?.concat(b[key]) ?? b[key] })
        : getResult(b, key);
    }

    if (strategy === "and") {
      return Object.hasOwn(a, key)
        ? getResultWith(b, key, { value: a[key] && b[key] })
        : getResult(b, key);
    }

    if (strategy === "or") {
      return Object.hasOwn(a, key)
        ? getResultWith(b, key, { value: a[key] || b[key] })
        : getResult(b, key);
    }

    if (typeof strategy === "function") {
      const value = strategy(a[key], b[key], key);
      return getResultWith(b, key, { value });
    }

    return [b, {}];
  };

export default mergeResolverFactory;
