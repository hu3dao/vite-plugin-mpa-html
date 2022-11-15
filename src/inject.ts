import type { HtmlTagDescriptor, Plugin } from "vite";
import { IOptions } from "./type";

export default function inject({ injectOption = [] }: IOptions = {}): Plugin {
  return {
    name: "vite-plugin-inject",
    enforce: "pre",
    transformIndexHtml(html) {
      let tags: HtmlTagDescriptor[];
      if (!injectOption) {
        tags = [];
      } else if (Array.isArray(injectOption)) {
        tags = injectOption;
      } else {
        tags = [injectOption];
      }
      return {
        html,
        tags,
      };
    },
  };
}
