const build = await Bun.build({
  entrypoints: ["./index.ts"],
  outdir: "./out",
  root: "./src",
  splitting: true,
  sourcemap: "external",
  minify: true,
});
