import type { TypeGuard } from "typesafe-utils";

export const isPromise = <T>(value: T): value is TypeGuard<Promise<any>, T> =>
  value instanceof Promise;
