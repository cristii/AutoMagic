import { StatusPill, type StatusTone } from "./ui";

const taskStatusMap: Record<string, { label: string; tone: StatusTone }> = {
  available: { label: "Available", tone: "neutral" },
  "in-progress": { label: "In progress", tone: "purple" },
  waiting: { label: "Waiting client", tone: "green" },
  completed: { label: "Completed", tone: "gold" },
  blocked: { label: "Blocked", tone: "red" },
};

export function TaskStatus({ status }: { status: string }) {
  const config = taskStatusMap[status] ?? taskStatusMap.available;

  return <StatusPill tone={config.tone}>{config.label}</StatusPill>;
}
