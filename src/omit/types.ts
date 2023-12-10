import { MergeOptions, MergeResult } from "@/merge";

export type OmitOptions = MergeOptions["omit"];

export type OmitResult<OmitInput extends object> = Partial<
  MergeResult<[OmitInput]>
>;
