import { CSSProperties } from "react";

type NeonPlaceholderProps = {
  label: string;
  caption?: string;
  className?: string;
  minHeight?: number;
};

export function NeonPlaceholder({
  label,
  caption = "Placeholder visual: reemplazar por media final",
  className,
  minHeight = 260
}: NeonPlaceholderProps) {
  return (
    <div className={`neon-placeholder ${className ?? ""}`} style={{ minHeight } as CSSProperties}>
      <div className="neon-core" />
      <div className="neon-content">
        <p className="neon-label">{label}</p>
        <p className="neon-caption">{caption}</p>
      </div>
    </div>
  );
}
