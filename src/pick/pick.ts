import { mergeWith } from "@/merge";
import { PickOptions } from "./types";

export default function pick<PickInput extends object>(
  options: PickOptions,
  object: PickInput
): Partial<PickInput> {
  return mergeWith({ pick: options }, {}, object);
}
