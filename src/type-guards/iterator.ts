import { isObject, type TypeGuard } from "typesafe-utils";

const hasIterator = <T extends object>(value: T) =>
  typeof (value as any)[Symbol.iterator] === "function";

const isPrototypeIterable = (proto: object | null): boolean => {
  if (proto == null) {
    return false;
  }

  if (hasIterator(proto)) {
    return true;
  }

  return isPrototypeIterable(Object.getPrototypeOf(proto));
};

export const isIterable = <T extends object>(
  value: T
): value is TypeGuard<{ [Symbol.iterator]: any }, T> => {
  if (!isObject(value)) {
    return false;
  }

  if (hasIterator(value)) {
    return true;
  }

  return isPrototypeIterable(Object.getPrototypeOf(value));
};
