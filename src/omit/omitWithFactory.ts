import omitWith from "./omitWith";
import type { OmitFactory } from "./types";

const omitWithFactory: OmitFactory = (options) => (object) =>
  omitWith(options, object);

export default omitWithFactory;
