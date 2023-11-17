import { isArray, isObject } from "typesafe-utils";
import { mergeResolverFactory } from "./mergeResolver";
import type { MergeOptions, MergeStrategy } from "./types";

export function mergeObjects(options: MergeOptions, a: any, b: any) {
  Object.keys(b).forEach((key: keyof any) => {
    const resolver = (options.resolver ?? mergeResolverFactory)(a, b, key);

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
      a[key] = resolver(options.array);
      return;
    }

    if (isObject(b[key])) {
      a[key] = resolver(options.object);
      return;
    }

    if (
      ["function", "string", "number", "boolean", "symbol"].includes(
        typeof b[key]
      )
    ) {
      a[key] = resolver(options[typeof b[key] as keyof MergeStrategy]);
      return;
    }

    console.warn("Unhandled entity", { key, value: b[key] });
  });
}
