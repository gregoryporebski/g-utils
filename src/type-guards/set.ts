import type { TypeGuard } from "typesafe-utils";

export const isSet = <T>(value: T): value is TypeGuard<Set<any>, T> =>
  value instanceof Set;

export const isWeakSet = <T>(value: T): value is TypeGuard<WeakSet<any>, T> =>
  value instanceof WeakSet;
