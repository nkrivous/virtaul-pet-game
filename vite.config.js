// vite.config.js
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

module.exports = {
  root: "./src",
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "dist"),
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  server: {
    open: true,
    port: 3000,
    https: true,
  },
  plugins: [cssInjectedByJsPlugin()],
};
