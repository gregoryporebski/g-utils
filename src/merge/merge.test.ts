import { describe, expect, test } from "bun:test";
import merge from "./merge";

describe("merge", () => {
  test("undefined", () => {
    expect(merge(undefined)).toBe(null);
    expect(merge(undefined, undefined)).toBe(null);
  });

  test("null", () => {
    expect(merge(null)).toBe(null);
    expect(merge(null, null)).toBe(null);
  });

  test("string", () => {
    expect(merge("hello")).toBe(null);
    expect(merge("hello", "world")).toBe(null);
  });

  test("number", () => {
    expect(merge(123)).toBe(null);
    expect(merge(123, 456)).toBe(null);
  });

  test("boolean", () => {
    expect(merge(true)).toBe(null);
    expect(merge(true, false)).toBe(null);
  });

  test("array", () => {
    expect(merge([1, 2, 3])).toBe(null);
    expect(merge([1, 2, 3], [4, 5, 6])).toBe(null);
  });

  test("function", () => {
    expect(merge(() => {})).toBe(null);
    expect(
      merge(
        () => {},
        () => {}
      )
    ).toBe(null);
  });

  test("Date", () => {
    expect(merge(new Date())).toBe(null);
    expect(merge(new Date(), new Date())).toBe(null);
  });

  test("RegExp", () => {
    expect(merge(/lorem/g)).toBe(null);
    expect(merge(/lorem/g, /ipsum/g)).toBe(null);
  });

  test("Symbol", () => {
    expect(merge(Symbol("lorem"))).toBe(null);
    expect(merge(Symbol("lorem"), Symbol("ipsum"))).toBe(null);
  });

  test("BigInt", () => {
    expect(merge(BigInt(123))).toBe(null);
    expect(merge(BigInt(123), BigInt(456))).toBe(null);
  });

  test("Map", () => {
    expect(merge(new Map())).toBe(null);
    expect(merge(new Map(), new Map())).toBe(null);
  });

  test("WeakMap", () => {
    expect(merge(new WeakMap())).toBe(null);
    expect(merge(new WeakMap(), new WeakMap())).toBe(null);
  });

  test("Set", () => {
    expect(merge(new Set())).toBe(null);
    expect(merge(new Set(), new Set())).toBe(null);
  });

  test("WeakSet", () => {
    expect(merge(new WeakSet())).toBe(null);
    expect(merge(new WeakSet(), new WeakSet())).toBe(null);
  });

  test("Promise", () => {
    expect(merge(new Promise(() => {}))).toBe(null);
    expect(merge(new Promise(() => {}), new Promise(() => {}))).toBe(null);
  });

  test("Error", () => {
    expect(merge(new Error())).toBe(null);
    expect(merge(new Error(), new Error())).toBe(null);
  });

  test("URL", () => {
    expect(merge(new URL("http://localhost"))).toBe(null);
    expect(
      merge(new URL("http://localhost"), new URL("http://localhost"))
    ).toBe(null);
  });

  test("URLSearchParams", () => {
    expect(merge(new URLSearchParams())).toBe(null);
    expect(merge(new URLSearchParams(), new URLSearchParams())).toBe(null);
  });

  test("Infinity", () => {
    expect(merge(Infinity)).toBe(null);
    expect(merge(Infinity, Infinity)).toBe(null);
    expect(merge(-Infinity)).toBe(null);
    expect(merge(-Infinity, -Infinity)).toBe(null);
  });

  test("NaN", () => {
    expect(merge(NaN)).toBe(null);
    expect(merge(NaN, NaN)).toBe(null);
    expect(merge(-NaN)).toBe(null);
    expect(merge(-NaN, -NaN)).toBe(null);
  });

  test("Buffer", () => {
    expect(merge(Buffer.from("lorem"))).toBe(null);
    expect(merge(Buffer.from("lorem"), Buffer.from("ipsum"))).toBe(null);
  });

  test("ArrayBuffer", () => {
    expect(merge(new ArrayBuffer(8))).toBe(null);
    expect(merge(new ArrayBuffer(8), new ArrayBuffer(8))).toBe(null);
  });

  test("SharedArrayBuffer", () => {
    expect(merge(new SharedArrayBuffer(8))).toBe(null);
    expect(merge(new SharedArrayBuffer(8), new SharedArrayBuffer(8))).toBe(
      null
    );
  });

  test("DataView", () => {
    expect(merge(new DataView(new ArrayBuffer(8)))).toBe(null);
    expect(
      merge(new DataView(new ArrayBuffer(8)), new DataView(new ArrayBuffer(8)))
    ).toBe(null);
  });

  describe("typed arrays", () => {
    test("Int8Array", () => {
      expect(merge(new Int8Array(8))).toBe(null);
      expect(merge(new Int8Array(8), new Int8Array(8))).toBe(null);
    });

    test("Uint8Array", () => {
      expect(merge(new Uint8Array(8))).toBe(null);
      expect(merge(new Uint8Array(8), new Uint8Array(8))).toBe(null);
    });

    test("Uint8ClampedArray", () => {
      expect(merge(new Uint8ClampedArray(8))).toBe(null);
      expect(merge(new Uint8ClampedArray(8), new Uint8ClampedArray(8))).toBe(
        null
      );
    });

    test("Int16Array", () => {
      expect(merge(new Int16Array(8))).toBe(null);
      expect(merge(new Int16Array(8), new Int16Array(8))).toBe(null);
    });

    test("Uint16Array", () => {
      expect(merge(new Uint16Array(8))).toBe(null);
      expect(merge(new Uint16Array(8), new Uint16Array(8))).toBe(null);
    });

    test("Int32Array", () => {
      expect(merge(new Int32Array(8))).toBe(null);
      expect(merge(new Int32Array(8), new Int32Array(8))).toBe(null);
    });

    test("Uint32Array", () => {
      expect(merge(new Uint32Array(8))).toBe(null);
      expect(merge(new Uint32Array(8), new Uint32Array(8))).toBe(null);
    });

    test("Float32Array", () => {
      expect(merge(new Float32Array(8))).toBe(null);
      expect(merge(new Float32Array(8), new Float32Array(8))).toBe(null);
    });

    test("Float64Array", () => {
      expect(merge(new Float64Array(8))).toBe(null);
      expect(merge(new Float64Array(8), new Float64Array(8))).toBe(null);
    });
  });

  describe("objects with", () => {
    test("undefined properties", () => {
      const obj1 = { a: undefined };
      const obj2 = { a: undefined };
      expect(merge(obj1, obj2)).toEqual({ a: undefined });
    });

    test("null properties", () => {
      const obj1 = { a: null };
      const obj2 = { a: null };
      expect(merge(obj1, obj2)).toEqual({ a: null });
    });

    test("string properties", () => {
      const obj1 = { a: "hello" };
      const obj2 = { a: "world" };
      expect(merge(obj1, obj2)).toEqual({ a: "world" });
    });

    test("string keys", () => {
      const obj1 = { "hello world": 123 };
      const obj2 = { "hello world": 456 };
      expect(merge(obj1, obj2)).toEqual({ "hello world": 456 });
    });

    test("number properties", () => {
      const obj1 = { a: 123 };
      const obj2 = { a: 456 };
      expect(merge(obj1, obj2)).toEqual({ a: 456 });
    });

    test("number keys", () => {
      const obj1 = { 123: "hello" };
      const obj2 = { 123: "world" };
      expect(merge(obj1, obj2)).toEqual({ 123: "world" });
    });

    test("boolean properties", () => {
      const obj1 = { a: true };
      const obj2 = { a: false };
      expect(merge(obj1, obj2)).toEqual({ a: false });
    });

    test("symbol properties", () => {
      const obj1 = { a: Symbol("lorem") };
      const obj2 = { a: Symbol("ipsum") };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("symbol keys", () => {
      const key1 = Symbol("lorem");
      const key2 = Symbol("ipsum");
      const obj1 = { [key1]: "hello" };
      const obj2 = { [key2]: "world" };
      expect(merge(obj1, obj2)).toEqual({ [key1]: "hello", [key2]: "world" });
    });
  });

  test("overwrite properties", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: 2 });
  });

  test("nested objects", () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { c: 2 } };
    expect(merge(obj1, obj2)).toEqual({ a: { b: 1, c: 2 } });
  });

  test("overwrite nested properties", () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 2 } };
    expect(merge(obj1, obj2)).toEqual({ a: { b: 2 } });
  });

  test("arrays", () => {
    const obj1 = { a: [1, 2] };
    const obj2 = { a: [3, 4] };
    expect(merge(obj1, obj2)).toEqual({ a: [1, 2, 3, 4] });
    expect(merge(obj2, obj1)).toEqual({ a: [3, 4, 1, 2] });
  });

  test("null values", () => {
    const obj1 = { a: null };
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: null, b: 2 });
  });

  test("undefined values", () => {
    const obj1 = { a: undefined };
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: undefined, b: 2 });
  });

  test("empty objects", () => {
    const obj1 = {};
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ b: 2 });
    expect(merge(obj2, obj1)).toEqual({ b: 2 });
  });

  test("merging with a null object", () => {
    const obj1 = { a: 1 };
    const obj2 = null;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with an undefined object", () => {
    const obj1 = { a: 1 };
    const obj2 = undefined;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with a non-object", () => {
    const obj1 = { a: 1 };
    const obj2 = 2;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with a function", () => {
    const obj1 = { a: 1 };
    const obj2 = () => {};
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with a date object", () => {
    const obj1 = { a: 1 };
    const obj2 = new Date();
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with an array", () => {
    const obj1 = { a: 1 };
    const obj2 = [1, 2, 3];
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with a string", () => {
    const obj1 = { a: 1 };
    const obj2 = "hello";
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with a boolean", () => {
    const obj1 = { a: 1 };
    const obj2 = true;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with a symbol", () => {
    const obj1 = { a: 1 };
    const obj2 = Symbol("symbol");
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging with a BigInt", () => {
    const obj1 = { a: 1 };
    const obj2 = BigInt(123);
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("merging objects with Symbol properties", () => {
    const obj1 = { a: Symbol("symbol1") };
    const obj2 = { a: Symbol("symbol2") };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with Date properties", () => {
    const obj1 = { a: new Date(2021, 1, 1) };
    const obj2 = { a: new Date(2022, 1, 1) };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with function properties", () => {
    const obj1 = { a: () => {} };
    const obj2 = { a: () => {} };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with RegExp properties", () => {
    const obj1 = { a: /abc/ };
    const obj2 = { a: /def/ };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with Set properties", () => {
    const obj1 = { a: new Set([1, 2, 3]) };
    const obj2 = { a: new Set([4, 5, 6]) };
    expect(merge(obj1, obj2)).toEqual({ a: new Set([1, 2, 3, 4, 5, 6]) });
    expect(merge(obj2, obj1)).toEqual({ a: new Set([4, 5, 6, 1, 2, 3]) });
  });

  test("merging objects with Map properties", () => {
    const obj1 = { a: new Map().set("key1", "value1") };
    const obj2 = { a: new Map().set("key2", "value2") };
    expect(merge(obj1, obj2)).toEqual({
      a: new Map([
        ["key1", "value1"],
        ["key2", "value2"],
      ]),
    });
    expect(merge(obj2, obj1)).toEqual({
      a: new Map([
        ["key2", "value2"],
        ["key1", "value1"],
      ]),
    });
  });

  test("merging objects with Promise properties", () => {
    const obj1 = { a: Promise.resolve("value1") };
    const obj2 = { a: Promise.resolve("value2") };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with BigInt properties", () => {
    const obj1 = { a: BigInt(123) };
    const obj2 = { a: BigInt(456) };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with Buffer properties", () => {
    const obj1 = { a: Buffer.from("value1") };
    const obj2 = { a: Buffer.from("value2") };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with ArrayBuffer properties", () => {
    const obj1 = { a: new ArrayBuffer(8) };
    const obj2 = { a: new ArrayBuffer(8) };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("merging objects with NaN properties", () => {
    const obj1 = { a: NaN };
    const obj2 = { a: NaN };
    expect(merge(obj1, obj2)).toEqual({ a: NaN });
    expect(merge(obj2, obj1)).toEqual({ a: NaN });
  });

  test("merging objects with Infinity properties", () => {
    const obj1 = { a: Infinity };
    const obj2 = { a: Infinity };
    expect(merge(obj1, obj2)).toEqual({ a: Infinity });
    expect(merge(obj2, obj1)).toEqual({ a: Infinity });
  });

  test("merging objects with -Infinity properties", () => {
    const obj1 = { a: -Infinity };
    const obj2 = { a: -Infinity };
    expect(merge(obj1, obj2)).toEqual({ a: -Infinity });
    expect(merge(obj2, obj1)).toEqual({ a: -Infinity });
  });

  describe("crazy objects with", () => {
    test("empty prototype", () => {
      const obj1 = Object.create({});
      const obj2 = Object.create({});
      expect(merge(obj1, obj2)).toEqual({});
    });

    test("null prototype", () => {
      const obj1 = Object.create(null);
      const obj2 = Object.create(null);
      expect(merge(obj1, obj2)).toEqual(null as any);
    });

    test("Object.prototype", () => {
      expect(merge({}, {})).toEqual({});
    });

    test("custom prototype", () => {
      const proto = { a: 1 };
      const obj1 = Object.create(proto);
      const obj2 = Object.create(proto);
      expect(merge(obj1, obj2)).toEqual({});
    });
  });
});
