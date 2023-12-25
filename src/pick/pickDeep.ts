import { PropertySelector } from "@/types";
import { pickDeepWith } from ".";
import { PickResult } from "./types";

export default function pickDeep<PickInput extends object>(
  object: PickInput,
  ...selectors: PropertySelector[]
): PickResult<PickInput> {
  return pickDeepWith({ selectors }, object);
}
