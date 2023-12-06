import { merge } from "@/merge";
import { isObject } from "typesafe-utils";

export default function clone<CloneInput>(input: CloneInput): CloneInput {
  if (Array.isArray(input)) {
    return [...input] as CloneInput;
  }

  if (isObject(input)) {
    return merge(input) as CloneInput;
  }

  return input;
}
