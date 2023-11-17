export type MergeKeyMatch = (key: keyof any) => boolean;

export type MergeValueMatch = (value: any) => boolean;

export type MergeCommonStrategy = "replace" | "keep";

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
  array?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  boolean?: MergeCommonStrategy | "and" | "or" | MergeStrategyFunction;
  custom?: MergeCustomResolver[];
  deep?: boolean;
  function?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  mismatch?: MergeCommonStrategy | MergeStrategyFunction;
  null?: MergeCommonStrategy | MergeStrategyFunction;
  number?: MergeCommonStrategy | "add" | "subtract" | MergeStrategyFunction;
  object?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  omit?: MergeSelector[];
  pick?: MergeSelector[];
  resolver?: MergeResolverFactory;
  string?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  symbol?: MergeCommonStrategy | MergeStrategyFunction;
  undefined?: MergeCommonStrategy | MergeStrategyFunction;
};

export type MergeResult<Objects extends any[]> = Objects extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends {}
    ? Head & MergeResult<Tail>
    : never
  : {};
