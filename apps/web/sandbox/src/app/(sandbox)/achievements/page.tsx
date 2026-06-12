import { Badge, Card } from "@automagic/ui";

import { PageHeader } from "../../_components/page-header";
import { ProgressBar } from "../../_components/progress-bar";
import { badges, certificates } from "../../_data/sandbox";

export default function AchievementsPage() {
  return (
    <div className="sandbox-page">
      <PageHeader route="/achievements" />

      <Card title="Level progress" eyebrow="Level 4 · 1,840 XP">
        <h3>Apprentice VA</h3>
        <div className="inline-row">
          <Badge tone="success">7-day streak</Badge>
          <Badge tone="accent">660 XP to Level 5</Badge>
        </div>
        <div className="section-offset">
          <ProgressBar value={62} />
        </div>
      </Card>

      <section className="two-column-grid">
        <Card title="Badges" eyebrow="9 of 24 earned">
          <div className="badge-grid">
            {badges.map((badge) => (
              <Card key={badge.id}>
                <Badge tone={badge.earned ? "success" : "neutral"}>{badge.earned ? "Earned" : "Locked"}</Badge>
                <h3>{badge.name}</h3>
                <p className="muted">{badge.detail}</p>
              </Card>
            ))}
          </div>
        </Card>

        <Card title="Certificates" eyebrow="Per-skill readiness">
          <ul className="feedback-list">
            {certificates.map((certificate) => (
              <li key={certificate.id}>
                <div className="inline-row">
                  <Badge tone={certificate.status === "earned" ? "success" : "neutral"}>
                    {certificate.status}
                  </Badge>
                  <strong>{certificate.title}</strong>
                </div>
                <p className="muted">{certificate.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
