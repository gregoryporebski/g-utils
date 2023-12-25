import { MergeSelectorFactory } from "../types";

const mergeSelectorFactory: MergeSelectorFactory =
  (key, value) => (selectors) => {
    return selectors.some((selector) => {
      if (typeof selector === "function") {
        return selector(key, value);
      }

      return selector === key;
    });
  };

export default mergeSelectorFactory;
