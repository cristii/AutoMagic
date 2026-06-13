"use client";

import { AppShell, Avatar, Badge, Button, Sidebar, TopBar } from "@automagic/ui";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { findMission } from "../_data/sandbox";
import { sandboxNavRoutes, sandboxRouteByPathname } from "../_data/routes";
import {
  SIMULATED_TOOL_RESET_EVENT,
  SIMULATED_TOOL_SUBMIT_EVENT,
} from "../_simulated-tools/events";
import { SandboxIcon } from "./icons";

const navItems = sandboxNavRoutes.map((route) => ({
  href: route.href,
  label: route.label,
  icon: <SandboxIcon name={route.icon} />,
  badge: "badge" in route ? route.badge : undefined,
}));

export function SandboxShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const route = sandboxRouteByPathname(pathname);
  const missionId =
    pathname.startsWith("/missions/") && pathname !== "/missions/generate"
      ? pathname.split("/")[2]
      : undefined;
  const mission = missionId ? findMission(missionId) : undefined;
  const title = mission?.title ?? route.title;
  const handlePrimaryAction = () => {
    if (pathname === "/simulated-tools") {
      window.dispatchEvent(new CustomEvent(SIMULATED_TOOL_RESET_EVENT));
      return;
    }

    if (mission && pathname.startsWith("/missions/")) {
      window.dispatchEvent(new CustomEvent(SIMULATED_TOOL_SUBMIT_EVENT));
    }
  };
  const primaryAction = route.primaryAction ? (
    route.primaryAction.href ? (
      <Button
        href={route.primaryAction.href}
        variant="primary"
        label={route.primaryAction.label}
      />
    ) : (
      <Button onClick={handlePrimaryAction} variant="primary" label={route.primaryAction.label} />
    )
  ) : null;

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
      topbar={
        <TopBar
          title={title}
          subtitle={route.subtitle}
          meta={<Badge tone="success">7-day streak</Badge>}
          actions={primaryAction}
        />
      }
    >
      {children}
    </AppShell>
  );
}
