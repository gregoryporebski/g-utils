import { describe, expect, it } from "bun:test";
import mergeDeep from "./mergeDeep";

describe("mergeDeep", () => {
  it("should merge objects deeply", () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { b: { d: 3 }, e: 4 };
    const obj3 = { f: 5 };

    const result = mergeDeep(obj1, obj2, obj3);

    expect(result).toEqual({
      a: 1,
      b: { c: 2, d: 3 },
      e: 4,
      f: 5,
    });
  });

  it("should handle empty objects", () => {
    const result = mergeDeep({}, {});

    expect(result).toEqual({});
  });

  it("should handle objects with arrays", () => {
    const obj1 = { a: [1, 2] };
    const obj2 = { a: [3, 4] };

    const result = mergeDeep(obj1, obj2);

    expect(result).toEqual({ a: [1, 2, 3, 4] });
  });

  it("should handle objects with different data types", () => {
    const obj1 = { a: 1, c: { d: [1, 2, 3] }, e: { f: 1 } };
    const obj2 = { b: "hello", c: { d: [4, 5, 6] }, e: { f: ["a"] } };

    const result = mergeDeep(obj1, obj2);

    expect(result).toEqual({
      a: 1,
      b: "hello",
      c: { d: [1, 2, 3, 4, 5, 6] },
      e: { f: ["a"] },
    });
  });
});
