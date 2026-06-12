import { Textarea } from "@automagic/ui";

import type { SerializedToolPayload, SimulatedToolDefinition } from "./types";

type InboxMessage = {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  tag: "urgent" | "client" | "newsletter" | "vendor";
};

type InboxSeed = {
  messages: InboxMessage[];
  activeMessageId: string;
};

type InboxPayload = SerializedToolPayload & {
  data: {
    activeMessageId: string;
    draftedReplyCount: number;
    labelsApplied: string[];
  };
};

export const inboxTool: SimulatedToolDefinition<InboxSeed, InboxPayload> = {
  type: "inbox",
  label: "Inbox",
  description: "Practice triage, labeling, replies, and escalation from a seeded inbox.",
  seedData: () => ({
    activeMessageId: "email-1",
    messages: [
      {
        id: "email-1",
        sender: "Sarah at Acme",
        subject: "Urgent: invoice #221 dispute",
        preview: "The invoice total does not match the contract. Can you check before noon?",
        tag: "urgent",
      },
      {
        id: "email-2",
        sender: "Mara Chen",
        subject: "Callback Tuesday?",
        preview: "Can we move the weekly sync into my afternoon window?",
        tag: "client",
      },
      {
        id: "email-3",
        sender: "Vendor digest",
        subject: "June vendor promotions",
        preview: "This week's vendor updates and discounts.",
        tag: "newsletter",
      },
    ],
  }),
  Surface: InboxSurface,
  serialize: (seed) => ({
    toolType: "inbox",
    summary: "Inbox triage draft and labels",
    data: {
      activeMessageId: seed.activeMessageId,
      draftedReplyCount: 1,
      labelsApplied: ["urgent", "client"],
    },
  }),
};

function InboxSurface({ seed, mode }: { seed: InboxSeed; mode: "mission" | "freeplay" }) {
  const activeMessage =
    seed.messages.find((message) => message.id === seed.activeMessageId) ?? seed.messages[0];

  return (
    <div className="tool-window">
      <div className="tool-list">
        {seed.messages.map((message) => (
          <button className={message.id === activeMessage?.id ? "active" : ""} key={message.id} type="button">
            <strong>{message.sender}</strong>
            <span>{message.subject}</span>
          </button>
        ))}
      </div>
      <div className="tool-workspace">
        <span className="muted">{mode === "mission" ? "Mission inbox" : "Free-play inbox"}</span>
        <h3>{activeMessage?.subject}</h3>
        <p className="muted">{activeMessage?.preview}</p>
        <Textarea label="Your reply" placeholder="Draft a concise, client-ready reply..." />
        <div className="inline-row">
          <button className="am-button am-button-secondary am-button-sm" type="button">
            Archive
          </button>
          <button className="am-button am-button-secondary am-button-sm" type="button">
            Label urgent
          </button>
          <button className="am-button am-button-primary am-button-sm" type="button">
            Send draft
          </button>
        </div>
      </div>
    </div>
  );
}
