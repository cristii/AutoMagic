import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="am-empty-state">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
      {action ? <div>{action}</div> : null}
    </div>
  );
}
