export type MergeCommonStrategy = "replace" | "keep";

export type MergeStrategyFunction = (a: any, b: any, key: keyof any) => any;

export type MergeStrategy =
  | Exclude<
      {
        [K in keyof MergeOptions]: MergeOptions[K] extends
          | string
          | MergeStrategyFunction
          | undefined
          ? MergeOptions[K]
          : never;
      }[keyof MergeOptions],
      undefined | MergeResolverFactory | MergeSelectorFactory
    >
  | MergeStrategyFunction;

export type MergeSelector = (key: keyof any, value: any) => boolean;

export type MergeCustomStrategy = {
  selector: MergeSelector;
  strategy: MergeStrategy;
};

export type MergeResolverFactory = (
  a: any,
  b: any,
  key: keyof any
) => (strategy?: MergeStrategy) => any;

export type MergeSelectorFactory = (
  key: keyof any,
  value: any
) => (selectors: MergeSelector[]) => boolean;

export type MergeOptions = {
  array?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  boolean?: MergeCommonStrategy | "and" | "or" | MergeStrategyFunction;
  custom?: MergeCustomStrategy[];
  deep?: boolean;
  function?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  mismatch?: MergeCommonStrategy | MergeStrategyFunction;
  null?: MergeCommonStrategy | MergeStrategyFunction;
  number?: MergeCommonStrategy | "add" | "subtract" | MergeStrategyFunction;
  object?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  omit?: MergeSelector[];
  pick?: MergeSelector[];
  resolver?: MergeResolverFactory;
  selector?: MergeSelectorFactory;
  string?: MergeCommonStrategy | "concat" | MergeStrategyFunction;
  symbol?: MergeCommonStrategy | MergeStrategyFunction;
  undefined?: MergeCommonStrategy | MergeStrategyFunction;
};

export type MergeResult<Objects extends any[]> = Objects extends [
  infer Head,
  ...infer Tail,
]
  ? Head extends {}
    ? Head | MergeResult<Tail>
    : never
  : {};
