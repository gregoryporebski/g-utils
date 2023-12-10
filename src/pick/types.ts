import { MergeOptions, MergeResult } from "@/merge";

export type PickOptions = MergeOptions["pick"];

export type PickResult<PickInput extends object> = Partial<
  MergeResult<[PickInput]>
>;
