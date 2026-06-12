import { Badge, Button, Card } from "@automagic/ui";

import { ProgressBar } from "../../_components/progress-bar";
import { feedbackHistory } from "../../_data/sandbox";

export default function FeedbackPage() {
  return (
    <div className="sandbox-page">
      <section className="two-column-grid">
        <Card title="Score trend" eyebrow="Last 6 missions">
          <div className="metric">
            <span>Average change</span>
            <strong>+12</strong>
            <span>over last 6 missions</span>
          </div>
          <div className="progress-list section-offset">
            <div className="progress-row">
              <header>
                <strong>Inbox and calendar</strong>
                <span>86 avg</span>
              </header>
              <ProgressBar value={86} />
            </div>
            <div className="progress-row">
              <header>
                <strong>Client communication</strong>
                <span>74 avg</span>
              </header>
              <ProgressBar value={74} />
            </div>
            <div className="progress-row">
              <header>
                <strong>Ecommerce support</strong>
                <span>71 avg</span>
              </header>
              <ProgressBar value={71} />
            </div>
          </div>
          <p className="schema-note">Where to focus: client communication and ecommerce support.</p>
        </Card>

        <Card title="Feedback history" eyebrow="Graded submissions">
          <ul className="feedback-list">
            {feedbackHistory.map((item) => (
              <li key={item.id}>
                <div className="inline-row">
                  <Badge tone={item.score >= 85 ? "success" : "warning"}>{item.score}</Badge>
                  <strong>{item.title}</strong>
                  <span className="muted">{item.date}</span>
                </div>
                <p className="muted">
                  {item.skill} · graded by {item.model}
                </p>
                <p className="muted">
                  Strength: {item.strength}. Fix: {item.issue}.
                </p>
                <Button size="sm" label="Open graded breakdown" />
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
