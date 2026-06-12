const iconLabels: Record<string, string> = {
  dashboard: "DB",
  missions: "MS",
  generate: "GN",
  workspace: "WK",
  tools: "TL",
  feedback: "FB",
  portfolio: "PF",
  achievements: "AC",
  settings: "ST",
  inbox: "IN",
  crm: "CR",
  spreadsheet: "SH",
  calendar: "CA",
  support: "SP",
  ecommerce: "EC",
  automation: "AU",
};

export function SandboxIcon({ name }: { name: string }) {
  return <span className="sandbox-icon" aria-hidden="true">{iconLabels[name] ?? name.slice(0, 2).toUpperCase()}</span>;
}
