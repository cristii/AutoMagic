import Link from "next/link";
import { tasks } from "../../_data/studio";
import { StudioIcon } from "../icons";
import { TaskStatus } from "../task-status";
import { PageHeader, Panel, StatusPill } from "../ui";
import { Comment } from "./shared";

export function TasksPage() {
  const groups = [
    ["available", "Available"],
    ["in-progress", "In progress"],
    ["waiting", "Waiting client"],
    ["completed", "Completed"],
  ] as const;

  return (
    <>
      <PageHeader
        eyebrow="Task command center"
        title="Tasks"
        description="Triage available work, active task delivery, client reviews, and completed outcomes."
        action={{ href: "/tasks/482", label: "Open active task" }}
      />
      <div className="kanban-grid">
        {groups.map(([status, label]) => {
          const groupTasks = tasks.filter((task) => task.status === status);

          return (
            <Panel title={label} eyebrow={`${groupTasks.length} cards`} key={status}>
              <div className="task-card-list">
                {groupTasks.map((task) => (
                  <Link className="task-card" href={`/tasks/${task.id}`} key={task.id}>
                    <div>
                      <strong>{task.title}</strong>
                      <small>{task.client}</small>
                    </div>
                    <div className="task-card-meta">
                      <span>{task.budget}</span>
                      <span>{task.due}</span>
                      {task.agent ? <StatusPill tone="gold">AI · {task.agent}</StatusPill> : null}
                    </div>
                  </Link>
                ))}
              </div>
            </Panel>
          );
        })}
      </div>
    </>
  );
}

export function TaskDetailPage({ taskId }: { taskId: string }) {
  const task = tasks.find((item) => item.id === taskId) ?? tasks[0];

  return (
    <>
      <PageHeader
        eyebrow={`Task #${task.id}`}
        title={task.title}
        description={`${task.client} · ${task.category} · ${task.budget} · due ${task.due}`}
        action={{ href: "/tasks", label: "Back to board" }}
      />

      <div className="task-detail-grid">
        <div className="task-detail-main">
          <Panel title="Brief" eyebrow="Client context">
            <p className="body-copy">
              Prepare a concise weekly research report with competitor movements,
              pricing notes, launch signals, and recommended follow-up actions.
            </p>
            <div className="attachment-row">
              <span>brief.pdf</span>
              <span>data.xlsx</span>
              <span>prior-report.md</span>
            </div>
          </Panel>

          <Panel title="Conversation" eyebrow="Comments and delivery notes">
            <div className="comment-thread">
              <Comment who="MC" body="Please emphasize ecommerce competitors and any ad-copy shifts." />
              <Comment who="CS" body="Draft is in progress. I’m validating the pricing table before delivery." mine />
            </div>
            <div className="composer-row">
              <span>Write a comment...</span>
              <button type="button">Send</button>
            </div>
          </Panel>
        </div>

        <aside className="ai-dock">
          <div className="ai-dock-header">
            <StudioIcon name="spark" />
            <div>
              <strong>AI agent</strong>
              <small>Research · scoped to task #{task.id}</small>
            </div>
          </div>
          <Panel title="Inputs" className="flat-panel">
            <div className="attachment-row">
              <span>brief.pdf</span>
              <span>data.xlsx</span>
              <span>client notes</span>
            </div>
          </Panel>
          <Panel title="Draft output" className="flat-panel">
            <p className="body-copy">
              The research run found three notable competitor changes and two
              recommended follow-up actions for this week’s client report.
            </p>
            <div className="dock-actions">
              <button type="button">Copy</button>
              <button type="button">Insert as delivery</button>
            </div>
          </Panel>
          <div className="composer-row compact">
            <span>Refine the draft...</span>
            <button type="button">Run</button>
          </div>
        </aside>
      </div>
    </>
  );
}
