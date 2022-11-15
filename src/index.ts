import type { Plugin } from "vite";
import { IOptions } from "./type";
import inject from "./inject";
import debug from "./debug";
import minifyHtml from "./minify";

export default function html(options: IOptions): Plugin[] {
  return [inject(options), debug(options), minifyHtml(options)];
}
