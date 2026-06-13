import type { SerializedToolPayload } from "./types";

export type AutomationTrigger = {
  id: string;
  label: string;
  description: string;
};

export type AutomationAction = {
  id: string;
  label: string;
  requiredFields: string[];
};

export type AutomationSeed = {
  workflowGoal: string;
  availableTriggers: AutomationTrigger[];
  availableActions: AutomationAction[];
  mappingFields: string[];
};

export type AutomationState = {
  actionSequence: string[];
  fieldMappings: Record<string, string>;
  qaNotes: string;
  triggerId: string;
};

export type AutomationPayload = SerializedToolPayload & {
  data: {
    triggerId: string;
    actionSequence: string[];
    fieldMappings: Record<string, string>;
    qaNotes: string;
  };
};

export function createAutomationSeed(): AutomationSeed {
  return {
    workflowGoal:
      "When a support ticket is tagged damaged_item, notify the client, create a replacement task, and log the customer response.",
    availableTriggers: [
      {
        id: "ticket_tagged",
        label: "Ticket tagged",
        description: "Runs when support adds or changes a ticket tag.",
      },
      {
        id: "order_refunded",
        label: "Order refunded",
        description: "Runs after an order refund is recorded.",
      },
      {
        id: "form_submitted",
        label: "Form submitted",
        description: "Runs when an intake form arrives.",
      },
    ],
    availableActions: [
      { id: "notify_client", label: "Notify client", requiredFields: ["client_email", "ticket_id"] },
      { id: "create_task", label: "Create replacement task", requiredFields: ["owner", "due_date"] },
      { id: "log_note", label: "Log CRM note", requiredFields: ["customer_email", "summary"] },
      { id: "send_customer_reply", label: "Send customer reply", requiredFields: ["customer_email"] },
    ],
    mappingFields: ["ticket_id", "customer_email", "client_email", "owner", "due_date", "summary"],
  };
}

export function createAutomationInitialValue(seed: AutomationSeed): AutomationState {
  return {
    actionSequence: [],
    fieldMappings: Object.fromEntries(seed.mappingFields.map((field) => [field, ""])),
    qaNotes: "",
    triggerId: seed.availableTriggers[0]?.id ?? "",
  };
}

export function serializeAutomation(value: AutomationState): AutomationPayload {
  return {
    toolType: "automation",
    summary: "Automation workflow configuration",
    data: {
      triggerId: value.triggerId,
      actionSequence: value.actionSequence,
      fieldMappings: value.fieldMappings,
      qaNotes: value.qaNotes,
    },
  };
}
