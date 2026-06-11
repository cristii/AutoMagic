import { TaskDetailPage } from "../../../_components/pages";

export default async function TaskDetailRoute({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  return <TaskDetailPage taskId={taskId} />;
}
