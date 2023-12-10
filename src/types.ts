export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

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
