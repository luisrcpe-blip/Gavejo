import { CSSProperties } from "react";

type NeonPlaceholderProps = {
  label: string;
  caption?: string;
  className?: string;
  minHeight?: number;
  aspectRatio?: string;
};

export function NeonPlaceholder({
  label,
  caption = "Placeholder visual: reemplazar por media final",
  className,
  minHeight = 260,
  aspectRatio = "1 / 1"
}: NeonPlaceholderProps) {
  const style = {
    "--placeholder-min-height": `${minHeight}px`,
    "--placeholder-aspect-ratio": aspectRatio
  } as CSSProperties;

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
