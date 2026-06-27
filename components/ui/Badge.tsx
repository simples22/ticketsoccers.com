import type { ReactNode } from "react";
type Variant = "hot" | "soldout" | "featured" | "neutral";
export function Badge({ variant = "neutral", children }: { variant?: Variant; children: ReactNode }) {
  return <span className={`tsln-badge tsln-badge--${variant}`}>{children}</span>;
}