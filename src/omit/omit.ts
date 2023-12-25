import { PropertySelector } from "@/types";
import { omitWith } from ".";
import { OmitResult } from "./types";

export default function omit<OmitInput extends object>(
  object: OmitInput,
  ...selectors: PropertySelector[]
): OmitResult<OmitInput> {
  return omitWith({ selectors }, object);
}
