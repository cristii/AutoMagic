import type { SerializedToolPayload, SimulatedToolDefinition } from "./types";

type StubSeed = {
  title: string;
  tasks: string[];
};

type StubPayload = SerializedToolPayload & {
  data: {
    completedTasks: string[];
  };
};

export function createStubTool(
  type: "calendar" | "support" | "ecommerce" | "automation",
  label: string,
  tasks: string[],
): SimulatedToolDefinition<StubSeed, StubPayload> {
  return {
    type,
    label,
    description: `${label} is stubbed behind the simulated-tool interface for the MVP slice.`,
    seedData: () => ({ title: label, tasks }),
    Surface: StubSurface,
    serialize: (seed) => ({
      toolType: type,
      summary: `${label} stub payload`,
      data: {
        completedTasks: seed.tasks.slice(0, 1),
      },
    }),
  };
}

function StubSurface({ seed }: { seed: StubSeed; mode: "mission" | "freeplay" }) {
  return (
    <div className="tool-workspace">
      <h3>{seed.title}</h3>
      <p className="muted">
        This tool is registered with seed and serialization hooks. The working surface can be filled
        in after inbox, CRM, and spreadsheet are complete.
      </p>
      <ul className="objective-list">
        {seed.tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
