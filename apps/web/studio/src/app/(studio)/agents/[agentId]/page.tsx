import { AgentWorkspacePage } from "../../../_components/pages";

export default async function AgentRoute({
  params,
}: {
  params: Promise<{ agentId: string }>;
}) {
  const { agentId } = await params;
  return <AgentWorkspacePage agentId={agentId} />;
}
