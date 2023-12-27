import type { TypeGuard } from "typesafe-utils";

export const isDataView = <T>(value: T): value is TypeGuard<DataView, T> =>
  value instanceof DataView;
