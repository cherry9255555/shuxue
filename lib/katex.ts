import katex from "katex";

/** 服务器/客户端都可调用的公式渲染。返回 HTML 字符串，配合 dangerouslySetInnerHTML */
export function renderTeX(input: string, displayMode = false): string {
  try {
    return katex.renderToString(input, {
      displayMode,
      throwOnError: false,
      strict: "ignore",
      output: "html",
    });
  } catch {
    return input;
  }
}
