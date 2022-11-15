import type { Plugin } from "vite";
import { minify as minifyFn } from "html-minifier-terser";
import { IOptions } from "./type";

function getDefaultOptions(minify: boolean) {
  return {
    removeComments: minify,
    collapseWhitespace: minify,
    collapseBooleanAttributes: minify,
    removeAttributeQuotes: minify,
    removeEmptyAttributes: minify,
    minifyCSS: minify,
    minifyJS: minify,
    minifyURLs: minify,
  };
}

export default function minifyHtml({ minify = true }: IOptions = {}): Plugin {
  return {
    name: "vite-plugin-minify",
    enforce: "post",
    transformIndexHtml(html) {
      if (typeof minify === "boolean" && !minify) {
        return html;
      }
      const minifyOptions =
        typeof minify === "boolean" && minify
          ? getDefaultOptions(minify)
          : minify;
      return minifyFn(html, minifyOptions);
    },
  };
}
