import type { Options as MinifyOptions } from "html-minifier-terser";
import type { HtmlTagDescriptor } from "vite";

interface IDebugOptions {
  enabled?: boolean;
  type?: "vconsole" | "eruda";
  src?: string | undefined;
  code?: string | undefined;
  enabledByKey?: string;
  enabledByValue?: string;
}

export interface IOptions {
  minify?: MinifyOptions | boolean;
  injectOption?: HtmlTagDescriptor | HtmlTagDescriptor[];
  debug?: IDebugOptions | boolean;
}
