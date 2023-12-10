import { mergeWith } from "@/merge";
import { OmitOptions, OmitResult } from "./types";

export default function omit<OmitInput extends object>(
  options: OmitOptions,
  object: OmitInput
): OmitResult<OmitInput> {
  return mergeWith({ omit: options }, {}, object);
}
