import fs from "fs";
import config from "./package.json";

const modules = ["clone", "merge", "omit", "pick"];

await Bun.build({
  entrypoints: [
    "./src/index.ts",
    ...modules.map((module) => `./src/${module}/index.ts`),
  ],
  outdir: "./lib",
  root: "./src",
  splitting: true,
  sourcemap: "none",
  minify: true,
});

const buildPackage = {
  name: config.name,
  version: config.version,
  description: config.description,
  license: config.license,
  author: config.author,
  repository: config.repository,
  main: "./index.js",
  types: "./index.d.ts",
  type: "module",
  keywords: config.keywords,
};

fs.writeFileSync(
  import.meta.dir + "/lib/package.json",
  JSON.stringify(buildPackage, null, 2),
  {
    encoding: "utf-8",
    flag: "w+",
  }
);
