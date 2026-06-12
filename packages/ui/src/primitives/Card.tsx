import type { ReactNode } from "react";

import { cx } from "./shared";

export function Card({
  children,
  title,
  eyebrow,
  action,
  className,
}: {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("am-card", className)}>
      {(title || eyebrow || action) && (
        <div className="am-card-heading">
          <div>
            {eyebrow ? <span>{eyebrow}</span> : null}
            {title ? <h2>{title}</h2> : null}
          </div>
          {action ? <div className="am-card-action">{action}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
}
