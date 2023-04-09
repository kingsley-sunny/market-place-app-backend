import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import type { RollupOptions } from "rollup";
import typescript from "rollup-plugin-typescript2";

const config: RollupOptions = {
  input: "src/app.ts",
  output: [
    {
      dir: "./build",
      entryFileNames: "[name].mjs",
      format: "esm",
      banner: "",
      sourcemap: true,
    },
    {
      dir: "./build",
      entryFileNames: "[name].js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      preserveModules: true,
      banner: "",
    },
  ],
  plugins: [
    // resolve(),
    typescript({ rollupCommonJSResolveHack: false, clean: true }),
    commonjs(),
    json(),
  ],
};

export default config;
