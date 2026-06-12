import type { ReactNode } from "react";

import { cx } from "./shared";

export type TabItem = {
  href?: string;
  id: string;
  label: string;
  icon?: ReactNode;
};

export function Tabs({
  items,
  activeId,
  label,
}: {
  items: TabItem[];
  activeId: string;
  label: string;
}) {
  return (
    <nav className="am-tabs" aria-label={label}>
      {items.map((item) => {
        const active = item.id === activeId;
        const content = (
          <>
            {item.icon ? <span>{item.icon}</span> : null}
            <span>{item.label}</span>
          </>
        );

        if (item.href) {
          return (
            <a key={item.id} className={cx(active && "active")} href={item.href}>
              {content}
            </a>
          );
        }

        return (
          <button key={item.id} className={cx(active && "active")} type="button">
            {content}
          </button>
        );
      })}
    </nav>
  );
}
