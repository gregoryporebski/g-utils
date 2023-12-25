import { NonPrimitiveObject, Prettify, PropertySelector } from "@/types";

/**
 * Represents the strategy for merging common values.
 * - "replace": Replaces the existing value with the new value.
 * - "keep": Keeps the existing value and ignores the new value.
 */
export type MergeCommonStrategy = "replace" | "keep";

/**
 * Represents a function that defines the merge strategy for merging two values.
 * @param a - The first value to be merged.
 * @param b - The second value to be merged.
 * @param key - The key indicating the property being merged.
 * @returns The merged value.
 */
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

/**
 * Represents a custom merge strategy for merging objects.
 */
export type MergeCustomStrategy = {
  selector: PropertySelector;
  strategy: MergeStrategy;
};

export type MergeResolverFactory = (
  a: any,
  b: any,
  key: keyof any
) => (strategy?: MergeStrategy) => [keyof any, PropertyDescriptor];

export type MergeSelectorFactory = (
  key: keyof any,
  value: any
) => (selectors: PropertySelector[]) => boolean;

/**
 * Options for merging objects using the merge utility.
 * @group merge
 */
export type MergeOptions = {
  /**
   * Strategy for merging arrays.
   * @default `concat`
   * @example
   * mergeWith({ array: "replace" }, { a: [1, 2] }, { a: [3, 4] }); // { a: [3, 4] }
   * mergeWith({ array: "keep" }, { a: [1, 2] }, { a: [3, 4] }); // { a: [1, 2] }
   * mergeWith({ array: "concat" }, { a: [1, 2] }, { a: [3, 4] }); // { a: [1, 2, 3, 4] }
   * mergeWith({ array: (a, b) => [...a, ...b] }, { a: [1, 2] }, { a: [3, 4] }); // { a: [1, 2, 3, 4] }
   */
  array?: MergeCommonStrategy | "concat" | MergeStrategyFunction;

  /**
   * Strategy for merging booleans.
   * @default `replace`
   */
  boolean?: MergeCommonStrategy | "and" | "or" | MergeStrategyFunction;

  /**
   * Array of custom merge strategy functions.
   */
  custom?: MergeCustomStrategy[];

  /**
   * Enable debug mode for logging merge details.
   */
  debug?: boolean;

  /**
   * Enable deep merging of nested objects.
   */
  deep?: boolean;

  /**
   * Strategy for merging functions.
   * @prop replace - Replaces the existing function with the new function.
   * @prop keep - Keeps the existing function and ignores the new function.
   * @prop concat - Concatenates the functions.
   */
  function?: MergeCommonStrategy | "concat" | MergeStrategyFunction;

  /**
   * Strategy for merging mismatched types.
   * - `MergeStrategyFunction`: A custom merge strategy function.
   * - `undefined` or `null`: The default strategy is used.
   */
  mismatch?: MergeCommonStrategy | MergeStrategyFunction;

  /**
   * Strategy for merging null values.
   * - `MergeStrategyFunction`: A custom merge strategy function.
   * - `undefined` or `null`: The default strategy is used.
   */
  null?: MergeCommonStrategy | MergeStrategyFunction;

  /**
   * Strategy for merging numbers.
   * - `"add"`: Adds the numbers.
   * - `"subtract"`: Subtracts the numbers.
   * - `MergeStrategyFunction`: A custom merge strategy function.
   * - `undefined` or `null`: The default strategy is used.
   */
  number?: MergeCommonStrategy | "add" | "subtract" | MergeStrategyFunction;

  /**
   * Strategy for merging objects.
   * - `undefined` or `null`: The default strategy is used.
   * - `"concat"`: Concatenates the objects.
   * - `MergeStrategyFunction`: A custom merge strategy function.
   */
  object?: MergeCommonStrategy | "concat" | MergeStrategyFunction;

  /**
   * Select properties to omit from the merge.
   */
  omit?: PropertySelector[];

  /**
   * Select properties to pick from the merge.
   */
  pick?: PropertySelector[];

  /**
   * Factory function for creating a merge resolver.
   */
  resolver?: MergeResolverFactory;

  /**
   * Factory function for creating a merge selector.
   */
  selector?: MergeSelectorFactory;

  /**
   * Strategy for merging strings.
   * - `undefined` or `null`: The default strategy is used.
   * - `"concat"`: Concatenates the strings.
   * - `MergeStrategyFunction`: A custom merge strategy function.
   */
  string?: MergeCommonStrategy | "concat" | MergeStrategyFunction;

  /**
   * Strategy for merging symbols.
   * - `undefined` or `null`: The default strategy is used.
   * - `MergeStrategyFunction`: A custom merge strategy function.
   */
  symbol?: MergeCommonStrategy | MergeStrategyFunction;

  /**
   * Strategy for merging undefined values.
   * - `undefined` or `null`: The default strategy is used.
   * - `MergeStrategyFunction`: A custom merge strategy function.
   */
  undefined?: MergeCommonStrategy | MergeStrategyFunction;
};

/**
 * Represents the result of merging multiple primitive objects .
 * @template MergeInput - Primitive objects to be merged.
 * @returns Union type representing the possible merge results.
 * @group merge
 * @example
 * MergeResult<{ a: string }, { b: number }>; // { a: string } | { b: number }
 * MergeResult<string, { b: number }>; // { b: number }
 * MergeResult<string, number>; // null
 */
export type MergeResult<
  MergeInput extends any[],
  IsResultValid extends boolean = false,
> = Prettify<
  MergeInput extends [infer Head, ...infer Tail]
    ? Head extends object
      ? Head extends NonPrimitiveObject
        ? null | MergeResult<Tail, IsResultValid>
        : Head | MergeResult<Tail, true>
      : MergeResult<Tail, IsResultValid>
    : IsResultValid extends true
      ? never
      : null
>;

export type MergeFactory = (
  options: MergeOptions
) => <Objects extends any[]>(...objects: Objects) => MergeResult<Objects>;
