import { createElement, type ComponentType } from "react";

import type { ToolType } from "../_data/sandbox";

export type ToolMode = "mission" | "freeplay";

export type SerializedToolPayload = {
  toolType: ToolType;
  summary: string;
  data: Record<string, unknown>;
};

export type SimulatedToolSurfaceProps<TSeed> = {
  seed: TSeed;
  mode: ToolMode;
};

export type SimulatedToolDefinition<TSeed, TPayload extends SerializedToolPayload> = {
  type: ToolType;
  label: string;
  description: string;
  seedData: () => TSeed;
  Surface: ComponentType<SimulatedToolSurfaceProps<TSeed>>;
  serialize: (seed: TSeed) => TPayload;
};

export type RegisteredSimulatedTool = {
  type: ToolType;
  label: string;
  description: string;
  seedData: () => unknown;
  Surface: ComponentType<SimulatedToolSurfaceProps<unknown>>;
  serialize: (seed: unknown) => SerializedToolPayload;
};

export function registerTool<TSeed, TPayload extends SerializedToolPayload>(
  tool: SimulatedToolDefinition<TSeed, TPayload>,
): RegisteredSimulatedTool {
  const Surface: ComponentType<SimulatedToolSurfaceProps<unknown>> = ({ seed, mode }) => (
    createElement(tool.Surface, { seed: seed as TSeed, mode })
  );

  return {
    type: tool.type,
    label: tool.label,
    description: tool.description,
    seedData: tool.seedData,
    Surface,
    serialize: (seed: unknown) => tool.serialize(seed as TSeed),
  };
}
