import { mergeDeepWith } from "@/merge";
import { PickOptions, PickResult } from "./types";

export default function pickDeep<PickInput extends object>(
  options: PickOptions,
  object: PickInput
): PickResult<PickInput> {
  return mergeDeepWith({ pick: options }, {}, object);
}
