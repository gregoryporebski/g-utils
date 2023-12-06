import { isArray, isObject } from "typesafe-utils";
import mergeWith from "../mergeWith";
import type { MergeOptions, MergeStrategy } from "../types";
import mergeResolverFactory from "./mergeResolver";
import mergeSelectorFactory from "./mergeSelector";

export default function mergeObjects(options: MergeOptions, a: any, b: any) {
  Object.keys(b).forEach((key: keyof any) => {
    const resolver = (options.resolver ?? mergeResolverFactory)(a, b, key);
    const selector = (options.selector ?? mergeSelectorFactory)(key, b[key]);

    const isDeepSelector = options.deep && isObject(b[key]) && !isArray(b[key]);

    if (options.pick && !selector(options.pick) && !isDeepSelector) {
      return;
    }

    if (options.pick && selector(options.pick) && !isDeepSelector) {
      return;
    }

    if (
      options?.custom?.some((custom) => {
        if (custom.selector(key, b[key])) {
          a[key] = resolver(custom.strategy);
          return true;
        }
      })
    ) {
      return;
    }

    if (b[key] === undefined || typeof b[key] === "undefined") {
      a[key] = resolver(options.undefined);
      return;
    }

    if (b[key] === null) {
      a[key] = resolver(options.null);
      return;
    }

    if (typeof a[key] !== typeof b[key]) {
      a[key] = resolver(options.mismatch);
      return;
    }

    if (isArray(b[key])) {
      a[key] = resolver(options.array ?? "concat");
      return;
    }

    if (isObject(b[key])) {
      if (options.deep) {
        a[key] = mergeWith(options, a[key], b[key]);
        return;
      }

      a[key] = resolver(options.object ?? "concat");
      return;
    }

    if (
      ["function", "string", "number", "bigint", "boolean", "symbol"].includes(
        typeof b[key]
      )
    ) {
      const dictionary: Record<string, string> = {
        bigint: "number",
      };

      const mappedKey = dictionary[typeof b[key]] ?? typeof b[key];

      a[key] = resolver(options[mappedKey as keyof MergeStrategy]);
      return;
    }

    options.debug && console.error("Unhandled entity", { key, value: b[key] });
  });
}
