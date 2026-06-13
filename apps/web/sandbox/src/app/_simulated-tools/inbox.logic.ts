import type { SerializedToolPayload } from "./types";

export type InboxMessage = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  body: string;
  tag: "urgent" | "client" | "newsletter" | "vendor";
};

export type InboxSeed = {
  messages: InboxMessage[];
  activeMessageId: string;
  availableLabels: string[];
};

export type InboxState = {
  activeMessageId: string;
  archivedIds: string[];
  draftsByMessageId: Record<string, string>;
  flaggedIds: string[];
  labelsByMessageId: Record<string, string[]>;
};

export type InboxPayload = SerializedToolPayload & {
  data: {
    selectedMessageIds: string[];
    labelsApplied: Array<{ messageId: string; labels: string[] }>;
    archivedIds: string[];
    drafts: Array<{ messageId: string; body: string }>;
    flaggedIds: string[];
  };
};

export function createInboxSeed(): InboxSeed {
  return {
    activeMessageId: "email-1",
    availableLabels: ["urgent", "client", "invoice", "callback", "vendor"],
    messages: [
      {
        id: "email-1",
        sender: "Sarah at Acme",
        subject: "Urgent: invoice #221 dispute",
        preview: "The invoice total does not match the contract. Can you check before noon?",
        body:
          "The invoice total does not match the contract. We are blocked on payment approval until this is checked. Please confirm before noon if we should pay the current total or request a corrected invoice.",
        tag: "urgent",
      },
      {
        id: "email-2",
        sender: "Mara Chen",
        subject: "Callback Tuesday?",
        preview: "Can we move the weekly sync into my afternoon window?",
        body:
          "Can we move the weekly sync into my afternoon window on Tuesday? I can do 2:00, 2:30, or 4:00 PM ET.",
        tag: "client",
      },
      {
        id: "email-3",
        sender: "Vendor digest",
        subject: "June vendor promotions",
        preview: "This week's vendor updates and discounts.",
        body:
          "This week's vendor updates and discounts. No action required unless the client asks for procurement options.",
        tag: "newsletter",
      },
      {
        id: "email-4",
        sender: "Northstar Supplies",
        subject: "Backorder notice for Acme kit",
        preview: "One item is backordered and needs approval for a substitute.",
        body:
          "The standard refill insert is on backorder. We can ship a compatible substitute today if approved before 3 PM.",
        tag: "vendor",
      },
    ],
  };
}

export function createInboxInitialValue(seed: InboxSeed): InboxState {
  return {
    activeMessageId: seed.activeMessageId,
    archivedIds: [],
    draftsByMessageId: {},
    flaggedIds: [],
    labelsByMessageId: {},
  };
}

export function serializeInbox(value: InboxState): InboxPayload {
  return {
    toolType: "inbox",
    summary: "Inbox triage draft and labels",
    data: {
      selectedMessageIds: [value.activeMessageId],
      labelsApplied: Object.entries(value.labelsByMessageId)
        .filter(([, labels]) => labels.length > 0)
        .map(([messageId, labels]) => ({ messageId, labels })),
      archivedIds: value.archivedIds,
      drafts: Object.entries(value.draftsByMessageId)
        .filter(([, body]) => body.trim().length > 0)
        .map(([messageId, body]) => ({ messageId, body })),
      flaggedIds: value.flaggedIds,
    },
  };
}
