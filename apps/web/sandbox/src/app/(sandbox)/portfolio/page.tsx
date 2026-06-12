import { Badge, Button, Card } from "@automagic/ui";

import { PageHeader } from "../../_components/page-header";
import { portfolioItems } from "../../_data/sandbox";

export default function PortfolioPage() {
  return (
    <div className="sandbox-page">
      <PageHeader
        route="/portfolio"
        action={<Button label="Share to public profile" variant="primary" />}
      />

      <section className="portfolio-grid">
        {portfolioItems.map((item) => (
          <Card className="portfolio-tile" key={item.id}>
            <div className="metric">
              <span>{item.skill}</span>
              <strong>{item.score}</strong>
              <span>mission score</span>
            </div>
            <h3>{item.title}</h3>
            <div className="inline-row">
              <Badge tone={item.isPublic ? "success" : "neutral"}>
                {item.isPublic ? "Public" : "Private"}
              </Badge>
              <Button size="sm" label={item.isPublic ? "Hide" : "Publish"} />
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
