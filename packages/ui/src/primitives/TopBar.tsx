import type { ReactNode } from "react";

export function TopBar({
  title,
  subtitle,
  actions,
  meta,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className={`am-topbar ${title ? "" : "am-topbar-global"}`}>
      {title ? (
        <div>
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      ) : (
        <div className="am-topbar-spacer" aria-hidden="true" />
      )}
      {meta ? <div className="am-topbar-meta">{meta}</div> : null}
      {actions ? <div className="am-topbar-actions">{actions}</div> : null}
    </header>
  );
}
