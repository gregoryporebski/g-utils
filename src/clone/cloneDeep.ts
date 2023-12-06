import { mergeDeep } from "@/merge";

export default function cloneDeep<CloneInput extends object>(
  object: CloneInput
): CloneInput {
  return mergeDeep({}, object) as CloneInput;
}
