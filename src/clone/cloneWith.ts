import { mergeWith } from "@/merge";
import {
  isArrayBuffer,
  isDataView,
  isPromise,
  isSharedArrayBuffer,
  isWeakMap,
  isWeakSet,
} from "@/type-guards";
import { isError } from "@/type-guards/buffer";
import { isNull, isObject, isPrimitiveObject } from "typesafe-utils";
import { CloneOptions } from "./types";

export default function cloneWith<CloneInput>(
  options: CloneOptions,
  input: CloneInput
): CloneInput {
  switch (true) {
    case isNull(input):
      return input;

    case Array.isArray(input):
      return [...input] as CloneInput;

    case isPrimitiveObject(input):
      return mergeWith(options, input) as CloneInput;

    case isPromise(input):
      return input.then() as CloneInput;

    case isWeakMap(input):
    case isWeakSet(input):
      if (options.debug) {
        console.warn(
          `Cannot clone ${input.constructor.name} objects. Returning original object.`
        );
      }
      return input;

    case isArrayBuffer(input):
    case isSharedArrayBuffer(input):
      return input.slice(0) as CloneInput;

    case isDataView(input):
      return new DataView(
        cloneWith(options, input.buffer),
        input.byteOffset,
        input.byteLength
      ) as CloneInput;

    case isError(input):
      return structuredClone(input) as CloneInput;

    case isObject(input):
      // @ts-expect-error
      return new input.constructor(input) as CloneInput;

    case typeof input === "function":
      return input.bind({}) as CloneInput;

    case typeof input === "symbol":
      return Symbol(input.description) as CloneInput;

    default:
      return input;
  }
}
