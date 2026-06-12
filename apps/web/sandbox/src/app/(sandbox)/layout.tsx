import type { ReactNode } from "react";

import { SandboxShell } from "../_components/sandbox-shell";

export default function SandboxLayout({ children }: { children: ReactNode }) {
  return <SandboxShell>{children}</SandboxShell>;
}
