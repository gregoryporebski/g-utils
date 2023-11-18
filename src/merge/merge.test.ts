import { describe, expect, test } from "bun:test";
import merge from "./merge";

describe("merge", () => {
  test("should handle no arguments", () => {
    expect(merge()).toEqual({});
  });

  test("should handle one argument", () => {
    const obj1 = { a: 1 };
    expect(merge(obj1)).toEqual({ a: 1 });
  });

  test("should merge two simple objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: 2 });
  });

  test("should overwrite existing properties", () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: 2 });
  });

  test("should merge nested objects", () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { c: 2 } };
    expect(merge(obj1, obj2)).toEqual({ a: { b: 1, c: 2 } });
  });

  test("should overwrite nested properties", () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 2 } };
    expect(merge(obj1, obj2)).toEqual({ a: { b: 2 } });
  });

  test("should merge arrays", () => {
    const obj1 = { a: [1, 2] };
    const obj2 = { a: [3, 4] };
    expect(merge(obj1, obj2)).toEqual({ a: [1, 2, 3, 4] });
    expect(merge(obj2, obj1)).toEqual({ a: [3, 4, 1, 2] });
  });

  test("should merge multiple objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    const obj3 = { c: 3 };
    expect(merge(obj1, obj2, obj3)).toEqual({ a: 1, b: 2, c: 3 });
    expect(merge(obj3, obj2, obj1)).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("should handle null values", () => {
    const obj1 = { a: null };
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: null, b: 2 });
  });

  test("should handle undefined values", () => {
    const obj1 = { a: undefined };
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ a: undefined, b: 2 });
  });

  test("should handle empty objects", () => {
    const obj1 = {};
    const obj2 = { b: 2 };
    expect(merge(obj1, obj2)).toEqual({ b: 2 });
    expect(merge(obj2, obj1)).toEqual({ b: 2 });
  });

  test("should handle merging with a null object", () => {
    const obj1 = { a: 1 };
    const obj2 = null;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with an undefined object", () => {
    const obj1 = { a: 1 };
    const obj2 = undefined;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with a non-object", () => {
    const obj1 = { a: 1 };
    const obj2 = 2;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with a function", () => {
    const obj1 = { a: 1 };
    const obj2 = () => {};
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with a date object", () => {
    const obj1 = { a: 1 };
    const obj2 = new Date();
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with an array", () => {
    const obj1 = { a: 1 };
    const obj2 = [1, 2, 3];
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with a string", () => {
    const obj1 = { a: 1 };
    const obj2 = "hello";
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with a boolean", () => {
    const obj1 = { a: 1 };
    const obj2 = true;
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with a symbol", () => {
    const obj1 = { a: 1 };
    const obj2 = Symbol("symbol");
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging with a BigInt", () => {
    const obj1 = { a: 1 };
    const obj2 = BigInt(123);
    expect(merge(obj1, obj2)).toEqual({ a: 1 });
    expect(merge(obj2, obj1)).toEqual({ a: 1 });
  });

  test("should handle merging objects with Symbol properties", () => {
    const obj1 = { a: Symbol("symbol1") };
    const obj2 = { a: Symbol("symbol2") };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("should handle merging objects with Date properties", () => {
    const obj1 = { a: new Date(2021, 1, 1) };
    const obj2 = { a: new Date(2022, 1, 1) };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("should handle merging objects with function properties", () => {
    const obj1 = { a: () => {} };
    const obj2 = { a: () => {} };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("should handle merging objects with RegExp properties", () => {
    const obj1 = { a: /abc/ };
    const obj2 = { a: /def/ };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("should handle merging objects with Set properties", () => {
    const obj1 = { a: new Set([1, 2, 3]) };
    const obj2 = { a: new Set([4, 5, 6]) };
    expect(merge(obj1, obj2)).toEqual({ a: new Set([1, 2, 3, 4, 5, 6]) });
    expect(merge(obj2, obj1)).toEqual({ a: new Set([4, 5, 6, 1, 2, 3]) });
  });

  test("should handle merging objects with Map properties", () => {
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

  test("should handle merging objects with Promise properties", () => {
    const obj1 = { a: Promise.resolve("value1") };
    const obj2 = { a: Promise.resolve("value2") };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });

  test("should handle merging objects with BigInt properties", () => {
    const obj1 = { a: BigInt(123) };
    const obj2 = { a: BigInt(456) };
    expect(merge(obj1, obj2)).toEqual({ a: obj2.a });
    expect(merge(obj2, obj1)).toEqual({ a: obj1.a });
  });
});
