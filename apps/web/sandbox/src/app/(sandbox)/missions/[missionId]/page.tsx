import { notFound } from "next/navigation";
import { Badge, Button, Card, Input, Textarea } from "@automagic/ui";

import { difficultyLabel, findMission, skillName } from "../../../_data/sandbox";
import { getSimulatedTool } from "../../../_simulated-tools";

type MissionPageProps = {
  params: Promise<{
    missionId: string;
  }>;
};

export default async function MissionPage({ params }: MissionPageProps) {
  const { missionId } = await params;
  const mission = findMission(missionId);

  if (!mission) notFound();

  const tool = getSimulatedTool(mission.toolType);
  const seed = tool.seedData();
  const Surface = tool.Surface;

  return (
    <div className="sandbox-page">
      <section className="cockpit">
        <Card title="Brief" eyebrow="Objectives">
          <div className="inline-row">
            <Badge tone="accent">{difficultyLabel(mission.difficulty)}</Badge>
            <Badge tone="info">{skillName(mission.skill)}</Badge>
            <Badge tone="warning">14:22</Badge>
          </div>
          <p className="muted">{mission.brief}</p>
          <ul className="objective-list">
            {mission.objectives.map((objective) => (
              <li className={objective.done ? "done" : ""} key={objective.id}>
                {objective.done ? "Done: " : ""}
                {objective.text}
              </li>
            ))}
          </ul>
          <p className="schema-note">
            Autosave will persist objectives, tool snapshot JSON, and elapsed time through
            `PATCH /missions/:id/state`.
          </p>
        </Card>

        <Card title={tool.label} eyebrow="Simulated tool" className="tool-panel">
          <Surface seed={seed} mode="mission" />
        </Card>

        <Card title="AI Coach" eyebrow={mission.generatedByModel ?? "default model"}>
          <div className="progress-list">
            <div className="metric">
              <span>Live score</span>
              <strong>71</strong>
              <span>Partial work · cached coach run</span>
            </div>
            <ul className="feedback-list">
              <li>
                <strong>What is good</strong>
                <p className="muted">You surfaced the urgent client thread before low-value mail.</p>
              </li>
              <li>
                <strong>What is missing</strong>
                <p className="muted">The invoice email is a dispute and should be flagged, not archived.</p>
              </li>
              <li>
                <strong>Stronger answer</strong>
                <p className="muted">
                  Lead with the dispute, confirm you are checking the contract, and propose a callback
                  window.
                </p>
              </li>
            </ul>
            <Textarea label="Ask the coach" placeholder="Ask for a hint without revealing the full answer..." />
            <Input label="Coach endpoint" value="POST /coach/hint" readOnly />
            <Button label="Ask coach" />
          </div>
        </Card>
      </section>
    </div>
  );
}
