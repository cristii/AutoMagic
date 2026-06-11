import { Avatar, Panel } from "../ui";

export function Comment({ who, body, mine }: { who: string; body: string; mine?: boolean }) {
  return (
    <div className={mine ? "comment mine" : "comment"}>
      <Avatar label={who} />
      <p>{body}</p>
    </div>
  );
}

export function ChatBubble({ who, body, mine }: { who: string; body: string; mine?: boolean }) {
  return (
    <div className={mine ? "chat-bubble mine" : "chat-bubble"}>
      {!mine ? <Avatar label={who} size="sm" /> : null}
      <p>{body}</p>
    </div>
  );
}

export function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-stat">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

export function SummaryCard({ title, label }: { title: string; label: string }) {
  return (
    <Panel className="summary-card">
      <strong>{title}</strong>
      <span>{label}</span>
    </Panel>
  );
}
