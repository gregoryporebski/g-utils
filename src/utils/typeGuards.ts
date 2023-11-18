import { isArray, isObject, type TypeGuard } from "typesafe-utils";

export const isNonArrayObject = <T>(value: T): value is TypeGuard<object, T> =>
  isObject(value) && !isArray(value);
