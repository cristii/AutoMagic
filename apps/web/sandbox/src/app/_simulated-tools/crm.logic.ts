import type { SerializedToolPayload } from "./types";

export type CrmStatus = "active" | "stale" | "needs_review" | "duplicate";

export type CrmRecord = {
  id: string;
  company: string;
  contact: string;
  owner: string;
  status: CrmStatus;
  nextStep: string;
};

export type CrmSeed = {
  records: CrmRecord[];
  owners: string[];
  statuses: CrmStatus[];
};

export type CrmState = {
  batchSaved: boolean;
  duplicateIds: string[];
  notes: string;
  records: CrmRecord[];
  changedRecordIds: string[];
};

export type CrmPayload = SerializedToolPayload & {
  data: {
    changedRecords: CrmRecord[];
    duplicateIds: string[];
    notes: string;
    batchSaved: boolean;
  };
};

export function createCrmSeed(): CrmSeed {
  return {
    owners: ["Mara", "Andre", "Priya", "Unassigned"],
    statuses: ["active", "stale", "needs_review", "duplicate"],
    records: [
      {
        id: "crm-1",
        company: "Acme Co",
        contact: "Sarah Jensen",
        owner: "Mara",
        status: "active",
        nextStep: "Confirm invoice owner",
      },
      {
        id: "crm-2",
        company: "Vela Foods",
        contact: "Noah Patel",
        owner: "Andre",
        status: "stale",
        nextStep: "Update email",
      },
      {
        id: "crm-3",
        company: "Acme Co",
        contact: "Sara Jensen",
        owner: "Mara",
        status: "duplicate",
        nextStep: "Merge review",
      },
      {
        id: "crm-4",
        company: "Koru Studio",
        contact: "Lina Ramos",
        owner: "Unassigned",
        status: "needs_review",
        nextStep: "Assign owner",
      },
    ],
  };
}

export function createCrmInitialValue(seed: CrmSeed): CrmState {
  return {
    batchSaved: false,
    changedRecordIds: [],
    duplicateIds: seed.records
      .filter((record) => record.status === "duplicate")
      .map((record) => record.id),
    notes: "",
    records: seed.records.map((record) => ({ ...record })),
  };
}

export function serializeCrm(value: CrmState): CrmPayload {
  const changedIds = new Set(value.changedRecordIds);

  return {
    toolType: "crm",
    summary: "CRM update batch",
    data: {
      changedRecords: value.records.filter((record) => changedIds.has(record.id)),
      duplicateIds: value.duplicateIds,
      notes: value.notes,
      batchSaved: value.batchSaved,
    },
  };
}
