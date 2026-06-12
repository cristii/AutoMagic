import { Badge, Button, Card } from "@automagic/ui";

import { difficultyLabel, missions, skillName, skills } from "../../_data/sandbox";

export default function MissionsPage() {
  return (
    <div className="sandbox-page">
      <div className="two-column-grid">
        <Card title="Filters" eyebrow="Library">
          <div className="progress-list">
            <div className="filter-block">
              <strong>Skills</strong>
              <div className="chip-list">
                {skills.map((skill) => (
                  <span className="chip" key={skill.key}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="filter-block">
              <strong>Status</strong>
              <div className="chip-list">
                {["New", "In progress", "Completed"].map((status) => (
                  <span className="chip" key={status}>
                    {status}
                  </span>
                ))}
              </div>
            </div>
            <div className="filter-block">
              <strong>Difficulty</strong>
              <div className="chip-list">
                {["Easy", "Medium", "Hard"].map((difficulty) => (
                  <span className="chip" key={difficulty}>
                    {difficulty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <section className="section-stack">
          <header className="section-heading">
            <h2>Available missions</h2>
          </header>
          <div className="mission-library-grid">
            {missions.map((mission) => (
              <Card className="mission-card" key={mission.id}>
                <div className="inline-row">
                  <Badge
                    tone={
                      mission.status === "graded"
                        ? "success"
                        : mission.status === "in_progress"
                          ? "info"
                          : "neutral"
                    }
                  >
                    {mission.status.replace("_", " ")}
                  </Badge>
                  <Badge tone="accent">{difficultyLabel(mission.difficulty)}</Badge>
                </div>
                <h3>{mission.title}</h3>
                <p>{skillName(mission.skill)}</p>
                <div className="mission-card-footer">
                  <span className="muted">
                    +{mission.xpReward} XP · {mission.estMinutes} min
                  </span>
                  <Button
                    href={mission.status === "graded" ? "/feedback" : `/missions/${mission.id}`}
                    size="sm"
                    label={
                      mission.status === "graded"
                        ? `Review ${mission.score}`
                        : mission.status === "in_progress"
                          ? "Resume"
                          : "Start"
                    }
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
