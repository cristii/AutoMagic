import { Badge, Button, Textarea } from "@automagic/ui";

import {
  createSpreadsheetInitialValue,
  createSpreadsheetSeed,
  serializeSpreadsheet,
  type SheetRow,
  type SpreadsheetSeed,
  type SpreadsheetState,
} from "./spreadsheet.logic";
import type { SimulatedToolDefinition } from "./types";

export const spreadsheetTool: SimulatedToolDefinition<
  SpreadsheetSeed,
  SpreadsheetState,
  ReturnType<typeof serializeSpreadsheet>
> = {
  type: "spreadsheet",
  label: "Spreadsheet",
  description: "Practice sorting, lightweight analysis, summaries, and data quality checks.",
  seedData: createSpreadsheetSeed,
  initialValue: createSpreadsheetInitialValue,
  Surface: SpreadsheetSurface,
  serialize: serializeSpreadsheet,
};

function SpreadsheetSurface({
  value,
  onChange,
}: {
  seed: SpreadsheetSeed;
  mode: "mission" | "freeplay";
  value: SpreadsheetState;
  onChange: (value: SpreadsheetState) => void;
}) {
  const sortRows = (sortKey: SpreadsheetState["sortKey"]) => {
    const sortedRows = [...value.rows].sort((a, b) => {
      if (sortKey === "manual") return 0;
      return b[sortKey] - a[sortKey];
    });

    onChange({ ...value, rows: sortedRows, sortKey });
  };

  const markTopSku = (row: SheetRow) => {
    onChange({ ...value, topSku: row.sku });
  };

  const markReturnRiskSku = (row: SheetRow) => {
    onChange({ ...value, returnRiskSku: row.sku });
  };

  return (
    <div className="tool-workspace">
      <div className="inline-row">
        <Button label="Sort revenue" onClick={() => sortRows("revenue")} size="sm" />
        <Button label="Sort returns" onClick={() => sortRows("returns")} size="sm" />
        <Button label="Sort units" onClick={() => sortRows("units")} size="sm" />
        <Badge tone="neutral">Current sort: {value.sortKey}</Badge>
      </div>
      <div className="table-scroll">
        <table className="table-like">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Revenue</th>
              <th>Returns</th>
              <th>Units</th>
              <th>Insights</th>
            </tr>
          </thead>
          <tbody>
            {value.rows.map((row) => (
              <tr key={row.sku}>
                <td>{row.sku}</td>
                <td>{row.product}</td>
                <td>${row.revenue.toLocaleString()}</td>
                <td>{row.returns}</td>
                <td>{row.units}</td>
                <td>
                  <div className="inline-row">
                    <Button
                      label={value.topSku === row.sku ? "Top SKU" : "Mark top"}
                      onClick={() => markTopSku(row)}
                      size="sm"
                      variant={value.topSku === row.sku ? "primary" : "secondary"}
                    />
                    <Button
                      label={value.returnRiskSku === row.sku ? "Risk SKU" : "Mark risk"}
                      onClick={() => markReturnRiskSku(row)}
                      size="sm"
                      variant={value.returnRiskSku === row.sku ? "danger" : "secondary"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Textarea
        label="Client summary"
        onChange={(event) => onChange({ ...value, summary: event.currentTarget.value })}
        placeholder="Write a short client-ready summary with top product and return-risk notes..."
        value={value.summary}
      />
    </div>
  );
}
