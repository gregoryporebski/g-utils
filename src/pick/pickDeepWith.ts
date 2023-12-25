import pickWith from "./pickWith";
import { PickOptions, PickResult } from "./types";

export default function pickDeepWith<PickInput extends object>(
  options: PickOptions,
  object: PickInput
): PickResult<PickInput> {
  return pickWith(
    {
      ...options,
      deep: true,
    },
    object
  );
}
