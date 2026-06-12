import type { ToolType } from "../_data/sandbox";

import { crmTool } from "./crm";
import { inboxTool } from "./inbox";
import { spreadsheetTool } from "./spreadsheet";
import { createStubTool } from "./stubs";
import { registerTool } from "./types";
import type { RegisteredSimulatedTool } from "./types";

export const simulatedTools: RegisteredSimulatedTool[] = [
  registerTool(inboxTool),
  registerTool(crmTool),
  registerTool(spreadsheetTool),
  registerTool(createStubTool("calendar", "Calendar", ["Resolve timezone conflicts", "Place confirmed holds"])),
  registerTool(createStubTool("support", "Support desk", ["Classify ticket", "Draft policy-safe reply"])),
  registerTool(createStubTool("ecommerce", "Ecommerce admin", ["Check order status", "Prepare refund note"])),
  registerTool(createStubTool("automation", "Automation builder", ["Map trigger", "Draft action sequence"])),
];

export function getSimulatedTool(type: ToolType) {
  const tool = simulatedTools.find((candidate) => candidate.type === type);
  if (tool) return tool;

  const inbox = simulatedTools.find((candidate) => candidate.type === "inbox");
  if (!inbox) throw new Error("Inbox simulated tool is not registered.");
  return inbox;
}

export type { RegisteredSimulatedTool, SerializedToolPayload, SimulatedToolDefinition } from "./types";
