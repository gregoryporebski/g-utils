import { mergeWith } from "@/merge";
import { OmitOptions, OmitResult } from "./types";

export default function omitWith<OmitInput extends object>(
  options: OmitOptions,
  object: OmitInput
): OmitResult<OmitInput> {
  return mergeWith(
    {
      omit: options?.selectors,
      deep: options?.deep,
    },
    {},
    object
  );
}
