import { mergeWith } from "./src/merge";

const a = {
  lorem: "ipsum",
  dolor: 2,
  sit: { a: 1, b: [1, 2, 3], c: () => console.log("c") },
};

const b = {
  lorem: "dolor",
  dolor: 5,
  sit: { a: 2, b: ["a", "b", "c"], c: () => console.log("d") },
};

const result = mergeWith(
  {
    custom: [{ selector: (key, value) => key === "lorem", strategy: "concat" }],
    deep: true,
  },
  a,
  b
);

console.log(result);
