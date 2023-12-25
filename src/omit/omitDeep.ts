import { PropertySelector } from "@/types";
import { omitDeepWith } from ".";
import { OmitResult } from "./types";

export default function omitDeep<OmitInput extends object>(
  object: OmitInput,
  ...selectors: PropertySelector[]
): OmitResult<OmitInput> {
  return omitDeepWith({ selectors }, object);
}
