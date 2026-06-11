"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, workspaceNav } from "../_data/studio";
import { StudioIcon } from "./icons";

type StudioTheme = "dark" | "light";

export function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<StudioTheme>("dark");
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("automagic-studio-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
    const initialTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;

    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    if (!themeLoaded) return;

    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("automagic-studio-theme", theme);
  }, [theme, themeLoaded]);

  return (
    <div className="studio-app">
      <aside className="studio-sidebar">
        <Link className="studio-brand" href="/dashboard">
          <span className="brand-mark">✦</span>
          <span>
            <strong>AutoMagic</strong>
            <small>Studio</small>
          </span>
        </Link>

        <button
          className="theme-toggle"
          type="button"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={theme === "light"}
          onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
        >
          <StudioIcon name={theme === "dark" ? "sun" : "moon"} />
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>

        <nav className="sidebar-nav" aria-label="Primary Studio navigation">
          {primaryNav.map((item) => (
            <ShellLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="sidebar-section-label">Workspace</div>
        <nav className="sidebar-nav compact" aria-label="Workspace navigation">
          {workspaceNav.map((item) => (
            <ShellLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="studio-user">
          <span className="avatar-ring">CS</span>
          <span>
            <strong>Cristi Ș.</strong>
            <small>VA · Studio</small>
          </span>
          <button type="button" aria-label="Open account menu">
            •••
          </button>
        </div>
      </aside>

      <div className="studio-main-shell">
        <header className="studio-topbar">
          <label className="global-search">
            <StudioIcon name="search" />
            <input aria-label="Search clients and tasks" placeholder="Search clients, tasks..." />
          </label>

          <div className="topbar-actions">
            <Link aria-label="Notifications" href="/notifications">
              <StudioIcon name="bell" />
              <span>3</span>
            </Link>
            <Link className="top-avatar" href="/profile">
              CS
            </Link>
          </div>
        </header>

        <div className="studio-content">{children}</div>
        <footer className="studio-app-footer">
          © 2026 AutoMagic Studio. Operator workspace for client work, tasks,
          agents, and earnings.
        </footer>
      </div>
    </div>
  );
}

function ShellLink({
  item,
  pathname,
}: {
  item: { href: string; label: string; icon: string; badge?: string };
  pathname: string;
}) {
  const active = isActive(pathname, item.href);

  return (
    <Link className={active ? "active" : ""} href={item.href}>
      <StudioIcon name={item.icon} />
      <span>{item.label}</span>
      {item.badge ? <b>{item.badge}</b> : null}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/" || pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
