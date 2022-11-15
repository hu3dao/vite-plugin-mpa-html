## 简介

一个提供 html 注入、html 压缩和动态开启移动端调试工具的 vite 插件

## 安装

```
npm install vite-plugin-mpa-html -D
```

## 使用

### html 压缩

```ts
// vite.config.ts

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import html from "vite-plugin-mpa-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    html({
      minify: true, // 开启压缩  默认开启，可不填
    }),
  ],
});
```

### html 注入

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import html from "vite-plugin-mpa-html";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    html({
      minify: false,
      injectOption: [
        // 注入一段js代码
        {
          tag: "script",
          children:
            "if (globalThis === undefined) { var globalThis = window; }",
          injectTo: "body",
        },
        // 注入cdn
        {
          tag: "script",
          attrs: {
            src: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js",
          },
          injectTo: "body",
        },
      ],
    }),
  ],
});
```

### 动态开启移动端调试工具

```ts
// vite.config.ts

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import html from "vite-plugin-mpa-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 非生产环境下开启
  const enabled = mode !== "production";
  return {
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
              src: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js",
            },
            injectTo: "body",
          },
        ],
      }),
    ],
  };
});
```

运行访问 http://127.0.0.1:5173/?debug=1 调试工具已开启，通过链接上的 debug=1 参数动态开启

```
pnpm dev
```
