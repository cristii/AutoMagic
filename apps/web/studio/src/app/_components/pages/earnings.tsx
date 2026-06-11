import { PageHeader, Panel, StatusPill, TableShell } from "../ui";
import { SummaryCard } from "./shared";

export function EarningsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Revenue"
        title="Earnings"
        description="Retainers, invoices, service fees, payout status, and tax-ready summaries."
      />
      <div className="resource-grid">
        <SummaryCard title="$5,240" label="Gross earnings" />
        <SummaryCard title="$750" label="Pending invoices" />
        <SummaryCard title="$125" label="Service fees" />
        <SummaryCard title="$4,365" label="Next payout" />
      </div>
      <Panel title="Invoices">
        <TableShell
          columns={["Invoice", "Client", "Amount", "Status"]}
          rows={[
            ["#018", "Acme Co", "$750", <StatusPill tone="gold" key="pending">Pending</StatusPill>],
            ["#017", "Nova Consulting", "$500", <StatusPill tone="green" key="paid">Paid</StatusPill>],
            ["#016", "BrightEra Store", "$350", <StatusPill tone="green" key="paid2">Paid</StatusPill>],
          ]}
        />
      </Panel>
    </>
  );
}
