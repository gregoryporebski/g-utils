import { MergeSelectorFactory } from "../types";

const mergeSelectorFactory: MergeSelectorFactory =
  (key, value) => (selectors) => {
    return selectors.some((selector) => {
      return selector(key, value);
    });
  };

export default mergeSelectorFactory;
