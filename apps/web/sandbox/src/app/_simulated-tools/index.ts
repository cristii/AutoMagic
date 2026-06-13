import type { ToolType } from "../_data/sandbox";

import { automationTool } from "./automation";
import { calendarTool } from "./calendar";
import { crmTool } from "./crm";
import { ecommerceTool } from "./ecommerce";
import { inboxTool } from "./inbox";
import { spreadsheetTool } from "./spreadsheet";
import { supportTool } from "./support";
import { registerTool } from "./types";
import type { AnySimulatedToolDefinition, RegisteredSimulatedTool } from "./types";

const toolDefinitionsByType = {
  inbox: inboxTool,
  calendar: calendarTool,
  crm: crmTool,
  spreadsheet: spreadsheetTool,
  support: supportTool,
  ecommerce: ecommerceTool,
  automation: automationTool,
} satisfies Record<ToolType, AnySimulatedToolDefinition>;

const orderedToolTypes = [
  "inbox",
  "crm",
  "spreadsheet",
  "calendar",
  "support",
  "ecommerce",
  "automation",
] as const satisfies readonly ToolType[];

export const simulatedTools: RegisteredSimulatedTool[] = orderedToolTypes.map((type) =>
  registerTool(toolDefinitionsByType[type] as AnySimulatedToolDefinition),
);

export function getSimulatedTool(type: ToolType) {
  const tool = simulatedTools.find((candidate) => candidate.type === type);
  if (tool) return tool;

  const inbox = simulatedTools.find((candidate) => candidate.type === "inbox");
  if (!inbox) throw new Error("Inbox simulated tool is not registered.");
  return inbox;
}

export type { RegisteredSimulatedTool, SerializedToolPayload, SimulatedToolDefinition } from "./types";
