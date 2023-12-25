import pickDeepWith from "./pickDeepWith";
import type { PickFactory } from "./types";

const pickDeepWithFactory: PickFactory = (options) => (object) =>
  pickDeepWith(options, object);

export default pickDeepWithFactory;
