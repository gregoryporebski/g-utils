import { mergeWith } from "@/merge";
import { CloneOptions } from "./types";

export default function cloneWith<CloneInput>(
  options: CloneOptions,
  input: CloneInput
): CloneInput {
  if (input === null || input === undefined) {
    return input;
  }

  if (input instanceof Date) {
    return new Date(input) as CloneInput;
  }

  if (input instanceof RegExp) {
    return new RegExp(input) as CloneInput;
  }

  if (input instanceof Set) {
    return new Set(input) as CloneInput;
  }

  if (input instanceof Map) {
    return new Map(input) as CloneInput;
  }

  if (input instanceof Buffer) {
    return Buffer.from(input) as CloneInput;
  }

  if (input instanceof ArrayBuffer) {
    return new ArrayBuffer(input.byteLength) as CloneInput;
  }

  if (Array.isArray(input)) {
    return [...input] as CloneInput;
  }

  if (typeof input === "object") {
    return mergeWith(options, input) as CloneInput;
  }

  if (typeof input === "function") {
    return input.bind({});
  }

  if (typeof input === "symbol") {
    return Symbol(input.description) as CloneInput;
  }

  return input;
}