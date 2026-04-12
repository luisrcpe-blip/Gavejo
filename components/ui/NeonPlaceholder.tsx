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
  const style = { "--placeholder-min-height": `${minHeight}px` } as CSSProperties;

  return (
    <div className={`neon-placeholder ${className ?? ""}`} style={style}>
      <div className="neon-core" />
      <div className="neon-content">
        <p className="neon-label">{label}</p>
        <p className="neon-caption">{caption}</p>
      </div>
    </div>
  );
}
