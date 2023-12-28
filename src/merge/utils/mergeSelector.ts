import { isIterable } from "@/type-guards";
import { isObject } from "typesafe-utils";
import { MergeSelectorFactory } from "../types";

const mergeSelectorFactory: MergeSelectorFactory =
  (key, value) =>
  (...selectors) => {
    return selectors.some((selector) => {
      if (typeof selector === "function") {
        return selector(key, value);
      }

      if (isObject(selector) && isIterable(selector)) {
        return mergeSelectorFactory(key, value)(...selector);
      }

      return selector == key;
    });
  };

export default mergeSelectorFactory;
