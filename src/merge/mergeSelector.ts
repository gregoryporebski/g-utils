import { MergeSelectorFactory } from "./types";

export const mergeSelectorFactory: MergeSelectorFactory =
  (key, value) => (selectors) => {
    return selectors.some((selector) => {
      return selector(key, value);
    });
  };
