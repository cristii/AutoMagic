import { Badge, Button, Select, Textarea } from "@automagic/ui";

import {
  createSupportInitialValue,
  createSupportSeed,
  serializeSupport,
  type SupportSeed,
  type SupportState,
} from "./support.logic";
import type { SimulatedToolDefinition } from "./types";

export const supportTool: SimulatedToolDefinition<
  SupportSeed,
  SupportState,
  ReturnType<typeof serializeSupport>
> = {
  type: "support",
  label: "Support desk",
  description: "Practice ticket classification, policy-safe decisions, and customer replies.",
  seedData: createSupportSeed,
  initialValue: createSupportInitialValue,
  Surface: SupportSurface,
  serialize: serializeSupport,
};

function SupportSurface({
  seed,
  value,
  onChange,
}: {
  seed: SupportSeed;
  mode: "mission" | "freeplay";
  value: SupportState;
  onChange: (value: SupportState) => void;
}) {
  return (
    <div className="tool-window">
      <div className="tool-list" aria-label="Support context">
        <div>
          <strong>{seed.ticket.customer}</strong>
          <span>{seed.ticket.subject}</span>
          <small>Sentiment: {seed.ticket.sentiment}</small>
        </div>
        <div>
          <strong>{seed.orderStatus.orderId}</strong>
          <span>Delivered {seed.orderStatus.deliveredAt}</span>
          <small>{seed.orderStatus.returnWindowDays}-day return window</small>
        </div>
      </div>
      <div className="tool-workspace">
        <div className="section-heading">
          <h3>{seed.ticket.subject}</h3>
          <p className="muted">{seed.ticket.message}</p>
        </div>
        <div className="chip-list">
          {seed.policyNotes.map((note) => (
            <span className="chip" key={note}>
              {note}
            </span>
          ))}
        </div>
        <div className="tool-grid two">
          <Select
            label="Classification"
            onChange={(event) => onChange({ ...value, classification: event.currentTarget.value })}
            options={seed.classificationOptions.map((option) => ({
              label: option.replace("_", " "),
              value: option,
            }))}
            value={value.classification}
          />
          <Select
            label="Refund or escalation choice"
            onChange={(event) => onChange({ ...value, refundChoice: event.currentTarget.value })}
            options={[
              { label: "Choose outcome", value: "" },
              ...seed.refundOptions.map((option) => ({
                label: option.replaceAll("_", " "),
                value: option,
              })),
            ]}
            value={value.refundChoice}
          />
        </div>
        <div className="inline-row">
          <Button
            label={value.escalateToClient ? "Escalation selected" : "Escalate to client"}
            onClick={() => onChange({ ...value, escalateToClient: !value.escalateToClient })}
            size="sm"
            variant={value.escalateToClient ? "danger" : "secondary"}
          />
          <Badge tone={value.refundChoice ? "info" : "neutral"}>
            {value.refundChoice ? "Decision captured" : "Decision pending"}
          </Badge>
        </div>
        <Textarea
          label="Customer reply"
          onChange={(event) => onChange({ ...value, replyDraft: event.currentTarget.value })}
          placeholder="Acknowledge the issue, apply policy, and explain the next step..."
          value={value.replyDraft}
        />
      </div>
    </div>
  );
}
