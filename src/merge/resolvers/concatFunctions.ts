type Function<Args extends any[]> = (...args: Args) => any | Promise<any>;

export function concatFunctions<Args extends any[]>(
  a: Function<Args>,
  b: Function<Args>
) {
  return function (...args: Args) {
    a(...args);
    b(...args);
  };
}
