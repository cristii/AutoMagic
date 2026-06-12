"use client";

import { AppShell, Avatar, Badge, Sidebar, TopBar } from "@automagic/ui";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { sandboxNavRoutes } from "../_data/routes";
import { SandboxIcon } from "./icons";

const navItems = sandboxNavRoutes.map((route) => ({
  href: route.href,
  label: route.label,
  icon: <SandboxIcon name={route.icon} />,
  badge: route.badge,
}));

export function SandboxShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AppShell
      sidebar={
        <Sidebar
          activeHref={pathname}
          brand={
            <a className="sandbox-brand" href="/dashboard">
              <span className="sandbox-brand-mark">AM</span>
              <span>
                <strong>AutoMagic</strong>
                <small>Sandbox</small>
              </span>
            </a>
          }
          items={navItems}
          footer={
            <div className="sandbox-user-card">
              <Avatar name="Cristi Sandbox" size="sm" />
              <span>
                <strong>Cristi</strong>
                <small>VA trainee</small>
              </span>
            </div>
          }
        />
      }
      topbar={<TopBar meta={<Badge tone="success">7-day streak</Badge>} />}
    >
      {children}
    </AppShell>
  );
}
