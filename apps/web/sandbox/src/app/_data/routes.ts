export type SandboxRouteKey =
  | "/dashboard"
  | "/missions"
  | "/missions/generate"
  | "/missions/workspace"
  | "/simulated-tools"
  | "/feedback"
  | "/portfolio"
  | "/achievements"
  | "/settings";

export type SandboxIconName =
  | "dashboard"
  | "missions"
  | "workspace"
  | "tools"
  | "feedback"
  | "portfolio"
  | "achievements"
  | "settings";

export type SandboxRouteMeta = {
  href: SandboxRouteKey;
  label: string;
  title: string;
  subtitle: string;
  icon: SandboxIconName;
  badge?: string;
  primaryAction?: {
    label: string;
    href?: string;
  };
};

export const sandboxRoutes = {
  dashboard: {
    href: "/dashboard",
    label: "Dashboard",
    title: "Dashboard",
    subtitle: "Track skill progress, active missions, coach scores, and practice momentum.",
    icon: "dashboard",
    primaryAction: {
      label: "Generate mission",
      href: "/missions/generate",
    },
  },
  missions: {
    href: "/missions",
    label: "Missions",
    title: "Mission library",
    subtitle: "Browse practice missions, filter by skill, or generate a new scenario.",
    icon: "missions",
    primaryAction: {
      label: "Generate mission",
      href: "/missions/generate",
    },
  },
  generateMission: {
    href: "/missions/generate",
    label: "Generate mission",
    title: "Generate mission",
    subtitle: "Use a connected BYOK provider to create a unique practice brief.",
    icon: "missions",
  },
  missionWorkspace: {
    href: "/missions/workspace",
    label: "Mission workspace",
    title: "Mission workspace",
    subtitle: "Work the brief in the simulated tool, then submit for BYOK-powered review.",
    icon: "workspace",
    primaryAction: {
      label: "Submit for review",
    },
  },
  simulatedTools: {
    href: "/simulated-tools",
    label: "Simulated tools",
    title: "Simulated tools",
    subtitle:
      "Practice inbox, CRM, spreadsheet, calendar, support, ecommerce, and automation workflows without scoring.",
    icon: "tools",
    primaryAction: {
      label: "Reset data",
    },
  },
  feedback: {
    href: "/feedback",
    label: "Feedback",
    title: "Feedback",
    subtitle: "Review coach notes, grades, and improvement areas.",
    icon: "feedback",
    badge: "3",
  },
  portfolio: {
    href: "/portfolio",
    label: "Portfolio",
    title: "Portfolio",
    subtitle: "Prepare profile highlights, certificates, and readiness proof.",
    icon: "portfolio",
  },
  achievements: {
    href: "/achievements",
    label: "Achievements",
    title: "Achievements",
    subtitle: "Review level progress, badges, streaks, and certificates.",
    icon: "achievements",
  },
  settings: {
    href: "/settings",
    label: "Settings",
    title: "Settings",
    subtitle: "Manage AI providers, simulator controls, account settings, and billing stubs.",
    icon: "settings",
  },
} as const satisfies Record<string, SandboxRouteMeta>;

export const sandboxNavRoutes = [
  sandboxRoutes.dashboard,
  sandboxRoutes.missions,
  sandboxRoutes.simulatedTools,
  sandboxRoutes.feedback,
  sandboxRoutes.portfolio,
  sandboxRoutes.achievements,
  sandboxRoutes.settings,
];

export function sandboxRouteByPathname(pathname: string): SandboxRouteMeta {
  if (pathname === "/missions/generate") {
    return sandboxRoutes.generateMission;
  }

  if (pathname.startsWith("/missions/")) {
    return sandboxRoutes.missionWorkspace;
  }

  const route = Object.values(sandboxRoutes).find((item) => item.href === pathname);

  if (!route) {
    return sandboxRoutes.dashboard;
  }

  return route;
}
