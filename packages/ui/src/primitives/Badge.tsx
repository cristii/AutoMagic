import type { ReactNode } from "react";

import type { Tone } from "./shared";
import { cx, toneStyle } from "./shared";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={cx("am-badge", className)} style={toneStyle(tone)}>
      {children}
    </span>
  );
}
