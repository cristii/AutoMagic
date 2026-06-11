import type { ReactNode } from "react";

export type StatusTone = "purple" | "gold" | "green" | "red" | "neutral";

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}
