import type { SerializedToolPayload } from "./types";

export type SheetRow = {
  sku: string;
  product: string;
  revenue: number;
  returns: number;
  units: number;
};

export type SpreadsheetSeed = {
  rows: SheetRow[];
};

export type SpreadsheetState = {
  returnRiskSku: string;
  rows: SheetRow[];
  sortKey: "manual" | "revenue" | "returns" | "units";
  summary: string;
  topSku: string;
};

export type SpreadsheetPayload = SerializedToolPayload & {
  data: {
    rowOrder: string[];
    selectedInsights: {
      topSku: string;
      returnRiskSku: string;
    };
    summary: string;
  };
};

export function createSpreadsheetSeed(): SpreadsheetSeed {
  return {
    rows: [
      { sku: "AM-101", product: "Starter bundle", revenue: 12840, returns: 4, units: 214 },
      { sku: "AM-204", product: "Monthly refill", revenue: 18420, returns: 14, units: 487 },
      { sku: "AM-305", product: "Gift kit", revenue: 9720, returns: 2, units: 108 },
      { sku: "AM-412", product: "Premium kit", revenue: 15480, returns: 9, units: 129 },
    ],
  };
}

export function createSpreadsheetInitialValue(seed: SpreadsheetSeed): SpreadsheetState {
  return {
    returnRiskSku: "",
    rows: seed.rows.map((row) => ({ ...row })),
    sortKey: "manual",
    summary: "",
    topSku: "",
  };
}

export function serializeSpreadsheet(value: SpreadsheetState): SpreadsheetPayload {
  return {
    toolType: "spreadsheet",
    summary: "Spreadsheet analysis output",
    data: {
      rowOrder: value.rows.map((row) => row.sku),
      selectedInsights: {
        topSku: value.topSku,
        returnRiskSku: value.returnRiskSku,
      },
      summary: value.summary,
    },
  };
}
