import { messages } from "../../_data/studio";
import { StudioIcon } from "../icons";
import { Avatar, PageHeader, Panel } from "../ui";
import { ChatBubble } from "./shared";

export function MessagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client communication"
        title="Chat"
        description="Focused client threads with linked tasks and AI-suggested replies."
      />
      <div className="messages-layout">
        <Panel title="Conversations" className="conversation-panel">
          {messages.map((message, index) => (
            <div className={index === 0 ? "conversation-row active" : "conversation-row"} key={message.client}>
              <Avatar label={message.initials} />
              <span>
                <strong>{message.client}</strong>
                <small>{message.preview}</small>
              </span>
              {message.unread ? <b /> : null}
            </div>
          ))}
        </Panel>
        <Panel title="Nova Consulting" eyebrow="linked task #482">
          <div className="chat-thread">
            <ChatBubble who="NK" body="Thanks! The report looks great. Could we include paid search notes too?" />
            <ChatBubble who="CS" body="Yes. I’ll add a paid search section before delivery." mine />
            <ChatBubble who="NK" body="Perfect, thank you." />
          </div>
          <div className="ai-reply">
            <StudioIcon name="spark" />
            <span>AI suggested reply: acknowledge request and confirm delivery window.</span>
            <button type="button">Use</button>
          </div>
          <div className="composer-row">
            <span>Message Nova Consulting...</span>
            <button type="button">Send</button>
          </div>
        </Panel>
      </div>
    </>
  );
}
