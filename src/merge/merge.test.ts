import { describe, expect, it } from "bun:test";
import merge from "./merge";

describe("merge", () => {
  it("should handle no objects", () => {
    const result = merge();

    expect(result).toEqual({});
  });

  it("should handle empty objects", () => {
    const result = merge({}, {}, {});

    expect(result).toEqual({});
  });

  it("should merge multiple objects into one", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { c: 3 };
    const obj3 = { d: 4, e: 5 };

    const result = merge(obj1, obj2, obj3);

    expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 });
  });

  it("should handle objects with overlapping keys", () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const obj3 = { c: 5, d: 6 };

    const result = merge(obj1, obj2, obj3);

    expect(result).toEqual({ a: 1, b: 3, c: 5, d: 6 });
  });

  it("should handle objects with arrays", () => {
    const obj1 = { a: [1, 2] };
    const obj2 = { a: [3, 4] };
    const obj3 = { a: [5, 6] };

    const result = merge(obj1, obj2, obj3);

    expect(result).toEqual({ a: [1, 2, 3, 4, 5, 6] });
  });

  it("should handle objects with different data types", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: "hello" };
    const obj3 = { c: true };

    const result = merge(obj1, obj2, obj3);

    expect(result).toEqual({ a: 1, b: "hello", c: true });
  });

  it("should handle objects with nested objects", () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { c: 2 } };
    const obj3 = { a: { d: 3 } };

    const result = merge(obj1, obj2, obj3);

    expect(result).toEqual({ a: { b: 1, c: 2, d: 3 } });
  });

  it("should not handle objects with nested arrays", () => {
    const obj1 = { a: { b: [1, 2] } };
    const obj2 = { a: { b: [3, 4] } };
    const obj3 = { a: { b: [5, 6] } };

    const result = merge(obj1, obj2, obj3);

    expect(result).toEqual({ a: { b: [5, 6] } });
  });
});
