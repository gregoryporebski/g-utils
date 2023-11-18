const { outputs, ...build } = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./out",
  root: "./src",
  splitting: true,
  sourcemap: "external",
  minify: true,
});

console.log(build);
