// vite.config.js
import path from "path";

module.exports = {
  root: "./src",
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "dist"),
  },
  server: {
    open: true,
    port: 3000,
    https: true,
  },
};
