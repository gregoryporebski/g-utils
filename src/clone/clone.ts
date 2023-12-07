import { merge } from "@/merge";

export default function clone<CloneInput>(input: CloneInput): CloneInput {
  if (input === null || input === undefined) {
    return input;
  }

  if (input instanceof Date) {
    return new Date(input) as CloneInput;
  }

  if (input instanceof RegExp) {
    return new RegExp(input) as CloneInput;
  }

  if (input instanceof Symbol) {
    return Symbol(input.description) as CloneInput;
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
    return merge(input) as CloneInput;
  }

  return input;
}
