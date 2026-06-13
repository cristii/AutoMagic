import { Badge, Button, Textarea } from "@automagic/ui";

import {
  createInboxInitialValue,
  createInboxSeed,
  serializeInbox,
  type InboxSeed,
  type InboxState,
} from "./inbox.logic";
import type { SimulatedToolDefinition } from "./types";

export const inboxTool: SimulatedToolDefinition<InboxSeed, InboxState, ReturnType<typeof serializeInbox>> = {
  type: "inbox",
  label: "Inbox",
  description: "Practice triage, labeling, replies, and escalation from a seeded inbox.",
  seedData: createInboxSeed,
  initialValue: createInboxInitialValue,
  Surface: InboxSurface,
  serialize: serializeInbox,
};

function InboxSurface({
  seed,
  mode,
  value,
  onChange,
}: {
  seed: InboxSeed;
  mode: "mission" | "freeplay";
  value: InboxState;
  onChange: (value: InboxState) => void;
}) {
  const activeMessage =
    seed.messages.find((message) => message.id === value.activeMessageId) ?? seed.messages[0];
  const activeLabels = value.labelsByMessageId[activeMessage?.id ?? ""] ?? [];
  const activeDraft = value.draftsByMessageId[activeMessage?.id ?? ""] ?? "";
  const isArchived = activeMessage ? value.archivedIds.includes(activeMessage.id) : false;
  const isFlagged = activeMessage ? value.flaggedIds.includes(activeMessage.id) : false;

  const updateActiveMessage = (messageId: string) => {
    onChange({ ...value, activeMessageId: messageId });
  };

  const toggleListValue = (items: string[], item: string) =>
    items.includes(item) ? items.filter((candidate) => candidate !== item) : [...items, item];

  const toggleArchive = () => {
    if (!activeMessage) return;
    onChange({
      ...value,
      archivedIds: toggleListValue(value.archivedIds, activeMessage.id),
    });
  };

  const toggleFlag = () => {
    if (!activeMessage) return;
    onChange({
      ...value,
      flaggedIds: toggleListValue(value.flaggedIds, activeMessage.id),
    });
  };

  const toggleLabel = (label: string) => {
    if (!activeMessage) return;
    const nextLabels = toggleListValue(activeLabels, label);
    onChange({
      ...value,
      labelsByMessageId: {
        ...value.labelsByMessageId,
        [activeMessage.id]: nextLabels,
      },
    });
  };

  const updateDraft = (body: string) => {
    if (!activeMessage) return;
    onChange({
      ...value,
      draftsByMessageId: {
        ...value.draftsByMessageId,
        [activeMessage.id]: body,
      },
    });
  };

  return (
    <div className="tool-window">
      <div className="tool-list" aria-label="Inbox messages">
        {seed.messages.map((message) => (
          <button
            className={message.id === activeMessage?.id ? "active" : ""}
            key={message.id}
            onClick={() => updateActiveMessage(message.id)}
            type="button"
          >
            <strong>{message.sender}</strong>
            <span>{message.subject}</span>
            <small>{message.tag}</small>
          </button>
        ))}
      </div>
      <div className="tool-workspace">
        <div className="inline-row">
          <Badge tone={mode === "mission" ? "accent" : "neutral"}>
            {mode === "mission" ? "Mission inbox" : "Free-play inbox"}
          </Badge>
          {activeMessage ? <Badge tone="info">{activeMessage.tag}</Badge> : null}
          {isArchived ? <Badge tone="success">Archived</Badge> : null}
          {isFlagged ? <Badge tone="warning">Flagged</Badge> : null}
        </div>
        <div className="section-heading">
          <h3>{activeMessage?.subject}</h3>
          <p className="muted">{activeMessage?.body}</p>
        </div>
        <div className="chip-list" aria-label="Labels">
          {seed.availableLabels.map((label) => (
            <button
              className={activeLabels.includes(label) ? "chip active" : "chip"}
              key={label}
              onClick={() => toggleLabel(label)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
        <Textarea
          label="Your reply"
          onChange={(event) => updateDraft(event.currentTarget.value)}
          placeholder="Draft a concise, client-ready reply..."
          value={activeDraft}
        />
        <div className="inline-row">
          <Button
            label={isArchived ? "Restore" : "Archive"}
            onClick={toggleArchive}
            size="sm"
            variant="secondary"
          />
          <Button
            label={isFlagged ? "Clear flag" : "Flag escalation"}
            onClick={toggleFlag}
            size="sm"
            variant={isFlagged ? "danger" : "secondary"}
          />
        </div>
      </div>
    </div>
  );
}
