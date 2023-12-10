import { describe, expect, test } from "bun:test";
import mergeDeep from "./mergeDeep";

describe("mergeDeep", () => {
  test("should merge objects that are 3 levels deep", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: { d: 2 } } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: { c: 1, d: 2 } } });
  });

  test("should merge objects that are 5 levels deep", () => {
    const obj1 = { a: { b: { c: { d: { e: 1 } } } } };
    const obj2 = { a: { b: { c: { d: { f: 2 } } } } };
    expect(mergeDeep(obj1, obj2)).toEqual({
      a: { b: { c: { d: { e: 1, f: 2 } } } },
    });
  });

  test("should merge objects with different data types", () => {
    const obj1 = { a: { b: { c: 1, d: "test", e: true } } };
    const obj2 = { a: { b: { f: [1, 2, 3], g: { h: 2 }, i: null } } };
    expect(mergeDeep(obj1, obj2)).toEqual({
      a: {
        b: { c: 1, d: "test", e: true, f: [1, 2, 3], g: { h: 2 }, i: null },
      },
    });
  });

  test("should merge objects with arrays that contain objects", () => {
    const obj1 = { a: { b: [{ c: 1 }, { d: 2 }] } };
    const obj2 = { a: { b: [{ e: 3 }, { f: 4 }] } };

    expect(mergeDeep(obj1, obj2) as any).toEqual({
      a: {
        b: [{ c: 1 }, { d: 2 }, { e: 3 }, { f: 4 }],
      },
    });
  });

  test("should merge objects with nested arrays", () => {
    const obj1 = {
      a: {
        b: [
          [1, 2],
          [3, 4],
        ],
      },
    };
    const obj2 = {
      a: {
        b: [
          [5, 6],
          [7, 8],
        ],
      },
    };
    expect(mergeDeep(obj1, obj2)).toEqual({
      a: {
        b: [
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
        ],
      },
    });
  });

  test("should handle null values in deep objects", () => {
    const obj1 = { a: { b: { c: null } } };
    const obj2 = { a: { b: { d: 2 } } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: { c: null, d: 2 } } });
  });

  test("should handle undefined values in deep objects", () => {
    const obj1 = { a: { b: { c: undefined } } };
    const obj2 = { a: { b: { d: 2 } } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: { c: undefined, d: 2 } } });
  });

  test("should handle empty objects in deep objects", () => {
    const obj1 = { a: { b: {} } };
    const obj2 = { a: { b: { c: 2 } } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: { c: 2 } } });
  });

  test("should handle empty arrays in deep objects", () => {
    const obj1 = { a: { b: [] } };
    const obj2 = { a: { b: [2] } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: [2] } });
  });

  test("should handle multiple deep objects", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { d: { e: { f: 2 } } };
    const obj3 = { g: { h: { i: 3 } } };
    expect(mergeDeep(obj1, obj2, obj3)).toEqual({
      a: { b: { c: 1 } },
      d: { e: { f: 2 } },
      g: { h: { i: 3 } },
    });
  });

  test("should handle merging with a null object", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = null;
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: { c: 1 } } });
  });

  test("should handle merging with an undefined object", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = undefined;
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: { c: 1 } } });
  });

  test("should handle merging with a non-object", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = "not an object";
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: { c: 1 } } });
  });

  test("should handle merging when a property is an array in one object and a non-array in the other", () => {
    const obj1 = { a: { b: [1, 2, 3] } };
    const obj2 = { a: { b: "not an array" } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: "not an array" } });
  });

  test("should handle merging when a property is an object in one object and a non-object in the other", () => {
    const obj1 = { a: { b: { c: 1 } } };
    const obj2 = { a: { b: "not an object" } };
    expect(mergeDeep(obj1, obj2)).toEqual({ a: { b: "not an object" } });
  });
});
