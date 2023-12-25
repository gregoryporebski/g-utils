import { PropertySelector } from "@/types";
import { pickWith } from ".";
import { PickResult } from "./types";

export default function pick<PickInput extends object>(
  object: PickInput,
  ...selectors: PropertySelector[]
): PickResult<PickInput> {
  return pickWith({ selectors }, object);
}
