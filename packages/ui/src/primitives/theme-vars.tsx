import { sandboxThemeCssVariables } from "@automagic/theme";

export function SandboxThemeVars() {
  return <style dangerouslySetInnerHTML={{ __html: sandboxThemeCssVariables() }} />;
}
