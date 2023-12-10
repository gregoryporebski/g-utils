import { mergeDeepWith } from "@/merge";
import { OmitOptions, OmitResult } from "./types";

export default function omitDeep<OmitInput extends object>(
  options: OmitOptions,
  object: OmitInput
): OmitResult<OmitInput> {
  return mergeDeepWith({ omit: options }, {}, object);
}
