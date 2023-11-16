export type MergeKeyMatch = (key: keyof any) => boolean;

export type MergeValueMatch = (value: any) => boolean;

export type MergeStrategy = <A, B, Result>(
  a: A,
  b: B,
  key: keyof any
) => Result;

export type MergeType = "replace" | "keep";

export type MergeOptions = {
  array?: MergeType | "concat" | MergeStrategy;
  boolean?: MergeType | "and" | "or" | MergeStrategy;
  custom?: {
    key?: keyof any | MergeKeyMatch;
    value?: any | MergeValueMatch;
    strategy?: MergeStrategy;
  }[];
  deep?: boolean;
  function?: MergeType | "concat" | MergeStrategy;
  mismatch?: MergeType | MergeStrategy;
  null?: MergeType | MergeStrategy;
  number?: MergeType | "add" | "subtract" | MergeStrategy;
  object?: MergeType | "concat" | MergeStrategy;
  omit?: {
    key?: (keyof any | MergeKeyMatch)[];
    value?: (any | MergeValueMatch)[];
  };
  pick?: {
    key?: (keyof any | MergeKeyMatch)[];
    value?: (any | MergeValueMatch)[];
  };
  string?: MergeType | "concat" | MergeStrategy;
  symbol?: MergeType | MergeStrategy;
  undefined?: MergeType | MergeStrategy;
};

export type MergeResult<Objects extends any[]> = Objects extends [
  infer Head,
  ...infer Tail
]
  ? Head extends {}
    ? Head & MergeResult<Tail>
    : never
  : {};

export type ResolveMergeStrategy<Strategy extends keyof MergeOptions> = (
  strategy: MergeOptions[Strategy],
  a: any,
  b: any,
  key: keyof any
) => any;
