import { merge } from "./src/merge";

const a = {
  a: [1, 2],
};

const b = {
  a: [3, 4],
};

const c = {
  a: [5, 6],
};

const result = merge(a, b, c);

console.log(result);
