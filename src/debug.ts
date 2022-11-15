import type { Plugin } from "vite";
import { IOptions } from "./type";

const preset = {
  vconsole: {
    src: `https://unpkg.com/vconsole@latest/dist/vconsole.min.js`,
    code: `new window.VConsole();`,
  },
  eruda: {
    src: `//cdn.bootcdn.net/ajax/libs/eruda/2.3.3/eruda.js`,
    code: `eruda.init();`,
  },
};

export default function debug({ debug = true }: IOptions = {}): Plugin {
  const {
    enabled = true,
    src = undefined,
    type = "vconsole",
    code = undefined,
    enabledByKey = "debug",
    enabledByValue = "1",
  } = typeof debug === "boolean" ? {} : debug;
  return {
    name: "vite-plugin-debug",
    transformIndexHtml(html) {
      if ((typeof debug === "boolean" && !debug) || !enabled) {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: src || preset[type]["src"],
            },
            injectTo: "body",
          },
          {
            tag: "script",
            children: `var urlSearchParams = new URLSearchParams(location.search);
            var value = urlSearchParams.get('${enabledByKey}');
            if(value && value === '${enabledByValue}') {${
              code || preset[type]["code"]
            }}`,
            injectTo: "body",
          },
        ],
      };
    },
  };
}
