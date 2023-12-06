import { mergeDeepWith } from "@/merge";
import { OmitOptions } from "./types";

export default function omitDeep<OmitInput extends object>(
  options: OmitOptions,
  object: OmitInput
): Partial<OmitInput> {
  return mergeDeepWith({ omit: options }, {}, object);
}
