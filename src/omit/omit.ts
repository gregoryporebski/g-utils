import { mergeWith } from "@/merge";
import { OmitOptions } from "./types";

export default function omit<OmitInput extends object>(
  options: OmitOptions,
  object: OmitInput
): Partial<OmitInput> {
  return mergeWith({ omit: options }, {}, object);
}
