import type { TypeGuard } from "typesafe-utils";

export const isMap = <T>(value: T): value is TypeGuard<Map<any, any>, T> =>
  value instanceof Map;

export const isWeakMap = <T>(
  value: T
): value is TypeGuard<WeakMap<any, any>, T> => value instanceof WeakMap;
