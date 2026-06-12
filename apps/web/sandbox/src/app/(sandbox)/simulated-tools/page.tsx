import { Badge, Button, Card, Tabs } from "@automagic/ui";

import { PageHeader } from "../../_components/page-header";
import { simulatedTools } from "../../_simulated-tools";

export default function SimulatedToolsPage() {
  const activeTool = simulatedTools[0];
  const Surface = activeTool.Surface;
  const seed = activeTool.seedData();

  return (
    <div className="sandbox-page">
      <PageHeader route="/simulated-tools" action={<Button label="Reset data" />} />

      <Tabs
        activeId={activeTool.type}
        label="Simulated tools"
        items={simulatedTools.map((tool) => ({
          id: tool.type,
          label: tool.label,
          href: "/simulated-tools",
        }))}
      />

      <Card
        title={activeTool.label}
        eyebrow="Free play"
        action={<Badge tone="neutral">No score</Badge>}
      >
        <p className="muted">{activeTool.description}</p>
        <Surface seed={seed} mode="freeplay" />
      </Card>
    </div>
  );
}
