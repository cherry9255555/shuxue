"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  const v = variant === "primary" ? "btn-magic" : "btn-magic btn-magic-secondary";
  return (
    <button className={`${v} ${className}`} {...rest}>
      {children}
    </button>
  );
}
