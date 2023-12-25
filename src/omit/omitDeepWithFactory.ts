import omitDeepWith from "./omitDeepWith";
import type { OmitFactory } from "./types";

const omitDeepWithFactory: OmitFactory = (options) => (object) =>
  omitDeepWith(options, object);

export default omitDeepWithFactory;
