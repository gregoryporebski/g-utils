import { merge } from "@/merge";

export default function clone<CloneInput extends object>(
  object: CloneInput
): CloneInput {
  return merge({}, object) as CloneInput;
}
