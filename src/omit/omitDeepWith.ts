import omitWith from "./omitWith";
import { OmitOptions, OmitResult } from "./types";

export default function omitDeepWith<OmitInput extends object>(
  options: OmitOptions,
  object: OmitInput
): OmitResult<OmitInput> {
  return omitWith(
    {
      ...options,
      deep: true,
    },
    object
  );
}
