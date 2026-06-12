import type { ReactNode } from "react";

import { cx } from "./shared";

export type SidebarItem = {
  href: string;
  label: string;
  icon?: ReactNode;
  badge?: string;
};

export function Sidebar({
  brand,
  items,
  footer,
  activeHref,
}: {
  brand: ReactNode;
  items: SidebarItem[];
  footer?: ReactNode;
  activeHref: string;
}) {
  return (
    <aside className="am-sidebar">
      <div className="am-sidebar-brand">{brand}</div>
      <nav className="am-sidebar-nav" aria-label="Primary navigation">
        {items.map((item) => {
          const active =
            item.href === "/dashboard"
              ? activeHref === "/" || activeHref === "/dashboard"
              : activeHref === item.href || activeHref.startsWith(`${item.href}/`);

          return (
            <a key={item.href} className={cx(active && "active")} href={item.href}>
              {item.icon ? <span className="am-sidebar-icon">{item.icon}</span> : null}
              <span>{item.label}</span>
              {item.badge ? <b>{item.badge}</b> : null}
            </a>
          );
        })}
      </nav>
      {footer ? <div className="am-sidebar-footer">{footer}</div> : null}
    </aside>
  );
}
