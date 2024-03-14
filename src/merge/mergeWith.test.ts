import { describe, expect, test } from "bun:test";
import { MergeOptions, mergeWith } from ".";

describe("mergeWith", () => {
  describe("custom", () => {
    test("should use custom merge strategy", () => {
      // Arrange
      const a = { a: 1 };
      const b = { a: 2 };
      const options: MergeOptions = {
        custom: [
          {
            selector: "a",
            strategy: (a, b) => a + b,
          },
        ],
      };

      // Act
      const result = mergeWith(options, a, b);

      // Assert
      expect(result).toEqual({ a: 3 });
    });
  });
});
