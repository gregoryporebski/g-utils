const modules = ["clone", "merge", "omit", "pick"];

Bun.build({
  entrypoints: [
    "./src/index.ts",
    ...modules.map((module) => `./src/${module}/index.ts`),
  ],
  outdir: "./lib",
  root: "./src",
  splitting: true,
  sourcemap: "external",
  minify: true,
});
