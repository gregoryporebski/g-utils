import { MergeResult } from "@/merge";
import { PropertySelector } from "@/types";

export type OmitOptions = {
  selectors?: PropertySelector[];
  deep?: boolean;
};

export type OmitResult<OmitInput extends object> = Partial<
  MergeResult<[OmitInput]>
>;

export type OmitFactory = (
  options: OmitOptions
) => <Object extends object>(object: Object) => OmitResult<Object>;
