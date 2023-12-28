/**
 * Represents a type that prettifies another type by preserving its keys and adding an empty object.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

/**
 * Represents the key of any object, so `string`, `number` or `Symbol`.
 */
export type Key = keyof any;

/**
 * Represents a non-primitive object that can be merged.
 */
export type NonPrimitiveObject =
  | Array<any>
  | Function
  | Date
  | RegExp
  | Map<any, any>
  | WeakMap<any, any>
  | Set<any>
  | WeakSet<any>
  | Promise<any>
  | Error
  | URL
  | URLSearchParams
  | Buffer
  | ArrayBuffer
  | SharedArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

/**
 * Represents a function that selects properties to merge.
 *
 * @param key - The key of the property being merged.
 * @param value - The value of the property being merged.
 * @returns `true` if the property should be merged, `false` otherwise.
 */
export type PropertySelectorFunction = (key: Key, value: any) => boolean;

/**
 * Represents a property selector for selecting properties to merge.
 */
export type PropertySelector =
  | Key
  | PropertySelectorFunction
  | PropertySelector[]
  | Set<PropertySelector>
  | Map<Key, any>;
