import Link from "next/link";
import {
  agents,
  dashboardMetrics,
  incomeBars,
  messages,
  tasks,
} from "../_data/studio";
import { MetricCard, Panel } from "./ui";
import { StudioIcon } from "./icons";
import { TaskStatus } from "./task-status";

export function DashboardHome() {
  const focusTasks = tasks.slice(0, 3);
  const quickAgents = ["email-drafting", "research", "report-generator"]
    .map((id) => agents.find((agent) => agent.id === id))
    .filter((agent): agent is (typeof agents)[number] => Boolean(agent));

  return (
    <>
      <div className="dashboard-hero">
        <div>
          <h1>Good morning, Cristi</h1>
          <p>3 active clients · 2 tasks due today · 1 invoice awaiting payment</p>
        </div>
      </div>

      <div className="metric-grid">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-left">
          <Panel
            title="Today’s focus"
            action={{ href: "/tasks", label: "View all tasks →" }}
          >
            <div className="focus-list">
              {focusTasks.map((task) => (
                <Link className="focus-row" href={`/tasks/${task.id}`} key={task.id}>
                  <span className="task-checkbox" />
                  <span>
                    <strong>{task.title}</strong>
                    <small>{task.client}</small>
                  </span>
                  <TaskStatus status={task.status} />
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Income — last 8 weeks" eyebrow="$500/wk retainer · 3 clients">
            <IncomeChart />
          </Panel>
        </div>

        <div className="dashboard-right">
          <Panel title="AI agents" eyebrow="Quick launch" className="agent-panel">
            <div className="quick-agent-list">
              {quickAgents.map((agent) => (
                <Link href={`/agents/${agent.id}`} key={agent.id}>
                  <StudioIcon name={agent.id === "research" ? "search" : "file"} />
                  <span>{agent.name}</span>
                  <b>→</b>
                </Link>
              ))}
              <Link className="more-link" href="/agents">
                + 5 more agents
              </Link>
            </div>
          </Panel>

          <Panel title="Recent messages" eyebrow="3 new">
            <div className="message-list">
              {messages.map((message) => (
                <Link className="message-row" href="/messages" key={message.client}>
                  <span className="avatar sm">{message.initials}</span>
                  <span>
                    <strong>{message.client}</strong>
                    <small>{message.preview}</small>
                  </span>
                  <time>{message.time}</time>
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function IncomeChart() {
  const max = Math.max(...incomeBars.map((bar) => bar.value));

  return (
    <div className="income-chart">
      <div className="chart-axis">
        <span>$1K</span>
        <span>$750</span>
        <span>$500</span>
        <span>$250</span>
        <span>$0</span>
      </div>
      <div className="chart-bars">
        {incomeBars.map((bar) => (
          <div key={bar.label}>
            <span style={{ height: `${(bar.value / max) * 100}%` }} />
            <small>{bar.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
