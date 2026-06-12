import type { CSSProperties } from "react";

export type Tone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toneStyle(tone: Tone): CSSProperties {
  const colorVar = tone === "neutral" ? "var(--am-muted)" : `var(--am-${tone})`;
  const backgroundVar =
    tone === "neutral" ? "var(--am-surface-subtle)" : `var(--am-${tone}-soft)`;

  return {
    color: colorVar,
    background: backgroundVar,
    borderColor: tone === "neutral" ? "var(--am-border)" : colorVar,
  };
}
