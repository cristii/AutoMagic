import type { Metadata } from "next";
import { SandboxThemeVars } from "@automagic/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoMagic Sandbox",
  description: "Virtual assistant training simulator for AutoMagic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SandboxThemeVars />
        {children}
      </body>
    </html>
  );
}
