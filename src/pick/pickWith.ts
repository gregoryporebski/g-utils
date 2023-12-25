import { mergeWith } from "@/merge";
import { PickOptions, PickResult } from "./types";

export default function pickWith<PickInput extends object>(
  options: PickOptions,
  object: PickInput
): PickResult<PickInput> {
  return mergeWith(
    {
      pick: options?.selectors,
      deep: options?.deep,
    },
    {},
    object
  );
}
