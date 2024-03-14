import type { TypeGuard } from "typesafe-utils";
import { isArray, isObject } from "typesafe-utils";

export const isNonArrayObject = <T>(value: T): value is TypeGuard<object, T> =>
  isObject(value) && !isArray(value);

export const isError = <T>(value: T): value is TypeGuard<Error, T> =>
  value instanceof Error;
