import { clone } from "@/clone";
import { describe, expect, it } from "bun:test";

describe("clone", () => {
  it("should handle strings", () => {
    const input = "Lorem ipsum";
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle numbers", () => {
    const input = 123;
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle booleans", () => {
    const input = true;
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle null", () => {
    const input = null;
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle undefined", () => {
    const input = undefined;
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle functions", () => {
    const input = () => {};
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle dates", () => {
    const input = new Date();
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle regular expressions", () => {
    const input = /test/g;
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle symbols", () => {
    const input = Symbol("test");
    const clonedInput = clone(input);

    // @ts-expect-error
    expect(input).toBe(clonedInput);
  });

  it("should handle BigInts", () => {
    const input = BigInt(123);
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle Maps", () => {
    const input = new Map();
    input.set("key", "value");
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle Sets", () => {
    const input = new Set();
    input.add("value");
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle Promises", () => {
    const input = new Promise(() => {});
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle errors", () => {
    const input = new Error("test");
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle Infinity", () => {
    const input = Infinity;
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle NaN", () => {
    const input = NaN;
    const clonedInput = clone(input);

    expect(input).toBe(clonedInput);
  });

  it("should handle buffers", () => {
    const input = Buffer.from("test");
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle array buffers", () => {
    const input = new ArrayBuffer(8);
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle circular references", () => {
    const input: any = { a: null };
    input.a = input;
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input.a).toBe(clonedInput.a);
  });

  it("should handle inherited properties", () => {
    const parent = { a: 1 };
    const input = Object.create(parent);
    input.b = 2;
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
    expect(Object.getPrototypeOf(clonedInput)).toEqual(parent);
  });

  it("should handle non-enumerable properties", () => {
    const input = {};
    Object.defineProperty(input, "a", { value: 1, enumerable: false });
    const clonedInput = clone(input);
    const descriptor = Object.getOwnPropertyDescriptor(clonedInput, "a");

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
    expect(descriptor?.enumerable).toBe(false);
  });

  it("should handle getter and setter properties", () => {
    const input = {
      get a() {
        return 1;
      },
      set a(value) {},
    };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
    const descriptor = Object.getOwnPropertyDescriptor(clonedInput, "a");
    expect(typeof descriptor?.get).toBe("function");
    expect(typeof descriptor?.set).toBe("function");
  });

  it("should handle arrays", () => {
    const input = [1, 2, 3];
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects", () => {
    const input = { a: 1, b: 2 };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with null values", () => {
    const input = { a: null };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with undefined values", () => {
    const input = { a: undefined };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with function values", () => {
    const input = { a: () => {} };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with date values", () => {
    const input = { a: new Date() };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with regular expression values", () => {
    const input = { a: /test/g };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with symbol values", () => {
    const input = { a: Symbol("test") };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with BigInt values", () => {
    const input = { a: BigInt(123) };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with Map values", () => {
    const input = { a: new Map() };
    input.a.set("key", "value");
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with Set values", () => {
    const input = { a: new Set() };
    input.a.add("value");
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with Promise values", () => {
    const input = { a: new Promise(() => {}) };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with error values", () => {
    const input = { a: new Error("test") };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with Infinity values", () => {
    const input = { a: Infinity };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with NaN values", () => {
    const input = { a: NaN };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with buffer values", () => {
    const input = { a: Buffer.from("test") };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });

  it("should handle objects with array buffer values", () => {
    const input = { a: new ArrayBuffer(8) };
    const clonedInput = clone(input);

    expect(input).toEqual(clonedInput);
    expect(input).not.toBe(clonedInput);
  });
});
