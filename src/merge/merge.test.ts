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

    test("array properties", () => {
      const obj1 = { a: [1, 2] };
      const obj2 = { a: [3, 4] };
      expect(merge(obj1, obj2)).toEqual({ a: [1, 2, 3, 4] });
    });

    test("object properties", () => {
      const obj1 = { a: { b: 1 } };
      const obj2 = { a: { c: 2 } };
      expect(merge(obj1, obj2)).toEqual({ a: { b: 1, c: 2 } });
    });

    test("function properties", () => {
      const obj1 = { a: () => {} };
      const obj2 = { a: () => {} };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Date properties", () => {
      const obj1 = { a: new Date(2021, 1, 1) };
      const obj2 = { a: new Date(2022, 1, 1) };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("RegExp properties", () => {
      const obj1 = { a: /lorem/ };
      const obj2 = { a: /ipsum/ };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Symbol properties", () => {
      const obj1 = { a: Symbol("lorem") };
      const obj2 = { a: Symbol("ipsum") };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Symbol keys", () => {
      const key1 = Symbol("lorem");
      const key2 = Symbol("ipsum");
      const obj1 = { [key1]: "hello" };
      const obj2 = { [key2]: "world" };
      expect(merge(obj1, obj2)).toEqual({ [key1]: "hello", [key2]: "world" });
    });

    test("BigInt properties", () => {
      const obj1 = { a: BigInt(123) };
      const obj2 = { a: BigInt(456) };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Map properties", () => {
      const obj1 = { a: new Map().set("key1", "value1") };
      const obj2 = { a: new Map().set("key2", "value2") };
      expect(merge(obj1, obj2)).toEqual({
        a: new Map([
          ["key1", "value1"],
          ["key2", "value2"],
        ]),
      });
    });

    test("WeakMap properties", () => {
      const obj1 = { a: new WeakMap() };
      const obj2 = { a: new WeakMap() };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Set properties", () => {
      const obj1 = { a: new Set().add(1) };
      const obj2 = { a: new Set().add(2) };
      expect(merge(obj1, obj2)).toEqual({ a: new Set([1, 2]) });
    });

    test("WeakSet properties", () => {
      const obj1 = { a: new WeakSet() };
      const obj2 = { a: new WeakSet() };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Promise properties", () => {
      const obj1 = { a: new Promise(() => "lorem") };
      const obj2 = { a: new Promise(() => "ipsum") };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Error properties", () => {
      const obj1 = { a: new Error("lorem") };
      const obj2 = { a: new Error("ipsum") };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("URL properties", () => {
      const obj1 = { a: new URL("http://lorem.com") };
      const obj2 = { a: new URL("http://ipsum.com") };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("URLSearchParams properties", () => {
      const obj1 = { a: new URLSearchParams("lorem=1") };
      const obj2 = { a: new URLSearchParams("ipsum=2") };
      expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    });

    test("Infinity properties", () => {
      const obj1 = { a: Infinity };
      const obj2 = { a: -Infinity };
      expect(merge(obj1, obj2)).toEqual({ a: -Infinity });
    });

    test("NaN properties", () => {
      const obj1 = { a: NaN };
      const obj2 = { a: -NaN };
      expect(merge(obj1, obj2)).toEqual({ a: -NaN });
    });

    test("Buffer properties", () => {
      const obj1 = { a: Buffer.from("lorem") };
      const obj2 = { a: Buffer.from("ipsum") };
      const merged = merge(obj1, obj2);
      expect(merged).toEqual({ a: obj2.a });
      expect(merged.a).toBe(obj2.a);
    });

    test("ArrayBuffer properties", () => {
      const obj1 = { a: new ArrayBuffer(4) };
      const obj2 = { a: new ArrayBuffer(8) };
      const merged = merge(obj1, obj2);
      expect(merged).toEqual({ a: obj2.a });
      expect(merged.a).toBe(obj2.a);
    });

    test("SharedArrayBuffer properties", () => {
      const obj1 = { a: new SharedArrayBuffer(4) };
      const obj2 = { a: new SharedArrayBuffer(8) };
      const merged = merge(obj1, obj2);
      expect(merged).toEqual({ a: obj2.a });
      expect(merged.a).toBe(obj2.a);
    });

    test("DataView properties", () => {
      const obj1 = { a: new DataView(new ArrayBuffer(4)) };
      const obj2 = { a: new DataView(new ArrayBuffer(8)) };
      const merged = merge(obj1, obj2);
      expect(merged).toEqual({ a: obj2.a });
      expect(merged.a).toBe(obj2.a);
    });

    describe("typed arrays", () => {
      test("Int8Array", () => {
        const obj1 = { a: new Int8Array(4) };
        const obj2 = { a: new Int8Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Uint8Array", () => {
        const obj1 = { a: new Uint8Array(4) };
        const obj2 = { a: new Uint8Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Uint8ClampedArray", () => {
        const obj1 = { a: new Uint8ClampedArray(4) };
        const obj2 = { a: new Uint8ClampedArray(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Int16Array", () => {
        const obj1 = { a: new Int16Array(4) };
        const obj2 = { a: new Int16Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Uint16Array", () => {
        const obj1 = { a: new Uint16Array(4) };
        const obj2 = { a: new Uint16Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Int32Array", () => {
        const obj1 = { a: new Int32Array(4) };
        const obj2 = { a: new Int32Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Uint32Array", () => {
        const obj1 = { a: new Uint32Array(4) };
        const obj2 = { a: new Uint32Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Float32Array", () => {
        const obj1 = { a: new Float32Array(4) };
        const obj2 = { a: new Float32Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("Float64Array", () => {
        const obj1 = { a: new Float64Array(4) };
        const obj2 = { a: new Float64Array(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });
    });

    describe("mixed properties", () => {
      test("undefined and null", () => {
        const obj1 = { a: undefined };
        const obj2 = { a: null };
        expect(merge(obj1, obj2)).toEqual({ a: null });
      });

      test("string and number", () => {
        const obj1 = { a: "hello" };
        const obj2 = { a: 123 };
        expect(merge(obj1, obj2)).toEqual({ a: 123 });
      });

      test("boolean and array", () => {
        const obj1 = { a: true };
        const obj2 = { a: [1, 2] };
        expect(merge(obj1, obj2)).toEqual({ a: [1, 2] });
      });

      test("object and function", () => {
        const obj1 = { a: { b: 1 } };
        const obj2 = { a: () => {} };
        expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
      });

      test("Date and RegExp", () => {
        const obj1 = { a: new Date(2021, 1, 1) };
        const obj2 = { a: /lorem/ };
        expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
      });

      test("Symbol and BigInt", () => {
        const obj1 = { a: Symbol("lorem") };
        const obj2 = { a: BigInt(123) };
        expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
      });

      test("Map and WeakMap", () => {
        const obj1 = { a: new Map() };
        const obj2 = { a: new WeakMap() };
        expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
      });

      test("Set and WeakSet", () => {
        const obj1 = { a: new Set() };
        const obj2 = { a: new WeakSet() };
        expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
      });

      test("Promise and Error", () => {
        const obj1 = { a: undefined };
        const obj2 = { a: /lorem/ };
        expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
      });

      test("URL and URLSearchParams", () => {
        const obj1 = { a: new URL("http://lorem.com") };
        const obj2 = { a: new URLSearchParams("ipsum=2") };
        expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
      });

      test("Infinity and NaN", () => {
        const obj1 = { a: Infinity };
        const obj2 = { a: NaN };
        expect(merge(obj1, obj2)).toEqual({ a: NaN });
      });

      test("Buffer and ArrayBuffer", () => {
        const obj1 = { a: Buffer.from("lorem") };
        const obj2 = { a: new ArrayBuffer(8) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });

      test("SharedArrayBuffer and DataView", () => {
        const obj1 = { a: new SharedArrayBuffer(8) };
        const obj2 = { a: new DataView(new ArrayBuffer(8)) };
        const merged = merge(obj1, obj2);
        expect(merged).toEqual({ a: obj2.a });
        expect(merged.a).toBe(obj2.a);
      });
    });
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

    test("circular references", () => {
      const obj1: any = { a: 1 };
      const obj2: any = { b: 2 };
      obj1.c = obj2;
      obj2.d = obj1;
      expect(merge(obj1, obj2)).toEqual({ a: 1, b: 2, c: obj2, d: obj1 });
    });

    test("getter/setter properties", () => {
      const obj1 = {
        get prop() {
          return 1;
        },
        set prop(value) {
          (this as any)._prop = value;
        },
      };
      const obj2 = { prop: 2 };
      expect(merge(obj1, obj2)).toEqual({ prop: 2 });
    });

    test("non-enumerable properties", () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      Object.defineProperty(obj1, "a", { enumerable: false });
      Object.defineProperty(obj2, "b", { enumerable: false });
      const merged = merge(obj1, obj2) as any;
      expect(merged.a).toEqual(obj1.a);
      expect(merged.b).toEqual(obj2.b);
    });

    test("non-configurable properties", () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      Object.defineProperty(obj1, "a", { configurable: false });
      Object.defineProperty(obj2, "b", { configurable: false });
      const merged = merge(obj1, obj2) as any;
      expect(merged.a).toEqual(obj1.a);
      expect(merged.b).toEqual(obj2.b);
    });

    test("non-writable properties", () => {
      const obj1 = { a: 1 };
      const obj2 = { b: 2 };
      Object.defineProperty(obj1, "a", { writable: false });
      Object.defineProperty(obj2, "b", { writable: false });
      const merged = merge(obj1, obj2) as any;
      expect(merged.a).toEqual(obj1.a);
      expect(merged.b).toEqual(obj2.b);
    });
  });
});
