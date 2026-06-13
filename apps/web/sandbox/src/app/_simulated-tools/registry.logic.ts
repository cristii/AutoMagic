import { toolTypes, type ToolType } from "../_data/sandbox.ts";

export const fallbackToolType: ToolType = "inbox";
export const registeredToolTypes: ToolType[] = [...toolTypes];

export function normalizeToolType(value: unknown): ToolType {
  const candidate = Array.isArray(value) ? value[0] : value;

  if (
    typeof candidate === "string" &&
    (toolTypes as readonly string[]).includes(candidate)
  ) {
    return candidate as ToolType;
  }

  return fallbackToolType;
}
