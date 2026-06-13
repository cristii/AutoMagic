import { Button, Input, Select, Textarea } from "@automagic/ui";

import {
  createCrmInitialValue,
  createCrmSeed,
  serializeCrm,
  type CrmRecord,
  type CrmSeed,
  type CrmState,
  type CrmStatus,
} from "./crm.logic";
import type { SimulatedToolDefinition } from "./types";

export const crmTool: SimulatedToolDefinition<CrmSeed, CrmState, ReturnType<typeof serializeCrm>> = {
  type: "crm",
  label: "CRM",
  description: "Practice contact cleanup, enrichment, ownership checks, and duplicate handling.",
  seedData: createCrmSeed,
  initialValue: createCrmInitialValue,
  Surface: CrmSurface,
  serialize: serializeCrm,
};

function CrmSurface({
  seed,
  value,
  onChange,
}: {
  seed: CrmSeed;
  mode: "mission" | "freeplay";
  value: CrmState;
  onChange: (value: CrmState) => void;
}) {
  const markChanged = (recordId: string, nextRecords: CrmRecord[]) => {
    onChange({
      ...value,
      records: nextRecords,
      changedRecordIds: value.changedRecordIds.includes(recordId)
        ? value.changedRecordIds
        : [...value.changedRecordIds, recordId],
    });
  };

  const updateRecord = (recordId: string, patch: Partial<CrmRecord>) => {
    const nextRecords = value.records.map((record) =>
      record.id === recordId ? { ...record, ...patch } : record,
    );
    markChanged(recordId, nextRecords);
  };

  const toggleDuplicate = (recordId: string) => {
    const isDuplicate = value.duplicateIds.includes(recordId);
    const duplicateIds = isDuplicate
      ? value.duplicateIds.filter((id) => id !== recordId)
      : [...value.duplicateIds, recordId];
    const nextStatus: CrmStatus = isDuplicate ? "needs_review" : "duplicate";
    const nextRecords = value.records.map((record) =>
      record.id === recordId
        ? { ...record, status: nextStatus }
        : record,
    );

    onChange({
      ...value,
      duplicateIds,
      records: nextRecords,
      changedRecordIds: value.changedRecordIds.includes(recordId)
        ? value.changedRecordIds
        : [...value.changedRecordIds, recordId],
    });
  };

  return (
    <div className="tool-workspace">
      <div className="table-scroll">
        <table className="table-like">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Owner</th>
              <th>Status</th>
              <th>Next step</th>
              <th>Duplicate</th>
            </tr>
          </thead>
          <tbody>
            {value.records.map((record) => (
              <tr key={record.id}>
                <td>{record.company}</td>
                <td>{record.contact}</td>
                <td>
                  <Select
                    aria-label={`${record.company} owner`}
                    label="Owner"
                    onChange={(event) => updateRecord(record.id, { owner: event.currentTarget.value })}
                    options={seed.owners.map((owner) => ({ label: owner, value: owner }))}
                    value={record.owner}
                  />
                </td>
                <td>
                  <Select
                    aria-label={`${record.company} status`}
                    label="Status"
                    onChange={(event) =>
                      updateRecord(record.id, { status: event.currentTarget.value as CrmStatus })
                    }
                    options={seed.statuses.map((status) => ({
                      label: status.replace("_", " "),
                      value: status,
                    }))}
                    value={record.status}
                  />
                </td>
                <td>
                  <Input
                    aria-label={`${record.company} next step`}
                    label="Next step"
                    onChange={(event) => updateRecord(record.id, { nextStep: event.currentTarget.value })}
                    value={record.nextStep}
                  />
                </td>
                <td>
                  <Button
                    label={value.duplicateIds.includes(record.id) ? "Flagged" : "Flag"}
                    onClick={() => toggleDuplicate(record.id)}
                    size="sm"
                    variant={value.duplicateIds.includes(record.id) ? "danger" : "secondary"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Textarea
        label="Batch notes"
        onChange={(event) => onChange({ ...value, notes: event.currentTarget.value })}
        placeholder="Summarize updates, preserved fields, and duplicate decisions..."
        value={value.notes}
      />
      <div className="inline-row">
        <Button
          label={value.batchSaved ? "Batch saved" : "Save batch"}
          onClick={() => onChange({ ...value, batchSaved: true })}
          size="sm"
          variant="primary"
        />
        <span className="muted">
          {value.changedRecordIds.length} changed · {value.duplicateIds.length} duplicate flagged
        </span>
      </div>
    </div>
  );
}
