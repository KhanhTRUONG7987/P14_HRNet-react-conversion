import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/main.jsx",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [commonjs()],
};
