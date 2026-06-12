import { Badge, Button, Card } from "@automagic/ui";

import { ProgressBar } from "../../_components/progress-bar";
import {
  dashboardMetrics,
  feedbackHistory,
  missions,
  skillName,
  skills,
} from "../../_data/sandbox";

export default function DashboardPage() {
  const activeMission = missions.find((mission) => mission.status === "in_progress");

  return (
    <div className="sandbox-page">
      <section className="metric-row">
        {dashboardMetrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <span>{metric.detail}</span>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <Card title="Skill progress" eyebrow="Leveling">
          <div className="progress-list">
            {skills.map((skill) => (
              <div className="progress-row" key={skill.key}>
                <header>
                  <strong>{skill.name}</strong>
                  <span>
                    Lv {skill.level} · {skill.avgScore} avg
                  </span>
                </header>
                <ProgressBar value={skill.progressPercent} />
              </div>
            ))}
          </div>
        </Card>

        <div className="progress-list">
          <Card
            title="Active mission"
            eyebrow={activeMission ? "Resume" : "Next"}
            action={
              activeMission ? (
                <Button href={`/missions/${activeMission.id}`} size="sm" label="Resume" />
              ) : null
            }
          >
            {activeMission ? (
              <article className="mission-card">
                <div className="inline-row">
                  <Badge tone="info">In progress</Badge>
                  <Badge tone="accent">{skillName(activeMission.skill)}</Badge>
                </div>
                <h3>{activeMission.title}</h3>
                <p>{activeMission.brief}</p>
                <div className="mission-card-footer">
                  <span className="muted">
                    {activeMission.objectives.filter((objective) => objective.done).length} of{" "}
                    {activeMission.objectives.length} objectives
                  </span>
                  <span className="muted">+{activeMission.xpReward} XP</span>
                </div>
              </article>
            ) : (
              <p className="muted">No active mission. Generate one or start from the library.</p>
            )}
          </Card>

          <Card title="Recent coach feedback" eyebrow="Last grades">
            <ul className="feedback-list">
              {feedbackHistory.slice(0, 2).map((item) => (
                <li key={item.id}>
                  <div className="inline-row">
                    <Badge tone={item.score >= 85 ? "success" : "warning"}>{item.score}</Badge>
                    <strong>{item.title}</strong>
                  </div>
                  <p className="muted">
                    {item.strength}. Focus: {item.issue}.
                  </p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
