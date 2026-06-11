import Link from "next/link";
import { clients, tasks } from "../../_data/studio";
import { TaskStatus } from "../task-status";
import { Avatar, PageHeader, Panel } from "../ui";
import { SummaryStat } from "./shared";

export function ClientsPage({ clientId = "acme" }: { clientId?: string }) {
  const activeClient = clients.find((client) => client.id === clientId) ?? clients[0];
  const clientTasks = tasks
    .filter((task) => task.client === activeClient.name || task.client === "Acme Co")
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Client operations"
        title="Clients"
        description="Master-detail view for retainers, files, messages, invoices, and active work."
      />
      <div className="client-workspace">
        <Panel title="Client list" className="client-list-panel">
          {clients.map((client) => (
            <Link
              className={client.id === activeClient.id ? "client-row active" : "client-row"}
              href={`/clients/${client.id}`}
              key={client.id}
            >
              <Avatar label={client.name.slice(0, 2).toUpperCase()} />
              <span>
                <strong>{client.name}</strong>
                <small>{client.activeTasks} active tasks</small>
              </span>
            </Link>
          ))}
        </Panel>
        <div className="client-detail-panel">
          <Panel title={activeClient.name} eyebrow={`${activeClient.industry} · ${activeClient.status}`}>
            <div className="client-summary-grid">
              <SummaryStat label="Retainer" value={activeClient.retainer} />
              <SummaryStat label="Contact" value={activeClient.contact} />
              <SummaryStat label="Active tasks" value={String(activeClient.activeTasks)} />
              <SummaryStat label="Outstanding" value="$750" />
            </div>
          </Panel>
          <Panel title={`Tasks for ${activeClient.name}`}>
            <div className="focus-list">
              {clientTasks.map((task) => (
                <Link className="focus-row" href={`/tasks/${task.id}`} key={task.id}>
                  <span className="task-checkbox" />
                  <span>
                    <strong>{task.title}</strong>
                    <small>{task.category}</small>
                  </span>
                  <TaskStatus status={task.status} />
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}
