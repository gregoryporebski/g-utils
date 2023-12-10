import { describe, expect, test } from "bun:test";
import merge from "./merge";

describe("merge", () => {
  describe("not primitive objects", () => {
    test("undefined", () => {
      expect(merge(undefined)).toBe(null);
    });

    test("null", () => {
      expect(merge(null)).toBe(null);
    });

    test("string", () => {
      expect(merge("hello")).toBe(null);
    });

    test("number", () => {
      expect(merge(123)).toBe(null);
    });

    test("boolean", () => {
      expect(merge(true)).toBe(null);
    });

    test("array", () => {
      expect(merge([1, 2, 3])).toBe(null);
    });

    test("function", () => {
      expect(merge(() => {})).toBe(null);
    });

    test("Date", () => {
      expect(merge(new Date())).toBe(null);
    });

    test("RegExp", () => {
      expect(merge(/test/g)).toBe(null);
    });

    test("Symbol", () => {
      expect(merge(Symbol("test"))).toBe(null);
    });

    test("BigInt", () => {
      expect(merge(BigInt(123))).toBe(null);
    });

    test("Map", () => {
      expect(merge(new Map())).toBe(null);
    });

    test("Set", () => {
      expect(merge(new Set())).toBe(null);
    });

    test("Promise", () => {
      expect(merge(new Promise(() => {}))).toBe(null);
    });

    test("Error", () => {
      expect(merge(new Error())).toBe(null);
    });

    test("Infinity", () => {
      expect(merge(Infinity)).toBe(null);
      expect(merge(-Infinity)).toBe(null);
    });

    test("NaN", () => {
      expect(merge(NaN)).toBe(null);
      expect(merge(-NaN)).toBe(null);
    });

    test("Buffer", () => {
      expect(merge(Buffer.from("test"))).toBe(null);
    });

    test("ArrayBuffer", () => {
      expect(merge(new ArrayBuffer(8))).toBe(null);
    });
  });

  describe("two same type arguments", () => {
    test("undefined", () => {
      expect(merge(undefined, undefined)).toEqual(null);
    });

    test("null", () => {
      expect(merge(null, null)).toEqual(null);
    });

    test("string", () => {
      expect(merge("hello", "world")).toEqual(null);
    });

    test("number", () => {
      expect(merge(123, 456)).toEqual(null);
    });
  });

  test("two simple objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: 2 });
  });

  test("three simple objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    expect(merge(obj1, obj2, obj3)).toEqual({ a: 1, b: 2, c: 3 });
    expect(merge(obj3, obj2, obj1)).toEqual({ a: 1, b: 2, c: 3 });
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
});
