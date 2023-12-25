import { MergeResult } from "@/merge";
import { PropertySelector } from "@/types";

export type PickOptions = {
  selectors?: PropertySelector[];
  deep?: boolean;
};

export type PickResult<PickInput extends object> = Partial<
  MergeResult<[PickInput]>
>;

export type PickFactory = (
  options: PickOptions
) => <Object extends object>(object: Object) => PickResult<Object>;
