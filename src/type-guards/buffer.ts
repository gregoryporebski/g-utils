import type { TypeGuard } from "typesafe-utils";

export const isBuffer = <T>(value: T): value is TypeGuard<Buffer, T> =>
  value instanceof Buffer;

export const isArrayBuffer = <T>(
  value: T
): value is TypeGuard<ArrayBuffer, T> => value instanceof ArrayBuffer;

export const isSharedArrayBuffer = <T>(
  value: T
): value is TypeGuard<SharedArrayBuffer, T> =>
  value instanceof SharedArrayBuffer;
