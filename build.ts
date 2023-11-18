const { outputs, ...build } = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./lib",
  root: "./src",
  splitting: true,
  sourcemap: "external",
  minify: true,
});

console.log(`Build: ${build.success}`);
