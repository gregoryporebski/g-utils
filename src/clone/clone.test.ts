import { clone } from "@/clone";
import { describe, expect, it } from "bun:test";

describe("clone", () => {
  it("should return a new object with the same properties", () => {
    const obj = { a: 1, b: 2 };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
  });

  it("should not affect the original object when the cloned object is modified", () => {
    const obj = { a: 1, b: 2 };
    const clonedObj = clone(obj);

    clonedObj.a = 3;

    expect(clonedObj.a).toBe(3);
    expect(obj.a).toBe(1);
  });

  //   it("should clone nested objects", () => {
  //     const obj = { a: { b: 2 } };
  //     const clonedObj = clone(obj);

  //     expect(clonedObj).toEqual(obj);
  //     expect(clonedObj.a).not.toBe(obj.a);
  //   });

  it("should clone arrays", () => {
    const arr = [1, 2, 3];
    const clonedArr = clone(arr);

    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
  });

  it("should clone objects with null values", () => {
    const obj = { a: null };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
  });

  it("should clone objects with undefined values", () => {
    const obj = { a: undefined };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
  });

  it("should clone objects with function values", () => {
    const func = () => {};
    const obj = { a: func };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.a).toBe(func);
  });

  it("should clone objects with date values", () => {
    const date = new Date();
    const obj = { a: date };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.a).toBe(date);
  });

  it("should clone objects with regular expression values", () => {
    const regex = /test/g;
    const obj = { a: regex };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.a).toBe(regex);
  });

  it("should clone objects with symbol values", () => {
    const symbol = Symbol("test");
    const obj = { a: symbol };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.a).toBe(symbol);
  });

  it("should clone objects with BigInt values", () => {
    const bigInt = BigInt(123);
    const obj = { a: bigInt };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.a).toBe(bigInt);
  });

  it("should clone objects with Map values", () => {
    const map = new Map();
    map.set("key", "value");
    const obj = { a: map };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.a).toBe(map);
  });

  it("should clone objects with Set values", () => {
    const set = new Set();
    set.add("value");
    const obj = { a: set };
    const clonedObj = clone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.a).toBe(set);
  });

  //   it("should clone objects with circular references", () => {
  //     const obj: any = { a: null };
  //     obj.a = obj;
  //     const clonedObj = clone(obj);

  //     expect(clonedObj).toEqual(obj);
  //     expect(clonedObj.a).toBe(clonedObj);
  //   });

  //   it("should clone objects with inherited properties", () => {
  //     const parent = { a: 1 };
  //     const obj = Object.create(parent);
  //     obj.b = 2;
  //     const clonedObj = clone(obj);

  //     expect(clonedObj).toEqual(obj);
  //     expect(clonedObj).not.toBe(obj);
  //     expect(Object.getPrototypeOf(clonedObj)).toEqual(parent);
  //   });

  //   it("should clone objects with non-enumerable properties", () => {
  //     const obj = {};
  //     Object.defineProperty(obj, "a", { value: 1, enumerable: false });
  //     const clonedObj = clone(obj);
  //     const descriptor = Object.getOwnPropertyDescriptor(clonedObj, "a");

  //     expect(clonedObj).toEqual(obj);
  //     expect(clonedObj).not.toBe(obj);
  //     expect(descriptor?.enumerable).toBe(false);
  //   });

  //   it("should clone objects with getter and setter properties", () => {
  //     const obj = {
  //       get a() {
  //         return 1;
  //       },
  //       set a(value) {},
  //     };
  //     const clonedObj = clone(obj);

  //     expect(clonedObj).toEqual(obj);
  //     expect(clonedObj).not.toBe(obj);
  //     const descriptor = Object.getOwnPropertyDescriptor(clonedObj, "a");
  //     expect(typeof descriptor?.get).toBe("function");
  //     expect(typeof descriptor?.set).toBe("function");
  //   });
});
