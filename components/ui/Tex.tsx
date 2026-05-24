import { renderTeX } from "@/lib/katex";

type Props = {
  children: string;
  display?: boolean;
  className?: string;
};

/** TeX 公式渲染，行内 & 块级 */
export default function Tex({ children, display = false, className = "" }: Props) {
  const html = renderTeX(children, display);
  return (
    <span
      className={`${display ? "block my-3" : "inline-block"} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
