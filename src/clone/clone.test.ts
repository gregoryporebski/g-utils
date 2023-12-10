import { clone } from "@/clone";
import { describe, expect, mock, test } from "bun:test";

describe("clone", () => {
  test("undefined", () => {
    const input = undefined;
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("null", () => {
    const input = null;
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("string", () => {
    const input = "Lorem ipsum";
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("number", () => {
    const input = 123;
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("boolean", () => {
    const input = true;
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("array", () => {
    const input = [1, 2, 3];
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("object", () => {
    const input = { a: 1, b: 2 };
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("function", () => {
    const input = mock(() => {});
    const clonedInput = clone(input);
    clonedInput();

    expect(clonedInput).not.toBe(input);
    expect(input).toHaveBeenCalled();
  });

  test("Date", () => {
    const input = new Date();
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("RegExp", () => {
    const input = /test/g;
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("Symbol", () => {
    const input = Symbol("test");
    const clonedInput = clone(input);

    expect(!clonedInput.description).toEqual(!input.description);
    expect(clonedInput).not.toBe(input);
  });

  test("BigInt", () => {
    const input = BigInt(123);
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("Map", () => {
    const input = new Map([["key", "value"]]);
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("Set", () => {
    const input = new Set([1, 2, 3]);
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("Promise", () => {
    const input = new Promise(() => {});
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("Error", () => {
    const input = new Error("test");
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("Infinity", () => {
    const input = Infinity;
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("NaN", () => {
    const input = NaN;
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("Buffer", () => {
    const input = Buffer.from("test");
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("ArrayBuffer", () => {
    const input = new ArrayBuffer(8);
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  describe("object with", () => {
    test("undefined", () => {
      const input = { a: undefined };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("null", () => {
      const input = { a: null };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("string", () => {
      const input = { a: "Lorem ipsum" };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("number", () => {
      const input = { a: 123 };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("boolean", () => {
      const input = { a: true };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("array", () => {
      const input = { a: [1, 2, 3] };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("object", () => {
      const input = { a: { b: 1, c: 2 } };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("function", () => {
      const input = { a: () => {} };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Date", () => {
      const input = { a: new Date() };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("RegExp", () => {
      const input = { a: /test/g };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Symbol", () => {
      const input = { a: Symbol("test") };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("BigInt", () => {
      const input = { a: BigInt(123) };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Map", () => {
      const input = { a: new Map() };
      input.a.set("key", "value");
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Set", () => {
      const input = { a: new Set() };
      input.a.add("value");
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Promise", () => {
      const input = { a: new Promise(() => {}) };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Error", () => {
      const input = { a: new Error("test") };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Infinity", () => {
      const input = { a: Infinity };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("NaN", () => {
      const input = { a: NaN };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Buffer", () => {
      const input = { a: Buffer.from("test") };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("ArrayBuffer", () => {
      const input = { a: new ArrayBuffer(8) };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("circular references", () => {
      const input: any = { a: null };
      input.a = input;
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(input.a).toBe(clonedInput.a);
    });

    test("inherited properties", () => {
      const parent = { a: 1 };
      const input = Object.create(parent);
      input.b = 2;
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(Object.getPrototypeOf(clonedInput)).toEqual(parent);
    });

    test("non-enumerable properties", () => {
      const input = {};
      Object.defineProperty(input, "a", { value: 1, enumerable: false });
      const clonedInput = clone(input);
      const descriptor = Object.getOwnPropertyDescriptor(clonedInput, "a");

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(descriptor?.enumerable).toBe(false);
    });

    test("getter and setter properties", () => {
      const input = {
        get a() {
          return 1;
        },
        set a(value) {},
      };
      const clonedInput = clone(input);
      const descriptor = Object.getOwnPropertyDescriptor(clonedInput, "a");

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(typeof descriptor?.get).toBe("function");
      expect(typeof descriptor?.set).toBe("function");
    });
  });
});
