// @ts-ignore

import { describe, expect, test } from "bun:test";
import omit from "./omit";

describe("omit", () => {
  test("empty", () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj)).toEqual(obj);
  });

  describe("undefined", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, undefined)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, undefined, undefined)).toEqual(obj);
    });
  });

  describe("null", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, null)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, null, null)).toEqual(obj);
    });
  });

  describe("string", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      expect(omit(obj, "a")).toEqual({ b: 2, c: 3 });
    });

    test("multiple keys", () => {
      expect(omit(obj, "a", "b")).toEqual({ c: 3 });
    });

    test("non-existing single key", () => {
      expect(omit(obj, "d")).toEqual(obj);
    });

    test("non-existing multiple keys", () => {
      expect(omit(obj, "d", "e")).toEqual(obj);
    });

    test("mixed existing and non-existing keys", () => {
      expect(omit(obj, "c", "e")).toEqual({ a: 1, b: 2 });
    });
  });

  describe("number", () => {
    const obj = { 0: "a", 1: "b", 2: "c" };

    test("single key", () => {
      expect(omit(obj, 0)).toEqual({ 1: "b", 2: "c" });
    });

    test("multiple keys", () => {
      expect(omit(obj, 0, 1)).toEqual({ 2: "c" });
    });

    test("non-existing single key", () => {
      expect(omit(obj, 3)).toEqual(obj);
    });

    test("non-existing multiple keys", () => {
      expect(omit(obj, 3, 4)).toEqual(obj);
    });

    test("mixed existing and non-existing keys", () => {
      expect(omit(obj, 2, 4)).toEqual({ 0: "a", 1: "b" });
    });
  });

  describe("boolean", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, true)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, true, false)).toEqual(obj);
    });
  });

  describe("array", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("empty array", () => {
      expect(omit(obj, [])).toEqual(obj);
    });

    describe("string", () => {
      test("single key array", () => {
        expect(omit(obj, ["a"])).toEqual({ b: 2, c: 3 });
      });

      test("multiple keys array", () => {
        expect(omit(obj, ["a", "b"])).toEqual({ c: 3 });
      });

      test("non-existing single key array", () => {
        expect(omit(obj, ["d"])).toEqual(obj);
      });

      test("non-existing multiple keys array", () => {
        expect(omit(obj, ["d", "e"])).toEqual(obj);
      });

      test("mixed existing and non-existing keys array", () => {
        expect(omit(obj, ["c", "e"])).toEqual({ a: 1, b: 2 });
      });
    });

    describe("number", () => {
      const obj = { 0: "a", 1: "b", 2: "c" };

      test("single key array", () => {
        expect(omit(obj, [0])).toEqual({ 1: "b", 2: "c" });
      });

      test("multiple keys array", () => {
        expect(omit(obj, [0, 1])).toEqual({ 2: "c" });
      });

      test("non-existing single key array", () => {
        expect(omit(obj, [3])).toEqual(obj);
      });

      test("non-existing multiple keys array", () => {
        expect(omit(obj, [3, 4])).toEqual(obj);
      });

      test("mixed existing and non-existing keys array", () => {
        expect(omit(obj, [2, 4])).toEqual({ 0: "a", 1: "b" });
      });
    });

    describe("Symbol", () => {
      const a = Symbol("a");
      const b = Symbol("b");
      const c = Symbol("c");
      const obj = { [a]: 1, [b]: 2, [c]: 3 };

      test("single key array", () => {
        expect(omit(obj, [a])).toEqual({ [b]: 2, [c]: 3 });
      });

      test("multiple keys array", () => {
        expect(omit(obj, [a, b])).toEqual({ [c]: 3 });
      });

      test("non-existing single key array", () => {
        expect(omit(obj, [Symbol("d")])).toEqual(obj);
      });

      test("non-existing multiple keys array", () => {
        expect(omit(obj, [Symbol("d"), Symbol("e")])).toEqual(obj);
      });

      test("mixed existing and non-existing keys array", () => {
        expect(omit(obj, [c, Symbol("e")])).toEqual({ [a]: 1, [b]: 2 });
      });
    });
  });

  describe("object", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, {})).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, {}, {})).toEqual(obj);
    });
  });

  describe("function", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const fn = () => {};

    test("invalid function", () => {
      // @ts-expect-error
      expect(omit(obj, fn)).toEqual(obj);
      // @ts-expect-error
      expect(omit(obj, fn, fn)).toEqual(obj);
    });

    test("single key function", () => {
      expect(omit(obj, (k) => k == "a")).toEqual({ b: 2, c: 3 });
      expect(omit(obj, (k) => k == "d")).toEqual(obj);
    });

    test("multiple key functions", () => {
      expect(
        omit(
          obj,
          (k) => k == "a",
          (k) => k == "b"
        )
      ).toEqual({ c: 3 });
    });

    test("single key-value function", () => {
      expect(omit(obj, (k, v) => v == 1)).toEqual({ b: 2, c: 3 });
      expect(omit(obj, (k, v) => v == 4)).toEqual(obj);
    });

    test("multiple key-value functions", () => {
      expect(
        omit(
          obj,
          (k, v) => v == 1,
          (k, v) => v == 2
        )
      ).toEqual({ c: 3 });
    });

    test("mixed key and key-value functions", () => {
      expect(
        omit(
          obj,
          (k) => k == "c",
          (k, v) => v == 1
        )
      ).toEqual({
        b: 2,
      });
    });
  });

  describe("Date", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, new Date())).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, new Date(), new Date())).toEqual(obj);
    });
  });

  describe("RegExp", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, /a/)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, /a/, /b/)).toEqual(obj);
    });
  });

  describe("Symbol", () => {
    const a = Symbol("a");
    const b = Symbol("b");
    const c = Symbol("c");
    const obj = { [a]: 1, [b]: 2, [c]: 3 };

    test("single symbol", () => {
      expect(omit(obj, a)).toEqual({ [b]: 2, [c]: 3 });
    });

    test("multiple symbols", () => {
      expect(omit(obj, a, b)).toEqual({ [c]: 3 });
    });

    test("non-existing single symbol", () => {
      expect(omit(obj, Symbol("d"))).toEqual(obj);
    });

    test("non-existing multiple symbols", () => {
      expect(omit(obj, Symbol("d"), Symbol("e"))).toEqual(obj);
    });

    test("mixed existing and non-existing symbols", () => {
      expect(omit(obj, c, Symbol("e"))).toEqual({ [a]: 1, [b]: 2 });
    });
  });

  describe("BigInt", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, 1n)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, 1n, 2n)).toEqual(obj);
    });
  });

  describe("Map", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("empty map", () => {
      expect(omit(obj, new Map())).toEqual(obj);
    });

    describe("string", () => {
      test("single key map", () => {
        expect(omit(obj, new Map([["a", 1]]))).toEqual({ b: 2, c: 3 });
      });

      test("multiple keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              ["a", 1],
              ["b", 2],
            ])
          )
        ).toEqual({ c: 3 });
      });

      test("non-existing single key map", () => {
        expect(omit(obj, new Map([["d", 4]]))).toEqual(obj);
      });

      test("non-existing multiple keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              ["d", 4],
              ["e", 5],
            ])
          )
        ).toEqual(obj);
      });

      test("mixed existing and non-existing keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              ["c", 3],
              ["e", 5],
            ])
          )
        ).toEqual({
          a: 1,
          b: 2,
        });
      });
    });

    describe("number", () => {
      const obj = { 0: "a", 1: "b", 2: "c" };

      test("single key map", () => {
        expect(omit(obj, new Map([[0, "a"]]))).toEqual({ 1: "b", 2: "c" });
      });

      test("multiple keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              [0, "a"],
              [1, "b"],
            ])
          )
        ).toEqual({ 2: "c" });
      });

      test("non-existing single key map", () => {
        expect(omit(obj, new Map([[3, "d"]]))).toEqual(obj);
      });

      test("non-existing multiple keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              [3, "d"],
              [4, "e"],
            ])
          )
        ).toEqual(obj);
      });

      test("mixed existing and non-existing keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              [2, "c"],
              [4, "e"],
            ])
          )
        ).toEqual({ 0: "a", 1: "b" });
      });
    });

    describe("Symbol", () => {
      const a = Symbol("a");
      const b = Symbol("b");
      const c = Symbol("c");
      const obj = { [a]: 1, [b]: 2, [c]: 3 };

      test("single key map", () => {
        expect(omit(obj, new Map([[a, 1]]))).toEqual({ [b]: 2, [c]: 3 });
      });

      test("multiple keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              [a, 1],
              [b, 2],
            ])
          )
        ).toEqual({ [c]: 3 });
      });

      test("non-existing single key map", () => {
        expect(omit(obj, new Map([[Symbol("d"), 4]]))).toEqual(obj);
      });

      test("non-existing multiple keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              [Symbol("d"), 4],
              [Symbol("e"), 5],
            ])
          )
        ).toEqual(obj);
      });

      test("mixed existing and non-existing keys map", () => {
        expect(
          omit(
            obj,
            new Map([
              [c, 3],
              [Symbol("e"), 5],
            ])
          )
        ).toEqual({ [a]: 1, [b]: 2 });
      });
    });
  });

  describe("WeakMap", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("empty weak map", () => {
      // @ts-expect-error
      expect(omit(obj, new WeakMap())).toEqual(obj);
    });

    test("single key weak map", () => {
      // @ts-expect-error
      expect(omit(obj, new WeakMap([[{}, 1]]))).toEqual(obj);
    });

    test("multiple keys weak map", () => {
      expect(
        omit(
          obj,
          // @ts-expect-error
          new WeakMap([
            [{}, 1],
            [{}, 2],
          ])
        )
      ).toEqual(obj);
    });
  });

  describe("Set", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("empty set", () => {
      expect(omit(obj, new Set())).toEqual(obj);
    });

    describe("string", () => {
      test("single key set", () => {
        expect(omit(obj, new Set(["a"]))).toEqual({ b: 2, c: 3 });
      });

      test("multiple keys set", () => {
        expect(omit(obj, new Set(["a", "b"]))).toEqual({ c: 3 });
      });

      test("non-existing single key set", () => {
        expect(omit(obj, new Set(["d"]))).toEqual(obj);
      });

      test("non-existing multiple keys set", () => {
        expect(omit(obj, new Set(["d", "e"]))).toEqual(obj);
      });

      test("mixed existing and non-existing keys set", () => {
        expect(omit(obj, new Set(["c", "e"]))).toEqual({ a: 1, b: 2 });
      });
    });

    describe("number", () => {
      const obj = { 0: "a", 1: "b", 2: "c" };

      test("single key set", () => {
        expect(omit(obj, new Set([0]))).toEqual({ 1: "b", 2: "c" });
      });

      test("multiple keys set", () => {
        expect(omit(obj, new Set([0, 1]))).toEqual({ 2: "c" });
      });

      test("non-existing single key set", () => {
        expect(omit(obj, new Set([3]))).toEqual(obj);
      });

      test("non-existing multiple keys set", () => {
        expect(omit(obj, new Set([3, 4]))).toEqual(obj);
      });

      test("mixed existing and non-existing keys set", () => {
        expect(omit(obj, new Set([2, 4]))).toEqual({ 0: "a", 1: "b" });
      });
    });

    describe("Symbol", () => {
      const a = Symbol("a");
      const b = Symbol("b");
      const c = Symbol("c");
      const obj = { [a]: 1, [b]: 2, [c]: 3 };

      test("single key set", () => {
        expect(omit(obj, new Set([a]))).toEqual({ [b]: 2, [c]: 3 });
      });

      test("multiple keys set", () => {
        expect(omit(obj, new Set([a, b]))).toEqual({ [c]: 3 });
      });

      test("non-existing single key set", () => {
        expect(omit(obj, new Set([Symbol("d")]))).toEqual(obj);
      });

      test("non-existing multiple keys set", () => {
        expect(omit(obj, new Set([Symbol("d"), Symbol("e")]))).toEqual(obj);
      });

      test("mixed existing and non-existing keys set", () => {
        expect(omit(obj, new Set([c, Symbol("e")]))).toEqual({
          [a]: 1,
          [b]: 2,
        });
      });
    });

    describe("function", () => {
      const obj = { a: 1, b: 2, c: 3 };
      const fn = () => {};

      test("invalid function", () => {
        // @ts-expect-error
        expect(omit(obj, new Set([fn]))).toEqual(obj);
      });

      test("single key function", () => {
        expect(omit(obj, new Set([(k) => k == "a"]))).toEqual({ b: 2, c: 3 });
        expect(omit(obj, new Set([(k) => k == "d"]))).toEqual(obj);
      });

      test("multiple key functions", () => {
        expect(omit(obj, new Set([(k) => k == "a", (k) => k == "b"]))).toEqual({
          c: 3,
        });
      });

      test("single key-value function", () => {
        expect(omit(obj, new Set([(k, v) => v == 1]))).toEqual({
          b: 2,
          c: 3,
        });
        expect(omit(obj, new Set([(k, v) => v == 4]))).toEqual(obj);
      });

      test("multiple key-value functions", () => {
        expect(
          omit(obj, new Set([(k, v) => v == 1, (k, v) => v == 2]))
        ).toEqual({ c: 3 });
      });

      test("mixed key and key-value functions", () => {
        expect(omit(obj, new Set([(k) => k == "c", (k, v) => v == 1]))).toEqual(
          {
            b: 2,
          }
        );
      });
    });
  });

  describe("WeakSet", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("empty weak set", () => {
      // @ts-expect-error
      expect(omit(obj, new WeakSet())).toEqual(obj);
    });

    test("single key weak set", () => {
      // @ts-expect-error
      expect(omit(obj, new WeakSet([{}]))).toEqual(obj);
    });

    test("multiple keys weak set", () => {
      expect(
        omit(
          obj,
          // @ts-expect-error
          new WeakSet([{}, {}])
        )
      ).toEqual(obj);
    });
  });

  describe("Promise", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, Promise.resolve("a"))).toEqual(obj);
    });

    test("multiple keys", () => {
      expect(
        omit(
          obj,
          // @ts-expect-error
          Promise.resolve("a"),
          Promise.resolve("b")
        )
      ).toEqual(obj);
    });
  });

  describe("Error", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, new Error())).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, new Error(), new Error())).toEqual(obj);
    });
  });

  describe("URL", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, new URL("http://localhost"))).toEqual(obj);
    });

    test("multiple keys", () => {
      expect(
        // @ts-expect-error
        omit(obj, new URL("http://localhost"), new URL("http://localhost"))
      ).toEqual(obj);
    });
  });

  describe("URLSearchParams", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, new URLSearchParams("a=1"))).toEqual({ b: 2, c: 3 });
    });

    test("multiple keys", () => {
      expect(
        // @ts-expect-error
        omit(obj, new URLSearchParams("a=1"), new URLSearchParams("b=1"))
      ).toEqual({ c: 3 });
    });
  });

  describe("Infinity", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      expect(omit(obj, Infinity)).toEqual(obj);
    });

    test("multiple keys", () => {
      expect(omit(obj, Infinity, -Infinity)).toEqual(obj);
    });
  });

  describe("NaN", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      expect(omit(obj, NaN)).toEqual(obj);
    });

    test("multiple keys", () => {
      expect(omit(obj, NaN, NaN)).toEqual(obj);
    });
  });

  describe("Buffer", () => {
    const obj = { a: 1, b: 2, c: 3 };

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, Buffer.from("a"))).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, Buffer.from("a"), Buffer.from("b"))).toEqual(obj);
    });
  });

  describe("ArrayBuffer", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const buffer = new ArrayBuffer(1);

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, buffer)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, buffer, buffer)).toEqual(obj);
    });
  });

  describe("SharedArrayBuffer", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const buffer = new SharedArrayBuffer(1);

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, buffer)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, buffer, buffer)).toEqual(obj);
    });
  });

  describe("DataView", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);

    test("single key", () => {
      // @ts-expect-error
      expect(omit(obj, view)).toEqual(obj);
    });

    test("multiple keys", () => {
      // @ts-expect-error
      expect(omit(obj, view, view)).toEqual(obj);
    });
  });

  describe("typed arrays", () => {
    describe("Int8Array", () => {
      const obj = { 0: "a", 1: "b", 2: "c" };
      const arr = new Int8Array(4);

      test("single key", () => {
        // @ts-expect-error
        expect(omit(obj, arr)).toEqual({ 1: "b", 2: "c" });
      });

      test("multiple keys", () => {
        // @ts-expect-error
        expect(omit(obj, arr, arr)).toEqual({ 1: "b", 2: "c" });
      });
    });
  });
});
