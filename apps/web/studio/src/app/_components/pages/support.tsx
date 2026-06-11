import { PageHeader, Panel, StatusPill } from "../ui";

export function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Studio help"
        title="Support"
        description="Open tickets, platform notices, escalation history, and help articles for VA operators."
      />
      <Panel title="Open tickets">
        <div className="notification-list">
          {["Payout method review", "Client file import issue", "Agent output formatting"].map((ticket, index) => (
            <div className="notification-row gold" key={ticket}>
              <span />
              <div>
                <strong>{ticket}</strong>
                <small>{index === 0 ? "Waiting on AutoMagic support" : "Support replied today"}</small>
              </div>
              <StatusPill tone={index === 0 ? "purple" : "gold"}>
                {index === 0 ? "Open" : "Updated"}
              </StatusPill>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
