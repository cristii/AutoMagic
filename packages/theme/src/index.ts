export const automagicTheme = {
  color: {
    background: "#0b0e13",
    surface: "#111722",
    surfaceRaised: "#172030",
    surfaceSubtle: "#202b3d",
    border: "rgba(226, 232, 240, 0.14)",
    borderStrong: "rgba(226, 232, 240, 0.26)",
    text: "#f8fafc",
    muted: "#aab6c8",
    faint: "#728097",
    accent: "#8b5cf6",
    accentSoft: "rgba(139, 92, 246, 0.16)",
    success: "#47c27a",
    successSoft: "rgba(71, 194, 122, 0.14)",
    warning: "#d6a84f",
    warningSoft: "rgba(214, 168, 79, 0.14)",
    danger: "#ef5d72",
    dangerSoft: "rgba(239, 93, 114, 0.14)",
    info: "#56a8f5",
    infoSoft: "rgba(86, 168, 245, 0.14)",
  },
  radius: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  typographyScale: {
    xs: 12,
    sm: 13,
    md: 14,
    base: 15,
    lg: 18,
    xl: 22,
    mobileTitle: 25,
    metric: 28,
    metricMobile: 24,
    xxl: 30,
  },
  lineHeight: {
    tight: 1.18,
    heading: 1.25,
    body: 1.55,
    relaxed: 1.7,
  },
  fontWeight: {
    regular: 450,
    medium: 600,
    semibold: 700,
    bold: 800,
  },
  component: {
    cardPadding: 20,
    cardPaddingCompact: 16,
    gridGap: 18,
    buttonHeight: 40,
    buttonHeightSmall: 34,
    badgeMinHeight: 24,
    inputHeight: 44,
  },
  shadow: {
    panel: "0 18px 56px rgba(0, 0, 0, 0.28)",
    focus: "0 0 0 3px rgba(139, 92, 246, 0.28)",
  },
  typography: {
    sans:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    mono: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace",
  },
} as const;

export type AutomagicTheme = typeof automagicTheme;

export function sandboxThemeCssVariables() {
  const { color, radius, spacing, shadow, typography, typographyScale, lineHeight, fontWeight, component } =
    automagicTheme;

  return `
    :root {
      --am-bg: ${color.background};
      --am-surface: ${color.surface};
      --am-surface-raised: ${color.surfaceRaised};
      --am-surface-subtle: ${color.surfaceSubtle};
      --am-border: ${color.border};
      --am-border-strong: ${color.borderStrong};
      --am-text: ${color.text};
      --am-muted: ${color.muted};
      --am-faint: ${color.faint};
      --am-accent: ${color.accent};
      --am-accent-soft: ${color.accentSoft};
      --am-success: ${color.success};
      --am-success-soft: ${color.successSoft};
      --am-warning: ${color.warning};
      --am-warning-soft: ${color.warningSoft};
      --am-danger: ${color.danger};
      --am-danger-soft: ${color.dangerSoft};
      --am-info: ${color.info};
      --am-info-soft: ${color.infoSoft};
      --am-radius-xs: ${radius.xs}px;
      --am-radius-sm: ${radius.sm}px;
      --am-radius-md: ${radius.md}px;
      --am-radius-lg: ${radius.lg}px;
      --am-radius-xl: ${radius.xl}px;
      --am-space-xs: ${spacing.xs}px;
      --am-space-sm: ${spacing.sm}px;
      --am-space-md: ${spacing.md}px;
      --am-space-lg: ${spacing.lg}px;
      --am-space-xl: ${spacing.xl}px;
      --am-space-xxl: ${spacing.xxl}px;
      --am-space-xxxl: ${spacing.xxxl}px;
      --am-font-size-xs: ${typographyScale.xs}px;
      --am-font-size-sm: ${typographyScale.sm}px;
      --am-font-size-md: ${typographyScale.md}px;
      --am-font-size-base: ${typographyScale.base}px;
      --am-font-size-lg: ${typographyScale.lg}px;
      --am-font-size-xl: ${typographyScale.xl}px;
      --am-font-size-mobile-title: ${typographyScale.mobileTitle}px;
      --am-font-size-metric: ${typographyScale.metric}px;
      --am-font-size-metric-mobile: ${typographyScale.metricMobile}px;
      --am-font-size-xxl: ${typographyScale.xxl}px;
      --am-line-height-tight: ${lineHeight.tight};
      --am-line-height-heading: ${lineHeight.heading};
      --am-line-height-body: ${lineHeight.body};
      --am-line-height-relaxed: ${lineHeight.relaxed};
      --am-font-weight-regular: ${fontWeight.regular};
      --am-font-weight-medium: ${fontWeight.medium};
      --am-font-weight-semibold: ${fontWeight.semibold};
      --am-font-weight-bold: ${fontWeight.bold};
      --am-card-padding: ${component.cardPadding}px;
      --am-card-padding-compact: ${component.cardPaddingCompact}px;
      --am-grid-gap: ${component.gridGap}px;
      --am-button-height: ${component.buttonHeight}px;
      --am-button-height-sm: ${component.buttonHeightSmall}px;
      --am-badge-min-height: ${component.badgeMinHeight}px;
      --am-input-height: ${component.inputHeight}px;
      --am-shadow-panel: ${shadow.panel};
      --am-shadow-focus: ${shadow.focus};
      --am-font-sans: ${typography.sans};
      --am-font-mono: ${typography.mono};
    }
  `;
}
