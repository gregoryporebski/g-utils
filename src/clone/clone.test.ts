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

  test("WeakMap", () => {
    const input = new WeakMap([[{}, "value"]]);
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
  });

  test("Set", () => {
    const input = new Set([1, 2, 3]);
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("WeakSet", () => {
    const input = new WeakSet([{}, {}, {}]);
    const clonedInput = clone(input);

    expect(clonedInput).toBe(input);
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

  test("URL", () => {
    const input = new URL("https://example.com");
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("URLSearchParams", () => {
    const input = new URLSearchParams("test");
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

  test("SharedArrayBuffer", () => {
    const input = new SharedArrayBuffer(8);
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  test("DataView", () => {
    const input = new DataView(new ArrayBuffer(8));
    const clonedInput = clone(input);

    expect(clonedInput).toEqual(input);
    expect(clonedInput).not.toBe(input);
  });

  describe("typed arrays", () => {
    test("Int8Array", () => {
      const input = new Int8Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Uint8Array", () => {
      const input = new Uint8Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Uint8ClampedArray", () => {
      const input = new Uint8ClampedArray(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Int16Array", () => {
      const input = new Int16Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Uint16Array", () => {
      const input = new Uint16Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Int32Array", () => {
      const input = new Int32Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Uint32Array", () => {
      const input = new Uint32Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Float32Array", () => {
      const input = new Float32Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("Float64Array", () => {
      const input = new Float64Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("BigInt64Array", () => {
      const input = new BigInt64Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("BigUint64Array", () => {
      const input = new BigUint64Array(8);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });
  });

  describe("objects with", () => {
    test("prototype", () => {
      const input = Object.create({ a: 1 });
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(Object.getPrototypeOf(clonedInput)).toEqual(
        Object.getPrototypeOf(input)
      );
    });

    test("constructor", () => {
      const input = new (class {
        a = 1;
      })();
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(clonedInput.constructor).toEqual(input.constructor);
    });

    test("properties", () => {
      const input = { a: 1 };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("methods", () => {
      const input = { a() {} };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
    });

    test("symbols", () => {
      const input = { [Symbol("a")]: 1 };
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
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

    test("inherited methods", () => {
      const parent = { a() {} };
      const input = Object.create(parent);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(Object.getPrototypeOf(clonedInput)).toEqual(parent);
    });

    test("inherited symbols", () => {
      const parent = { [Symbol("a")]: 1 };
      const input = Object.create(parent);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(Object.getPrototypeOf(clonedInput)).toEqual(parent);
    });

    test("inherited non-enumerable properties", () => {
      const parent = {};
      Object.defineProperty(parent, "a", { value: 1, enumerable: false });

      const input = Object.create(parent);
      const clonedInput = clone(input);
      const clonedPrototype = Object.getPrototypeOf(clonedInput);
      const clonedDescriptor = Object.getOwnPropertyDescriptor(
        clonedPrototype,
        "a"
      );

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(clonedPrototype).toEqual(parent);
      expect(clonedDescriptor?.enumerable).toBe(false);
    });

    test("inherited getter and setter properties", () => {
      const parent = {
        get a() {
          return 1;
        },
        set a(value) {},
      };

      const input = Object.create(parent);
      const clonedInput = clone(input);
      const clonedPrototype = Object.getPrototypeOf(clonedInput);
      const clonedDescriptor = Object.getOwnPropertyDescriptor(
        clonedPrototype,
        "a"
      );

      expect(clonedInput).toEqual(input);
      expect(clonedInput).not.toBe(input);
      expect(clonedPrototype).toEqual(parent);
      expect(typeof clonedDescriptor?.get).toBe("function");
      expect(typeof clonedDescriptor?.set).toBe("function");
    });

    test("inherited circular references", () => {
      const parent: any = { a: null };
      parent.a = parent;
      const input = Object.create(parent);
      const clonedInput = clone(input);

      expect(clonedInput).toEqual(input);
      expect(input.a).toBe(clonedInput.a);
      expect(Object.getPrototypeOf(clonedInput)).toEqual(parent);
    });
  });
});
