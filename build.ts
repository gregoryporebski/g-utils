import fs from "fs";
import config from "./package.json";

const path = import.meta.dir + "/lib";

const modules = ["clone", "merge", "omit", "pick", "type-guards"];

const build = await Bun.build({
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

if (!build.success) {
  throw new Error(`Build failed: ${build.logs}`);
}

const buildPackage = {
  author: config.author,
  description: config.description,
  keywords: config.keywords,
  license: config.license,
  main: "./index.js",
  name: config.name,
  release: config.release,
  repository: config.repository,
  type: "module",
  types: "./index.d.ts",
  version: config.version,
};

fs.writeFileSync(
  path + "/package.json",
  JSON.stringify(buildPackage, null, 2),
  {
    encoding: "utf-8",
    flag: "w+",
  }
);
