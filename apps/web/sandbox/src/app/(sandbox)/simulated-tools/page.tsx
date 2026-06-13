import { Badge, Card, Tabs } from "@automagic/ui";

import { simulatedTools } from "../../_simulated-tools";
import { normalizeToolType } from "../../_simulated-tools/registry.logic";
import { SimulatedToolRunner } from "../../_simulated-tools/simulated-tool-runner";

type SimulatedToolsPageProps = {
  searchParams: Promise<{
    tool?: string | string[];
  }>;
};

export default async function SimulatedToolsPage({ searchParams }: SimulatedToolsPageProps) {
  const activeToolType = normalizeToolType((await searchParams).tool);
  const activeTool =
    simulatedTools.find((tool) => tool.type === activeToolType) ?? simulatedTools[0];

  return (
    <div className="sandbox-page">
      <Tabs
        activeId={activeTool.type}
        label="Simulated tools"
        items={simulatedTools.map((tool) => ({
          id: tool.type,
          label: tool.label,
          href: `/simulated-tools?tool=${tool.type}`,
        }))}
      />

      <Card
        title={activeTool.label}
        eyebrow="Free play"
        action={<Badge tone="neutral">No score</Badge>}
      >
        <p className="muted">{activeTool.description}</p>
        <SimulatedToolRunner key={activeTool.type} mode="freeplay" toolType={activeTool.type} />
      </Card>
    </div>
  );
}
