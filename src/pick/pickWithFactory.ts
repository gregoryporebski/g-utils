import pickWith from "./pickWith";
import type { PickFactory } from "./types";

const pickWithFactory: PickFactory = (options) => (object) =>
  pickWith(options, object);

export default pickWithFactory;
