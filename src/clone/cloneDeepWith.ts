import { cloneWith } from ".";
import { CloneOptions } from "./types";

export default function cloneDeep<CloneInput extends object>(
  options: CloneOptions,
  object: CloneInput
): CloneInput {
  return cloneWith({ ...options, deep: true }, object) as CloneInput;
}
