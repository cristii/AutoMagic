import { PageHeader, Panel, StatusPill } from "../ui";
import { SummaryStat } from "./shared";

export function ProfilePage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio profile"
        title="Cristi Șatcovschi"
        description="Virtual Assistant · Automation · Chișinău (UTC+3)"
        action={{ href: "/settings/profile", label: "Edit profile" }}
      />
      <div className="profile-grid">
        <Panel title="Skills">
          <div className="pill-cloud">
            {["Inbox & calendar", "Research", "CRM & sheets", "Ecommerce", "Automation"].map((skill) => (
              <StatusPill tone="purple" key={skill}>
                {skill}
              </StatusPill>
            ))}
          </div>
        </Panel>
        <Panel title="Rate & availability">
          <div className="summary-list">
            <SummaryStat label="Retainer" value="$500 / wk" />
            <SummaryStat label="Active clients" value="2 / 3" />
            <SummaryStat label="Status" value="Open for tasks" />
          </div>
        </Panel>
        <Panel title="Portfolio">
          <div className="portfolio-grid">
            {["CRM cleanup", "Weekly reporting", "Inbox automation"].map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
