import { createElement, type ComponentType } from "react";

import type { ToolType } from "../_data/sandbox";

export type ToolMode = "mission" | "freeplay";

export type SerializedToolPayload = {
  toolType: ToolType;
  summary: string;
  data: Record<string, unknown>;
};

export type SimulatedToolSurfaceProps<TSeed, TValue> = {
  seed: TSeed;
  mode: ToolMode;
  value: TValue;
  onChange: (value: TValue) => void;
};

export type SimulatedToolDefinition<
  TSeed,
  TValue,
  TPayload extends SerializedToolPayload,
> = {
  type: ToolType;
  label: string;
  description: string;
  seedData: () => TSeed;
  initialValue: (seed: TSeed) => TValue;
  Surface: ComponentType<SimulatedToolSurfaceProps<TSeed, TValue>>;
  serialize: (value: TValue) => TPayload;
};

export type AnySimulatedToolDefinition = SimulatedToolDefinition<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  SerializedToolPayload
>;

export type RegisteredSimulatedTool = {
  type: ToolType;
  label: string;
  description: string;
  seedData: () => unknown;
  initialValue: (seed: unknown) => unknown;
  Surface: ComponentType<SimulatedToolSurfaceProps<unknown, unknown>>;
  serialize: (value: unknown) => SerializedToolPayload;
};

export function registerTool<TSeed, TValue, TPayload extends SerializedToolPayload>(
  tool: SimulatedToolDefinition<TSeed, TValue, TPayload>,
): RegisteredSimulatedTool {
  const Surface: ComponentType<SimulatedToolSurfaceProps<unknown, unknown>> = ({
    seed,
    mode,
    value,
    onChange,
  }) => (
    createElement(tool.Surface, {
      seed: seed as TSeed,
      mode,
      value: value as TValue,
      onChange: onChange as (value: TValue) => void,
    })
  );

  return {
    type: tool.type,
    label: tool.label,
    description: tool.description,
    seedData: tool.seedData,
    initialValue: (seed: unknown) => tool.initialValue(seed as TSeed),
    Surface,
    serialize: (value: unknown) => tool.serialize(value as TValue),
  };
}
