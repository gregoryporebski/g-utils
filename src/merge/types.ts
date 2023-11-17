export type MergeKeyMatch = (key: keyof any) => boolean;

export type MergeValueMatch = (value: any) => boolean;

export type CommonMergeStrategy = "replace" | "keep";

export type MergeStrategyFunction = <A, B, Result>(
  a: A,
  b: B,
  key: keyof any
) => Result;

export type MergeStrategy = Exclude<
  {
    [K in keyof MergeOptions]: MergeOptions[K] extends
      | string
      | MergeStrategyFunction
      | undefined
      ? MergeOptions[K]
      : never;
  }[keyof MergeOptions],
  undefined
>;

export type MergeSelector =
  | { key: keyof any | MergeKeyMatch }
  | { value: any | MergeValueMatch }
  | {
      key: keyof any | MergeKeyMatch;
      value: any | MergeValueMatch;
    };

export type MergeCustomResolver = MergeSelector & {
  strategy: MergeStrategy;
};

export type MergeResolverFactory = (
  a: any,
  b: any,
  key: keyof any
) => (strategy?: MergeStrategy) => any;

export type MergeOptions = {
  array?: CommonMergeStrategy | "concat" | MergeStrategyFunction;
  boolean?: CommonMergeStrategy | "and" | "or" | MergeStrategyFunction;
  custom?: MergeCustomResolver[];
  deep?: boolean;
  function?: CommonMergeStrategy | "concat" | MergeStrategyFunction;
  mismatch?: CommonMergeStrategy | MergeStrategyFunction;
  null?: CommonMergeStrategy | MergeStrategyFunction;
  number?: CommonMergeStrategy | "add" | "subtract" | MergeStrategyFunction;
  object?: CommonMergeStrategy | "concat" | MergeStrategyFunction;
  omit?: MergeSelector[];
  pick?: MergeSelector[];
  string?: CommonMergeStrategy | "concat" | MergeStrategyFunction;
  symbol?: CommonMergeStrategy | MergeStrategyFunction;
  undefined?: CommonMergeStrategy | MergeStrategyFunction;
};

export type MergeResult<Objects extends any[]> = Objects extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends {}
    ? Head & MergeResult<Tail>
    : never
  : {};
