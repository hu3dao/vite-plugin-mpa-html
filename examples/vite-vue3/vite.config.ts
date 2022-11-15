import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import html from "vite-plugin-mpa-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const enabled = mode !== "production";
  return {
    base: "./",
    plugins: [
      vue(),
      html({
        minify: false,
        debug: { enabled },
        injectOption: [
          {
            tag: "script",
            children:
              "if (globalThis === undefined) { var globalThis = window; }",
            injectTo: "body",
          },
          {
            tag: "script",
            attrs: {
              src: "//i.zhenai.com/common/m/base/js/zhenai-2.0.4.min.js",
            },
            injectTo: "body",
          },
        ],
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          nested: resolve(__dirname, "nested/index.html"),
        },
      },
    },
  };
});
