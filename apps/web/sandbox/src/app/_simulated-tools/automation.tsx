import { Badge, Button, Input, Select, Textarea } from "@automagic/ui";

import {
  createAutomationInitialValue,
  createAutomationSeed,
  serializeAutomation,
  type AutomationSeed,
  type AutomationState,
} from "./automation.logic";
import type { SimulatedToolDefinition } from "./types";

export const automationTool: SimulatedToolDefinition<
  AutomationSeed,
  AutomationState,
  ReturnType<typeof serializeAutomation>
> = {
  type: "automation",
  label: "Automation builder",
  description: "Practice trigger selection, action sequencing, field mapping, and QA notes.",
  seedData: createAutomationSeed,
  initialValue: createAutomationInitialValue,
  Surface: AutomationSurface,
  serialize: serializeAutomation,
};

function AutomationSurface({
  seed,
  value,
  onChange,
}: {
  seed: AutomationSeed;
  mode: "mission" | "freeplay";
  value: AutomationState;
  onChange: (value: AutomationState) => void;
}) {
  const toggleAction = (actionId: string) => {
    onChange({
      ...value,
      actionSequence: value.actionSequence.includes(actionId)
        ? value.actionSequence.filter((id) => id !== actionId)
        : [...value.actionSequence, actionId],
    });
  };

  const updateMapping = (field: string, mappedValue: string) => {
    onChange({
      ...value,
      fieldMappings: {
        ...value.fieldMappings,
        [field]: mappedValue,
      },
    });
  };

  const selectedTrigger = seed.availableTriggers.find((trigger) => trigger.id === value.triggerId);

  return (
    <div className="tool-window">
      <div className="tool-list" aria-label="Workflow goal">
        <div>
          <strong>Goal</strong>
          <span>{seed.workflowGoal}</span>
        </div>
        <div>
          <strong>Selected trigger</strong>
          <span>{selectedTrigger?.label ?? "None"}</span>
          <small>{selectedTrigger?.description}</small>
        </div>
      </div>
      <div className="tool-workspace">
        <Select
          label="Trigger"
          onChange={(event) => onChange({ ...value, triggerId: event.currentTarget.value })}
          options={seed.availableTriggers.map((trigger) => ({
            label: trigger.label,
            value: trigger.id,
          }))}
          value={value.triggerId}
        />
        <div className="section-stack">
          <strong>Action sequence</strong>
          <div className="tool-grid two">
            {seed.availableActions.map((action) => {
              const selected = value.actionSequence.includes(action.id);
              const order = value.actionSequence.indexOf(action.id) + 1;

              return (
                <button
                  className={selected ? "tool-option active" : "tool-option"}
                  key={action.id}
                  onClick={() => toggleAction(action.id)}
                  type="button"
                >
                  <span>{action.label}</span>
                  <small>{action.requiredFields.join(", ")}</small>
                  {selected ? <Badge tone="accent">Step {order}</Badge> : null}
                </button>
              );
            })}
          </div>
        </div>
        <div className="tool-grid two">
          {seed.mappingFields.map((field) => (
            <Input
              key={field}
              label={field.replace("_", " ")}
              onChange={(event) => updateMapping(field, event.currentTarget.value)}
              placeholder={`Map ${field}`}
              value={value.fieldMappings[field] ?? ""}
            />
          ))}
        </div>
        <Textarea
          label="QA notes"
          onChange={(event) => onChange({ ...value, qaNotes: event.currentTarget.value })}
          placeholder="List test cases, failure paths, and fields to verify before turning this on..."
          value={value.qaNotes}
        />
        <div className="inline-row">
          <Button
            label="Clear actions"
            onClick={() => onChange({ ...value, actionSequence: [] })}
            size="sm"
          />
          <Badge tone={value.actionSequence.length ? "success" : "neutral"}>
            {value.actionSequence.length} actions selected
          </Badge>
        </div>
      </div>
    </div>
  );
}
