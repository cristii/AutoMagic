import type { SerializedToolPayload, SimulatedToolDefinition } from "./types";

type SheetRow = {
  sku: string;
  product: string;
  revenue: number;
  returns: number;
};

type SpreadsheetSeed = {
  rows: SheetRow[];
};

type SpreadsheetPayload = SerializedToolPayload & {
  data: {
    topSku: string;
    returnRiskSku: string;
  };
};

export const spreadsheetTool: SimulatedToolDefinition<SpreadsheetSeed, SpreadsheetPayload> = {
  type: "spreadsheet",
  label: "Spreadsheet",
  description: "Practice sorting, lightweight analysis, summaries, and data quality checks.",
  seedData: () => ({
    rows: [
      { sku: "AM-101", product: "Starter bundle", revenue: 12840, returns: 4 },
      { sku: "AM-204", product: "Monthly refill", revenue: 18420, returns: 14 },
      { sku: "AM-305", product: "Gift kit", revenue: 9720, returns: 2 },
    ],
  }),
  Surface: SpreadsheetSurface,
  serialize: (seed) => ({
    toolType: "spreadsheet",
    summary: "Spreadsheet analysis output",
    data: {
      topSku: seed.rows.toSorted((a, b) => b.revenue - a.revenue)[0]?.sku ?? "",
      returnRiskSku: seed.rows.toSorted((a, b) => b.returns - a.returns)[0]?.sku ?? "",
    },
  }),
};

function SpreadsheetSurface({ seed }: { seed: SpreadsheetSeed; mode: "mission" | "freeplay" }) {
  return (
    <div className="tool-workspace">
      <table className="table-like">
        <thead>
          <tr>
            <th>SKU</th>
            <th>Product</th>
            <th>Revenue</th>
            <th>Returns</th>
          </tr>
        </thead>
        <tbody>
          {seed.rows.map((row) => (
            <tr key={row.sku}>
              <td>{row.sku}</td>
              <td>{row.product}</td>
              <td>${row.revenue.toLocaleString()}</td>
              <td>{row.returns}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">Sort, summarize, and prepare a client-ready note from this export.</p>
    </div>
  );
}
