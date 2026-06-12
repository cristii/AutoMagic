import type { ReactNode } from "react";

export function AppShell({
  sidebar,
  topbar,
  children,
}: {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="am-app-shell">
      {sidebar}
      <div className="am-main-shell">
        {topbar}
        <main className="am-content">{children}</main>
      </div>
    </div>
  );
}
