import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "locked" | "highlight";
};

/** 半透明卡片，带 backdrop-blur 和金粉描边 */
export default function Card({
  children,
  className = "",
  variant = "default",
  ...rest
}: Props) {
  const variantClass =
    variant === "locked"
      ? "opacity-60 saturate-50"
      : variant === "highlight"
      ? "ring-2 ring-[var(--gold-dust)]/60 shadow-[0_0_0_1px_rgba(244,211,94,0.5),0_20px_60px_-20px_rgba(45,27,105,0.5)]"
      : "";

  return (
    <div className={`card-magic p-6 ${variantClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}
