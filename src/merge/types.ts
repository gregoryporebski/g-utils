export type MergeKeyMatch = (key: keyof any) => boolean;

export type MergeValueMatch = (value: any) => boolean;

export type MergeStrategy = <A, B, Result>(
  a: A,
  b: B,
  key: keyof any
) => Result;

export type MergeOptions = {
  array?: "replace" | "concat" | MergeStrategy;
  boolean?: "replace" | "and" | "or" | MergeStrategy;
  custom?: {
    key?: keyof any | MergeKeyMatch;
    value?: any | MergeValueMatch;
    strategy?: MergeStrategy;
  }[];
  function?: "replace" | "concat" | MergeStrategy;
  null?: "replace" | "omit" | MergeStrategy;
  number?: "replace" | "add" | MergeStrategy;
  object?: "replace" | "concat" | MergeStrategy;
  omit?: {
    key?: (keyof any | MergeKeyMatch)[];
    value?: (any | MergeValueMatch)[];
  };
  pick?: {
    key?: (keyof any | MergeKeyMatch)[];
    value?: (any | MergeValueMatch)[];
  };
  string?: "replace" | "concat" | MergeStrategy;
  symbol?: "replace" | MergeStrategy;
  undefined?: "replace" | "omit" | MergeStrategy;
};

export type MergeResult<Objects extends any[]> = Objects extends [
  infer Head,
  ...infer Tail
]
  ? Head extends {}
    ? Head & MergeResult<Tail>
    : never
  : {};
