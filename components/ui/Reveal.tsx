import { PropsWithChildren } from "react";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return <div className={`reveal is-visible ${className ?? ""}`} style={{ animationDelay: `${delay}ms` }}>{children}</div>;
}
