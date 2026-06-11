import type { ReactNode } from "react";
import Link from "next/link";

export function Panel({
  title,
  eyebrow,
  children,
  action,
  className = "",
}: {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  action?: { href: string; label: string };
  className?: string;
}) {
  return (
    <section className={`studio-panel ${className}`}>
      {(title || eyebrow || action) && (
        <div className="panel-heading">
          <div>
            {eyebrow ? <span>{eyebrow}</span> : null}
            {title ? <h2>{title}</h2> : null}
          </div>
          {action ? <Link href={action.href}>{action.label}</Link> : null}
        </div>
      )}
      {children}
    </section>
  );
}
