import { mergeDeepWith } from "@/merge";
import { PickOptions } from "./types";

export default function pickDeep<PickInput extends object>(
  options: PickOptions,
  object: PickInput
): Partial<PickInput> {
  return mergeDeepWith({ pick: options }, {}, object);
}
