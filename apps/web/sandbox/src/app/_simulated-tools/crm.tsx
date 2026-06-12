import type { SerializedToolPayload, SimulatedToolDefinition } from "./types";

type CrmRecord = {
  id: string;
  company: string;
  owner: string;
  status: "active" | "stale" | "duplicate";
  nextStep: string;
};

type CrmSeed = {
  records: CrmRecord[];
};

type CrmPayload = SerializedToolPayload & {
  data: {
    updatedRecordIds: string[];
    duplicateIds: string[];
  };
};

export const crmTool: SimulatedToolDefinition<CrmSeed, CrmPayload> = {
  type: "crm",
  label: "CRM",
  description: "Practice contact cleanup, enrichment, ownership checks, and duplicate handling.",
  seedData: () => ({
    records: [
      { id: "crm-1", company: "Acme Co", owner: "Mara", status: "active", nextStep: "Confirm invoice owner" },
      { id: "crm-2", company: "Vela Foods", owner: "Andre", status: "stale", nextStep: "Update email" },
      { id: "crm-3", company: "Acme Co", owner: "Mara", status: "duplicate", nextStep: "Merge review" },
    ],
  }),
  Surface: CrmSurface,
  serialize: (seed) => ({
    toolType: "crm",
    summary: "CRM update batch",
    data: {
      updatedRecordIds: seed.records.slice(0, 2).map((record) => record.id),
      duplicateIds: seed.records.filter((record) => record.status === "duplicate").map((record) => record.id),
    },
  }),
};

function CrmSurface({ seed }: { seed: CrmSeed; mode: "mission" | "freeplay" }) {
  return (
    <div className="tool-workspace">
      <table className="table-like">
        <thead>
          <tr>
            <th>Company</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Next step</th>
          </tr>
        </thead>
        <tbody>
          {seed.records.map((record) => (
            <tr key={record.id}>
              <td>{record.company}</td>
              <td>{record.owner}</td>
              <td>{record.status}</td>
              <td>{record.nextStep}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="inline-row">
        <button className="am-button am-button-secondary am-button-sm" type="button">
          Flag duplicate
        </button>
        <button className="am-button am-button-primary am-button-sm" type="button">
          Save batch
        </button>
      </div>
    </div>
  );
}
