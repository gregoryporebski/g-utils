import { cloneWith } from ".";

export default function cloneDeep<CloneInput extends object>(
  object: CloneInput
): CloneInput {
  return cloneWith({ deep: true }, object) as CloneInput;
}
