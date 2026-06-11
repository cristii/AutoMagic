import Link from "next/link";
import { agents } from "../../_data/studio";
import { StudioIcon } from "../icons";
import { PageHeader, Panel, StatusPill } from "../ui";

export function AgentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Automation bench"
        title="AI agents"
        description="Launch reusable assistants for email, research, reports, CRM updates, and client summaries."
        action={{ href: "/agents/research", label: "Open Research agent" }}
      />
      <div className="agent-library-grid">
        {agents.map((agent) => (
          <Link className="agent-library-card" href={`/agents/${agent.id}`} key={agent.id}>
            <span className="agent-mark">
              <StudioIcon name="spark" />
            </span>
            <strong>{agent.name}</strong>
            <p>{agent.description}</p>
            <div>
              <StatusPill tone={agent.status === "Running" ? "purple" : "gold"}>
                {agent.status}
              </StatusPill>
              <small>{agent.runs} runs</small>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export function AgentWorkspacePage({ agentId }: { agentId: string }) {
  const agent = agents.find((item) => item.id === agentId) ?? agents[1];

  return (
    <>
      <PageHeader
        eyebrow="Agent workspace"
        title={agent.name}
        description={agent.description}
        action={{ href: "/agents", label: "Agent library" }}
      />
      <div className="agent-workspace-grid">
        <Panel title="Prompt" eyebrow="Reusable instruction">
          <textarea defaultValue="Use the linked task, client files, and recent messages to produce a clear draft. Keep client-facing tone concise and specific." />
        </Panel>
        <Panel title="Run history" eyebrow={`${agent.runs} total`}>
          <div className="run-list">
            {[
              "Task #482 · Competitor report",
              "Acme Co · Weekly update",
              "BrightEra · Banner copy",
            ].map((run) => (
              <div key={run}>
                <strong>{run}</strong>
                <small>Completed · ready to reuse</small>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
